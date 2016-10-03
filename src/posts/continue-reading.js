import {inject, bindable, singleton} from 'aurelia-framework';
import {Posts} from '../api/posts';

@singleton()
@inject(Posts)
export class ContinueReadingCustomElement {
  @bindable current;

  constructor(postsService) {
    this.postsService = postsService;
  }

  async currentChanged() {
    const posts = await this.getPosts();

    const index = posts.posts.indexOf(posts.posts.find(post => post.id === this.current.id));
    this.previous = (index - 1 > -1) ? posts.posts[index - 1] : null;
    this.next = (index + 1 < posts.posts.length) ? posts.posts[index + 1] : null;
  }

  async getPosts() {
    if (!this._posts) {
      this._posts = await this.postsService.get({
        limit: 'all',
        fields: ['id', 'published_at', 'title', 'html', 'image', 'url',]
      });
    }
    return this._posts;
  }
}
