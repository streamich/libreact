import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {SizeSensor, withSize} from '..';
import ShowDocs from '../../ShowDocs'

const Print = (props) => h('pre', {
  style: {fontFamily: 'monospace'}
}, JSON.stringify(props, null, 4));

class StorySizeSensorInteractive extends Component<any, any> {
  state = {
    width: 50,
    height: 100
  };

  render () {
    return h('div', null,
      h(SizeSensor, {}, (state) =>
        h('div', {style: {
          width: `${this.state.width}%`,
          height: this.state.height,
          border: '1px solid tomato'
        }}, h(Print, state))
      ),
      h('button', {onClick: () => this.setState({width: 25})}, 'Width: 25%'),
      h('button', {onClick: () => this.setState({width: 50})}, 'Width: 50%'),
      h('button', {onClick: () => this.setState({width: 75})}, 'Width: 75%'),
      h('button', {onClick: () => this.setState({width: 100})}, 'Width: 100%'),

      h('br'),

      h('button', {onClick: () => this.setState({height: 100})}, 'Height: 100px'),
      h('button', {onClick: () => this.setState({height: 200})}, 'Height: 200px'),
      h('button', {onClick: () => this.setState({height: 300})}, 'Height: 300px'),
    );
  }
}

const Hoc1 = withSize(Print);
const Hoc2 = withSize(Print, 'mySize');
const Hoc3 = withSize(Print, '');

@withSize
class Decorator1 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

@withSize('mySize')
class Decorator2 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

@withSize('')
class Decorator3 extends Component<any, any> {
  render () {
    return h(Print, this.props);
  }
}

storiesOf('Sensors/SizeSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/SizeSensor.md')}))
  .add('Basic example', () =>
    h(SizeSensor, {
      onSize: action('onSize')
    }, ({width, height}) =>
      h('div', {
        style: {
          border: '1px solid red'
        }
      },
        `WIDTH: ${width}, HEIGHT: ${height}`
      )
    )
  )
  .add('Interactive', () => h(StorySizeSensorInteractive))
  .add('HOC 1', () => h(Hoc1))
  .add('HOC 2', () => h(Hoc2))
  .add('HOC 3', () => h(Hoc3))
  .add('Decorator 1', () => h(Decorator1))
  .add('Decorator 2', () => h(Decorator2))
  .add('Decorator 3', () => h(Decorator3));
