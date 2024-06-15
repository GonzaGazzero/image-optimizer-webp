import gulp from 'gulp';

async function imgMinifyToWebp() { // función asíncrona
  const imagemin = (await import('gulp-imagemin')).default; // Importación dinámica
  const webp = (await import('gulp-webp')).default;        // Importación dinámica

  return gulp.src('img/*')
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(webp())
    .pipe(gulp.dest('img-webp'));
}

export default imgMinifyToWebp;
