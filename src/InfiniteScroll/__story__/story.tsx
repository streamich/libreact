import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {InfiniteScroll} from '..';
import ShowDocs from '../../ShowDocs';

const h = React.createElement;

const Block = ({height = 100}) => {
  return <div style={{
    width: 100,
    height,
    margin: 20,
    background: 'red',
  }}></div>
};

class Demo extends React.Component<any> {
  state = {
    items: [
      <Block key={0} height={this.props.height || 100} />,
      <Block key={1} height={this.props.height || 100} />,
      <Block key={2} height={this.props.height || 100} />,
      <Block key={3} height={this.props.height || 100} />,
      <Block key={4} height={this.props.height || 100} />,
    ],
    cursor: 1,
  };

  constructor (props) {
    super(props);
  }

  load = (cnt = 5) => {
    console.log('loading for cursor: ' + this.state.cursor);
    const items = [...this.state.items];
    for (let i = 0; i < cnt; i++) {
      items.push(<Block key={items.length} height={this.props.height || 100} />);
    }
    this.setState({
      items,
      cursor: this.state.cursor + 1,
    });
  };

  render () {
    return (
      <InfiniteScroll hasMore={this.state.cursor < 5} loadMore={this.load} cursor={this.state.cursor}>
        {this.state.items}
      </InfiniteScroll>
    );
  }
}

class Demo2 extends React.Component {
  state = {
    items: [
      <Block key={0} />,
      <Block key={1} />,
      <Block key={2} />,
      <Block key={3} />,
      <Block key={4} />,
    ],
    cursor: 1,
  };

  constructor (props) {
    super(props);
  }

  load = (cnt = 5) => {
    console.log('loading for cursor: ' + this.state.cursor);
    const items = [...this.state.items];
    for (let i = 0; i < cnt; i++) {
      items.push(<Block key={items.length} />);
    }
    this.setState({
      items,
      cursor: this.state.cursor + 1,
    });
  };

  render () {
    return (
      <div style={{border: '1px solid red', height: 400, width: 300, overflowY: 'scroll'}}>
        <InfiniteScroll hasMore={this.state.cursor < 5} loadMore={this.load} cursor={this.state.cursor} interval={500}>
          {this.state.items}
        </InfiniteScroll>
      </div>
    );
  }
}

storiesOf('UI/InfiniteScroll', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/InfiniteScroll.md')}))
  .add('Example', () => <Demo />)
  .add('Example (short pages)', () => <Demo height={30} />)
  .add('Example in <div>', () => <Demo2 />)
