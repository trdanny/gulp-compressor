const gulp = require('gulp');
const image = require('gulp-image');
const plumber = require('gulp-plumber')
const debug = require('gulp-debug');
const notify = require('gulp-notify')

const INPUT_path_to_your_images = 'src/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
const OUTPUT_path = 'build/img/';

var onError = function(err) {
  notify.onError({
      title: "Error in " + err.plugin,
      message: err.toString(),
  })(err);
};

gulp.task('image', async () => {
  await new Promise((resolve, reject) => {
    gulp.src(INPUT_path_to_your_images)
      .pipe(debug({title: 'Building Image: ', showFiles: true}))
      .pipe(plumber({errorHandler: onError}))
      .pipe(image({
        pngquant: ['--speed=4','--force',256,'--quality=20-50'],
        jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 50],
        mozjpeg: ['-optimize', '-progressive', '-quality', '60'],
        gifsicle: ['--optimize'],
        svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
      }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(OUTPUT_path))
      .on("end", resolve);;
  });
});