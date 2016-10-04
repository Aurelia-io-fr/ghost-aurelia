import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {Posts} from '../api/posts';
import {Blog} from '../api/blog';

@inject(Router, Blog, Posts, EventAggregator)
export class List {
  posts = [];
  total = 0;
  perPage = 0;
  current = 1;

  constructor(router, blog, posts, ea) {
    this.router = router;
    this.postsService = posts;
    this.perPage = blog.postsPerPage;
    this.ea = ea;
  }

  async activate(routeParams = {}) {
    this.current = +routeParams.page || 1;
    return this.loadPosts();
  }

  dettach() {
    this._resetPaginateListener();
  }

  async loadPosts() {
    const results = await this.postsService.get({
      page: this.current,
      limit: this.perPage,
      include: ['author', 'tags']
    });
    this.posts = results.posts;
    this.total = +results.meta.pagination.total;
  }

  navigate({ navigateTo }) {
    return new Promise(resolve => {
      this._resetPaginateListener();
      this._paginateListener = this.ea.subscribe('router:navigation:success', () => {
        this._paginateListener.dispose();
        resolve();
        const top = window.scrollY + this.content.getBoundingClientRect().top;
        window.scroll({ top, behavior: 'smooth' })
      });
      if (navigateTo > 1) {
        this.router.navigateToRoute('posts', { page: navigateTo });
      } else {
        this.router.navigateToRoute('home');
      }
    });
  }

  _resetPaginateListener() {
    if (this._paginateListener) {
      this._paginateListener.dispose();
      delete this._paginateListener;
    }
  }
}
