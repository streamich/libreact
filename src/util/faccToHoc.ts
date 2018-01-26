import {h} from '../util';
import addClassDecoratorSupport from './addClassDecoratorSupport';

const faccToHoc = (Facc, prop?: string) => {
  const hoc = (Comp, propName: any = prop, faccProps: object = null) => {
    const isClassDecoratorMethodCall = typeof Comp === 'string';

    if (isClassDecoratorMethodCall) {
      return (Klass) => hoc(Klass, Comp as any, propName as any);
    }

    const Enhanced = (props) =>
      h(Facc, faccProps, (state) =>
        h(Comp,
          propName ?
            {[propName]: state, ...props} :
            {...state, ...props}
        )
      );

    return addClassDecoratorSupport(Enhanced);
  };

  return hoc;
}

export default faccToHoc;
