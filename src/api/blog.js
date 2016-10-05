import {inject} from 'aurelia-framework';
import {DatasetConstructor} from './dataset-constructor';

@inject(document.body, DatasetConstructor)
export class Blog {
  constructor(body, datasetConstructor) {
    datasetConstructor.construct(this, body, 'blog');

    try {
      const nav = document.querySelector('[data-navigation]');

      if (nav) {
        this.navigation = JSON.parse(nav.dataset.navigation);
      }
    } catch (e) {
      //
    }
  }
}
