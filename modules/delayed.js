import { lazy } from './lazy';
const wait = (loader, delay) => new Promise((resolve) => setTimeout(() => resolve(loader()), delay));
const RIC = window.requestIdleCallback || ((callback) => setTimeout(callback, 300));
const PRIC = (loader) => new Promise((resolve) => RIC(() => resolve(loader())));
const RAF = requestAnimationFrame;
const PRAF = (value) => new Promise((resolve) => RAF(() => resolve(value)));
export const delayed = (params) => {
    let { delay, draf, idle } = params;
    if (delay) {
        const loader = params.loader;
        params.loader = () => wait(loader, delay);
    }
    if (idle) {
        const loader = params.loader;
        params.loader = () => PRIC(loader);
    }
    if (draf) {
        const loader = params.loader;
        params.loader = () => loader().then(PRAF).then(PRAF);
    }
    return lazy(params);
};
