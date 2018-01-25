import {isFn} from '../util';

const renderProp = (props, ...args) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof props !== 'object') {
      throw new TypeError('renderProp(props, data) first argument must be a prop object.');
    }

    const {children, render} = props;

    if (isFn(children) && isFn(render)) {
      console.warn(
        'Both "render" and "children" are specified for a render-prop component. ' +
        'Children will be used.'
      );
      console.trace();
    }
  }

  const {children, render} = props;

  return isFn(children) ?
    children(...args) :
    isFn(render) ?
      render(...args) :
      (children || null);
};

export default renderProp;
