# Plex Theme <i style=color:#999>for [Organizr](https://github.com/causefx/Organizr) v2</i>
A theme for Organizr v2 that emulates the style of Plex

![Screen Shot](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/screenshot.jpg "Screen Shot")

## Variants

- [`Plex.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex.css) Regular Plex Theme — looks like [Plex Web](https://app.plex.tv/desktop)
- [`Plex Blur.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex%20Blur.css) Plex Theme with background blur effects (see below)
- [`Plex.tv.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex.tv.css) Uses the colors and button shapes of [Plex.tv](https://www.plex.tv) (rounder and lighter)
- [`Plex.tv Blur.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex.tv%20Blur.css) Plex.tv theme with background blur effects

### Blur Effect

[`Plex.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex.css) should look good across all major browsers, but it forgoes experimental [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) blur effects in lieu of darker backgrounds. If your Organizr users are using Safari or another browser that currently supports these effects, try out [`Plex Blur.css`](https://raw.githubusercontent.com/Burry/organizr-v2-plex-theme/master/css/Plex%20Blur.css).

## Installation

- Choose a variant of the Plex Theme in [`/css`](https://github.com/Burry/organizr-v2-plex-theme/tree/master/css). Copy the contents of the CSS file.
- Open Organizr Settings > Customize > Appearance > Custom CSS, paste the contents of the CSS file into the text field, and save.
    - Note: Organizr v2's stylesheet placement and use of `!important` rules currently prevents the Plex Theme from setting certain styles if it is installed in Organizr's `/css/themes` folder instead of pasting the stylesheet into Organizr's Custom CSS field.
- *Optional*: Download the contents of the [`/images`](https://github.com/Burry/organizr-v2-plex-theme/tree/master/images) folder from this repository to Organizr's directory `/plugins/images/`. These stylesheets link to assets hosted on this GitHub repository, but assets called in Organizr's page markup must be placed in the local directory.

## Remove Login Chrome
Add the following lines to Organizr's `/js/functions.js` inside the function `swapDisplay` case `login` to hide all UI chrome on the login/register page.

```
$('.sidebar').addClass('hidden');
$('.navbar').addClass('hidden');
$('#pagewrapper').addClass('hidden');
```

## Development

- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Download or clone the repository and enter it in a terminal
- Run `yarn` to install development dependencies
- Run `yarn build` to compile the [Sass](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) stylesheets in `/scss`. As you make changes, CSS will be continually recompiled into `/css`.
