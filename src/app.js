export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
    config.title = 'Aurelia-io.fr';
    config.options.pushState = true;
    config.map([{
      route: '/',
      name: 'home',
      moduleId: './home/home'
    }]);

    router.handleUnknownRoutes({
      redirect: '/'
    });

    this.router = router;
  }
}
