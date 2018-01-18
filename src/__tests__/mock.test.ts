import {mock} from '../mock';
import {Component, createElement as h} from 'react';
import {shallow, mount} from 'enzyme';

describe('mock()', () => {
    it('is a function', () => {
        expect(typeof mock).toBe('function');
    });

    it('return a React component', () => {
        const Mock = mock();

        expect(Mock.prototype).toBeInstanceOf(Component);
    });

    it('renders nothing by default', () => {
        const Mock = mock();
        const wrapper = shallow(h(Mock));

        expect(wrapper.html()).toBe(null);
    });
});
