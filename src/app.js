import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

@inject(EventAggregator)
export class App {
  constructor(ea) {
    ea.subscribe('router:navigation:success', () => window.scroll({ top: 0, behavior: 'smooth' }));
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
      route: '/:slug',
      name: 'post',
      moduleId: './posts/post'
    }]);

    router.handleUnknownRoutes({
      redirect: '/'
    });

    this.router = router;
  }
}
