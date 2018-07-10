'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css'),
    packageJSON = require('./package.json'),
    autoPrefixer = require('gulp-autoprefixer'),
    headerComment = require('gulp-header-comment');

// Build Sass files when changes detected
gulp.task('watch', function() {
    gulp.watch("scss/**/*.s+(a|c)ss", ['build']);
});

// Lint, compile, and post-process Sass
gulp.task('build', function() {
    return gulp
        .src("scss/*.s+(a|c)ss")
        .pipe(sassLint({ options: { 'merge-default-rules': false } }))
        .pipe(sassLint.format())
        .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(cleanCSS({ level: 2 }))
        .pipe(headerComment(`
            Plex Theme for Organizr v2
            Version ` + packageJSON.version + `
            ` + packageJSON.license + ` License
        ` + packageJSON.repository))
        .pipe(gulp.dest("css"));
});

gulp.task('default', ['build', 'watch']);
