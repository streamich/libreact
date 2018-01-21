import {Component, cloneElement, Children} from 'react';
import {h, noop} from '../util';

export type TAudioEvent = (event, Audio, IAudioState) => void;

export interface IAudioProps {
  src: string;
  children?: (...args) => React.ReactElement<any>;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  renderInner?: () => React.ReactElement<any>;

  onAbort?: TAudioEvent,
  onCanPlay?: TAudioEvent,
  onCanPlayThrough?: TAudioEvent,
  onDurationChange?: TAudioEvent,
  onEmptied?: TAudioEvent,
  onEncrypted?: TAudioEvent,
  onEnded?: TAudioEvent,
  onError?: TAudioEvent,
  onLoadedData?: TAudioEvent,
  onLoadedMetadata?: TAudioEvent,
  onLoadStart?: TAudioEvent,
  onPause?: TAudioEvent,
  onPlay?: TAudioEvent,
  onPlaying?: TAudioEvent,
  onProgress?: TAudioEvent,
  onRateChange?: TAudioEvent,
  onSeeked?: TAudioEvent,
  onSeeking?: TAudioEvent,
  onStalled?: TAudioEvent,
  onSuspend?: TAudioEvent,
  onTimeUpdate?: TAudioEvent,
  onVolumeChange?: TAudioEvent,
  onWaiting?: TAudioEvent
}

export interface IAudioState {
  isPlaying?: boolean;
}

export class Audio extends Component<IAudioProps, IAudioState> {
  el: HTMLAudioElement;

  state: IAudioState = {
    isPlaying: false
  };

  ref = (el) => {
    this.el = el;
  };

  componentDidMount() {
    if (this.props.autoplay && this.el.paused) {
      this.play();
    }
  }

  play = () => {
    if (this.el) {
      this.el.play();
    }
  };

  pause = () => {
    if (this.el) {
      this.el.pause();
    }
  };

  event = (name: string) => (event) => {
    const handler = this.props[name];

    if (handler) {
      handler(event, this, this.state);
    }

    this.scrapDOM();
  };

  scrapDOM() {

  }

  render () {
    const {props, event} = this;
    const {children, src, autoplay, loop, muted, preload, volume, renderInner = noop as any} = props;


    const audio = h('audio', {
      ref: this.ref,
      src,
      autoplay,
      loop,
      muted,
      preload,
      volume,
      onAbort: event('onAbort'),
      onCanPlay: event('onCanPlay'),
      onCanPlayThrough: event('onCanPlayThrough'),
      onDurationChange: event('onDurationChange'),
      onEmptied: event('onEmptied'),
      onEncrypted: event('onEncrypted'),
      onEnded: event('onEnded'),
      onError: event('onError'),
      onLoadedData: event('onLoadedData'),
      onLoadedMetadata: event('onLoadedMetadata'),
      onLoadStart: event('onLoadStart'),
      onPause: event('onPause'),
      onPlay: event('onPlay'),
      onPlaying: event('onPlaying'),
      onProgress: event('onProgress'),
      onRateChange: event('onRateChange'),
      onSeeked: event('onSeeked'),
      onSeeking: event('onSeeking'),
      onStalled: event('onStalled'),
      onSuspend: event('onSuspend'),
      onTimeUpdate: event('onTimeUpdate'),
      onVolumeChange: event('onVolumeChange'),
      onWaiting: event('onWaiting')
    },
      renderInner()
    );

    const markup = children(this, this.state);

    return cloneElement(markup, null, ...[
      ...Children.toArray(markup.props.children),
      audio
    ]);
  }
}
