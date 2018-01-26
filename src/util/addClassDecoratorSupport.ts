import isStatelessComponent from './isStatelessComponent';
import wrapInStatefulComponent from './wrapInStatefulComponent';

const addClassDecoratorSupport = (Comp) => {
  return isStatelessComponent(Comp) ?
    Comp :
    wrapInStatefulComponent(Comp);
};

export default addClassDecoratorSupport;
