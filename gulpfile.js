// Plex Theme Build Automation

'use strict';

// Imports & configurations

    // Automation engine
const gulp = require('gulp'),
    // CSS preprocessor
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    // Inline and optimize svgs
    cssSvg = require('gulp-css-svg'),
    // Add browser prefixes
    autoPrefixer = require('gulp-autoprefixer'),
    // Project information
    packageJSON = require('./package.json'),
    repository = packageJSON.repository,

    // BrowserSync
    browserSync = require('browser-sync').create(),
    browserSyncConfig = {
        proxy: packageJSON.homepage,
        files: 'css/Plex.css',
        serveStatic: ['css'],
        snippetOptions: {
            rule: {
                match: /<link id="theme" href=".*" rel="stylesheet">/i,
                fn: (snippet, match) =>
                    '<link rel="stylesheet" type="text/css" href="/Plex.css">'
                    + snippet
            }
        },
        ghostMode: {
            clicks: false,
            location: false,
            forms: false,
            scroll: false
        },
        notify: {
            styles: {
        		top: 'auto',
        		bottom: '0'
            }
        }
    },
    browserSyncError = () => {
        console.error('Set the "homepage" value in package.json to your Organizr instance\'s URL to test with Browsersync.');
        return process.exit(0);
    },

    // Image optimzation
    imagemin = require('gulp-imagemin'),
    imageminPlugins = [
        imagemin.svgo(),
        imagemin.optipng({ optimizationLevel: 7 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.gifsicle({ interlaced: true, optimizationLevel: 3 })
    ],
    imageGlob = '**/*.+(svg|png|jpg|jpeg|gif)',

    // CSS optimization
    cleanCSS = require('gulp-clean-css'),
    cleanCSSConfig = {
        inline: ['all'],
        level: {
            1: { all: true },
            2: { all: true }
        }
    },

    // Header Comment
    headerComment = require('gulp-header-comment'),
    comment = `Plex Theme for Organizr v2
        Version ` + packageJSON.version + `
        ` + packageJSON.license + ` License
        ` + repository;


// Losslessly optimize images

gulp.task('imagemin', () =>
    gulp
        .src(imageGlob)
        .pipe(imagemin(imageminPlugins))
        .pipe(gulp.dest('./'))
);


// Lint, compile, and post-process Sass

gulp.task('build', () =>
    gulp
        .src('sass/*.s+(a|c)ss')
        .pipe(sassLint({ options: { 'merge-default-rules': false } }))
        .pipe(sassLint.format())
        .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(cssSvg({ baseDir: '../' }))
        .pipe(cleanCSS(cleanCSSConfig))
        .pipe(headerComment(comment))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
);


// Build Sass files when changes detected

gulp.task('watch', () =>
    gulp.watch(['sass/**/*.s+(a|c)ss', imageGlob], gulp.series('build'))
);

gulp.task('build-watch', gulp.series(['build', 'watch']));


// Start BrowserSync server

gulp.task('serve', () => !packageJSON.homepage
    ? browserSyncError
    : browserSync.init(browserSyncConfig)
);

gulp.task('build-watch-serve', gulp.parallel('build-watch', 'serve'));
