import {inject} from 'aurelia-framework';
import {Posts} from '../api/posts';

@inject(Posts)
export class Home {
  constructor(posts) {
    this.posts = posts;
  }

  async activate() {
    this.posts = await this.posts.get();
    console.log(this.posts);
  }
}
