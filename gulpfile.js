'use strict';

const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    sassInlineImage = require('sass-inline-image'),
    autoPrefixer = require('gulp-autoprefixer'),
    cssImport = require('gulp-cssimport'),
    crass = require('gulp-crass'),
    packageJSON = require('./package.json'),
    headerComment = require('gulp-header-comment'),
    browserSync = require('browser-sync').create(),
    browserSnippet = '<link rel="stylesheet" type="text/css" href="/Plex.css">',
    browserSyncError = 'Set the "homepage" value in package.json to your Organizr instance\'s URL to test with Browsersync.',
    browserSyncConfig = {
        proxy: packageJSON.homepage,
        files: 'css/Plex.css',
        serveStatic: ['css'],
        snippetOptions: {
            rule: {
                match: /<link id="theme" href=".*" rel="stylesheet">/i,
                fn: (snippet, match) => browserSnippet + snippet
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
    imageminPlugins = [
        imagemin.svgo(),
        imagemin.optipng({ optimizationLevel: 7 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.gifsicle({
            interlaced: true,
            optimizationLevel: 3
        })
    ],
    imagesGlob = '**/*.+(svg|png|jpg|jpeg|gif)',
    comment = `Plex Theme for Organizr v2
        Version ` + packageJSON.version + `
        ` + packageJSON.license + ` License
        ` + packageJSON.repository;


// Losslessly optimize images
gulp.task('imagemin', () =>
    gulp
        .src(imagesGlob)
        .pipe(imagemin(imageminPlugins))
        .pipe(gulp.dest('./'))
);


// Lint, compile, and post-process Sass
gulp.task('compile', () =>
    gulp
        .src('scss/*.s+(a|c)ss')
        .pipe(sassLint({
            options: { 'merge-default-rules': false }
        }))
        .pipe(sassLint.format())
        .pipe(sass({
            errLogToConsole: true,
            functions: sassInlineImage()
        }).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(cssImport())
        .pipe(crass({ pretty: false }))
        .pipe(headerComment(comment))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream())
);


// Build Sass files when changes detected
gulp.task('watch', () =>
    gulp.watch([imagesGlob, 'scss/**/*.s+(a|c)ss'], gulp.series('compile'))
);

gulp.task('build', gulp.series(['compile', 'watch']));


// Start BrowserSync server
const serveError = () => {
    console.error(browserSyncError);
    return process.exit(0);
};

gulp.task('serve', () => !packageJSON.homepage
    ? serveError
    : browserSync.init(browserSyncConfig)
);

gulp.task('build-serve', gulp.parallel('build', 'serve'));
