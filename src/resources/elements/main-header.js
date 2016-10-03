import {inject, ObserverLocator, computedFrom} from 'aurelia-framework';
import {Posts} from '../../api/posts';
import {Blog} from '../../api/blog';

@inject(ObserverLocator, Blog, Posts)
export class MainHeaderCustomElement {
  post;
  blog;

  @computedFrom('post', 'blog')
  get cover() {
    if (this.post) {
      return this.post && this.post.image;
    }
    return this.blog.cover;
  }

  constructor(observerLocator, blog, postsService) {
    this.blog = blog;
    observerLocator.getObserver(postsService, 'current')
    .subscribe(newVal => this.post = newVal);
  }
}
