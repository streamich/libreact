import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ScrollSensor} from '.';
import ShowDocs from '../ShowDocs'

class StoryScrollSensorBasic extends Component<any, any> {
  state = {
    el: null
  };

  ref = (el) => this.setState({el});

  render () {
    return h('div', {
      ref: this.ref,
      style: {
        border: '1px solid red',
        width: 300,
        height: 500,
        overflow: 'scroll'
      }
    },
      h(ScrollSensor, {el: this.state.el}, ({x, y}) =>
        h('div', {
          style: {
            position: 'absolute',
            top: 20,
            left: 20
          }
        },
          `x: ${x}, y: ${y}`
        )
      ),
      h('div', { style: {
          background: 'linear-gradient(to bottom, #fff 0%, #000 100%)',
          width: 2000,
          height: 2000
      }})
    );
  }
}

storiesOf('Sensors/ScrollSensor', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../docs/en/ScrollSensor.md')}))
  .add('Example', () => h(StoryScrollSensorBasic));
