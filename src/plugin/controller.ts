import tailwindUIPalette from '../generated/tailwindUIPalette';
import tailwindcss196 from '../generated/tailwindcss196';
import tailwindcss224 from '../generated/tailwindcss224';
import tailwindcss307 from '../generated/tailwindcss307';
import {palettes} from '../constants';

figma.showUI(__html__, {
  height: 270,
  width: 360,
  title: 'Add Tailwind Color Styles',
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'add-styles') {
    let colors = [];

    if (msg.from === palettes.TAILWIND_CSS_196) {
      colors = tailwindcss196;
    }

    if (msg.from === palettes.TAILWIND_CSS_224) {
      colors = tailwindcss224;
    }

    if (msg.from === palettes.TAILWIND_CSS_307) {
      colors = tailwindcss307;
    }

    if (msg.from === palettes.TAILWIND_UI) {
      colors = tailwindUIPalette;
    }

    colors.forEach(({name, color}) => handleSolidColor(name, color));

    if (colors.length > 0) {
      figma.notify('✔ Added Color Styles');
    } else {
      figma.notify('⚠ No styles added');
    }
  } else if (msg.type === 'cancel') {
    figma.notify('Cancelled');
  }

  figma.closePlugin();
};

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
