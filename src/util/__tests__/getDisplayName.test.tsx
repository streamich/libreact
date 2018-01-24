import {Component} from 'react';
import {h} from '../../util';
import getDisplayName from '../getDisplayName';

describe('getDisplayName()', () => {
  it('is a function', () => {
    expect(getDisplayName).toBeInstanceOf(Function);
  });

  it('stateless component', () => {
    const Comp = () => null;

    expect(getDisplayName(Comp)).toBe('Comp');
  });

  it('stateless component JSX', () => {
    const Comp = () => null;

    expect(getDisplayName(<Comp />)).toBe('<Comp>');
  });

  it('stateless named component', () => {
    const Comp = function MyComp () {};

    expect(getDisplayName(Comp)).toBe('MyComp');
  });

  it('stateless named component JSX', () => {
    const Comp = function MyComp () {
      return null;
    };

    expect(getDisplayName(<Comp />)).toBe('<MyComp>');
  });

  it('class Component', () => {
    const Comp = class MyComp extends Component {
      render () {
        return null;
      }
    }

    expect(getDisplayName(Comp)).toBe('MyComp');
  });

  it('class Component JSX', () => {
    const Comp = class MyComp extends Component {
      render () {
        return null;
      }
    }

    expect(getDisplayName(<Comp />)).toBe('<MyComp>');
  });

  it('class Component renamed', () => {
    const Comp = class MyComp extends Component {
      static displayName = 'Foobar';

      render () {
        return null;
      }
    }

    expect(getDisplayName(Comp)).toBe('Foobar');
  });

  it('class Component renamed JSX', () => {
    const Comp = class MyComp extends Component {
      static displayName = 'Foobar';

      render () {
        return null;
      }
    }

    expect(getDisplayName(<Comp />)).toBe('<Foobar>');
  });

  it('unknown', () => {
    expect(getDisplayName(123)).toBe('Unknown');
  });
});
