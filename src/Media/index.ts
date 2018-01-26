import {Component, cloneElement, Children} from 'react';
import {h, noop} from '../util';
import renderProp from '../util/renderProp';
import parseTimeRanges from './parseTimeRanges';

export type TMediaEvent<M> = (event, media?: M, state?: IMediaState) => void;
export type TMediaRenderProp = (media: IMedia, state: IMediaState) => React.ReactElement<any>;

export interface IMedia {
  [s: string]: any;
  play();
  pause();
  seek(time: number);
  volume(volume: number);
  mute();
  unmute();
}

export interface IMediaProps<M> extends React.AllHTMLAttributes<any> {
  src: string;
  tag?: 'audio' | 'video',
  children?: TMediaRenderProp;
  render?: TMediaRenderProp;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  noJs?: React.ReactElement<any>;

  onAbort?: TMediaEvent<M>,
  onCanPlay?: TMediaEvent<M>,
  onCanPlayThrough?: TMediaEvent<M>,
  onDurationChange?: TMediaEvent<M>,
  onEmptied?: TMediaEvent<M>,
  onEncrypted?: TMediaEvent<M>,
  onEnded?: TMediaEvent<M>,
  onError?: TMediaEvent<M>,
  onLoadedData?: TMediaEvent<M>,
  onLoadedMetadata?: TMediaEvent<M>,
  onLoadStart?: TMediaEvent<M>,
  onPause?: TMediaEvent<M>,
  onPlay?: TMediaEvent<M>,
  onPlaying?: TMediaEvent<M>,
  onProgress?: TMediaEvent<M>,
  onRateChange?: TMediaEvent<M>,
  onSeeked?: TMediaEvent<M>,
  onSeeking?: TMediaEvent<M>,
  onStalled?: TMediaEvent<M>,
  onSuspend?: TMediaEvent<M>,
  onTimeUpdate?: TMediaEvent<M>,
  onVolumeChange?: TMediaEvent<M>,
  onWaiting?: TMediaEvent<M>
}

export interface IMediaState {
  buffered?: any[];
  duration?: number;
  isPlaying?: boolean;
  muted?: boolean;
  time?: number;
  volume?: number;
}

export abstract class Media<P extends IMediaProps<M>, S extends IMediaState, M extends IMedia> extends Component<P, S> implements IMedia {
  tag: 'video' | 'audio' = 'video';
  props: P;
  el: HTMLMediaElement = null;

  state: S = {
    buffered: [],
    time: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    volume: 1
  } as S;

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

    this.event('onMount')(this);
  }

  componentWillUnmount () {
    this.el = null;

    this.event('onUnmount')(this);
  }

  play = () => {
    if (this.el) {
      // TODO: In some browsers `.play()` method returns a `Promise`, where you
      // TODO: cannot call `pause()` or `play()` again before that promise resolves.
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
    const {duration, buffered} = this.el;

    this.setState({
      duration,
      buffered: parseTimeRanges(buffered)
    });

    this.event('onDurationChange')(event);
  };

  onTimeUpdate = (event) => {
    this.setState({
      time: this.el.currentTime
    });

    this.event('onTimeUpdate')(event);
  };

  onProgress = (event) => {
    this.setState({
      buffered: parseTimeRanges(this.el.buffered)
    });

    this.event('onProgress')(event);
  };

  render () {
    const {props, event} = this;
    const {tag = this.tag, children, render, noJs, ...rest} = props as any;

    return h(tag, {
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
      onProgress: this.onProgress,
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
  }
}
