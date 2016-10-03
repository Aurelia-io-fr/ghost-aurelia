import {inject} from 'aurelia-framework';
import {DatasetConstructor} from './dataset-constructor';

@inject(document.body, DatasetConstructor)
export class Labs {
  constructor(body, datasetConstructor) {
    datasetConstructor.construct(this, body, 'labs');
  }
}
