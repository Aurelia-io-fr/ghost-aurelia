import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

export class App {
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
