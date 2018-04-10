import {createElement as h, Component} from 'react';
import {storiesOf} from '@storybook/react';
import {Provider, Consumer, withContext} from '..';

const ColorIs = ({ctx}) => <div>Color is: {ctx.color}</div>;
const ColorIsConnected = withContext(ColorIs, 'ctx', {name: 'ctx'});

@withContext('', {name: 'theme'})
class Decorator1 extends Component<any, any> {
  render () {
    return <ColorIs ctx={this.props} />;
  }
}

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
  .add('Decorator 1', () =>
    <Provider name="theme" value={{color: 'tomato'}}>
      <Decorator1 />
    </Provider>
  );
