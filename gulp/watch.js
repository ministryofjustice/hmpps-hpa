'use strict';

let gulp = require('gulp');

gulp.task('watch-assets', function () {
    return gulp.watch(['./assets/images/**', './assets/javascripts/**'],
        {cwd: './'}, ['lint-client',])
});

gulp.task('watch-tests', function () {
    return gulp.watch(['./test/**/*.js'], {cwd: './'}, ['test'])
});

gulp.task('watch-client-js', () => gulp.watch([
    './assets/javascripts/search/**',
    './assets/javascripts/moreless/**',
    './assets/javascripts/admin/**',
    './assets/javascripts/tabs/**',
    './assets/javascripts/validation/**'
], {cwd: './'}, ['webpack']));
