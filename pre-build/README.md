# Pre-Build

The `build` script runs the `index.mjs` file in this folder to generate the following:

- Minified and Purged CSS file
- Formatted Color files

### Reason

I wanted to do this to reduce the `dist` size.

If this was not done, then

- the `color` package gets bundled into the `dist` during build.
- complete `tailwind.min.css`(~3.2MB) is imported in the html

#### Stats

Without `pre-build`: dist folder size is ~22MB
With `pre-build`: dist folder size is ~5MB
