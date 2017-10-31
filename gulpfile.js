require('es6-promise').polyfill();
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');
gulp.task('styles', function(){
    gulp.src(['assets/sass/index.sass','assets/sass/med_serdce.sass','assets/sass/fit2u.sass'])
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer({browsers: ['last 2 versions'],
            cascade: false}))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {

  // Watch the sass files
  gulp.watch('assets/sass/app.sass', ['styles']);

});
