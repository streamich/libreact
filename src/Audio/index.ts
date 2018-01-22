import {Component, cloneElement, Children} from 'react';
import {h, noop} from '../util';

export type TAudioEvent = (event, Audio, IAudioState) => void;

export interface IAudioProps {
  src: string;
  children?: (...args) => React.ReactElement<any>;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  noJs?: React.ReactElement<any>;

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
  time?: number;
  duration?: number;
  isPlaying?: boolean;
  muted?: boolean;
  volume?: number;
}

export class Audio extends Component<IAudioProps, IAudioState> {
  el: HTMLAudioElement = null;

  state: IAudioState = {
    time: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    volume: 1
  };

  ref = (el) => {
    this.el = el;
  };

  componentDidMount () {
    if (this.props.autoPlay && this.el.paused) {
      this.play();
    }

    this.setState({
      volume: this.el.volume
    });
  }

  componentWillUnmount () {
    this.el = null;
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

  seek = (time: number) => {
    if (this.el) {
      time = Math.min(this.state.duration, Math.max(0, time));
      this.el.currentTime = time;
    }
  };

  volume = (volume) => {
    if (this.el) {
      volume = Math.min(1, Math.max(0, volume));

      this.el.volume = volume;
      this.setState({
        volume
      });
    }
  };

  mute = () => {
    if (this.el) {
      this.el.muted = true;
    }
  };

  unmute = () => {
    if (this.el) {
      this.el.muted = false;
    }
  };

  event = (name: string) => (event) => {
    const handler = this.props[name];

    if (handler) {
      handler(event, this, this.state);
    }
  };

  onPlay = (event) => {
    this.setState({
      isPlaying: true
    });

    this.event('onPlay')(event);
  };

  onPause = (event) => {
    this.setState({
      isPlaying: false
    });

    this.event('onPause')(event);
  };

  onVolumeChange = (event) => {
    const {muted, volume} = this.el;

    this.setState({
      muted,
      volume
    });

    this.event('onVolumeChange')(event);
  };

  onDurationChange = (event) => {
    this.setState({
      duration: this.el.duration
    });

    this.event('onDurationChange')(event);
  };

  onTimeUpdate = (event) => {
    this.setState({
      time: this.el.currentTime
    });

    this.event('onTimeUpdate')(event);
  };

  render () {
    const {props, event} = this;
    const {children, src, autoPlay, loop, muted, preload, volume, noJs = noop as any} = props;


    const audio = h('audio', {
      ref: this.ref,
      controls: false,
      src,
      autoPlay,
      loop,
      muted,
      preload,
      volume,
      onAbort: event('onAbort'),
      onCanPlay: event('onCanPlay'),
      onCanPlayThrough: event('onCanPlayThrough'),
      onDurationChange: this.onDurationChange,
      onEmptied: event('onEmptied'),
      onEncrypted: event('onEncrypted'),
      onEnded: event('onEnded'),
      onError: event('onError'),
      onLoadedData: event('onLoadedData'),
      onLoadedMetadata: event('onLoadedMetadata'),
      onLoadStart: event('onLoadStart'),
      onPause: this.onPause,
      onPlay: this.onPlay,
      onPlaying: event('onPlaying'),
      onProgress: event('onProgress'),
      onRateChange: event('onRateChange'),
      onSeeked: event('onSeeked'),
      onSeeking: event('onSeeking'),
      onStalled: event('onStalled'),
      onSuspend: event('onSuspend'),
      onTimeUpdate: this.onTimeUpdate,
      onVolumeChange: this.onVolumeChange,
      onWaiting: event('onWaiting')
    },
      noJs
    );

    const markup = children(this, this.state);

    return cloneElement(markup, null, ...[
      ...Children.toArray(markup.props.children),
      audio
    ]);
  }
}
