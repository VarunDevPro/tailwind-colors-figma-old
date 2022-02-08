import sass from 'sass';
const scssFilename = './pre-build/ui/index.scss';

const result = sass.compileString({
  file: scssFilename,
  sourceMapContents: false,
  sourceMapEmbed: false,
  outputStyle: 'compressed',
});

const bundledCSS = result.css;

export default bundledCSS;
