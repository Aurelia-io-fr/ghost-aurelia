import {inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Posts} from '../../api/posts';
import {Blog} from '../../api/blog';
import {MainNavService} from './main-nav-service';

@inject(EventAggregator, Blog, Posts, MainNavService)
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

  constructor(ea, blog, postsService, mainNavService) {
    this.blog = blog;
    this.mainNavService = mainNavService;

    ea.subscribe('router:navigation:success', (response) => {
      if (response.instruction.config.name === 'post') {
        this.post = postsService.current;
      } else {
        this.post = null;
      }
    });
  }

  toggle() {
    this.mainNavService.toggle();
  }
}
