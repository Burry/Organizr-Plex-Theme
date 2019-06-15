# 🛠 Development

- Install [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/docs/install).
- [Download](https://github.com/Burry/organizr-plex-theme/archive/master.zip) or clone the repository and enter it in a terminal.
- Run `yarn` to install development dependencies.

## Scripts

### `yarn build`

Compiles the [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) source stylesheets in `/sass` into a minified CSS file.

### `yarn watch`

Runs `yarn build` continuously as changes are detected until exited.

### `yarn start` _or_ `yarn serve`

You must first set the `ORGANIZR_URL` environment variable in `.env` to your Organizr instance's URL for testing. Then `yarn start` runs `yarn watch` and launches a new [Browsersync](https://browsersync.io) window with the Plex Theme css injected into your Organizr instance every time it is recompiled, so you can see your changes instantly.

### `yarn imagemin`

Losslessly optimizes all `.svg`, `.png`, `.jpg`, and `.gif` images in the repository with [imagemin](https://github.com/imagemin/imagemin). This will take some time.
