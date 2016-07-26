import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

@observer(['store'])
class App extends Component {
  render() {
    const { filteredTemplates } = this.props.store;
    return (
      <div>
        <input type="text" placeholder="Search ..." onChange={this.handleChange} />
        <TemplateList templates={filteredTemplates} />
        <DevTools />
      </div>
    );
  }

  handleChange = e => {
    const { store } = this.props;
    store.setFilterText(e.target.value);
  }
};

@observer
class TemplateList extends Component {
  render() {
    const { templates } = this.props;
    return (
      <ul>
        {templates.map(template => <TemplateListItem key={template.name} template={template} />)}
      </ul>
    );
  }
}

@observer
class TemplateListItem extends Component {
  render() {
    const { template } = this.props;
    return (
      <div>
        {template.name}
      </div>
    );
  }
}

export default App;
