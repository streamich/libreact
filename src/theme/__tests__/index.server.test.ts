/**
 * @jest-environment node
 */

import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Theme, Themed, withTheme} from '../index';

describe('theme', () => {
  describe('<Theme/>', () => {
    it('<Theme/> passes theme to <Themed/>', () => {
      const html = renderToStaticMarkup(h(Theme, {value: {color: 'red'}},
        h('div', {},
          h(Themed, {}, theme => {
            return h('span', {}, theme.color);
          })
        )
      ));

      expect(html).toMatch('<span>red');
    });
  });

  describe('withTheme()', () => {
    it('works', () => {
      const Box = ({theme}) => {
        return h('div', {}, theme.color);
      };
      const BoxThemed = withTheme(Box);
      const html = renderToStaticMarkup(h(Theme, {value: {color: 'red'}}, h(BoxThemed)));

      expect(html).toBe('<div>red</div>');
    });
  });
});
