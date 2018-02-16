import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {FullScreen} from '..';
import ShowDocs from '../../../.storybook/ShowDocs'
import {invert} from '../../invert';


class StoryFullScreenBasicNative extends Component<any, any> {
  el;

  state = {
    on: false
  };

  render () {
    return (
      <FullScreen on={this.state.on} onClose={() => this.setState({on: false})}>
        Hello world
        <br />
        <button onClick={() => this.setState({on: !this.state.on})}>{this.state.on ? 'Leave' : 'Enter'}</button>
      </FullScreen>
    );
  }
}

const Video = invert('video');

class StoryFullScreenVideo extends Component<any, any> {
  state = {
    on: false,
    video: null
  };

  onMount = (video) => {
    this.setState({video});
  };

  render () {
    return (
      <FullScreen on={this.state.on} video={this.state.video} onClose={() => this.setState({on: false})}>
        <Video autoPlay src='http://dailym.ai/2rG7TBS' onMount={this.onMount} />
        <br />
        <button onClick={() => this.setState({on: !this.state.on})}>{this.state.on ? 'Leave' : 'Enter'}</button>
      </FullScreen>
    );
  }
}


storiesOf('UI/FullScreen', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/FullScreen.md')}))
  .add('Example', () => <StoryFullScreenBasicNative />)
  .add('.webkitEnterFullscreen()', () => <StoryFullScreenVideo />);
