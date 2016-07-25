import { action, computed, observable } from 'mobx';

export default class AppStore {
    @observable filterText = '';

    @observable templates = [
      'hello',
      'world',
      'hello world'
    ];

    @computed get filteredTemplates() {
      const { filterText, templates } = this;
      if (filterText && filterText.length > 0) {
        return templates.filter(template => template.indexOf(this.filterText) >= 0);
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
