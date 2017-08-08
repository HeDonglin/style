/* jshint esversion: 6 */

/*
 * @Author: hedonglin
 * @Date:   2017-08-07 15:32:42
 * @Last Modified by:   hedonglin
 * @Last Modified time: 2017-08-09 00:00:57
 */

// 引入插件
var gulp = require('gulp'); //基础库
var runSequence = require('run-sequence'); //控制task顺序
// var htmlInjector = require('bs-html-injector'); //html注入
// var browserSync = require('browser-sync').create(); //浏览器预览
var stylus = require('gulp-stylus');
var less = require('gulp-less');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var precss = require('precss');
var plumber = require('gulp-plumber');

// //根目录
// var path = false ? 'dist' : 'src';

// //根目录下的文件夹
// var distPath = path === 'dist' ? 'html/' : '';

// // 根目录下的文件夹的文件
// var pathHtmlName = distPath + 'index.html';

gulp.task('nless', function() {
    var src = ['./src/style/**/*.less', '!_*.less'];
    var dst = './src/css';
    return gulp.src(src)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest(dst));
});


gulp.task('nsass', function() {
    var src = ['./src/style/**/*.+(scss|sass)', '!_*.scss'];
    var dst = './src/css';
    return gulp.src(src)
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest(dst));
});


gulp.task('nstylus', function() {
    var src = ['./src/style/**/*.styl', '!_*.styl'];
    var dst = './src/css';
    return gulp.src(src)
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest(dst));

});

gulp.task('npostcss', function() {
    var src = ['./src/style/**/*.css', '!_*.css'];
    var dst = './src/css';
    return gulp.src(src)
        .pipe(plumber())
        .pipe(postcss([precss]))
        .pipe(gulp.dest(dst));
});


// // 无刷新更新实时预览
// gulp.task('preview', function() {

//     browserSync.init({
//         index: pathHtmlName,
//         server: {
//             baseDir: './' + path
//         },
//         // proxy: 'localhost:3000',
//         notify: false,
//         open: true,
//         browser: ['chrome'], //可以配置多个浏览器
//         injectChanges: true, //热替换，注入css
//         files: ['./' + path + '/css/**/*.css'], //监听css文件便于bs-html-injector进行热替换
//         plugins: [{
//             module: 'bs-html-injector',
//             options: {
//                 files: [path + '/**/*.html'] //注入html文件
//             }
//         }]
//     });

//     gulp.watch([path + '/**/*.js']).on('change', browserSync.reload); //专门监控js文件,这个还没法做到热更新，选择了整个页面刷新
// });


gulp.task('nwatch', function() {
    gulp.watch(['src/style/**/*.less', '!_*.less'], ['nless']);
    gulp.watch(['src/style/**/*.+(scss|sass)', '!_*.+(scss|sass)'], ['nsass']);
    gulp.watch(['src/style/**/*.styl', '!_*.styl'], ['nstylus']);
    gulp.watch(['src/style/**/*.css', '!_*.css'], ['npostcss']);
});


// 同步运行
gulp.task('default', function(done) {
    condition = false;
    runSequence(['nless', 'nsass', 'nstylus', 'npostcss',/* 'preview', */'nwatch'], done); //必须按顺序执行，加快速度
});
