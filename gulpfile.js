
'use strict';

var gulp = require('gulp');
//var concat = require('gulp-concat');
//var Filter = require('gulp-filter');
//var plugins = require('gulp-load-plugins')();
//var rimraf = require('rimraf');
var browserSync = require('browser-sync').create();
//var runSequence = require('run-sequence');
//var karma = require('karma').server;
//var gulp_watch = require('gulp-watch');
var gulp_shell = require('gulp-shell');
// gulp-remember
var cache = require('gulp-cached');

//var stylus = require('gulp-stylus');
// include, if you want to work with sourcemaps
//var sourcemaps = require('gulp-sourcemaps');

//gulp.task('stylus', function () {
//
//  var filter = Filter(['**/*.styl'], {restore: true});
//
//  gulp.src(['./public/style/css_libs/**/*.css', './public/style/**/*.styl'])
//    .pipe(filter)
//    .pipe(stylus())
//    .pipe(filter.restore)
//    .pipe(concat('styles.css'))
//    .pipe(gulp.dest('./public/css'))
//  //  .pipe(browserSync.stream())
//  //  .on('end', function () {
//  //    done();
//  //  })
//    ;
//});


//gulp.task('sourcemaps-external', function () {
//  gulp.src('./css/sourcemaps-external.styl')
//    .pipe(sourcemaps.init())
//    .pipe(stylus())
//    .pipe(sourcemaps.write('.'))
//    .pipe(gulp.dest('./css/build'));
//});

//gulp.task('lint', function(){
//  return gulp.src('files/*.js')
//    .pipe(cache('linting'))
//    .pipe(jshint())
//    .pipe(jshint.reporter())
//});
//
//gulp.task('watch', function(){
//  gulp.watch('files/*.js', ['lint']);
//});
//
//gulp.task('default', ['watch', 'lint']);

//var _if = require('gulp-if');
//
//var env = process.env.NODE_ENV || 'development';
//var production = env === 'production';
//
//gulp.task('less', function () {
//  gulp.src('less/*.less')
//      .pipe(_if(!production, plumber()))
//      .pipe(less())
//});
//
//gulp.task('less', function(done) {
//  gulp.src('less/*.less')
//    .pipe(less().on('error', function(error) {
//      // у нас ошибка
//      done(error);
//    }))
//    .pipe(gulp.dest('app/css'))
//    .on('end', function() {
//      // у нас все закончилось успешно
//      done();
//    });
//});

 // BrowserSync Server
gulp.task('browser-sync', function() {
  browserSync.init({
    files: [
      './src/**/*.css',
      './src/**/*.coffee',
      './src/**/*.jade',
      './src/**/*.html'
    ],
//    middleware: function (req, res, next) {
//      console.log(req.originalUrl);
//      next();
//    },
    notify: false,
    server: {
      baseDir: './src',
      routes: {
        "/jspm_packages": "./jspm_packages",
        "/config.js": "./config.js"
      }
    },
    port: 3500,
    browser: [],
    tunnel: false
  });
});

//gulp.task('js', function() {
//  return gulp.src('src/**/*.js')
//    .pipe(cache('js'))  //Process only changed files
//    .pipe(gulp.dest('build/'));
//});

gulp.task('serve', [ 'browser-sync'/*, 'stylus' */ ], function (cb) {

//  plugins.watch(
//    './src/sass/**/*.scss',
//    {
//      name: 'SASS'
//    },
//    function() {
//      gulp.start('sass');
//    }
//  );
//
//  gulp_watch(
//    './public/style/**/*.styl',
//    {
//      name: 'styl'
//    },
//    function() {
//      gulp.start('stylus');
//    }
//  );

//  browserSync.watch('./style/**/*.styl', [ 'stylus' ]);
//  browserSync.watch('./**/*.coffee')
//    .on('change', browserSync.reload)
//  ;

//  var watcher = gulp.watch('./**/*.coffee');
//  watcher.on('change', function(event) {
//    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//  });
//
//  gulp_watch('./style/**/*.styl', {name: 'styl'}, function () {
//    gulp.start('stylus');
//  });

});

// Bundle with jspm
// { sourceMaps: false, minify: true, mangle: false}
//gulp.task('bundle', [], gulp_shell.task([
//  'jspm bundle-sfx main.coffee! dist/js/main.js'
//]));

