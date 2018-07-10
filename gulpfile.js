'use strict';

let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css'),
    packageJson = require('./package.json'),
    autoPrefixer = require('gulp-autoprefixer'),
    headerComment = require('gulp-header-comment');

// Auto-compile SCSS files on changes
gulp.task('watch', function() {
    gulp.watch("scss/**/*.s+(a|c)ss", ['build']);
});

// Compile SASS into CSS
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
            Version ` + packageJson.version + `
            License ` + packageJson.license + `
        ` + packageJson.repository))
        .pipe(gulp.dest("css"));
});

gulp.task('default', ['build', 'watch']);
