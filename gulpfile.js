require('es6-promise').polyfill();
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    server = require("browser-sync").create(),
    imagemin = require("gulp-imagemin"),
    del = require("del"),
    run = require("run-sequence"),
    destImg = "assets/images/cases/fit2u",
    rename = require('gulp-rename');

    gulp.task('styles', function(){
    gulp.src(['assets/sass/fit2u.sass'])
        // gulp.src(['assets/sass/index.sass','assets/sass/med_serdce.sass','assets/sass/fit2u.sass'])
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer({browsers: ['last 2 versions'],
            cascade: false}))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(server.stream());
});

// gulp.task('watch', function() {
//
//   // Watch the sass files
//   gulp.watch('assets/sass/app.sass', ['styles']);
//
// });

gulp.task("serve", ["styles"], function () {
    server.init({
        proxy:'mmm.digital'
    });
    gulp.watch("assets/sass/*.{scss,sass}", ["styles"]);

    gulp.watch("cases/**/*.php").on("change", server.reload);
});
// npm install gulp-imagemin --save-dev
// npm install del --save-dev
// npm install run-sequence --save-dev
gulp.task("images", function () {
    return gulp.src("assets/img/fit2u/*.{png,jpg,gif}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true})
        ]))
        .pipe(gulp.dest("assets/images/cases/fit2u"));
});
gulp.task("clean", function() {
    return del("assets/images/cases/fit2u");
});

gulp.task("minimg", function(fn) {
    run(
        "clean",
        "images",
        fn
    );
});


