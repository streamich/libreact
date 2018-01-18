const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig.json');


gulp.task('build-ts', () => {
    return gulp.src([
        'src/**/*.ts',
        '!src/**/__tests__/**'
    ]).pipe(ts(tsConfig.compilerOptions)).pipe(gulp.dest('lib'));
});
