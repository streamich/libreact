import { h, isFn } from '../util';
const renderProp = (props, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
        if (typeof props !== 'object') {
            throw new TypeError('renderProp(props, data) first argument must be a prop object.');
        }
        const { children, render } = props;
        if (isFn(children) && isFn(render)) {
            console.warn('Both "render" and "children" are specified for a render-prop component. ' +
                'Children will be used.');
            console.trace();
        }
    }
    const { render, children = render, component, comp = component } = props;
    return isFn(children) ?
        children(...args) :
        comp ?
            h(comp, args[0]) :
            children && (typeof children !== 'object') ?
                h('div', null, children) :
                children instanceof Array ?
                    h('div', null, ...children) :
                    (children || null);
};
export default renderProp;
