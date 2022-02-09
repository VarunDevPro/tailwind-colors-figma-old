import tailwindUIPalette from '../generated/tailwindUIPalette';
import tailwindcss196 from '../generated/tailwindcss196';
import tailwindcss224 from '../generated/tailwindcss224';
import tailwindcss307 from '../generated/tailwindcss307';
import {
  ACCEPT_NOTICE_STORAGE_KEY,
  figmaMessageTypes,
  FOLDER_NAME_STORAGE_KEY,
  palettes,
  reactMessageTypes,
} from '../constants';

figma.showUI(__html__, {
  width: 275,
  height: 260,
  title: 'Add Tailwind Color Styles',
});

const generatedColors = {
  [palettes.TAILWIND_CSS_196]: tailwindcss196,
  [palettes.TAILWIND_CSS_224]: tailwindcss224,
  [palettes.TAILWIND_CSS_307]: tailwindcss307,
  [palettes.TAILWIND_UI]: tailwindUIPalette,
};

// Add color styles
const handleAddStyles = async (msg) => {
  const colors = generatedColors[msg.from] || [];
  let prefix = '';

  if (msg.folder) {
    // Update prefix to folder name
    // Update storage
    prefix = msg.folder + '/';
    await figma.clientStorage.setAsync(FOLDER_NAME_STORAGE_KEY, msg.folder);
  }

  colors.forEach(({name, color}) => handleSolidColor(prefix + name, color));

  if (colors.length > 0) {
    figma.notify('✔ Added Color Styles');
  } else {
    figma.notify('⚠ No styles added');
  }
};

// Store user acceptance of notice
const handleAcceptNotice = async () => {
  await figma.clientStorage.setAsync(ACCEPT_NOTICE_STORAGE_KEY, true);

  figma.ui.postMessage({
    type: reactMessageTypes.SET_SHOW_NOTICE,
    value: false,
  });
};

// Load user config from storage
const handleFetchConfig = async () => {
  const acceptedNotice = await figma.clientStorage.getAsync(
    ACCEPT_NOTICE_STORAGE_KEY
  );

  figma.ui.postMessage({
    type: reactMessageTypes.SET_SHOW_NOTICE,
    value: !acceptedNotice,
  });

  if (!acceptedNotice) {
    figma.ui.resize(350, 425);
  }

  const lastUsedFolderName = await figma.clientStorage.getAsync(
    FOLDER_NAME_STORAGE_KEY
  );

  if (lastUsedFolderName) {
    figma.ui.postMessage({
      type: reactMessageTypes.SET_LAST_USED_FOLDER_NAME,
      value: lastUsedFolderName,
    });
  }
};

// Message listener and handler
figma.ui.onmessage = (msg) => {
  if (msg.type === figmaMessageTypes.ADD_STYLES) {
    handleAddStyles(msg);
  }

  if (msg.type === figmaMessageTypes.ACCEPT_NOTICE) {
    handleAcceptNotice();
    return;
  }

  if (msg.type === figmaMessageTypes.FETCH_CONFIG) {
    handleFetchConfig();
    return;
  }

  if (msg.type === figmaMessageTypes.CANCEL) {
    figma.notify('Cancelled');
  }

  figma.closePlugin();
};

// Create paint styles for each color
const handleSolidColor = (
  name: string,
  color,
  create: boolean = true,
  paintStyle?: PaintStyle
) => {
  const style = create ? figma.createPaintStyle() : paintStyle;

  if (create) {
    figma.createPaintStyle;
    style.name = name;
  }

  const {r, g, b, a} = color;

  const rgbColor: RGB = {r, g, b};
  const alpha: number = a;

  const solidPaint: SolidPaint = {
    type: 'SOLID',
    color: rgbColor,
    opacity: alpha,
  };

  style.paints = [solidPaint];
};
