import {h} from '../util';
import addClassDecoratorSupport from './addClassDecoratorSupport';

const faccToHoc = (Facc, prop?: string) =>
  (Comp, propName: string = prop) => {
    const Enhanced = (props) =>
      h(Facc, null, (state) =>
        h(Comp,
          propName ?
            {[propName]: state, ...props} :
            {...state, ...props}
        )
      );

    return addClassDecoratorSupport(Enhanced);
  };

export default faccToHoc;
