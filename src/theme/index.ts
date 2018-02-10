import {Provider, Consumer, withContext} from '../context';
import {h, THoc} from '../util';
import faccToHocc from '../util/faccToHoc';

export interface IThemeProps {
  name?: string;
  value: object;
}

export const Theme: React.StatelessComponent<IThemeProps> = (props) => {
  let {name = 'theme', value, children} = props;

  return h(Provider as any, {name, value}, children);
};

export interface IThemedProps {
  name?: string;
}

export const Themed: React.StatelessComponent<IThemedProps> = (props) => {
  let {name = 'theme', children} = props;

  return h(Consumer, {name}, children);
};

export const withTheme = faccToHocc(Themed, 'theme');
