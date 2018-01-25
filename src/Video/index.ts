import {Component, cloneElement, Children} from 'react';
import {h, noop} from '../util';
import renderProp from '../util/renderProp';

export type TVideoEvent = (event, IVideo?, IVideoState?) => void;
export type TVideoRenderProp = (video: Video, state: IVideoState) => React.ReactElement<any>;

export interface IVideo {
  play();
  pause();
  seek(time: number);
  volume(volume: number);
  mute();
  unmute();
}

export interface IVideoProps extends React.AllHTMLAttributes<any> {
  src: string;
  children?: TVideoRenderProp;
  render?: TVideoRenderProp;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  noJs?: React.ReactElement<any>;

  onAbort?: TVideoEvent,
  onCanPlay?: TVideoEvent,
  onCanPlayThrough?: TVideoEvent,
  onDurationChange?: TVideoEvent,
  onEmptied?: TVideoEvent,
  onEncrypted?: TVideoEvent,
  onEnded?: TVideoEvent,
  onError?: TVideoEvent,
  onLoadedData?: TVideoEvent,
  onLoadedMetadata?: TVideoEvent,
  onLoadStart?: TVideoEvent,
  onPause?: TVideoEvent,
  onPlay?: TVideoEvent,
  onPlaying?: TVideoEvent,
  onProgress?: TVideoEvent,
  onRateChange?: TVideoEvent,
  onSeeked?: TVideoEvent,
  onSeeking?: TVideoEvent,
  onStalled?: TVideoEvent,
  onSuspend?: TVideoEvent,
  onTimeUpdate?: TVideoEvent,
  onVolumeChange?: TVideoEvent,
  onWaiting?: TVideoEvent
}

export interface IVideoState {
  time?: number;
  duration?: number;
  isPlaying?: boolean;
  muted?: boolean;
  volume?: number;
}

export class Video extends Component<IVideoProps, IVideoState> implements IVideo {
  el: HTMLVideoElement = null;
  video: React.ReactElement<any> = null;

  state: IVideoState = {
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
      // TODO: In some browsers `.play()` method returns a `Promise`, where you
      // TODO: cannot call `pauer()` or `play()` again before that promise resolves.
      const promise = this.el.play();
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
    const {children, render, noJs, ...rest} = props;

    this.video = h('video', {
      ...rest,
      ref: this.ref,
      controls: false,
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

    return renderProp(this.props, this, this.state);
  }
}
