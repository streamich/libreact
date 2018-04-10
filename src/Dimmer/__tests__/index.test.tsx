import {createElement as h} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {Dimmer} from '..';

describe('<Dimmer>', () => {
  it('is a component', () => {
    expect(Dimmer).toBeDefined();
  });

  it('sets position="relative" to parent node', () => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const element = <div>
      foobar
      <Dimmer>overlay</Dimmer>
    </div>;

    render(element, div);

    const root = div.children[0] as HTMLDivElement;

    expect(root.style.position).toBe('relative');

    unmountComponentAtNode(div);
  });

  it('inserts overlay node', () => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    const element = <div>
      foobar
      <Dimmer>overlay</Dimmer>
    </div>;

    render(element, div);

    const root = div.children[0] as HTMLDivElement;

    expect(root.querySelector('div').innerHTML).toBe('overlay');

    unmountComponentAtNode(div);
  });
});
