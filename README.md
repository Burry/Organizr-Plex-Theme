<h1 align="center">
    <img src="https://raw.githubusercontent.com/Burry/Organizr-Plex-Theme/master/doc/banner.png" width="370px" alt="Plex Theme for Organizr" />
</h1>

<p align="center">
    A theme for <a href="https://github.com/causefx/Organizr" target="_blank">Organizr</a> that emulates the style of Plex
    <br />
    <br />
    <a href="https://travis-ci.org/Burry/Organizr-Plex-Theme" target="_blank" title="Build Status">
        <img src="https://travis-ci.org/Burry/Organizr-Plex-Theme.svg?branch=master" alt="Build Status" />
    </a>
    <a href="https://beerpay.io/Burry/Organizr-Plex-Theme?focus=wish" target="_blank" title="Beerpay">
        <img src="https://beerpay.io/Burry/Organizr-Plex-Theme/badge.svg?style=flat" alt="Beerpay" />
    </a>
    <br />
    <br />
    <img src="https://raw.githubusercontent.com/Burry/Organizr-Plex-Theme/master/doc/screenshots/1.png" alt="Screen Shot 1" width="49.15%" />
    <img src="https://raw.githubusercontent.com/Burry/Organizr-Plex-Theme/master/doc/screenshots/2.png" alt="Screen Shot 2" width="49.15%" />
    <img src="https://raw.githubusercontent.com/Burry/Organizr-Plex-Theme/master/doc/screenshots/3.png" alt="Screen Shot 3" width="49.15%" />
    <img src="https://raw.githubusercontent.com/Burry/Organizr-Plex-Theme/master/doc/screenshots/4.png" alt="Screen Shot 4" width="49.15%" />
</p>

## ✅ Usage

1. Setup a PHP 7 server with [Organizr 2](https://github.com/causefx/Organizr).
2. Open _Organizr Settings > Customize > Marketplace_ and install Plex Theme.
3. Open _Organizr Settings > Customize > Appearance > Colors & Themes_, and select "Plex" from the theme dropdown.

### Group Icons

Some group icons are provided for your use in [`/images/groups`](https://github.com/Burry/Organizr-Plex-Theme/tree/master/images/groups) to be copied to Organizr's `/plugins/images/groups`.

### _Related:_ Open Plex App on iOS

Using _Organizr's Settings > Customize > Appearance > Custom JavaScript_ and [this script](https://gist.github.com/Burry/7f6c2caa9cf645ca511ffefd697b3126), you can redirect all links to Plex while browsing on iOS to the Plex app, complete with functional deep-linking. I cannot find the equivalent scheme to open Plex on Android if it exists.

### Don't Change These

Under _Organizr Settings > Customize > Appearance_:

#### Dark Style

Keep the "style" dropdown in _Colors & Themes_ set to "dark".

#### Notifications

To ensure that notifications display as intended, keep the default notification style setting "Izi" in _Notifications_.

#### Custom Colors

Changing the placeholder color values in _Colors & Themes_ will override Plex Theme's color styles. Deleting custom color values will reverse this.

## [🛠 Development](doc/Development.md)
