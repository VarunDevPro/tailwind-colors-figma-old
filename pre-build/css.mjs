import CleanCSS from 'clean-css';
import { PurgeCSS } from "purgecss";
import path from "path";
import { fileURLToPath } from "url";

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const purgeCSSResult = await new PurgeCSS().purge({
  content: [__dirname + "/ui/**/*.html"],
  css: [__dirname + "/ui/**/*.css"],
});

const purged = purgeCSSResult.map((x) => x.css).join("\n");
const minified = new CleanCSS({}).minify(purged).styles;

export default minified;
