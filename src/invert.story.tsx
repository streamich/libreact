import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import {invert, Inverted} from './invert';
import ShowDocs from '../.storybook/ShowDocs'

const Audio = invert('audio');

class StoryInvertedUnmount extends Component<any, any> {
  state = {
    show: true
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        show: false
      });
    }, 1000);
  }

  render () {
    return h('div', {},
      this.state.show ?
        h(Inverted, {
          tag: 'div',
          wrapper: (jsx, comp) => <b>jsx</b>,
          onMount: (div) => console.log('MOUNTED', div),
          onUnmount: (div) => console.log('UNMOUNTED', div)
        }, 'Hello world') :
        null
    );
  }
}


storiesOf('Dummies/invert()', module)
  .add('Documentation', () => h(ShowDocs, {name: 'invert'}))
  .add('<div>', () => h(StoryInvertedUnmount))
  .add('<audio>', () =>
    <Audio
      src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
      onTimeUpdate={() => {}}
      wrapper={(element, comp) =>
        <div>
          {element}
          <button onClick={() => comp.el.play()}>Play</button>
          <button onClick={() => comp.el.pause()}>Pause</button>
          <button onClick={() => comp.el.currentTime -= 5}>Seek -</button>
          <button onClick={() => comp.el.currentTime += 5}>Seek +</button>
          <button onClick={() => comp.el.volume -= 0.05}>Volume -</button>
          <button onClick={() => comp.el.volume += 0.05}>Volume +</button>
          <button onClick={() => comp.el.muted = true}>Mute</button>
          <button onClick={() => comp.el.muted = false}>Unmute</button>
          <pre style={{fontFamily: 'monospace'}}>
            {JSON.stringify({
              duration: comp.el && comp.el.duration,
              time: comp.el && comp.el.currentTime,
              volume: comp.el && comp.el.volume,
              muted: comp.el && comp.el.muted
            }, null, 4)}
          </pre>
        </div>
      }
    />
  );
