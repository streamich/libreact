import {createElement as h} from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {WidthQuery} from '..';
import {View} from '../../View';

describe('<ViewQuery/>', () => {
  it('renders first matching view', () => {
    const jsx = <WidthQuery width={100}>
      <View maxWidth={123}>view 1</View>
      <View maxWidth={123}>view 2</View>
    </WidthQuery>;
    const wrapper = shallow(jsx);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('picks the correct <View/> by maxWidth 1', () => {
    const jsx = <WidthQuery width={700}>
      <View maxWidth={200} />
      <View maxWidth={400}>view 2</View>
      <View maxWidth={600}>view 3</View>
      <View maxWidth={800}>view 4</View>
      <View maxWidth={1000}>view 5</View>
    </WidthQuery>;
    const wrapper = shallow(jsx);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('picks the correct <View/> by maxWidth 2', () => {
    const jsx = <WidthQuery width={700}>
      <View maxWidth={600}>view 2</View>
      <View maxWidth={700}>view 3</View>
      <View maxWidth={800}>view 4</View>
      <View maxWidth={900}>view 5</View>
    </WidthQuery>;
    const wrapper = shallow(jsx);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('treats empty maxWidth as Infinity', () => {
    const jsx = <WidthQuery width={2000}>
      <View maxWidth={600}>view 2</View>
      <View maxWidth={700}>view 3</View>
      <View maxWidth={800}>view 4</View>
      <View>view 5</View>
    </WidthQuery>;
    const wrapper = shallow(jsx);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
