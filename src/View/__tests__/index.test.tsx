import {createElement as h} from 'react';
import {render} from 'react-dom';
import renderer from 'react-test-renderer';
import {View} from '..';

describe('<View/>', () => {
  it('renders without crashing', () => {
    render(<View />, document.createElement('div'));
  });

  it('renders nothing by default', () => {
    expect(renderer.create(<View />).toJSON()).toMatchSnapshot();
  });

  it('renders its children', () => {
    const jsx = <View><div>children....</div></View>;

    expect(renderer.create(jsx).toJSON()).toMatchSnapshot();
  });

  it('renders child function as children', () => {
    const jsx = <View>{() => <div>children....</div>}</View>;

    expect(renderer.create(jsx).toJSON()).toMatchSnapshot();
  });
});
