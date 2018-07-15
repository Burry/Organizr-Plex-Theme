'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css'),
    packageJSON = require('./package.json'),
    autoPrefixer = require('gulp-autoprefixer'),
    headerComment = require('gulp-header-comment'),
    comment = `Plex Theme for Organizr v2
        Version ` + packageJSON.version + `
        ` + packageJSON.license + ` License
        ` + packageJSON.repository,
    browserSync = require('browser-sync').create(),
    browserSnippet = '<link rel="stylesheet" type="text/css" href="/Plex.css">',
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
        notify: {
            styles: {
        		top: 'auto',
        		bottom: '0'
            }
        }
    };

// Lint, compile, and post-process Sass
gulp.task('compile', function() {
    return gulp
        .src('scss/*.s+(a|c)ss')
        .pipe(sassLint({ options: { 'merge-default-rules': false } }))
        .pipe(sassLint.format())
        .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(headerComment(comment))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Build Sass files when changes detected
gulp.task('watch', function() {
    return gulp.watch('scss/**/*.s+(a|c)ss', gulp.series('build'));
});

gulp.task('build', gulp.series(['compile', 'watch']));

// Start BrowserSync server
gulp.task('serve', function() {
    if (!packageJSON.homepage) {
        console.error('Set the "homepage" value in package.json to your Organizr instance\'s URL to test with Browsersync');
        return process.exit(0);
    }
    return browserSync.init(browserSyncConfig);
});

gulp.task('build-serve', gulp.parallel('build', 'serve'));
