const glob = require('glob');
const {join, sep, relative} = require('path');
const {copyFileSync} = require('fs');
const mkdirp = require('mkdirp');

const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const DOCS = join(ROOT, 'docs');
const DOCS_BUILD = join(ROOT, 'dist_docs');

const copy = (src, dest) => {
  const targetDir = join(dest, '..');

  mkdirp.sync(targetDir);
  copyFileSync(src, dest);
};

const copyInlineDocsFile = (srcFile) => {
  const steps = srcFile.split(sep);
  const indexDocs = steps.lastIndexOf('__docs__');
  const name = steps[indexDocs - 1];
  const lang = steps[indexDocs + 1];
  const relSteps = steps.slice(indexDocs + 2);
  const targetFile = join(DOCS_BUILD, lang, ...relSteps);

  copy(srcFile, targetFile);
};

const copyToBuildFolder = (srcFile) => {
  const relPath = relative(DOCS, srcFile);
  const targetFile = join(DOCS_BUILD, relPath);

  copy(srcFile, targetFile);
};

const inlineDocFiles = glob.sync(`${SRC}/**/__docs__/**/*.md`);
const docFiles = glob.sync(`${DOCS}/**/**/*`);

inlineDocFiles.forEach(copyInlineDocsFile);
docFiles.forEach(copyToBuildFolder);
