'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    cleanCSS = require('gulp-clean-css'),
    packageJSON = require('./package.json'),
    autoPrefixer = require('gulp-autoprefixer'),
    headerComment = require('gulp-header-comment'),
    browserSync = require('browser-sync').create(),
    browserSyncConfig = theme => ({
        proxy: packageJSON.homepage,
        files: 'css/' + theme + '.css',
        serveStatic: ['css'],
        snippetOptions: {
            rule: {
                match: /<\/head>/i,
                fn: (snippet, match) => '<link rel="stylesheet" type="text/css" href="/' + theme + '.css"/>' + snippet + match
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
    });

// Lint, compile, and post-process Sass
gulp.task('compile', function() {
    return gulp
        .src('scss/*.s+(a|c)ss')
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
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Build Sass files when changes detected
gulp.task('watch', function() {
    return gulp.watch('scss/**/*.s+(a|c)ss', gulp.series('build'));
});

gulp.task('build', gulp.series(['compile', 'watch']));

// Start BrowserSync server
function startBrowserSync(theme) {
    if (!packageJSON.homepage) {
        console.error('Set the "homepage" value in package.json to your Organizr instance\'s URL to test with Browsersync');
        return;
    }
    return browserSync.init(browserSyncConfig(theme));
}

gulp.task('serve-plex-theme', function() {
    return startBrowserSync('Plex');
});

gulp.task('serve-plex-blur-theme', function() {
    return startBrowserSync('Plex Blur');
});

gulp.task('build-serve-plex-theme', gulp.parallel('build', 'serve-plex-theme'));
gulp.task('build-serve-plex-blur-theme', gulp.parallel('build', 'serve-plex-blur-theme'));
