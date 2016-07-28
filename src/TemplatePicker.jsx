import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export class TemplatePicker extends Component {
  render() {
    const { templates } = this.props;
    return (
      <ul className="c-menu" aria-hidden="false">
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
      <li className="c-menu-item">
        <a onClick={this.handleClick}>
          {template.name}
        </a>
      </li>
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
