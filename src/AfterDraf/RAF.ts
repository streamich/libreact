const RAF = typeof window === 'object' ? requestAnimationFrame : () => {};

export default RAF as (callback: (...args) => any) => any;
