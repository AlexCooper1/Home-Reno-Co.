//const gulp = require('gulp');

const { src, dest, watch, series, parallel } = require('gulp');

//import Gulp plugins needed for this project
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
// const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');
const htmlMin = require('gulp-htmlmin');

//folders
const folders = {};
folders.dev = 'dev';
folders.dist = 'dist';
folders.sass = 'scss';
folders.styles = 'styles';
folders.scripts = 'scripts';
folders.images = 'images';
folders.fonts = 'fonts';

//files
const files = {};
files.html = `**/*.html`;
files.sass = `${folders.sass}/**/*.scss`;
files.css = `${folders.styles}/**/*.css`;
files.js = `${folders.scripts}/**/*.js`;
files.images = `${folders.images}/**/*.+(png|jpg|gif|svg)`;
files.fonts = `${folders.fonts}/**/*`;


//Sass Task
function sassTask() {
    return src(`${folders.dev}/${files.sass}`)
        //initialize sourcemaps in dev mode
        .pipe(sourcemaps.init())
        //compile scss to css in dev mode
        //handle errors with logging
        .pipe(sass().on('error', sass.logError))
        //writing the sourcemaps file in dev mode
        .pipe(sourcemaps.write('.'))
        //Put CSS files in dev styles folder in dev mode
        .pipe(dest(`${folders.dev}/${folders.styles}`))
        //injects new CSS to the browser in dev mode
        .pipe(browserSync.stream());
}



//HTML Task 
//compress the HTML files
//copy the compressed HTML files to the dist folder
function htmlTask() {
    return src(`${folders.dev}/${files.html}`)
        //compress the HTML files
        .pipe(htmlMin({ collapseWhitespace: true }))
        //copy compressed HTML files to the dist folder
        .pipe(dest(`${folders.dist}`));
}

//Watch task 
// watch for changes in the sass, JS, and HTML directories
function watchTask() {
    browserSync.init({
        server: {
            baseDir: folders.dev
        }
    });
    //watching the sass directory in dev mode
    watch(`${folders.dev}/${files.sass}`, sassTask);
    //watch the JS directory in dev
    watch(`${folders.dev}/${files.js}`).on('change', browserSync.reload);
    watch(`${folders.dev}/${files.html}`).on('change', browserSync.reload);
}

//CSS Task
function cssTask() {
    return src(`${folders.dev}/${files.css}`)
        //move all css files from dev to dist styles folder
        .pipe(dest(`${folders.dist}/${folders.styles}`));
}

//JS Task
function jsTask() {
    return src(`${folders.dev}/${files.js}`)
        //move all JS files from dev to dist scripts folder
        .pipe(dest(`${folders.dist}/${folders.scripts}`));
}

//fonts task
function fontsTask() {
    return src(`${folders.dev}/${files.fonts}`)
        //move all fonts to the dist fonts folder from dev
        .pipe(dest(`${folders.dist}/${folders.fonts}`));
}

//Default Task
//command: gulp
//development mode
exports.default = series(parallel(sassTask, jsTask), watchTask);

//Build Task
//command: gulp build
//production mode
exports.build = series(sassTask, cssTask, parallel(htmlTask, jsTask, fontsTask))
