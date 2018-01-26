import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {SizeSensor} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'

class StorySizeSensorInteractive extends Component<any, any> {
  state = {
    width: 50
  };

  render () {
    return h('div', null,
      h(SizeSensor, {}, ({width, height}) =>
        h('div', {style: {
          width: `${this.state.width}%`,
          height: 200,
          border: '1px solid tomato'
        }}, `${width}px, ${height}px`)
      ),
      h('button', {onClick: () => this.setState({width: 25})}, '25%'),
      h('button', {onClick: () => this.setState({width: 50})}, '50%'),
      h('button', {onClick: () => this.setState({width: 75})}, '75%'),
      h('button', {onClick: () => this.setState({width: 100})}, '100%')
    );
  }
}

storiesOf('Sensors/SizeSensor', module)
  .add('Documentation', () => h(ShowDocs, {name: 'SizeSensor'}))
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
  .add('Interactive', () => h(StorySizeSensorInteractive));
