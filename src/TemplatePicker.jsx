import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export class TemplatePicker extends Component {
  render() {
    const { templates } = this.props;
    return (
      <ul>
        {templates.map(template => <TemplatePickerItem key={template.name} template={template} />)}
      </ul>
    );
  }
}

@observer(['store'])
export class TemplatePickerItem extends Component {
  render() {
    const { template } = this.props;
    return (
      <div>
        <a onClick={this.handleClick}>
          {template.name}
        </a>
      </div>
    );
  }
  handleClick = e => {
     e.preventDefault();
     const { store, template } = this.props;
     if (!store.addTemplate(template)) {
        alert(`Template with name "${template.name}" already added`);
     }
  }
}
