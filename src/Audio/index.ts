import * as React from 'react';
import {Media} from '../Media';

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

export class Audio extends Media<IAudioProps, IAudioState, Audio> {
  tag = 'audio' as any;

  render () {
    const {children} = this.props;
    const audio = super.render();
    const markup = children(this, this.state);

    return React.cloneElement(markup, null, ...[
      ...React.Children.toArray(markup.props.children),
      audio
    ]) as any;
  }
}
