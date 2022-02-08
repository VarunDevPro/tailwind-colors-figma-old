import * as React from 'react';
import {palettes} from '../../constants';
import '../../generated/style.min.css';

declare function require(path: string): any;

const App = ({}) => {
  const btnRef = React.useRef(null);

  const [palette, setPalette] = React.useState(palettes.TAILWIND_CSS_307);
  const [folderName, setFolderName] = React.useState('');

  React.useEffect(() => {
    btnRef.current.focus();
  }, []);

  const handlePaletteChange = (event) => {
    setPalette(event.target.value);
  };

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const onAdd = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'add-styles',
          from: palette,
          folder: folderName,
        },
      },
      '*'
    );
  };

  const onCancel = () => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
  };

  return (
    <div className="main">
      <div className="alert_container">
        <div className="alert_content">
          <div className="alert_icon_container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
          </div>
          <div className="">
            <h3 className="">Note</h3>
            <div className="">
              <p>
                This action will add multiple color styles in your design file.
                For grouping, please provide a folder name.
              </p>
            </div>
          </div>
        </div>
      </div>

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
      </div>

      <br />

      <button ref={btnRef} id="add" onClick={onAdd} className="button accept">
        Add
      </button>
      <button onClick={onCancel} className="button cancel">
        Cancel
      </button>
    </div>
  );
};

export default App;
