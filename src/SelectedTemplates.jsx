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
      <div>{template.name}</div>
    );
  }
}
