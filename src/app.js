import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Blog} from './api/blog';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

@inject(EventAggregator, Blog)
export class App {
  constructor(ea, blog) {
    this.blog = blog;
    ea.subscribe('router:navigation:success',
      response => this._updateBodyClass(response.instruction));
  }

  configureRouter(config, router) {
    config.title = 'Aurelia-io.fr';
    config.options.pushState = true;
    config.map([{
      route: '/',
      name: 'home',
      moduleId: './posts/list'
    }, {
      route: '/page/:page',
      name: 'posts',
      moduleId: './posts/list'
    }, {
      route: '/tag/:tag',
      name: 'tag',
      moduleId: './tags/tag'
    }, {
      route: this.blog.permalinks,
      name: 'post',
      moduleId: './posts/post'
    }]);

    router.handleUnknownRoutes({
      redirect: '/'
    });

    this.router = router;
  }

  _updateBodyClass(currentInstruction) {
    let bodyClass;
    switch (currentInstruction.config.name) {
    case 'home':
      bodyClass = 'home-template';
      break;
    case 'posts':
      bodyClass = 'archive-template paged';
      break;
    case 'tag':
      bodyClass = `tag-template ${currentInstruction.params.tag}`;
      break;
    case 'post':
      bodyClass = `post-template ${currentInstruction.params.slug}`;
      break;
    default:
      bodyClass = '';
    }
    const body = document.body;
    const navClosed = body.classList.contains('nav-closed');
    document.body.className = `${bodyClass} ${navClosed ? 'nav-closed' : ''}`;
  }
}
