import {inject} from 'aurelia-framework';
import {Posts} from '../api/posts';
import {Labs} from '../api/labs';

@inject(Posts, Labs)
export class Post {
  constructor(postsService, labs) {
    this.postsService = postsService;
    this.labs = labs
  }

  async activate(routeParams) {
    const results = await this.postsService.getBySlug(routeParams.slug, { include: ['author', 'tags'] });

    if (!results.posts.length) {
      throw new Error('Not found');
    }

    this.post = results.posts[0];

    console.log(this.post);
  }
}
