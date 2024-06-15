const { src, dest, watch, parallel} = require("gulp")

// css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');//asegurarse q ande en cualquier navegador
const cssnano = require('cssnano');//comprimir css
const postcss = require('gulp-postcss');

// imagenes
const avif = require('gulp-avif')
const cache = require('gulp-cache')
const webp= require('gulp-webp');
const imagemin = require("gulp-imagemin");
const sourcemaps = require('gulp-sourcemaps');

//javascript
const terser = require('gulp-terser-js');

function css(done){
    src('src/scss/**/*.scss')//identificar el archivo de sass
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe( sass() )//compilarlo
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))//almacenarla en el disco duro
    done();//callback q avisa a gulp cuando se llega al final de la ejecucion
}


function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionwebp(done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}


function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}
function dev(done){
    watch('src/scss/**/*.scss',css)     //con el **/*.scss veo todos los cambios q hay con archivos de esa extension
    watch('src/js/**/*.js',css)     //con el **/*.scss veo todos los cambios q hay con archivos de esa extension
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.default = parallel(imagenes,versionwebp,javascript,dev);
