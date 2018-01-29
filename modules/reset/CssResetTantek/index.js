import createCssResetComponent from '../createCssResetComponent';
export const css = {
    ':link,:visited': {
        td: 'none',
    },
    'ul,ol': {
        'list-style': 'none',
    },
    'h1,h2,h3,h4,h5,h6,pre,code,p': {
        fz: '1em',
    },
    'ul,ol,dl,li,dt,dd,h1,h2,h3,h4,h5,h6,pre,form,body,html,p,blockquote,fieldset,input': {
        pad: 0,
        mar: 0,
    },
    'a img,:link img,:visited img': {
        bd: 'none',
    },
    address: {
        fs: 'normal',
    },
};
const CssResetTantek = createCssResetComponent(css);
export default CssResetTantek;
