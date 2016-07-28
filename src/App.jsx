import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';
import { TemplatePicker } from './TemplatePicker';
import { SelectedTemplates } from './SelectedTemplates';
import { templateBuilder } from './TemplateBuilder';
import $ from 'jquery';

@observer(['store'])
class App extends Component {
  render() {
    const { filteredTemplates, selectedTemplates } = this.props.store;
    return (
      <div className="container">
        <div className="search-container">
          <label htmlFor="search">Choose your stack:</label>
          <input id="search" className="c-text-field search" type="text" placeholder="Search ..." onChange={this.handleChange} />
          <TemplatePicker templates={filteredTemplates} />
        </div>
        <div className="selected-templates">
          <SelectedTemplates templates={selectedTemplates} />
        </div>
        <div style={{clear:'both'}}>&nbsp;</div>
        <button className="c-button" type="submit" onClick={this.saveTemplate} disabled={selectedTemplates.length === 0}>Save Template</button>
        <DevTools />
      </div>
    );
  }
  handleChange = e => {
    const { store } = this.props;
    store.setFilterText(e.target.value);
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
