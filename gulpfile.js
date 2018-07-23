'use strict';

var gulp          = require('gulp');
var util          = require('gulp-util');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');

// run webpack
gulp.task('webpack', function() {
    webpack(webpackConfig, function(err, stats) {
        if (err) throw new util.PluginError('webpack', err);
        util.log('[webpack]', stats.toString({}));
    });
});

gulp.task('default', ['webpack']);