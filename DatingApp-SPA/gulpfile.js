'use strict';

const gulp = require('gulp');
const csscomb = require('gulp-csscomb');
const notify = require('gulp-notify');
const prettyHtml = require('gulp-pretty-html');

const srcPath = './src/';

gulp.task('clean-scss', () => {
    return gulp.src([`${srcPath}**/*.scss`, `!${srcPath}scss/utils/mixins/*.scss`])
        .pipe(csscomb())
        .pipe(gulp.dest(`${srcPath}`))
        .pipe(notify(
            {
                sound: false,
                title: '✔️ Success',
                message: 'Task clean-scss done',
                onLast: true
            })
         );
});

gulp.task('clean-html', function () {
    return gulp.src([`${srcPath}**/*.html`, `!${srcPath}index.html`])
        .pipe(prettyHtml({
            indent_size: 2,
            indent_char: ' ',
            unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
            wrap_attributes: 'force'
        }))
        .pipe(gulp.dest(`${srcPath}`))
        .pipe(notify(
            {
                sound: false,
                title: '✔️ Success',
                message: 'Task clean-html done',
                onLast: true
            })
         );
});