import { Provider, Consumer, withContext } from '../context';
import { h } from '../util';
export const Theme = (props) => {
    let { name = 'theme', value, children } = props;
    return h(Provider, { name, value }, children);
};
export const Themed = (props) => {
    let { name = 'theme', children } = props;
    return h(Consumer, { name }, children);
};
export const withTheme = (Comp, name = 'theme') => withContext(Comp, name, { name });
