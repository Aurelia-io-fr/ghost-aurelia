import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Posts} from '../api/posts';

@inject(Router, Posts)
export class List {
  posts = [];
  total = 0;
  perPage = 0;
  current = 1;

  constructor(router, posts) {
    this.router = router;
    this.postsService = posts;
  }

  async activate(routeParams = {}) {
    this.current = +routeParams.page || 1;
    return this.loadPosts();
  }

  async loadPosts() {
    const results = await this.postsService.get({ page: this.current, limit: 5 });
    this.posts = results.posts;
    this.total = +results.meta.pagination.total;
    this.perPage = +results.meta.pagination.limit;
  }

  navigate({ navigateTo }) {
    if (navigateTo > 1) {
      this.router.navigateToRoute('posts', { page: navigateTo });
    } else {
      this.router.navigateToRoute('home');
    }
  }
}
