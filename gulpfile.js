const { dest, series, src, watch } = require('gulp');
const babel = require('rollup-plugin-babel');
const banner = require('gulp-header');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const rollup = require('rollup');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');

const bannerTemplate = [`/*! 
* ${pkg.name} - @version ${pkg.version}

* Copyright (C) 2018 The Trustees of Indiana University
* SPDX-License-Identifier: BSD-3-Clause
*/\n`];

function reload(done) {
  browserSync.reload();
  done();
}

function server() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch('src/**.js', { ignoreInitial: false }, bundleJS);
  watch('dist/*.html', reload);
}

function bundleJS() {
  return rollup.rollup({
    input: './src/index.js',
    plugins: [babel({ runtimeHelpers: true })]
  }).then(bundle => {
    return bundle.write({
      file: './dist/main.js',
      format: 'iife',
      name: 'Component'
    });
  });
}

function bannerJS() {
  return src('./dist/*.js')
    .pipe(banner(bannerTemplate, { pkg: pkg }))
    .pipe(dest('./dist/'))
}

function minifyJS() {
  return src('./dist/main.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('./dist'));
}

exports.build = series(bundleJS, minifyJS, bannerJS);

exports.default = server;