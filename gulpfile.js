'use strict';

const gulp = require('gulp');

// CONFIG

const { PATHS, BUILD_PATH } = require('./gulp.config')

// SERVICES

const plumber = require("gulp-plumber");
const del = require("del");
const rename = require("gulp-rename");
const sourcemap = require("gulp-sourcemaps");

// HTML

const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

// Css

const css = require("gulp-sass");
const csso = require("gulp-csso");
//const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// IMAGES AND SVG

const svgstore = require("gulp-svgstore");
const imagemin = require("gulp-imagemin");

// SERVER

const browserSync = require('browser-sync').create();

// TASKS

const clean = () => {
  return del(BUILD_PATH);
};

const fonts = () => {
  return gulp.src([PATHS.fonts.src])
  .pipe(gulp.dest(PATHS.fonts.output));
};

const html = () => {
  return gulp.src([PATHS.html.src])
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(BUILD_PATH));
};

const styles = () => {
  return gulp.src([PATHS.styles.inputFileName])
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(css())
    //.pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename(PATHS.styles.outputFileName))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest(PATHS.styles.dest))
    .pipe(browserSync.stream());
};

const server = () => {
  browserSync.init({
    server: BUILD_PATH,
    notify: false,
    open: true,
    cors: true,
    ui: false,
    port: 3000
  });

  gulp.watch(PATHS.styles.src, gulp.series(styles, refresh));
  gulp.watch(PATHS.html.srcWatch, gulp.series(html, refresh));
};

const refresh = (done) => {
  browserSync.reload();
  done();
};

const images = () => (
  gulp.src(PATHS.images.src)
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(gulp.dest(PATHS.images.dest))
);

const sprite = () => {
  return gulp.src([PATHS.images.spriteSrc])
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename(PATHS.images.spriteFileName))
    .pipe(gulp.dest(PATHS.images.dest));
};

const build = gulp.series(clean, fonts, sprite, html, styles, images);
const start = gulp.series(build, server);

exports.build = build;
exports.start = start;

