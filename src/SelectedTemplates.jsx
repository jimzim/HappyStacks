import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export class SelectedTemplates extends Component {
  render() {
    const { templates } = this.props;
    return (
      <ul>
        {templates.map(template => <SelectedTemplatesItem key={template.name} template={template} />)}
      </ul>
    );
  }
}

@observer(['store'])
export class SelectedTemplatesItem extends Component {
  render() {
    const { template } = this.props;
    return (
      <div>
        {template.name + ' '}
        <a onClick={this.handleRemove}>X</a>
      </div>
    );
  }
  handleRemove = e => {
    e.preventDefault();
    const { store, template } = this.props;
    store.removeTemplate(template);
  }
}
