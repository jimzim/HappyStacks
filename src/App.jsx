import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { TemplatePicker } from './TemplatePicker';
import { templateBuilder } from './TemplateBuilder';
import $ from 'jquery';

@observer(['store'])
class App extends Component {
  render() {
    const { templates, canDeploy } = this.props.store;
    return (
      <div className="container">
        <h1 className="c-heading-4">Happy Stack</h1>
        <div className="c-group f-wrap-items">
          <TemplatePicker templates={templates}/>
        </div>
        <button type="submit" className="c-button" disabled={!canDeploy} onClick={this.saveTemplate}>Deploy stack to azure</button>
        <DevTools />
      </div>
    );
  }
  saveTemplate = e => {
    e.preventDefault();
    const { selectedTemplates } = this.props.store;
    var result = templateBuilder(JSON.parse(JSON.stringify(selectedTemplates)));
    console.log(result);
    $.ajax({
      type: "POST",
      url: "http://localhost:2999/templates",
      data: JSON.stringify(result),
      contentType: "application/json; charset=utf-8",
      success: function(data){
        if(data && data.endpoint) {
          console.log(data);
          window.location.replace(data.endpoint);
        }
      }
    });
  }
};

export default App;
