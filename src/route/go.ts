import {isClient} from '../util';

export interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}

export type TGo = (page: string, params?: IGoParams) => void;

const go: TGo = (page: string, {replace, title, state}: IGoParams = {}) => {
  if (isClient) {
    history[replace ? 'replaceState' : 'pushState'](state, title || '', page);
  }
};

export default go;
