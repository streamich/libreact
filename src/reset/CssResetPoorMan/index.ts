import createCssResetComponent from '../createCssResetComponent';

export const css = {
  'html,body': {
    pad: 0,
    mar: 0,
  },
  html: {
    fz: '1em',
  },
  body: {
    fz: '100%',
  },
  'a img,a:link img,a:visited img': {
    bd: 0,
  },
};

const CssResetPoorMan = createCssResetComponent(css);

export default CssResetPoorMan;
