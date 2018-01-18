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

    it('renders loading placeholder', () => {
        const Mock = mock({
            loading: h('span', {}, 'Loading...')
        });
        const wrapper = shallow(h(Mock));

        expect(wrapper.html()).toBe('<span>Loading...</span>');
    });

    it('provides .implement() method', () => {
        const Mock = mock();

        expect(typeof Mock.implement).toBe('function');
    });

    it('can implement mock', () => {
        const Mock = mock();
        const Implementation = () => h('div', {}, 'IMPLEMENTATION');
        const wrapper = mount(h(Mock));

        expect(wrapper.html()).toBe(null);

        Mock.implement(Implementation);

        expect(wrapper.html()).toBe('<div>IMPLEMENTATION</div>');
    });
});
