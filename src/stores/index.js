import { action, extendObservable, computed, observable } from 'mobx';
import templates from '../templates';

export default class AppStore {
    @observable filterText = '';

    @observable templates = templates.map(template => new Template(template));

    @computed get filteredTemplates() {
      const { filterText, templates } = this;
      if (filterText && filterText.length > 0) {
        return templates.filter(template => template.name.toUpperCase().indexOf(this.filterText.toUpperCase()) >= 0);
      } else {
        return templates;
      }
    }

    @action setFilterText(newFilterText) {
      this.filterText = newFilterText;
    }

    @action clearFilterText() {
       this.filterText = '';
    }
}

export class Template {
  constructor(json) {
    extendObservable(this, json);
  }

  @computed get name() {
    return this.resources[0].name;
  }
}
