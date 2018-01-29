export const go = (url, { replace, title = '', state } = {}) => {
    history[replace ? 'replaceState' : 'pushState'](state, title || '', url);
};
