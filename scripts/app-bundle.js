define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);

      this.message = 'Hello World!';
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
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
        moduleId: './posts/list'
      }]);

      router.handleUnknownRoutes({
        redirect: '/'
      });

      this.router = router;
    };

    return App;
  }();
});
define('environment',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true,
    apiHost: '/ghost/api/v0.1/',
    clientId: 'ghost-frontend',
    clientSecret: 'b65fd1919bd1'
  };
});
define('main',['exports', './environment', 'regenerator-runtime/runtime'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('api/api',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Api = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ghost = window.ghost;

  var Api = exports.Api = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, ghost), _dec(_class = function () {
    function Api(client, ghost) {
      _classCallCheck(this, Api);

      this.client = client;
      this.ghost = ghost;
    }

    Api.prototype.get = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path, options) {
        var response, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.client.fetch(this.ghost.url.api(path, options));

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                data = _context.sent;
                return _context.abrupt('return', data);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return get;
    }();

    return Api;
  }()) || _class);
});
define('api/posts',['exports', 'aurelia-framework', './api'], function (exports, _aureliaFramework, _api) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Posts = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Posts = exports.Posts = (_dec = (0, _aureliaFramework.inject)(_api.Api), _dec(_class = function () {
    function Posts(api) {
      _classCallCheck(this, Posts);

      this.api = api;
    }

    Posts.prototype.get = function get(options) {
      return this.api.get('posts', options);
    };

    Posts.prototype.getBySlug = function getBySlug(slug) {
      return this.httpClient.get(environment + 'posts/?slug=' + slug);
    };

    return Posts;
  }()) || _class);
});
define('home/home',['exports', 'aurelia-framework', '../api/posts'], function (exports, _aureliaFramework, _posts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_posts.Posts), _dec(_class = function () {
    function Home(posts) {
      _classCallCheck(this, Home);

      this.posts = posts;
    }

    Home.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.posts.get();

              case 2:
                this.posts = _context.sent;

                console.log(this.posts);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    return Home;
  }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('posts/home',['exports', 'aurelia-framework', '../api/posts'], function (exports, _aureliaFramework, _posts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_posts.Posts), _dec(_class = function () {
    function Home(posts) {
      _classCallCheck(this, Home);

      this.posts = posts;
    }

    Home.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.posts.get();

              case 2:
                this.posts = _context.sent;

                console.log(this.posts);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    return Home;
  }()) || _class);
});
define('posts/list',['exports', 'aurelia-framework', 'aurelia-router', '../api/posts'], function (exports, _aureliaFramework, _aureliaRouter, _posts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _posts.Posts), _dec(_class = function () {
    function List(router, posts) {
      _classCallCheck(this, List);

      this.posts = [];
      this.total = 0;
      this.perPage = 0;
      this.current = 1;

      this.router = router;
      this.postsService = posts;
    }

    List.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var routeParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.current = +routeParams.page || 1;
                return _context.abrupt('return', this.loadPosts());

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate(_x) {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    List.prototype.loadPosts = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var results;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.postsService.get({ page: this.current, limit: 5 });

              case 2:
                results = _context2.sent;

                this.posts = results.posts;
                this.total = +results.meta.pagination.total;
                this.perPage = +results.meta.pagination.limit;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadPosts() {
        return _ref2.apply(this, arguments);
      }

      return loadPosts;
    }();

    List.prototype.navigate = function navigate(_ref3) {
      var navigateTo = _ref3.navigateTo;

      if (navigateTo > 1) {
        this.router.navigateToRoute('posts', { page: navigateTo });
      } else {
        this.router.navigateToRoute('home');
      }
    };

    return List;
  }()) || _class);
});
define('resources/elements/pagination',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Pagination = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

  var MAX_PAGES = 9;

  var Pagination = exports.Pagination = (_dec = (0, _aureliaFramework.computedFrom)('total', 'perPage', 'current'), _dec2 = (0, _aureliaFramework.computedFrom)('total', 'perPage'), (_class = function () {
    function Pagination() {
      _classCallCheck(this, Pagination);

      _initDefineProp(this, 'total', _descriptor, this);

      _initDefineProp(this, 'perPage', _descriptor2, this);

      _initDefineProp(this, 'current', _descriptor3, this);

      _initDefineProp(this, 'navigate', _descriptor4, this);

      this.loading = null;
    }

    Pagination.prototype.navigateTo = function navigateTo(e, page) {
      var _this = this;

      e.stopPropagation();
      if (typeof this.navigate === 'function') {
        var res = this.navigate({
          total: this.total,
          perPage: this.perPage,
          current: this.current,
          navigateTo: page
        });
        if (res instanceof Promise) {
          this.loading = page;
          res.finally(function () {
            return _this.loading = null;
          });
        }
      }
    };

    _createClass(Pagination, [{
      key: 'pages',
      get: function get() {
        if (!this.perPage) {
          return [];
        }
        var total = this.lastPage - 1;
        var pages = [];
        var current = +this.current;

        var range = Math.floor(MAX_PAGES / 2);
        if (range % 2 === 1) {
          range--;
        }

        var end = Math.min(Math.max(current + range, MAX_PAGES), total + 1);
        var start = Math.min(Math.max(current - range, 1), Math.max(end - MAX_PAGES + 1, 1));

        for (var i = start; i <= end; i++) {
          pages.push(i);
        }

        return pages;
      }
    }, {
      key: 'lastPage',
      get: function get() {
        return Math.ceil(+this.total / +this.perPage);
      }
    }]);

    return Pagination;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'total', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'perPage', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 0;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'current', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 1;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'navigate', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return function () {};
    }
  }), _applyDecoratedDescriptor(_class.prototype, 'pages', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'pages'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'lastPage', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'lastPage'), _class.prototype)), _class));
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template>\n  <p>Hello World</p>\n</template>\n"; });
define('text!posts/list.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/elements/pagination\"></require>\n<p>Hello World</p>\n<ul>\n  <li\n    repeat.for=\"post of posts\">${post.title}</li>\n</ul>\n<pagination\n  total.bind=\"total\"\n  per-page.bind=\"perPage\"\n  current.bind=\"current\"\n  navigate.call=\"navigate($event)\"></pagination>\n</template>\n"; });
define('text!resources/elements/pagination.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./pagination.css\"></require>\n<div>\n  <ul\n    class=\"pagination\">\n    <li\n      class=\"paginate_button previous ${current == 1 ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != 1) && navigateTo($event, current - 1)\">Previous</a>\n    </li>\n    <li\n      class=\"\n        paginate_button\n        ${current == page ? 'active' : ''}\n        ${loading == page ? 'loading' : ''}\"\n      repeat.for=\"page of pages\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"navigateTo($event, page)\">${page}</a>\n    </li>\n    <li\n      class=\"paginate_button next ${current == lastPage ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != lastPage) && navigateTo($event, current + 1)\">Next</a>\n    </li>\n  </ul>\n</div>\n</template>\n"; });
define('text!resources/elements/pagination.css', ['module'], function(module) { module.exports = ""; });
//# sourceMappingURL=app-bundle.js.map