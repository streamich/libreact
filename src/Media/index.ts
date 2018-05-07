import {Component} from 'react';
import {h} from '../util';
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

  onMount?: TMediaEvent<M>,
  onUnmount?: TMediaEvent<M>,
  onChange?: TMediaEvent<M>,
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

export class Media<P extends IMediaProps<M>, S extends IMediaState, M extends IMedia> extends Component<P, S> implements IMedia {
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

  // Some browsers return `Promise` on `.play()` and may throw errors
  // if one tries to execute another `.play()` or `.pause()` while that
  // promise is resolving. So we prevent that with this lock.
  // See: https://bugs.chromium.org/p/chromium/issues/detail?id=593273
  lockPlay: boolean = false;

  play = () => {
    if (this.el && !this.lockPlay) {
      const promise = this.el.play();
      const isPromise = typeof promise === 'object';

      if (isPromise) {
        this.lockPlay = true;

        const resetLock = () => {
          this.lockPlay = false;
        };

        promise.then(resetLock, resetLock);
      }
    }
  };

  pause = () => {
    if (this.el && !this.lockPlay) {
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

  change (nextState) {
    this.setState(nextState, () => {
      this.event('onChange')(null);
    });
  }

  onPlay = (event) => {
    this.change({
      isPlaying: true
    });

    this.event('onPlay')(event);
  };

  onPause = (event) => {
    this.change({
      isPlaying: false
    });

    this.event('onPause')(event);
  };

  onVolumeChange = (event) => {
    const {muted, volume} = this.el;

    this.change({
      muted,
      volume
    });

    this.event('onVolumeChange')(event);
  };

  onDurationChange = (event) => {
    const {duration, buffered} = this.el;

    this.change({
      duration,
      buffered: parseTimeRanges(buffered)
    });

    this.event('onDurationChange')(event);
  };

  onTimeUpdate = (event) => {
    this.change({
      time: this.el.currentTime
    });

    this.event('onTimeUpdate')(event);
  };

  onProgress = (event) => {
    this.change({
      buffered: parseTimeRanges(this.el.buffered)
    });

    this.event('onProgress')(event);
  };

  render () {
    const {props, event} = this;
    const {tag = this.tag, children, render, noJs, onMount, onUnmount, ...rest} = props as any;

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
