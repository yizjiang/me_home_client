var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    compass = require('gulp-compass'),
    buffer = require('vinyl-buffer'),
    dir_path = require('path'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    react = require('gulp-react'),
    imagemin = require('gulp-imagemin'),
    source = require('vinyl-source-stream'),
    cleanCSS = require('gulp-clean-css'),
    merge = require('merge-stream'),
    sourcemaps = require('gulp-sourcemaps');


var path = {
  js: ['./assets/js/**/*.js', './assets/js/main.js'],
  sass: ['./assets/sass/**/*.scss', './assets/sass/*.scss'],
  app: {
    js: './assets/js/main.js',
    agent: './assets/js/agent_main.js',
    home_detail: './assets/js/home_detail_main.js',
    set_search: './assets/js/set_search_main.js',
    image: './assets/img/*',
    sass: './assets/sass/main.scss',
    fonts: [
      './assets/fonts/*'
    ]
  },
  vendor: {
   js: './assets/js/vendor.js'
  },
  dist: {
    js: './dist/js',
    css: './dist/css',
    images: './dist/img',
    fonts: './dist/fonts/bootstrap',
    locales: './dist/js/i18n'
  }
};


var map = {
  'jquery': '$',
  'jquery-ui/core': '$',
  'jquery-ui/widget': '$',
  'jquery-ui/autocomplete': '$',
  'lodash': '_',
  'react': 'React',
  'react/addons': 'React',
  'react-bootstrap': 'ReactBootstrap'
};

gulp.task('watch', function(){
  gulp.watch(path.js, ['build', 'agent']);
  gulp.watch(path.vendor.js, ['vendor']);
  gulp.watch(path.sass, ['sass']);
});

gulp.task('images', function() {
  return gulp.src(path.app.image)
    .pipe(imagemin())
    .pipe(gulp.dest(path.dist.images));
});

gulp.task('sass', function() {
  var stream = gulp.src(path.app.sass)
    .pipe(sass({
      includePaths: ['./node_modules/react-select/dist']
    }))
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'));

  return stream
//    .pipe(compass({
//      bundle_exec: true,
//      css: 'tmp/sass',
//      image: 'img',
//      relative: false,
//      generated_images_path: '../dist/img',
//      project: dir_path.join(__dirname, 'assets'),
//      http_path: '/'
//    }))
//    .pipe(rename('bundle.css'));
//  return stream.pipe(gulp.dest('dist/css'));
});

gulp.task('build', function() {
  return browserify(path.app.js)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true })) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('agent', function() {
  return browserify(path.app.agent)
    .transform(babelify)
    .bundle()
    .pipe(source('agent.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('home_detail', function() {
  return browserify(path.app.home_detail)
    .transform(babelify)
    .bundle()
    .pipe(source('home_detail.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('set_search', function() {
  return browserify(path.app.set_search)
    .transform(babelify)
    .bundle()
    .pipe(source('set_search.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('build:production', function() {
  return browserify(path.app.js)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));

})

gulp.task('wechat:agent', function () {
  var sassStream = gulp.src('assets/sass/agent.scss')
    .pipe(sass({}))
    .pipe(sourcemaps.write('./'));

  var cssStream = gulp.src('assets/sass/wechat/agent.css');

  //merge the two streams and concatenate their contents into a single file
  return merge(sassStream, cssStream)
    .pipe(concat('agent.css'))
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('./dist/wechat'));
});

gulp.task('wechat:agent_setting', function () {
  //merge the two streams and concatenate their contents into a single file
  return gulp.src(['assets/sass/wechat/select2.css', 'assets/sass/wechat/weui.css'])
    .pipe(sourcemaps.write('./'))
    .pipe(concat('agent_setting.css'))
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('./dist/wechat'));
});

gulp.task('wechat:agent_setting_js', function () {
  //merge the two streams and concatenate their contents into a single file
  return browserify('./assets/js/wechat/agent_setting.js')
    .transform(babelify)
    .bundle()
    .pipe(source('agent_setting.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/wechat'));
});


gulp.task('wechat:home_detail_js', function () {
  //merge the two streams and concatenate their contents into a single file
  return browserify('./assets/js/wechat/home_detail.js')
    .transform(babelify)
    .bundle()
    .pipe(source('home_detail.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist/wechat'));
});

gulp.task('wechat:home_detail', function () {
  //merge the two streams and concatenate their contents into a single file
  return gulp.src(['assets/sass/wechat/owl.carousel.css',
      'assets/sass/wechat/custom.css',
      'assets/sass/wechat/components.css',
      'assets/sass/wechat/owl.theme.css',
      'assets/sass/wechat/responsee.css'])
    .pipe(sourcemaps.write('./'))
    .pipe(concat('home_detail.css'))
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('./dist/wechat'));
});

gulp.task('wechat:build', ['wechat:agent',
  'wechat:agent_setting', 'wechat:agent_setting_js',
  'wechat:home_detail', 'wechat:home_detail_js']);

gulp.task('agent:production', function(){
   return browserify(path.app.agent)
    .transform(babelify)
    .bundle()
    .pipe(source('agent.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));

})

gulp.task('vendor', function() {
  return browserify(path.vendor.js)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle_vendor.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('fonts:dist', function() {
  return gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});


gulp.task('default', ['watch']);
