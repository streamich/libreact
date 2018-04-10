import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
import {Theme, Themed, withTheme} from '..';

const theme = {
  color: 'white',
  background: 'tomato'
};

const Block = ({theme: {color, background}}) =>
  <div style={{color, background}}>Color is: {color}</div>;

const BlockThemed = withTheme(Block);

@withTheme
class Decorator1 extends Component<any, any> {
  render () {
    const {color, background} = this.props.theme;

    return (
      <div style={{color, background}}>
        Background: {background}, color: {color}
      </div>
    );
  }
}

storiesOf('Context/theme', module)
  .add('FaCC', () =>
    <Theme value={theme}>
      <Themed>{({color, background}) =>
        <div style={{color, background}}>Color is: {color}</div>
      }</Themed>
    </Theme>
  )
  .add('HOC', () =>
    <Theme value={theme}>
      <BlockThemed />
    </Theme>
  )
  .add('Decorator 1', () =>
    <Theme value={theme}>
      <Decorator1 />
    </Theme>
  )
