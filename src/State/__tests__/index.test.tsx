import {h} from '../../util';
import {mount} from 'enzyme';
import {State} from '..';

describe('<State>', () => {
  it('is a component', () => {
    expect(State).toBeInstanceOf(Function);
  });

  it('can set initial state object', () => {
    mount(h(State, {
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
    mount(h(State, {
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

      mount(<State
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
    });
  });

  describe('life-cycle methods', () => {
    it('fires onMount() with right arguments', () => {
      const onMount = jest.fn();
      const onUnmount = jest.fn();

      mount(h(State, {
        init: {
          foo: 'bar'
        },
        onMount,
        onUnmount
      }));

      expect(onMount).toHaveBeenCalledTimes(1);
      expect(onMount).toHaveBeenCalledWith({
        foo: 'bar'
      });

      expect(onUnmount).not.toHaveBeenCalled();
    });

    it('fires onMount() with right arguments', () => {
      const onUnmount = jest.fn();

      const wrapper = mount(h(State, {
        init: {
          foo: 'bar'
        },
        onUnmount
      }));

      wrapper.unmount();

      expect(onUnmount).toHaveBeenCalledTimes(1);
      expect(onUnmount).toHaveBeenCalledWith({
        foo: 'bar'
      });
    });
  });
});
