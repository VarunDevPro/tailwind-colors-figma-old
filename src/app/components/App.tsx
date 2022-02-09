import * as React from 'react';
import {palettes} from '../../constants';
import '../../generated/style.min.css';

declare function require(path: string): any;

const App = ({}) => {
  const btnRef = React.useRef(null);

  const [palette, setPalette] = React.useState(palettes.TAILWIND_CSS_307);
  const [folderName, setFolderName] = React.useState('');
  const [lastUsedFolderName, setLastUsedFolderName] = React.useState('');
  const [showNotice, setShowNotice] = React.useState(false);

  // Message Handler
  const handleMessage = React.useCallback(
    (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === 'set-show-notice') {
        setShowNotice(msg.value);
      }

      if (msg.type === 'set-last-used-folder-name') {
        setLastUsedFolderName(msg.value);
      }
    },
    [setShowNotice, setLastUsedFolderName]
  );

  // Autofocus add button
  React.useEffect(() => {
    btnRef.current.focus();
  }, []);

  // Load User Config
  React.useEffect(() => {
    parent.postMessage({pluginMessage: {type: 'fetch-config'}}, '*');
  }, []);

  // Add listener to messages from figma
  React.useEffect(() => {
    onmessage = handleMessage;
    return () => (onmessage = null);
  }, [handleMessage]);

  const handlePaletteChange = (event) => {
    setPalette(event.target.value);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleAcceptNotice = () => {
    parent.postMessage({pluginMessage: {type: 'accept-notice'}}, '*');
  };

  const handleCancel = () => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
  };

  // Add color styles
  const handleAdd = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'add-styles',
          from: palette,
          folder: folderName.trim(),
        },
      },
      '*'
    );
  };

  return (
    <div className="main">
      {showNotice && (
        <div className="alert_container">
          <div className="alert_content">
            <div className="alert_icon_container">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <div className="">
              <h3 className="">Note</h3>
              <div>{showNotice}</div>
              <div className="">
                <p>
                  This action will add multiple color styles in your design
                  file. For grouping, please provide a folder name.
                </p>
              </div>
              <button className="button alert" onClick={handleAcceptNotice}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="">
        <label htmlFor="palette" className="label">
          Choose Palette
        </label>
        <select
          id="palette"
          name="palette"
          value={palette}
          onChange={handlePaletteChange}
          className="select"
        >
          <option value={palettes.TAILWIND_CSS_307}>Tailwind CSS v3.0.7</option>
          <option value={palettes.TAILWIND_CSS_224}>Tailwind CSS v2.2.4</option>
          <option value={palettes.TAILWIND_CSS_196}>Tailwind CSS v1.9.6</option>
          <option value={palettes.TAILWIND_UI}>Tailwind UI</option>
        </select>
      </div>

      <div className="">
        <label htmlFor="folder_name" className="label">
          Folder name (Optional)
        </label>
        <input
          type="text"
          id="folder_name"
          name="folder_name"
          placeholder="e.g., tailwind"
          value={folderName}
          onChange={handleFolderNameChange}
          className="input"
        />
        {lastUsedFolderName && folderName !== lastUsedFolderName && (
          <p className="folder_names">
            Last used:{' '}
            <button
              className="button folder_name"
              onClick={() => setFolderName(lastUsedFolderName)}
            >
              {lastUsedFolderName}
            </button>
          </p>
        )}
      </div>

      <br />

      <button
        ref={btnRef}
        id="add"
        onClick={handleAdd}
        className="button accept"
      >
        Add
      </button>
      <button onClick={handleCancel} className="button cancel">
        Cancel
      </button>
    </div>
  );
};

export default App;
