import { series, src, dest } from "gulp";
import { task } from 'gulp-shell';
import * as ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json');

export const install = () => {
  return task(['npm install'])();
};

export const compile = () => {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'));
};

export const test = () => {
  return task(['npm run test'])();
};

export const start = () => {
  return task(['npm run start'])();
};

export default series(install, test, compile, start);
