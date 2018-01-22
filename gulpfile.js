const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./tsconfig');

gulp.task('build-ts', () => {
    return gulp.src([
      'src/**/*.ts',
      '!src/**/__tests__/**',
      '!src/**/__story__/**',
      '!src/**/story.ts',
      '!src/**/story.tsx'
    ]).pipe(ts(tsConfig.compilerOptions)).pipe(gulp.dest('lib'));
});
