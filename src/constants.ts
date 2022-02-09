// Unique identifier - to be updated before publishing the plugin
const versionIdentifier = '08-FEB-2022';

// Storage Keys
export const ACCEPT_NOTICE_STORAGE_KEY = `acceptedNotice:${versionIdentifier}`;
export const FOLDER_NAME_STORAGE_KEY = `lastUsedFolderName:${versionIdentifier}`;

export const palettes = {
  TAILWIND_CSS_196: 'v1.9.6',
  TAILWIND_CSS_224: 'v2.2.1',
  TAILWIND_CSS_307: 'v3.0.7',
  TAILWIND_UI: 'tui',
};

// From React to Figma
export const figmaMessageTypes = {
  ADD_STYLES: 'add-styles',
  ACCEPT_NOTICE: 'accept-notice',
  FETCH_CONFIG: 'fetch-config',
  CANCEL: 'cancel',
};

// From Figma to React
export const reactMessageTypes = {
  SET_SHOW_NOTICE: 'set-show-notice',
  SET_LAST_USED_FOLDER_NAME: 'set-last-used-folder-name',
};
