# Plex Theme <i style=color:#999>for [Organizr](https://github.com/causefx/Organizr) v2</i>
A theme for Organizr v2 that emulates the style of Plex

![Screen Shot](https://raw.githubusercontent.com/Burry/organizr-v2-theme-plex/master/screenshot.jpeg "Screen Shot")

## Installation

- Open Organizr Settings > Customize > Appearance > Custom CSS, copy and paste the contents of [Plex.css](https://raw.githubusercontent.com/Burry/organizr-v2-theme-plex/master/Plex.css) into the text field, and save.
    - Note: Organizr v2's stylesheet placement and use of `!important` rules currently prevents the Plex Theme from setting certain styles if, instead of pasting the stylesheet into Organizr's Custom CSS field, it is installed in the `/css/themes` folder.
- Add the contents of the `images` folder from this repository to the directory `/plugins/images/`.
- *Optional*: Download Plex's custom font set and add the files to `/plugins/fonts/`. These fonts come with no license.
    - [plexeina-bold-webfont.woff2](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-bold-webfont.woff2)
    - [plexeina-bold-webfont.woff](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-bold-webfont.woff)
    - [plexeina-bolditalic-webfont.woff2](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-bolditalic-webfont.woff2)
    - [plexeina-bolditalic-webfont.woff](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-bolditalic-webfont.woff)
    - [plexeina-regular-webfont.woff2](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-regular-webfont.woff2)
    - [plexeina-regular-webfont.woff](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-regular-webfont.woff)
    - [plexeina-regularitalic-webfont.woff2](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-regularitalic-webfont.woff2)
    - [plexeina-regularitalic-webfont.woff](https://www.plex.tv/wp-content/themes/plex/assets/fonts/plexeina-regularitalic-webfont.woff)

## Experimental Blur Effect

The [master](https://github.com/Burry/organizr-v2-theme-plex/tree/master) branch offers a stylesheet that should look good across all major browsers, but it forgoes experimental [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) blur effects in lieu of darker backgrounds. If your Organizr users are using Safari or another browser that currently supports these effects, try out the [blur](https://github.com/Burry/organizr-v2-theme-plex/tree/blur) version.

## Clean Login
Add the following lines in `/js/functions.js` inside function `swapDisplay` case `login` to hide all non-login UI elements for guests.

```
$('.sidebar').addClass('hidden');
$('.navbar').addClass('hidden');
$('#pagewrapper').addClass('hidden');
```
