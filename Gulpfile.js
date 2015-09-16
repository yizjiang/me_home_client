var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    compass = require('gulp-compass'),
    dir_path = require('path'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    transform = require('vinyl-transform'),
    react = require('gulp-react'),
    imagemin = require('gulp-imagemin'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    reactify = require('reactify');


var path = {
  js: ['./assets/js/**/*.js', './assets/js/main.js'],
  sass: ['./assets/sass/**/*.scss', './assets/sass/*.scss'],
  app: {
    js: './assets/js/main.js',
    agent: './assets/js/agent_main.js',
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
    .pipe(compass({
      bundle_exec: true,
      css: 'tmp/sass',
      image: 'img',
      relative: false,
      generated_images_path: '../dist/img',
      project: dir_path.join(__dirname, 'assets'),
      http_path: '/'
    }))
    .pipe(rename('bundle.css'));
  return stream.pipe(gulp.dest('dist/css'));
});

gulp.task('build', function() {
  return browserify(path.app.js)
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('agent', function() {
  return browserify(path.app.agent)
    .transform(babelify)
    .bundle()
    .pipe(source('agent.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('vendor', function() {
  return browserify(path.vendor.js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle_vendor.js'))
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('fonts:dist', function() {
  return gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});


gulp.task('default', ['watch']);
