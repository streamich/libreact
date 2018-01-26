import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {FullScreen} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'


class StoryFullScreenBasicNative extends Component<any, any> {
  el;

  state = {
    on: false
  };

  ref = (el) => {
    this.el = el;
  };

  render () {
    return (
      <FullScreen el={this.el} on={this.state.on} onClose={() => this.setState({on: false})}>
        <div ref={this.ref}>
          Hello world
          <br />
          <button onClick={() => this.setState({on: !this.state.on})}>{this.state.on ? 'Leave' : 'Enter'}</button>
        </div>
      </FullScreen>
    );
  }
}


storiesOf('Other/FullScreen', module)
  .add('Documentation', () => h(ShowDocs, {name: 'FullScreen'}))
  .add('Example', () => <StoryFullScreenBasicNative />);
