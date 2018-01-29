import { h } from '../util';
import addClassDecoratorSupport from './addClassDecoratorSupport';
const noWrap = (Comp, propName, props, state) => h(Comp, propName ?
    { [propName]: state, ...props } :
    { ...state, ...props });
export const divWrapper = (Comp, propName, props, state) => h('div', null, noWrap(Comp, propName, props, state));
const faccToHoc = (Facc, prop, wrapper = noWrap) => {
    const hoc = (Comp, propName = prop, faccProps = null) => {
        const isClassDecoratorMethodCall = typeof Comp === 'string';
        if (isClassDecoratorMethodCall) {
            return (Klass) => hoc(Klass, Comp, propName);
        }
        const Enhanced = (props) => h(Facc, faccProps, (state) => wrapper(Comp, propName, props, state));
        return addClassDecoratorSupport(Enhanced);
    };
    return hoc;
};
export default faccToHoc;
