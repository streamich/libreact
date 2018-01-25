import {h} from '../../util';
import {mount} from 'enzyme';
import {State} from '..';

describe('<State>', () => {
  it('is a component', () => {
    expect(State).toBeInstanceOf(Function);
  });

  it('can set initial state object', () => {
    const wrapper = mount(h(State, {
      init: {
        foo: 'bar',
        baz: 'bazoooka'
      }
    }, (state) => {
      expect(state).toEqual({
        foo: 'bar',
        baz: 'bazoooka'
      });

      expect(() => {
        expect(state).toEqual({
          foo: 'bar',
        });
      }).toThrow();

      return null;
    }));
  });

  it('uses render prop', () => {
    const wrapper = mount(h(State, {
      init: {
        foo: 'bar',
        baz: 'bazoooka'
      },
      render: (state) => {
        expect(state).toEqual({
          foo: 'bar',
          baz: 'bazoooka'
        });

        expect(() => {
          expect(state).toEqual({
            foo: 'bar',
          });
        }).toThrow();

        return null;
      }
    }));
  });

  describe('setState()', () => {
    it('can change state', () => {
      const foos = [];
      let setState;

      const wrapper = mount(<State
        init={{
          foo: 'bar'
        }}
        render={({foo}, set) => {
          foos.push(foo);
          setState = set;

          return null;
        }}
      />);

      setState({
        foo: 'baz'
      });

      expect(foos).toEqual(['bar', 'baz']);
    })
  });
});
