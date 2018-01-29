import { Component } from 'react';
import { h } from '../util';
import parseTimeRanges from './parseTimeRanges';
export class Media extends Component {
    constructor() {
        super(...arguments);
        this.tag = 'video';
        this.el = null;
        this.state = {
            buffered: [],
            time: 0,
            duration: 0,
            isPlaying: false,
            muted: false,
            volume: 1
        };
        this.ref = (el) => {
            this.el = el;
        };
        this.lockPlay = false;
        this.play = () => {
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
        this.pause = () => {
            if (this.el && !this.lockPlay) {
                this.el.pause();
            }
        };
        this.seek = (time) => {
            if (this.el) {
                time = Math.min(this.state.duration, Math.max(0, time));
                this.el.currentTime = time;
            }
        };
        this.volume = (volume) => {
            if (this.el) {
                volume = Math.min(1, Math.max(0, volume));
                this.el.volume = volume;
                this.setState({
                    volume
                });
            }
        };
        this.mute = () => {
            if (this.el) {
                this.el.muted = true;
            }
        };
        this.unmute = () => {
            if (this.el) {
                this.el.muted = false;
            }
        };
        this.event = (name) => (event) => {
            const handler = this.props[name];
            if (handler) {
                handler(event, this, this.state);
            }
        };
        this.onPlay = (event) => {
            this.setState({
                isPlaying: true
            });
            this.event('onPlay')(event);
        };
        this.onPause = (event) => {
            this.setState({
                isPlaying: false
            });
            this.event('onPause')(event);
        };
        this.onVolumeChange = (event) => {
            const { muted, volume } = this.el;
            this.setState({
                muted,
                volume
            });
            this.event('onVolumeChange')(event);
        };
        this.onDurationChange = (event) => {
            const { duration, buffered } = this.el;
            this.setState({
                duration,
                buffered: parseTimeRanges(buffered)
            });
            this.event('onDurationChange')(event);
        };
        this.onTimeUpdate = (event) => {
            this.setState({
                time: this.el.currentTime
            });
            this.event('onTimeUpdate')(event);
        };
        this.onProgress = (event) => {
            this.setState({
                buffered: parseTimeRanges(this.el.buffered)
            });
            this.event('onProgress')(event);
        };
    }
    componentDidMount() {
        if (this.props.autoPlay && this.el.paused) {
            this.play();
        }
        this.setState({
            volume: this.el.volume
        });
        this.event('onMount')(this);
    }
    componentWillUnmount() {
        this.el = null;
        this.event('onUnmount')(this);
    }
    render() {
        const { props, event } = this;
        const { tag = this.tag, children, render, noJs, ...rest } = props;
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
        }, noJs);
    }
}
