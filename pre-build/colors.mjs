import { parseColor } from "./utils/color.mjs";

export const getParsedColors = (hexcolors) => {
  const colors = [];

  for (var colorName in hexcolors) {
    if (typeof hexcolors[colorName] === "string") {
      colors.push({ name: colorName, color: parseColor(hexcolors[colorName]) });
    } else {
      for (var i in hexcolors[colorName]) {
        colors.push({
          name: colorName + "/" + i,
          color: parseColor(hexcolors[colorName][i]),
        });
      }
    }
  }

  return colors;
};

export const getJSFileContent = (colors) => {
  return `export default ${JSON.stringify(colors,null,2)}`
}