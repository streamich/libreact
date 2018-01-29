import { createElement as h } from 'react';
export const noop = () => { };
export const idx = (obj, accessor) => {
    try {
        return accessor(obj);
    }
    catch (error) {
        return undefined;
    }
};
export const isClient = typeof window === 'object';
export const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};
export const on = (obj, ...args) => obj.addEventListener(...args);
export const off = (obj, ...args) => obj.removeEventListener(...args);
export const ns = (name) => `@@libreact/${name}`;
const hasSymbols = typeof Symbol !== 'undefined';
export const sym = (name) => {
    return hasSymbols ? Symbol(name) : ns(name);
};
export const isFn = (fn) => typeof fn === 'function';
export { h };
