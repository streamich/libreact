import {h} from '../util';
import addClassDecoratorSupport from './addClassDecoratorSupport';

const noWrap = (Comp, propName, props, state) => h(Comp, propName ?
  {[propName]: state, ...props} :
  {...state, ...props}
);

export const divWrapper = (Comp, propName, props, state) =>
  h('div', null, noWrap(Comp, propName, props, state)) as any;

const faccToHoc = (Facc, prop?: string, wrapper = noWrap) => {
  const hoc = (Comp, propName: any = prop, faccProps: object = null) => {
    const isClassDecoratorMethodCall = typeof Comp === 'string';

    if (isClassDecoratorMethodCall) {
      return (Klass) => hoc(Klass, Comp as any, propName as any);
    }

    const Enhanced = (props) =>
      h(Facc, faccProps, (state) => wrapper(Comp, propName, props, state));

    return isClassDecoratorMethodCall ? addClassDecoratorSupport(Enhanced) : Enhanced;
  };

  return hoc;
}

export default faccToHoc;
