import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
export class TemplatePicker extends Component {
  render() {
    const { templates } = this.props;
    return (
      <div>
        {templates.map(template => <TemplatePickerItem key={template.name} template={template} />)}
      </div>
    );
  }
}

@observer(['store'])
export class TemplatePickerItem extends Component {
  render() {
    const { store, template } = this.props;
    return (
      <button className="c-select-button" aria-pressed={store.isTemplateSelected(template)} data-select-button-multiselect="true" onClick={this.handleClick}>
        {template.name}
      </button>
    );
  }
  handleClick = e => {
    e.preventDefault();
    const { store, template } = this.props;
    if (store.isTemplateSelected(template)) {
      store.removeTemplate(template);
    } else {
      store.addTemplate(template);
    }
  }
}
