import { action, extendObservable, computed, observable } from 'mobx';
import templates from '../templates';

export default class AppStore {
    @observable templates = templates.map(template => new Template(template));
    @observable selectedTemplates = [];

    @computed get canDeploy() {
      return this.selectedTemplates.length > 0;
    }

    isTemplateSelected(template) {
      return this.selectedTemplates.indexOf(template) >= 0;
    }

    @action removeTemplate(template) {
      const { selectedTemplates } = this;
      const index = selectedTemplates.indexOf(template);
      if (index >= 0 ) {
        selectedTemplates.splice(template, 1);
      }
    }

    @action addTemplate(template) {
      const { selectedTemplates } = this;
      if (selectedTemplates.indexOf(template) >= 0) {
        return false;
      } else {
        selectedTemplates.push(template);
        return true;
      }
    }

    @action removeTemplate(template) {
      const { selectedTemplates } = this;
      selectedTemplates.splice(selectedTemplates.indexOf(template), 1);
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
