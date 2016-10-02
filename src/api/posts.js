import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Posts {
  constructor(api) {
    this.api = api;
  }

  get(options) {
    return this.api.get('posts', options);
  }

  getBySlug(slug) {
    return this.httpClient.get(`${environment}posts/?slug=${slug}`);
  }
}
