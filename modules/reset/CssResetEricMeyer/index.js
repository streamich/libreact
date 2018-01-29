import createCssResetComponent from '../createCssResetComponent';
export const css = {
    'html,body,div,span,applet,object,iframe,table,caption,tbody,tfoot,thead,tr,th,td,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,dl,dt,dd,ol,ul,li,fieldset,form,label,legend': {
        'vertical-align': 'baseline',
        ff: 'inherit',
        fw: 'inherit',
        fs: 'inherit',
        fz: '100%',
        out: 0,
        pad: 0,
        mar: 0,
        bd: 0,
    },
    ':focus': {
        out: 0,
    },
    body: {
        bg: 'white',
        lh: 1,
        col: 'black',
    },
    'ol, ul': {
        'list-style': 'none',
    },
    table: {
        'border-collapse': 'separate',
        'border-spacing': 0,
    },
    'caption, th, td': {
        fw: 'normal',
        ta: 'left',
    },
    'blockquote:before, blockquote:after, q:before, q:after': {
        content: '""',
    },
    'blockquote, q': {
        quotes: '"" ""',
    },
};
const CssResetEricMeyer = createCssResetComponent(css);
export default CssResetEricMeyer;
