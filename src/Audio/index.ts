import {Component, cloneElement, Children} from 'react';
import {h, noop} from '../util';

export interface IAudioProps {
  src: string;
  children?: (...args) => React.ReactElement<any>;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  renderInner?: () => React.ReactElement<any>;
}

export interface IAudioState {

}

export class Audio extends Component<IAudioProps, IAudioState> {
  el: HTMLAudioElement;

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

  render () {
    const {props} = this;
    const {children, src, autoplay, loop, muted, preload, volume, renderInner = noop as any} = props;


    const audio = h('audio', {
      ref: this.ref,
      src,
      autoplay,
      loop,
      muted,
      preload,
      volume
    },
      renderInner()
    );

    const markup = children(this);

    return cloneElement(markup, null, ...[
      ...Children.toArray(markup.props.children),
      audio
    ]);
  }
}
