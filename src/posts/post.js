import {inject} from 'aurelia-framework';
import {Posts} from '../api/posts';
import {Labs} from '../api/labs';

@inject(Element, Posts, Labs)
export class Post {
  constructor(element, postsService, labs) {
    this.element = element;
    this.postsService = postsService;
    this.labs = labs;
  }

  async activate(routeParams) {
    const results = await this.postsService.getBySlug(routeParams.slug, { include: ['author', 'tags'] });

    if (!results.posts.length) {
      throw new Error('Not found');
    }

    this.postsService.current = this.post = results.posts[0];

    const top = this.element.getBoundingClientRect().top;
    window.scroll({ top: top, behavior: 'smooth' });
  }

  deactivate() {
    this.postsService.current = null;
  }
}
