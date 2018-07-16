var gulp = require('gulp'),
    path = require('path'),
    gulputil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    eslint = require('gulp-eslint');

const webpack = require('webpack-stream');
const SRC_DIR = path.resolve(__dirname, 'public/src');
const WEBPACK_CONFIG = require('./webpack.config');
const clean = require('gulp-clean');
const fixture = require('./fixtures');
const data_importer = require('data_importer');
const logger = require('logger');

// ===========================
//
//          Settings
//
// ===========================
const watchFiles = {
        serverViews: ['app/views/**/*.*'],
        serverJS: ['gulpfile.js', 'app.js', 'config/**/*.js', 'app/**/*.js' ],
        clientViews: ['public/src/**/*.html'],
        clientJS: ['public/src/**/*.js','public/src/**/*.jsx', 'webpack.config.js']
    };


// ===========================
//
//       Error Handler
//
// ===========================
function errorHandler( error ) {
    if( typeof error === 'object' && error.message ) {
        error = error.message;
    }
    logger.error( chalk.red( '[gulp] ' ) + chalk.red( error ) );
}

// ===========================
//
//       tasks
//
// ===========================

gulp.task('default',  ['compile', 'watch', 'appmon']);

gulp.task('hint:server', function(p){
    return gulp.src(watchFiles.serverJS)
        .pipe(eslint({quiet:true}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('hint:client', () => {
    return gulp.src(watchFiles.clientJS)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('compile',['clean'], function(){
    return gulp.src(path.join(SRC_DIR, 'index.js'))
        .pipe(webpack(WEBPACK_CONFIG))
        .pipe(gulp.dest('public/dist/'));
});

gulp.task('clean', function() {
    return gulp.src('public/dist/*', {read: false})
		.pipe(clean());
});
 
gulp.task('watch', function(){ 
    gulp.watch(watchFiles.serverJS, ['hint:server']);
    gulp.watch(watchFiles.clientJS, ['hint:client', 'compile']);
}); 

gulp.task('db:load', (done)=>{
    logger.info('start db:load');
    return fixture.loadData((err, files)=>{
        if(err){
            logger.error(err);
            return;
        }
        logger.info(files);
    });
});

gulp.task('db:data-import', ()=>{
    logger.info('start data-import task');
});

gulp.task('appmon', function () {
    nodemon({
        script: 'app.js', 
        watch: watchFiles.serverJS,
        env: { 'NODE_ENV': 'development' }
    });
});