const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('../tsconfig');
const path = require('path');

gulp.task('build-ts', () => {
    return gulp.src([
      '../src/**/*.ts',
      '!../src/**/__tests__/**',
      '!../src/**/__story__/**',
      '!../src/**/__docs__/**',
      '!../src/**/story.ts',
      '!../src/**/story.tsx'
    ]).pipe(ts({
      ...tsConfig.compilerOptions,
      target: 'es5',
      module: 'commonjs'
    })).pipe(gulp.dest('../lib'));
});

gulp.task('build-modules', () => {
  return gulp.src([
    '../src/**/*.ts',
    '!../src/**/__tests__/**',
    '!../src/**/__story__/**',
    '!../src/**/__docs__/**',
    '!../src/**/story.ts',
    '!../src/**/story.tsx'
  ]).pipe(ts({
    ...tsConfig.compilerOptions,
    target: 'ESNext',
    module: 'ESNext'
  })).pipe(gulp.dest('../modules'));
});
