const SOURCE_PATH = 'src/';
const BUILD_PATH = 'build/';

const PATHS = {

  fonts: {
    src: `${SOURCE_PATH}fonts/**/*.{woff,woff2}`,
    output: `${BUILD_PATH}fonts/`,
  },

  images: {
    src: `${SOURCE_PATH}assets/**/*.{png,jpg,svg}`,
    spriteSrc: `${SOURCE_PATH}/assets/svg-sprite/icon-*.svg`,

    dest: `${BUILD_PATH}assets/`,
    spriteFileName: 'svg-sprite.svg',
  },

  html: {
    src: `${SOURCE_PATH}*.html`,
    srcWatch: `${SOURCE_PATH}*.html`,
    dest: BUILD_PATH,
  },

  styles: {
    src: `${SOURCE_PATH}styles/**/*.scss`,
    dest: `${BUILD_PATH}css/`,
    inputFileName: `${SOURCE_PATH}styles/styles.scss`,
    outputFileName: 'styles.min.css',
  }
};

module.exports = { PATHS, BUILD_PATH }