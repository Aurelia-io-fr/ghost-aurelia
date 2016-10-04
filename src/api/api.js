import {inject} from 'aurelia-framework';
import 'whatwg-fetch';
import {HttpClient} from 'aurelia-fetch-client';

const ghost = window.ghost;

@inject(HttpClient, ghost)
export class Api {
  constructor(client, ghost) {
    this.client = client;
    this.ghost = ghost;
  }

  async get(path, options/*{ include, limit, page, order, fields, filter, resource }*/) {
    const response = await this.client.fetch(this.ghost.url.api(path, options));
    const data = await response.json();
    return data;
  }
}
