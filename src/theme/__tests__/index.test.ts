import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {Theme, Themed, withTheme} from '../index';

describe('themestyler', () => {
  describe('<Theme/>', () => {
    it('<Theme/> passes theme to <Themed/>', () => {
      const wrapper = mount(h(Theme, {value: {color: 'red'}},
        h('div', {},
          h(Themed, {}, theme => {
            return h('span', {}, theme.color);
          })
        )
      ));
      expect(wrapper.find('span').props().children).toBe('red');
    });

    xit('merges multiple themes together', () => {});
  });

  describe('withTheme()', () => {
    it('works', () => {
      const Box = ({theme}) => {
        return h('div', {}, theme.color);
      };
      const BoxThemed = withTheme(Box);
      const wrapper = mount(h(Theme, {value: {color: 'red'}}, h(BoxThemed)));

      console.log(wrapper.html());
    });
  });
});