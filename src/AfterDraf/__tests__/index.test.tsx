import {createElement as h} from 'react';
import {render} from 'react-dom';
import {AfterDraf} from '..';

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

describe('<AfterDraf>', () => {
  it('default <AfterDraf> exists', () => {
    expect(typeof AfterDraf).toBe('function');
  });

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
});
