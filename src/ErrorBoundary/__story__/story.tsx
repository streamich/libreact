import {Component, createElement as h} from 'react';
import {storiesOf} from '@storybook/react';
import {ErrorBoundary, withErrorBoundary} from '..';
import ShowDocs from '../../ShowDocs'

class BuggyCounter extends Component<any, any> {
  state;

  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

const Hoc1 = withErrorBoundary(BuggyCounter, {
  renderError: () => <div>Errror!</div>
});

storiesOf('Boundaries/ErrorBoundary', module)
  .add('Documentation', () => h(ShowDocs, {md: require('../../../docs/en/ErrorBoundary.md')}))
  .add('Renders children', () =>
    <ErrorBoundary>
      <div>
        Hello from behind the wall.
      </div>
    </ErrorBoundary>
  )
  .add('Catches error', () =>
    <ErrorBoundary renderError={() => <div>Caught error!</div>}>
      <BuggyCounter />
    </ErrorBoundary>
  )
  .add('HOC', () => <Hoc1 />);
