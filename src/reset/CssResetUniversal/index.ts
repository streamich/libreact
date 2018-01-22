import createCssResetComponent from '../createCssResetComponent';

export const css = {
  '*': {
    'vertical-align': 'baseline',
    fw: 'inherit',
    ff: 'inherit',
    fs: 'inherit',
    fz: '100%',
    bd: '0 none',
    out: 0,
    pad: 0,
    mar: 0,
  },
};

const CssResetUniversal = createCssResetComponent(css);

export default CssResetUniversal;
