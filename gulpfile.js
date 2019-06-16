// Plex Theme Build Automation

// Imports & configurations

// Environment variables
const dotenv = require('dotenv').config(),
    // Automation engine
    gulp = require('gulp'),
    // CSS preprocessor
    sass = require('gulp-sass'),
    stylelint = require('gulp-stylelint'),
    // Inline and optimize svgs
    cssSvg = require('gulp-css-svg'),
    // PostCSS (runs Autoprefixer)
    postcss = require('gulp-postcss'),
    // BrowserSync
    browserSync = require('browser-sync').create(),
    browserSyncConfig = {
        proxy: process.env.ORGANIZR_URL,
        files: 'css/Plex.css',
        serveStatic: ['css'],
        snippetOptions: {
            rule: {
                match: /<link id="theme" href=".*" rel="stylesheet"\s*\/?>/is,
                fn: snippet =>
                    `<link href="/Plex.css" rel="stylesheet" type="text/css" />${snippet}`
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
        console.error(
            "Set the ORGANIZR_URL environment variable in .env to your Organizr instance's URL to test with Browsersync."
        );
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
    comment = `Plex Theme for Organizr
        Version <%= pkg.version %>
        <%= pkg.license %> License
        <%= pkg.homepage %>`;

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
        .pipe(stylelint({ fix: true }))
        .pipe(sass({ errLogToConsole: true }).on('error', sass.logError))
        .pipe(cssSvg({ baseDir: '../' }))
        .pipe(postcss())
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
gulp.task('serve', () =>
    !process.env.ORGANIZR_URL
        ? browserSyncError
        : browserSync.init(browserSyncConfig)
);

gulp.task('build-watch-serve', gulp.parallel('build-watch', 'serve'));
