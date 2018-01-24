export interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}

export type TGo = (url: string, params: IGoParams) => void;

export const go = (url, {replace, title = '', state}: IGoParams = {}) => {
  history[replace ? 'replaceState' : 'pushState'](state, title || '', url);
};
