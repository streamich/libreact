import {createElement as h} from 'react';
import {mount} from 'enzyme';
import {LocalStorage} from '..';
import {get, set, del} from '../local-storage';

jest.mock('../local-storage');

const getSpy = get as any as jest.SpyInstance;
const setSpy = set as any as jest.SpyInstance;
const delSpy = del as any as jest.SpyInstance;
const sleep = t => new Promise(r => setTimeout(r, t));

describe('<LocalStorage>', () => {
  beforeEach(() => {
    getSpy.mockClear();
    setSpy.mockClear();
    delSpy.mockClear();
  });

  it('is a component', () => {
    expect(LocalStorage).toBeInstanceOf(Function);
  });

  it('puts value to localStorage', async () => {
    mount(<LocalStorage name='foo' data='bar' debounce={10} />);
    await sleep(20);

    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith('foo', '"bar"');
  });

  it('serializes an object', async () => {
    mount(<LocalStorage name='foo' data={{key: [1, 2, 3]}} debounce={10} />);
    await sleep(20);

    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith('foo', '{"key":[1,2,3]}');
  });

  it('updates on re-render', async () => {
    const wrapper = mount(<LocalStorage name='foo' data={1} debounce={10} />);

    wrapper.setProps({
      name: 'foo',
      data: 2
    });

    wrapper.update();
    await sleep(20);

    const lastSetArgs = setSpy.mock.calls[setSpy.mock.calls.length - 1];

    expect(lastSetArgs).toEqual(['foo', '2']);
  });

  it('does NOT set initial data when onMount prop is set', async () => {
    mount(<LocalStorage name='foo' data={1} debounce={10} onMount={() => {}} />);
    await sleep(20);

    expect(set).not.toHaveBeenCalled();
  });
});
