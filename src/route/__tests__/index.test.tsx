import {mount} from 'enzyme';
import {h} from '../../util';
import {Router, Route} from '..';

describe('route', () => {
  describe('<Router>', () => {
    it('is a component', () => {
      expect(Router).toBeInstanceOf(Function);
    });
  });

  describe('<Route>', () => {
    it('is a component', () => {
      expect(Route).toBeInstanceOf(Function);
    });

    it('does basic routing', () => {
      const wrapper = mount(
        <Router route='/foo'>
          <div>
            <Route match='/foo'>
              /foo
            </Route>
            <Route match='/bar'>
              /foo
            </Route>
          </div>
        </Router>
      );

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