//gulp.task('jspm', function() {
//  var builder = new jspm.Builder();
//  var System = require('systemjs');

//  // extends default System
//  function addProductionVersionOfEmber(System) {
//    System._extensions.push(customExtensionName);
//    var systemNormalize = System.normalize;
//
//    // extends the normalize function
//    System.normalize = function(name, parentName) {
//
//      // if module name is ember use ember/ember.prod instead
//      if (name === 'ember') name = 'ember/ember.prod';
//      return systemNormalize.call(this, name, parentName);
//    }
//  }
//
//  addProductionVersionOfEmber(System);
//
//  builder.reset(System);
//
//  return builder.loadConfig('./app/config.js') // jspm's config js
//    .then(function() {
//      builder.config({ // additional config
//        baseURL: 'app',
//        lib: 'app'
//      });
//
//      // building a self executing build
//      return builder.buildSFX('main', 'dist/app.min.js',
//      { sourceMaps: false, minify: true, mangle: false});
//    });
//});

gulp.task('bundle', [], function (cb) {
//  var Builder = require('systemjs-builder');
//  var builder = new Builder({ baseURL: "public" });
  var jspm = require('jspm');

  jspm.bundleSFX('main.coffee!', 'dist/js/main.js', {
    sourceMaps: false,
    minify: true,
    mangle: true
  }).then(function () {
    return cb();
  });

//  builder.loadConfig('./config.js').then(function() {
//    builder.buildSFX('main.coffee!', 'dist/js/main.js', {
//      sourceMaps: false,
//      minify: true,
//      mangle: false
//    })
//    .then(function () {
//      console.log('sucess bundle');
//      return cb();
//    })
//    .catch(function (ex) {
//      console.log(ex);
//      cb(new Error(ex));
//    });
//  });
});
// { sourceMaps: false, minify: true, mangle: false}
//gulp.task('bundle', [], gulp_shell.task([
//  'jspm bundle-sfx main.coffee! dist/js/main.js'
//]));

//var zopfli = require("gulp-zopfli");

gulp.task("compress", ['bundle'/*, 'css'*/], function() {
  gulp.src('./dist/js/main.js')
//    .pipe(zopfli())
    .pipe(gulp.dest('./dist/js'));
//  gulp.src('./dist/css/common.css')
//    .pipe(zopfli())
//    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', ['bundle'], function (cb) {

});

gulp.task('css', [], function (cb) {
//  gulp.src('./src/css/common.css')
//    .pipe(gulp.dest('./dist/css'))
//    .on('end', function () {
//      cb();
//    })
//  ;
});

gulp.task('build', ['compress']);


gulp.task('default', ['serve']);


//var gulp = require('gulp'),
//    imagemin = require('gulp-imagemin'),
//    pngquant = require('imagemin-pngquant'),
//    jpegtran = require('imagemin-jpegtran'),
//    gifsicle = require('imagemin-gifsicle'),
//    optipng = require('imagemin-optipng');
//
//gulp.task('images', ['jekyll'], function () {
//    return gulp.src('images/**')
//        .pipe(imagemin({
//            progressive: true,
//            svgoPlugins: [{removeViewBox: false}],
//            use: [pngquant(), jpegtran(), optipng(), gifsicle()]
//        }))
//        .pipe(gulp.dest('_site/images'));
//});

//var gulp = require('gulp'),
//    request = require('request');
//
//gulp.task('seo', ['build'], function(cb) {
//    request('http://www.google.com/webmasters/tools/ping?sitemap={URL TO YOUR SITEMAP.XML}');
//    request('http://www.bing.com/webmaster/ping.aspx?siteMap={URL TO YOUR SITEMAP.XML}');
//    cb();
//});

//var gulp         = require('gulp');
//var sass         = require('gulp-sass');
//var sourcemaps   = require('gulp-sourcemaps');
//var autoprefixer = require('gulp-autoprefixer');
//
//gulp.task('styles', function() {
//  gulp.src('styles/*.scss')
//    .pipe(sourcemaps.init())
//      .pipe(sass({ style: 'expanded' }))
//      .pipe(autoprefixer('last 2 version'))
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest('styles'))
//});
//
//gulp.task('watch', function(){
//  gulp.watch('./styles/**/*.scss', ['styles']);
//});
//
//gulp.task('build', ['styles']);
//
//gulp.task('default', ['build', 'watch']);

