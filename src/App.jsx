import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { TemplatePicker } from './TemplatePicker';

@observer(['store'])
class App extends Component {
  render() {
    const { filteredTemplates } = this.props.store;
    return (
      <div>
        <input type="text" placeholder="Search ..." onChange={this.handleChange} />
        <TemplatePicker templates={filteredTemplates} />
        <DevTools />
      </div>
    );
  }

  handleChange = e => {
    const { store } = this.props;
    store.setFilterText(e.target.value);
  }
};

export default App;
