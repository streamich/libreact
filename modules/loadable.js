import { mock } from './mock';
import { noop } from './util';
export const loadable = (params) => {
    const { loader } = params;
    const Mock = mock(params);
    Mock.load = () => {
        loader().then((Implementation) => {
            Mock.implement(Implementation.default || Implementation);
        }, console.error);
        Mock.load = noop;
    };
    return Mock;
};
