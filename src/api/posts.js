import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Posts {
  current;

  constructor(api) {
    this.api = api;
  }

  get(options) {
    return this.api.get('posts', options);
  }

  getBySlug(slug, options) {
    return this.api.get(`posts/slug/${slug}`, options);
  }
}
