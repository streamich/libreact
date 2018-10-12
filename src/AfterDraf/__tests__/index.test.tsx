import {createElement as h} from 'react';
import {render} from 'react-dom';
import {AfterDraf} from '..';
import RAF from '../RAF';

jest.mock('../RAF');

const RAFMock = RAF as any as jest.SpyInstance;
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

beforeEach(() => {
  RAFMock.mockClear();
  RAFMock.mockImplementation(cb => setImmediate(cb, 17));
});

describe('<AfterDraf>', () => {
  it('default <AfterDraf> exists', () => {
    expect(typeof AfterDraf).toBe('function');
  });

  // TODO: enble this test later
  /*
  it('waits for DRAF on client before rendering', async () => {
    const div = document.createElement('div');

    document.body.appendChild(div);
    render(<AfterDraf>
        <div>foobar</div>
      </AfterDraf>,
    div);

    expect(div.innerHTML).toBe('');

    await sleep(100);

    expect(div.innerHTML).toBe('<div>foobar</div>');

    document.body.removeChild(div);
  });
  */
});
