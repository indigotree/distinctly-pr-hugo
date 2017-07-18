'use strict'

import gulp from 'gulp'
import del from 'del'
import runSequence from 'run-sequence'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const isProduction = process.env.NODE_ENV === 'production'

// --

gulp.task('dev', [], () => {
    runSequence('clean', ['sass', 'scripts', 'fonts', 'images'])

    gulp.watch(['static-src/sass/**/*.scss'], () => { runSequence('clean:sass', 'sass') })
    gulp.watch(['static-src/scripts/**/*.js'], () => { runSequence('clean:scripts', 'scripts') })
    gulp.watch(['static-src/images/**/*'], ['images'])
    gulp.watch(['static-src/fonts/**/*'], ['fonts'])
})

gulp.task('production', [], () => {
    runSequence('clean', ['sass', 'scripts', 'fonts', 'images'])
})

// --

gulp.task('clean', () => {
    return del(['static/dist', 'data/manifest.json'], { dot: true })
})

gulp.task('clean:sass', () => {
    return del(['static/dist/*.css'], { dot: true })
})
gulp.task('clean:scripts', () => {
    return del(['static/dist/*.js'], { dot: true })
})

gulp.task('sass', () => {
    return gulp.src([
        'static-src/sass/app.scss',
        'static-src/sass/critical.scss',
    ])
    .pipe($.sass({ precision: 5 }))
    .pipe($.autoprefixer(['ie >= 11', 'last 2 versions']))
    .pipe($.if(isProduction, $.cssnano({ discardUnused: false, minifyFontValues: false })))
    .pipe($.hash())
    .pipe(gulp.dest('static/dist'))
    .pipe($.hash.manifest('manifest.json', true))
    .pipe(gulp.dest('data'))
})

gulp.task('scripts', () => {
    return gulp.src([
        'static-src/js/app.js'
    ])
    .pipe($.babel())
    .pipe($.concat('app.js'))
    .pipe($.if(isProduction, $.uglify()))
    .pipe($.hash())
    .pipe(gulp.dest('static/dist'))
    .pipe($.hash.manifest('manifest.json', true))
    .pipe(gulp.dest('data'))
})

gulp.task('fonts', () => {
    gulp.src([
        'static-src/fonts/*.{woff,woff2}'
    ])
    .pipe(gulp.dest('static/dist'))
})

gulp.task('images', () => {
    gulp.src([
        'static-src/images/*.{png,jpg,jpeg,gif,svg,webp}'
    ])
    .pipe(gulp.dest('static/dist'))
})
