import * as React from 'react';
import {ViewportScrollSensor} from '../ViewportScrollSensor';

const h = React.createElement;
const defaultSentinel = h('div', {style: {width: 1, height: 1}});

export interface InfiniteScrollProps {
  interval?: number;
  cursor?: number | string;
  sentinel?: React.ReactElement<any>;
  hasMore?: boolean;
  margin?: number;
  loadMore: () => void;
}

export interface InfiniteScrollState {
}

export class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollProps> {
  static defaultProps = {
    interval: 1e3,
    sentinel: defaultSentinel,
    hasMore: true,
    margin: 100,
  };

  sentinelVisible = false;
  lastLoadMoreCursor: number | string | null = null;
  timer: any;
  mounted: boolean = true;

  componentWillUnmount() {
    this.mounted = false;
    this.stopTimer();
  }
  
  startTimer() {
    if (this.props.interval) {
      this.timer = setTimeout(() => {
        if (!this.mounted) return;
        if (!this.props.hasMore) return;
        if (!this.sentinelVisible) return;
        this.loadMore();
        this.startTimer();
      }, this.props.interval);
    }
  }
  
  stopTimer() {
    clearTimeout(this.timer);
  }

  onViewportChange = ({visible}) => {
    this.sentinelVisible = !!visible;
    if (visible) {
      this.loadMore();
      this.startTimer(); 
    } else {
      this.stopTimer();
    }
  };

  loadMore() {
    if (this.lastLoadMoreCursor !== this.props.cursor) {
      this.lastLoadMoreCursor = this.props.cursor;
      this.props.loadMore();
    }
  }

  render () {
    const {props} = this;
    const {children, hasMore, sentinel, margin, interval} = props;
    return h(React.Fragment, null,
      children,
      hasMore &&
        h(ViewportScrollSensor, {margin: [0, 0, margin, 0], poll: interval, onChange: this.onViewportChange}, sentinel),
    );
  }
}
