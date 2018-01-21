import {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Theme, Themed, withTheme} from '.';

const theme = {
  color: 'white',
  background: 'tomato'
};

const Block = ({theme: {color, background}}) =>
  <div style={{color, background}}>Color is: {color}</div>;

const BlockThemed = withTheme(Block);

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
  );
