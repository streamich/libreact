import {Component, createElement as h} from 'react';
import {LocalStorage} from '..';

class StoryLocalStorageForm extends Component<any, any> {
  state = {
    name: '',
    email: ''
  };

  render () {
    return (
      <form>
        <input
          value={this.state.name}
          placeholder='Name'
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br />
        <input
          value={this.state.email}
          placeholder='E-mail'
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <br />
        <LocalStorage
          name='form'
          data={this.state}
          persist
          onMount={(state) => this.setState(state)}
        />
        <pre style={{fontFamily: 'monospace'}}>
          {`
<form>
  <input
    value={this.state.name}
    placeholder='Name'
    onChange={(e) => this.setState({name: e.target.value})}
  />
  <input
    value={this.state.email}
    placeholder='E-mail'
    onChange={(e) => this.setState({email: e.target.value})}
  />
  <LocalStorage
    name='form'
    data={this.state}
    persist
    onMount={(state) => this.setState(state)}
  />
</form>
          `}
        </pre>
      </form>
    );
  }
}

export default StoryLocalStorageForm;
