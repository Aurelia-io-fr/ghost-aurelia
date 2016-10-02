import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

const ghost = window.ghost;

@inject(HttpClient, ghost)
export class Api {
  constructor(client, ghost) {
    this.client = client;
    this.ghost = ghost;
  }

  async get(path) {
    const response = await this.client.fetch(this.ghost.url.api(path));
    const data = await response.json();
    return data;
  }
}
