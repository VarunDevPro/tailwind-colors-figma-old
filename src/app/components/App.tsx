import * as React from 'react';
import {palettes} from '../../constants';
import '../../generated/style.min.css';

declare function require(path: string): any;

const App = ({}) => {
  const btnRef = React.useRef(null);

  const [palette, setPalette] = React.useState(palettes.TAILWIND_CSS_224);

  React.useEffect(() => {
    btnRef.current.focus();
  }, []);

  const handlePaletteChange = (event) => {
    setPalette(event.target.value);
  };

  const onAdd = () => {
    parent.postMessage({pluginMessage: {type: 'add-styles', from: palette}}, '*');
  };

  const onCancel = () => {
    parent.postMessage({pluginMessage: {type: 'cancel'}}, '*');
  };

  return (
    <div className="px-6 pt-4 pb-2">
      <div className="mb-4 rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm leading-5 font-medium text-yellow-800">Note</h3>
            <div className="text-sm leading-5 text-yellow-700">
              <p>This action will add styles in your file. I use this plugin only on a brand new file.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <label htmlFor="palette" className="block text-sm font-medium text-gray-700">
          Choose Palette
        </label>
        <select
          id="palette"
          name="palette"
          value={palette}
          onChange={handlePaletteChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={palettes.TAILWIND_CSS_224}>Tailwind CSS v2.2.4</option>
          <option value={palettes.TAILWIND_CSS_196}>Tailwind CSS v1.9.6</option>
          <option value={palettes.TAILWIND_UI}>Tailwind UI</option>
        </select>
      </div>

      <button
        ref={btnRef}
        id="add"
        onClick={onAdd}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
      >
        Add
      </button>
      <button
        onClick={onCancel}
        className="ml-4 py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
      >
        Cancel
      </button>
    </div>
  );
};

export default App;
