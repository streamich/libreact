import React, {createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {Provider, Consumer, withContext} from '.';

const ColorIs = ({ctx}) => <div>Color is: {ctx.color}</div>;
const ColorIsConnected = withContext(ColorIs, 'ctx');
const ColorIsConnected2 = withContext(ColorIs);

storiesOf('Context/context', module)
  .add('FaCC', () =>
    <Provider name="theme" value={{color: 'red'}}>
      <Consumer name="theme">{(theme) => {
          return <div>Color is: {theme.color}</div>;
      }}</Consumer>
    </Provider>
  )
  .add('HOC', () =>
    <Provider name="ctx" value={{color: 'tomato'}}>
      <ColorIsConnected />
    </Provider>
  )
  .add('HOC 2', () =>
    <Provider name="ctx" value={{color: 'papayared'}}>
      <ColorIsConnected2 contextName='ctx' />
    </Provider>
  );
