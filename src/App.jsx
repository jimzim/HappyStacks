import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { TemplatePicker } from './TemplatePicker';
import { SelectedTemplates } from './SelectedTemplates';

@observer(['store'])
class App extends Component {
  render() {
    const { filteredTemplates, selectedTemplates } = this.props.store;
    return (
      <div>
        <input type="text" placeholder="Search ..." onChange={this.handleChange} />
        <TemplatePicker templates={filteredTemplates} />
        <strong>Selected Templates</strong>
        <SelectedTemplates templates={selectedTemplates} />
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
