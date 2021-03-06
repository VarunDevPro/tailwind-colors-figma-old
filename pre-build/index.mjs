import tailwindcss196 from './config/palettes/tailwindcss-1-9-6.mjs';
import tailwindcss224 from './config/palettes/tailwindcss-2-2-4.mjs';
import tailwindcss307 from './config/palettes/tailwindcss-3-0-7.mjs';
import tailwindUIPalette from './config/palettes/tailwindui.mjs';

import {writeToGenerated} from './utils/writeToGenerated.mjs';

import {getParsedColors, getJSFileContent} from './colors.mjs';

writeToGenerated(
  getJSFileContent(getParsedColors(tailwindcss307)),
  'tailwindcss307.ts'
);
writeToGenerated(
  getJSFileContent(getParsedColors(tailwindcss224)),
  'tailwindcss224.ts'
);
writeToGenerated(
  getJSFileContent(getParsedColors(tailwindcss196)),
  'tailwindcss196.ts'
);
writeToGenerated(
  getJSFileContent(getParsedColors(tailwindUIPalette)),
  'tailwindUIPalette.ts'
);

writeToGenerated(
  `# Generated files

**NOTE:** Please do not create or edit any files in this folder. The files in this folder get generated during the execution of \`node ./pre-build/index.mjs\` or \`npm run build\`
`,
  'README.md'
);

console.log('Codegen Successful');
