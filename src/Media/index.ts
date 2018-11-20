import * as React from 'react';
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
  canPlay?: boolean;
}

const defaultState = {
  buffered: [],
  time: 0,
  duration: 0,
  isPlaying: false,
  muted: false,
  volume: 1,
  canPlay: false,
};

export class Media<P extends IMediaProps<M>, S extends IMediaState, M extends IMedia> extends React.Component<P, S> implements IMedia {
  tag: 'video' | 'audio' = 'video';
  props: P;
  el: HTMLMediaElement = null;

  state: S = defaultState as S;

  ref = (el) => {
    this.el = el;
  };

  componentDidMount () {
    this.setState({
      volume: this.el.volume,
      muted: this.el.muted,
    });

    this.event('onMount')(this);

    // We run this code after `onMount` event to allow user
    // to set `playsinline` attribute, if needed.
    if (this.props.autoPlay && this.el.paused) {
      this.play();
    }
  }

  componentWillUnmount () {
    this.el = null;

    this.event('onUnmount')(this);
  }

  componentDidUpdate (prevProps) {
    if (prevProps.src !== this.props.src) {
      this.setState(defaultState);
    }
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

  onCanPlay = (event) => {
    this.change({
      canPlay: true,
    });

    this.event('onCanPlay')(event);
  };

  render () {
    const {props, event} = this;
    const {tag = this.tag, children, render, noJs, onMount, onUnmount, ...rest} = props as any;

    return h(tag, {
      controls: false,
      ...rest,
      ref: this.ref,
      onAbort: event('onAbort'),
      onCanPlay: this.onCanPlay,
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
