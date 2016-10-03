define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'smoothscroll-polyfill'], function (exports, _aureliaFramework, _aureliaEventAggregator, _smoothscrollPolyfill) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _smoothscrollPolyfill2 = _interopRequireDefault(_smoothscrollPolyfill);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  _smoothscrollPolyfill2.default.polyfill();

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ea) {
      _classCallCheck(this, App);

      ea.subscribe('router:navigation:success', function () {
        return window.scroll({ top: 0, behavior: 'smooth' });
      });
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
        moduleId: './posts/post'
      }]);

      router.handleUnknownRoutes({
        redirect: '/'
      });

      this.router = router;
    };

    return App;
  }()) || _class);
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
define('api/blog',['exports', 'aurelia-framework', './dataset-constructor'], function (exports, _aureliaFramework, _datasetConstructor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Blog = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Blog = exports.Blog = (_dec = (0, _aureliaFramework.inject)(document.body, _datasetConstructor.DatasetConstructor), _dec(_class = function Blog(body, datasetConstructor) {
    _classCallCheck(this, Blog);

    datasetConstructor.construct(this, body, 'blog');
  }) || _class);
});
define('api/dataset-constructor',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DatasetConstructor = exports.DatasetConstructor = function () {
    function DatasetConstructor() {
      _classCallCheck(this, DatasetConstructor);
    }

    DatasetConstructor.prototype.construct = function construct(object, element, prefix) {
      var dataset = element.dataset;
      for (var _iterator = Object.keys(dataset), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var property = _ref;

        var value = dataset[property];
        if (prefix) {
          property = property.match("^" + prefix + "(.*?)$");
          if (!property) {
            continue;
          }
          property = property[1].replace(/^./, function (c) {
            return c.toLowerCase();
          });
        }
        object[property] = value;
      }
    };

    return DatasetConstructor;
  }();
});
define('api/labs',['exports', 'aurelia-framework', './dataset-constructor'], function (exports, _aureliaFramework, _datasetConstructor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Labs = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Labs = exports.Labs = (_dec = (0, _aureliaFramework.inject)(document.body, _datasetConstructor.DatasetConstructor), _dec(_class = function Labs(body, datasetConstructor) {
    _classCallCheck(this, Labs);

    datasetConstructor.construct(this, body, 'labs');
  }) || _class);
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

    Posts.prototype.getBySlug = function getBySlug(slug, options) {
      return this.api.get('posts/slug/' + slug, options);
    };

    return Posts;
  }()) || _class);
});
define('posts/author',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Author = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Author = exports.Author = (_class = function Author() {
    _classCallCheck(this, Author);

    _initDefineProp(this, 'author', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'author', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('posts/continue-reading',['exports', 'aurelia-framework', '../api/posts'], function (exports, _aureliaFramework, _posts) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ContinueReadingCustomElement = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var ContinueReadingCustomElement = exports.ContinueReadingCustomElement = (_dec = (0, _aureliaFramework.singleton)(), _dec2 = (0, _aureliaFramework.inject)(_posts.Posts), _dec(_class = _dec2(_class = (_class2 = function () {
    function ContinueReadingCustomElement(postsService) {
      _classCallCheck(this, ContinueReadingCustomElement);

      _initDefineProp(this, 'current', _descriptor, this);

      this.postsService = postsService;
    }

    ContinueReadingCustomElement.prototype.currentChanged = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var posts, index;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getPosts();

              case 2:
                posts = _context.sent;
                index = posts.posts.indexOf(posts.posts.find(function (post) {
                  return post.id === _this.current.id;
                }));

                this.previous = index - 1 > -1 ? posts.posts[index - 1] : null;
                this.next = index + 1 < posts.posts.length ? posts.posts[index + 1] : null;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function currentChanged() {
        return _ref.apply(this, arguments);
      }

      return currentChanged;
    }();

    ContinueReadingCustomElement.prototype.getPosts = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._posts) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return this.postsService.get({
                  limit: 'all',
                  fields: ['id', 'published_at', 'title', 'html', 'image', 'url']
                });

              case 3:
                this._posts = _context2.sent;

              case 4:
                return _context2.abrupt('return', this._posts);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPosts() {
        return _ref2.apply(this, arguments);
      }

      return getPosts;
    }();

    return ContinueReadingCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'current', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('posts/list',['exports', 'aurelia-framework', 'aurelia-router', '../api/posts', '../api/blog'], function (exports, _aureliaFramework, _aureliaRouter, _posts, _blog) {
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

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _blog.Blog, _posts.Posts), _dec(_class = function () {
    function List(router, blog, posts) {
      _classCallCheck(this, List);

      this.posts = [];
      this.total = 0;
      this.perPage = 0;
      this.current = 1;

      this.router = router;
      this.postsService = posts;
      this.perPage = blog.postsPerPage;
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
                return this.postsService.get({
                  page: this.current,
                  limit: this.perPage,
                  include: ['author', 'tags']
                });

              case 2:
                results = _context2.sent;

                this.posts = results.posts;
                this.total = +results.meta.pagination.total;

              case 5:
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
define('posts/post-in-list',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PostInList = undefined;

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

  var _desc, _value, _class, _descriptor;

  var PostInList = exports.PostInList = (_class = function PostInList() {
    _classCallCheck(this, PostInList);

    _initDefineProp(this, 'post', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'post', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('posts/post',['exports', 'aurelia-framework', '../api/posts', '../api/labs'], function (exports, _aureliaFramework, _posts, _labs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Post = undefined;

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

  var Post = exports.Post = (_dec = (0, _aureliaFramework.inject)(_posts.Posts, _labs.Labs), _dec(_class = function () {
    function Post(postsService, labs) {
      _classCallCheck(this, Post);

      this.postsService = postsService;
      this.labs = labs;
    }

    Post.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(routeParams) {
        var results;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.postsService.getBySlug(routeParams.slug, { include: ['author', 'tags'] });

              case 2:
                results = _context.sent;

                if (results.posts.length) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Not found');

              case 5:

                this.postsService.current = this.post = results.posts[0];

              case 6:
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

    Post.prototype.deactivate = function deactivate() {
      this.postsService.current = null;
    };

    return Post;
  }()) || _class);
});
define('posts/share',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Share = undefined;

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

  var _desc, _value, _class, _descriptor;

  var Share = exports.Share = (_class = function Share() {
    _classCallCheck(this, Share);

    _initDefineProp(this, 'post', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'post', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('posts/subscribe',['exports', 'aurelia-framework', '../api/labs', '../api/blog'], function (exports, _aureliaFramework, _labs, _blog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Subscribe = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Subscribe = exports.Subscribe = (_dec = (0, _aureliaFramework.inject)(_labs.Labs, _blog.Blog), _dec(_class = function Subscribe(labs, blog) {
    _classCallCheck(this, Subscribe);

    this.labs = labs;
    this.blog = blog;
  }) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('tags/tags-flat-list',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TagsFlatListCustomElement = undefined;

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

  var _desc, _value, _class, _descriptor;

  var TagsFlatListCustomElement = exports.TagsFlatListCustomElement = (_class = function TagsFlatListCustomElement() {
    _classCallCheck(this, TagsFlatListCustomElement);

    _initDefineProp(this, 'tags', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'tags', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/attributes/popup',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PopupCustomAttribute = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var PopupCustomAttribute = exports.PopupCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
    function PopupCustomAttribute(element) {
      _classCallCheck(this, PopupCustomAttribute);

      this.element = element;
    }

    PopupCustomAttribute.prototype.attached = function attached() {
      var _this = this;

      this.element.addEventListener('click', this._listener = function (e) {
        e.preventDefault();
        window.open(_this.element.getAttribute('href'));
      });
    };

    PopupCustomAttribute.prototype.detached = function detached() {
      this.element.removeEventListener('click', this._listener);
    };

    return PopupCustomAttribute;
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
define('resources/value-converters/absolute-url',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AbsoluteUrlValueConverter = exports.AbsoluteUrlValueConverter = function () {
    function AbsoluteUrlValueConverter() {
      _classCallCheck(this, AbsoluteUrlValueConverter);
    }

    AbsoluteUrlValueConverter.prototype.toView = function toView(str) {
      return "" + window.location.origin + str;
    };

    return AbsoluteUrlValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'aurelia-framework', 'moment'], function (exports, _aureliaFramework, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DateFormatValueConverter = exports.DateFormatValueConverter = (_dec = (0, _aureliaFramework.inject)(function () {
    return _moment2.default;
  }), _dec(_class = function () {
    function DateFormatValueConverter(moment) {
      _classCallCheck(this, DateFormatValueConverter);

      this.moment = moment;
    }

    DateFormatValueConverter.prototype.toView = function toView(date, format) {
      return this.moment(date).format(format);
    };

    return DateFormatValueConverter;
  }()) || _class);
});
define('resources/value-converters/encode',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var EncodeValueConverter = exports.EncodeValueConverter = function () {
    function EncodeValueConverter() {
      _classCallCheck(this, EncodeValueConverter);
    }

    EncodeValueConverter.prototype.toView = function toView(str) {
      return encodeURIComponent(str);
    };

    return EncodeValueConverter;
  }();
});
define('resources/value-converters/excerpt',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ExcerptValueConverter = exports.ExcerptValueConverter = function () {
    function ExcerptValueConverter() {
      _classCallCheck(this, ExcerptValueConverter);
    }

    ExcerptValueConverter.prototype.toView = function toView(str, _ref) {
      var length = _ref.length;
      var type = _ref.type;

      var div = document.createElement('div');
      div.innerHTML = str;
      var text = div.innerText;

      if (type === 'words') {
        var words = text.split(/\s+/);
        return words.splice(0, length).join(' ') + '…';
      } else {
        return text.substr(0, length);
      }
    };

    return ExcerptValueConverter;
  }();
});
define('resources/elements/main-header',['exports', 'aurelia-framework', '../../api/posts', '../../api/blog'], function (exports, _aureliaFramework, _posts, _blog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MainHeaderCustomElement = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2;

  var MainHeaderCustomElement = exports.MainHeaderCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.ObserverLocator, _blog.Blog, _posts.Posts), _dec2 = (0, _aureliaFramework.computedFrom)('post', 'blog'), _dec(_class = (_class2 = function () {
    _createClass(MainHeaderCustomElement, [{
      key: 'cover',
      get: function get() {
        if (this.post) {
          return this.post && this.post.image;
        }
        return this.blog.cover;
      }
    }]);

    function MainHeaderCustomElement(observerLocator, blog, postsService) {
      var _this = this;

      _classCallCheck(this, MainHeaderCustomElement);

      this.blog = blog;
      observerLocator.getObserver(postsService, 'current').subscribe(function (newVal) {
        return _this.post = newVal;
      });
    }

    return MainHeaderCustomElement;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'cover', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'cover'), _class2.prototype)), _class2)) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./app.css\"></require>\n<require\n  from=\"resources/elements/main-header\"></require>\n<div\n  class=\"site-wrapper\">\n  <main-header></main-header>\n  <router-view></router-view>\n\n  <footer class=\"site-footer clearfix\">\n            <section class=\"copyright\"><a href=\"{{@blog.url}}\">{{@blog.title}}</a> &copy; {{date format=\"YYYY\"}}</section>\n            <section class=\"poweredby\">Proudly published with <a href=\"https://ghost.org\">Ghost</a></section>\n        </footer>\n</div>\n</template>\n"; });
define('text!posts/author.html', ['module'], function(module) { module.exports = "<template>\n<figure\n  if.bind=\"author.image\"\n  class=\"author-image\">\n  <a\n    class=\"img\"\n    href.bind=\"author.url\"\n    css=\"background-image: url(${author.image})\">\n    <span\n      class=\"hidden\">${author.name}'s Picture</span>\n  </a>\n</figure>\n<section\n  class=\"author\">\n  <h4>\n    <a\n      href.bind=\"author.url\">${author.name}\n    </a>\n  </h4>\n  <p\n    if.bind=\"author.bio\">${author.bio}</p>\n  <p\n    if.bind=\"!author.bio\">Read <a href.bind=\"author.url\">more posts</a> by this author.</p>\n  <div\n    class=\"author-meta\">\n    <span\n      if.bind=\"author.location\"\n      class=\"author-location icon-location\">\n      ${author.location}\n    </span>\n    <span\n      if.bind=\"author.website\"\n      class=\"author-link icon-link\">\n      <a\n        href=\"${author.website}\">${author.website}\n      </a>\n    </span>\n  </div>\n</section>\n\n</template>\n"; });
define('text!posts/continue-reading.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/excerpt\"></require>\n<aside\n  class=\"read-next\">\n  <a\n    if.bind=\"next\"\n    class=\"read-next-story ${next.image ? '' : 'no-cover'}\"\n    css=\"background-image: url(${next.image})\"\n    href=\"${next.url}\">\n    <section\n      class=\"post\">\n      <h2>${next.title}</h2>\n      <p>${next.html|excerpt:{ length: 19, type: 'words' }}&hellip;</p>\n    </section>\n  </a>\n  <a\n    if.bind=\"previous\"\n    class=\"read-next-story ${previous.image ? '' : 'no-cover'}\"\n    css=\"background-image: url(${previous.image})\"\n    href=\"${previous.url}\">\n    <section\n      class=\"post\">\n      <h2>${previous.title}</h2>\n      <p>${previous.html|excerpt:{ length: 19, type: 'words' }}&hellip;</p>\n    </section>\n  </a>\n</aside>\n</template>\n"; });
define('text!posts/list.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/elements/pagination\"></require>\n<require\n  from=\"./post-in-list\"></require>\n\n<pagination\n  total.bind=\"total\"\n  per-page.bind=\"perPage\"\n  current.bind=\"current\"\n  navigate.call=\"navigate($event)\"></pagination>\n\n<post-in-list\n  repeat.for=\"post of posts\"\n  post.bind=\"post\"></post-in-list>\n\n<pagination\n  total.bind=\"total\"\n  per-page.bind=\"perPage\"\n  current.bind=\"current\"\n  navigate.call=\"navigate($event)\"></pagination>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "/* ==========================================================================\n   Table of Contents\n   ========================================================================== */\n/*\n\n    0.  Normalize\n    1.  Icons\n    2.  General\n    3.  Utilities\n    4.  General\n    5.  Single Post\n    6.  Author Profile\n    7.  Read More\n    8.  Third Party Elements\n    9.  Pagination\n    10. Subscribe\n    11. Footer\n    12. Media Queries (Tablet)\n    13. Media Queries (Mobile)\n    14. Animations\n\n*/\n/* ==========================================================================\n   0. normalize.css v3.0.3 | MIT License | git.io/normalize | (minified)\n   ========================================================================== */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle, aside, details,\nfigcaption, figure,\nfooter, header,\nmain, menu, nav,\nsection, summary {\n  display: block; }\n\naudio, canvas, progress, video {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden], template {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active, a:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb, strong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton, input, optgroup, select, textarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton, select {\n  text-transform: none; }\n\nbutton, html input[type=\"button\"],\ninput[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled], html input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd, th {\n  padding: 0; }\n\n/* ==========================================================================\n   1. Icons - Sets up the icon font and respective classes\n   ========================================================================== */\n/* Import the font file with the icons in it */\n@font-face {\n  font-family: \"casper-icons\";\n  src: url(\"../fonts/casper-icons.eot?v=1\");\n  src: url(\"../fonts/casper-icons.eot?v=1#iefix\") format(\"embedded-opentype\"), url(\"../fonts/casper-icons.woff?v=1\") format(\"woff\"), url(\"../fonts/casper-icons.ttf?v=1\") format(\"truetype\"), url(\"../fonts/casper-icons.svg?v=1#icons\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n/* Apply these base styles to all icons */\n[class^=\"icon-\"]:before, [class*=\" icon-\"]:before {\n  font-family: \"casper-icons\", \"Open Sans\", sans-serif;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  text-decoration: none !important;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/* Each icon is created by inserting the correct character into the\n   content of the :before pseudo element. Like a boss. */\n.icon-ghost:before {\n  content: \"\\f600\"; }\n\n.icon-feed:before {\n  content: \"\\f601\"; }\n\n.icon-twitter:before {\n  content: \"\\f602\";\n  font-size: 1.1em; }\n\n.icon-google-plus:before {\n  content: \"\\f603\"; }\n\n.icon-facebook:before {\n  content: \"\\f604\"; }\n\n.icon-arrow-left:before {\n  content: \"\\f605\"; }\n\n.icon-stats:before {\n  content: \"\\f606\"; }\n\n.icon-location:before {\n  content: \"\\f607\";\n  margin-left: -3px;\n  /* Tracking fix */ }\n\n.icon-link:before {\n  content: \"\\f608\"; }\n\n.icon-menu:before {\n  content: \"\\f609\"; }\n\n/*\n    IMPORTANT: When making any changes to the icon font, be sure to increment\n    the version number by 1 in the @font-face rule. `?v=1` becomes `?v=2`\n    This forces browsers to download the new font file.\n*/\n/* ==========================================================================\n   2. General - Setting up some base styles\n   ========================================================================== */\nhtml {\n  height: 100%;\n  max-height: 100%;\n  font-size: 62.5%;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  height: 100%;\n  max-height: 100%;\n  font-family: \"Merriweather\", serif;\n  letter-spacing: 0.01rem;\n  font-size: 1.8rem;\n  line-height: 1.75em;\n  color: #3A4145;\n  -webkit-font-feature-settings: 'kern' 1;\n  -moz-font-feature-settings: 'kern' 1;\n  -o-font-feature-settings: 'kern' 1;\n  text-rendering: geometricPrecision; }\n\n::-moz-selection {\n  background: #D6EDFF; }\n\n::selection {\n  background: #D6EDFF; }\n\nh1, h2, h3,\nh4, h5, h6 {\n  -webkit-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;\n  -moz-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;\n  -o-font-feature-settings: 'dlig' 1, 'liga' 1, 'lnum' 1, 'kern' 1;\n  color: #2E2E2E;\n  line-height: 1.15em;\n  margin: 0 0 0.4em 0;\n  font-family: \"Open Sans\", sans-serif;\n  text-rendering: geometricPrecision; }\n\nh1 {\n  font-size: 5rem;\n  letter-spacing: -2px;\n  text-indent: -3px; }\n\nh2 {\n  font-size: 3.6rem;\n  letter-spacing: -1px; }\n\nh3 {\n  font-size: 3rem;\n  letter-spacing: -0.6px; }\n\nh4 {\n  font-size: 2.5rem; }\n\nh5 {\n  font-size: 2rem; }\n\nh6 {\n  font-size: 2rem; }\n\na {\n  color: #4A4A4A;\n  transition: color 0.3s ease; }\n\na:hover {\n  color: #111; }\n\np, ul, ol, dl {\n  -webkit-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;\n  -moz-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;\n  -o-font-feature-settings: 'liga' 1, 'onum' 1, 'kern' 1;\n  margin: 0 0 1.75em 0;\n  text-rendering: geometricPrecision; }\n\nol, ul {\n  padding-left: 3rem; }\n\nol ol, ul ul,\nul ol, ol ul {\n  margin: 0 0 0.4em 0;\n  padding-left: 2em; }\n\ndl dt {\n  float: left;\n  width: 180px;\n  overflow: hidden;\n  clear: left;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 700;\n  margin-bottom: 1em; }\n\ndl dd {\n  margin-left: 200px;\n  margin-bottom: 1em; }\n\nli {\n  margin: 0.4em 0; }\n\nli li {\n  margin: 0; }\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: #EFEFEF 1px solid;\n  margin: 3.2em 0;\n  padding: 0; }\n\nblockquote {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 1.75em 0 1.75em -2.2em;\n  padding: 0 0 0 1.75em;\n  border-left: #4A4A4A 0.4em solid; }\n\nblockquote p {\n  margin: 0.8em 0;\n  font-style: italic; }\n\nblockquote small {\n  display: inline-block;\n  margin: 0.8em 0 0.8em 1.5em;\n  font-size: 0.9em;\n  color: #CCC; }\n\nblockquote small:before {\n  content: \"\\2014 \\00A0\"; }\n\nblockquote cite {\n  font-weight: 700; }\n\nblockquote cite a {\n  font-weight: normal; }\n\nmark {\n  background-color: #fdffb6; }\n\ncode, tt {\n  padding: 1px 3px;\n  font-family: Inconsolata, monospace, sans-serif;\n  font-size: 0.85em;\n  white-space: pre-wrap;\n  border: #E3EDF3 1px solid;\n  background: #F7FAFB;\n  border-radius: 2px;\n  -webkit-font-feature-settings: \"liga\" 0;\n  -moz-font-feature-settings: \"liga\" 0;\n  font-feature-settings: \"liga\" 0; }\n\npre {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 0 0 1.75em 0;\n  border: #E3EDF3 1px solid;\n  width: 100%;\n  padding: 10px;\n  font-family: Inconsolata, monospace, sans-serif;\n  font-size: 0.9em;\n  white-space: pre;\n  overflow: auto;\n  background: #F7FAFB;\n  border-radius: 3px; }\n\npre code, pre tt {\n  font-size: inherit;\n  white-space: pre-wrap;\n  background: transparent;\n  border: none;\n  padding: 0; }\n\nkbd {\n  display: inline-block;\n  margin-bottom: 0.4em;\n  padding: 1px 8px;\n  border: #CCC 1px solid;\n  color: #666;\n  text-shadow: #FFF 0 1px 0;\n  font-size: 0.9em;\n  font-weight: 700;\n  background: #F4F4F4;\n  border-radius: 4px;\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2), 0 1px 0 0 #fff inset; }\n\ntable {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  margin: 1.75em 0;\n  width: 100%;\n  max-width: 100%;\n  background-color: transparent; }\n\ntable th,\ntable td {\n  padding: 8px;\n  line-height: 20px;\n  text-align: left;\n  vertical-align: top;\n  border-top: #EFEFEF 1px solid; }\n\ntable th {\n  color: #000; }\n\ntable caption + thead tr:first-child th,\ntable caption + thead tr:first-child td,\ntable colgroup + thead tr:first-child th,\ntable colgroup + thead tr:first-child td,\ntable thead:first-child tr:first-child th,\ntable thead:first-child tr:first-child td {\n  border-top: 0; }\n\ntable tbody + tbody {\n  border-top: #EFEFEF 2px solid; }\n\ntable table table {\n  background-color: #FFF; }\n\ntable tbody > tr:nth-child(odd) > td,\ntable tbody > tr:nth-child(odd) > th {\n  background-color: #F6F6F6; }\n\ntable.plain tbody > tr:nth-child(odd) > td,\ntable.plain tbody > tr:nth-child(odd) > th {\n  background: transparent; }\n\niframe, .fluid-width-video-wrapper {\n  display: block;\n  margin: 1.75em 0; }\n\n/* When a video is inside the fitvids wrapper, drop the\nmargin on the iframe, cause it breaks stuff. */\n.fluid-width-video-wrapper iframe {\n  margin: 0; }\n\ntextarea, select, input {\n  width: 260px;\n  padding: 6px 9px;\n  margin: 0 0 5px 0;\n  outline: 0;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 1.6rem;\n  font-weight: 100;\n  line-height: 1.4em;\n  background: #fff;\n  border: #e7eef2 1px solid;\n  border-radius: 4px;\n  box-shadow: none;\n  -webkit-appearance: none; }\n\ntextarea {\n  width: 100%;\n  max-width: 340px;\n  min-width: 250px;\n  height: auto;\n  min-height: 80px; }\n\ninput[type=\"text\"]:focus,\ninput[type=\"email\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"date\"]:focus,\ninput[type=\"month\"]:focus,\ninput[type=\"week\"]:focus,\ninput[type=\"time\"]:focus,\ninput[type=\"datetime\"]:focus,\ninput[type=\"datetime-local\"]:focus,\ntextarea:focus {\n  border: #bbc7cc 1px solid;\n  background: #fff;\n  outline: none;\n  outline-width: 0; }\n\nselect {\n  width: 270px;\n  height: 30px;\n  line-height: 30px; }\n\nbutton {\n  min-height: 35px;\n  width: auto;\n  display: inline-block;\n  padding: 0.1rem 1.5rem;\n  cursor: pointer;\n  outline: none;\n  text-decoration: none;\n  color: #fff;\n  font-family: 'Open Sans', sans-serif;\n  font-size: 11px;\n  /* Hacks targeting Firefox. */\n  line-height: 13px;\n  /* Hacks targeting Firefox. */\n  font-weight: 300;\n  text-align: center;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  text-shadow: none;\n  border-radius: 0.3rem;\n  border: rgba(0, 0, 0, 0.05) 0.1em solid;\n  background: #5ba4e5; }\n\n/* ==========================================================================\n   3. Utilities - These things get used a lot\n   ========================================================================== */\n/* Clears shit */\n.clearfix:before,\n.clearfix:after {\n  content: \" \";\n  display: table; }\n\n.clearfix:after {\n  clear: both; }\n\n.clearfix {\n  zoom: 1; }\n\n/* Hides shit */\n.hidden {\n  text-indent: -9999px;\n  visibility: hidden;\n  display: none; }\n\n/* Creates a responsive wrapper that makes our content scale nicely */\n.inner {\n  position: relative;\n  width: 80%;\n  max-width: 710px;\n  margin: 0 auto; }\n\n/* Centres vertically yo. (IE8+) */\n.vertical {\n  display: table-cell;\n  vertical-align: middle; }\n\n/* Wraps the main content & footer */\n.site-wrapper {\n  position: relative;\n  z-index: 10;\n  min-height: 100%;\n  background: #fff;\n  -webkit-transition: -webkit-transform 0.5s ease;\n  transition: transform 0.5s ease; }\n\nbody.nav-opened .site-wrapper {\n  overflow-x: hidden;\n  -webkit-transform: translate3D(-240px, 0, 0);\n  -ms-transform: translate3D(-240px, 0, 0);\n  transform: translate3D(-240px, 0, 0);\n  -webkit-transition: -webkit-transform 0.3s ease;\n  transition: transform 0.3s ease; }\n\n/* ==========================================================================\n   4. General - The main styles for the the theme\n   ========================================================================== */\n/* Big cover image on the home page */\n.main-header {\n  position: relative;\n  display: table;\n  width: 100%;\n  height: 100vh;\n  margin-bottom: 5rem;\n  text-align: center;\n  background: #222 no-repeat center center;\n  background-size: cover;\n  overflow: hidden; }\n\n.main-header .inner {\n  width: 80%; }\n\n.main-nav {\n  position: relative;\n  padding: 35px 40px;\n  margin: 0 0 30px 0; }\n\n.main-nav a {\n  text-decoration: none;\n  font-family: 'Open Sans', sans-serif; }\n\n/* Navigation */\nbody.nav-opened .nav-cover {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 240px;\n  bottom: 0;\n  z-index: 200; }\n\n.nav {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 5;\n  width: 240px;\n  opacity: 0;\n  background: #111;\n  margin-bottom: 0;\n  text-align: left;\n  overflow-y: auto;\n  -webkit-transition: -webkit-transform 0.5s ease, opacity 0.3s ease 0.7s;\n  transition: transform 0.5s ease, opacity 0.3s ease 0.7s; }\n\nbody.nav-closed .nav {\n  -webkit-transform: translate3D(97px, 0, 0);\n  -ms-transform: translate3D(97px, 0, 0);\n  transform: translate3D(97px, 0, 0); }\n\nbody.nav-opened .nav {\n  opacity: 1;\n  -webkit-transition: -webkit-transform 0.3s ease, opacity 0s ease 0s;\n  transition: transform 0.3s ease, opacity 0s ease 0s;\n  -webkit-transform: translate3D(0, 0, 0);\n  -ms-transform: translate3D(0, 0, 0);\n  transform: translate3D(0, 0, 0); }\n\n.nav-title {\n  position: absolute;\n  top: 45px;\n  left: 30px;\n  font-size: 16px;\n  font-weight: 100;\n  text-transform: uppercase;\n  color: #fff; }\n\n.nav-close {\n  position: absolute;\n  top: 38px;\n  right: 25px;\n  width: 20px;\n  height: 20px;\n  padding: 0;\n  font-size: 10px; }\n\n.nav-close:focus {\n  outline: 0; }\n\n.nav-close:before,\n.nav-close:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  width: 20px;\n  height: 1px;\n  background: #969696;\n  top: 15px;\n  -webkit-transition: background 0.15s ease;\n  transition: background 0.15s ease; }\n\n.nav-close:before {\n  -webkit-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n.nav-close:after {\n  -webkit-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  transform: rotate(-45deg); }\n\n.nav-close:hover:before,\n.nav-close:hover:after {\n  background: white; }\n\n.nav ul {\n  padding: 90px 9% 5%;\n  list-style: none;\n  counter-reset: item; }\n\n.nav li:before {\n  display: block;\n  float: right;\n  padding-right: 4%;\n  padding-left: 5px;\n  text-align: right;\n  font-size: 1.2rem;\n  vertical-align: bottom;\n  color: #B8B8B8;\n  content: counter(item, lower-roman);\n  counter-increment: item; }\n\n.nav li {\n  margin: 0; }\n\n.nav li a {\n  text-decoration: none;\n  line-height: 1.4;\n  font-size: 1.4rem;\n  display: block;\n  padding: 0.6rem 4%;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis; }\n\n.nav li a:after {\n  display: inline-block;\n  content: \" .......................................................\";\n  color: rgba(255, 255, 255, 0.2);\n  margin-left: 5px; }\n\n.nav .nav-current:before {\n  color: #fff; }\n\n.nav .nav-current a:after {\n  content: \" \";\n  border-bottom: rgba(255, 255, 255, 0.5) 1px solid;\n  width: 100%;\n  height: 1px; }\n\n.nav a:link,\n.nav a:visited {\n  color: #B8B8B8; }\n\n.nav li.nav-current a,\n.nav a:hover,\n.nav a:active,\n.nav a:focus {\n  color: #fff; }\n\n.subscribe-button {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  bottom: 30px;\n  left: 30px;\n  right: 30px;\n  height: 38px;\n  padding: 0 20px;\n  color: #111 !important;\n  /* Overides `.nav a:link, .nav a:visited` colour */\n  text-align: center;\n  font-size: 12px;\n  font-family: \"Open Sans\", sans-serif;\n  text-transform: uppercase;\n  text-decoration: none;\n  line-height: 35px;\n  border-radius: 3px;\n  background: #fff;\n  transition: all ease 0.3s; }\n\n.subscribe-button:before {\n  font-size: 9px;\n  margin-right: 6px; }\n\n/* Create a bouncing scroll-down arrow on homepage with cover image */\n.scroll-down {\n  display: block;\n  position: absolute;\n  z-index: 100;\n  bottom: 45px;\n  left: 50%;\n  margin-left: -16px;\n  width: 34px;\n  height: 34px;\n  font-size: 34px;\n  text-align: center;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.7);\n  -webkit-transform: rotate(-90deg);\n  -ms-transform: rotate(-90deg);\n  transform: rotate(-90deg);\n  -webkit-animation: bounce 4s 2s infinite;\n  animation: bounce 4s 2s infinite; }\n\n/* Stop it bouncing and increase contrast when hovered */\n.scroll-down:hover {\n  color: #fff;\n  -webkit-animation: none;\n  animation: none; }\n\n/* Put a semi-opaque radial gradient behind the icon to make it more visible\n   on photos which happen to have a light background. */\n.home-template .main-header:after {\n  display: block;\n  content: \" \";\n  width: 150px;\n  height: 130px;\n  border-radius: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  margin-left: -75px;\n  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%, transparent 100%); }\n\n/* Hide when there's no cover image or on page2+ */\n.no-cover .scroll-down,\n.no-cover.main-header:after,\n.archive-template .scroll-down,\n.archive-template .main-header:after {\n  display: none; }\n\n/* Appears in the top left corner of your home page */\n.blog-logo {\n  display: block;\n  float: left;\n  background: none !important;\n  /* Makes sure there is never a background */\n  border: none !important;\n  /* Makes sure there is never a border */ }\n\n.blog-logo img {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  height: 38px;\n  padding: 1px 0 5px 0;\n  width: auto; }\n\n.menu-button {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: inline-block;\n  float: right;\n  height: 38px;\n  padding: 0 15px;\n  border-style: solid;\n  border-width: 1px;\n  opacity: 1;\n  text-align: center;\n  font-size: 12px;\n  text-transform: uppercase;\n  line-height: 35px;\n  white-space: nowrap;\n  border-radius: 3px;\n  transition: all 0.5s ease; }\n\n.menu-button:before {\n  font-size: 12px;\n  font-weight: bold;\n  margin-right: 6px;\n  position: relative;\n  top: 1px; }\n\n.menu-button:hover {\n  background: #fff; }\n\n.menu-button:focus {\n  outline: 0; }\n\n/* When the navigation is closed */\n.nav-closed .menu-button {\n  color: #fff;\n  border-color: rgba(255, 255, 255, 0.6); }\n\n.nav-closed .menu-button:hover {\n  color: #222; }\n\n/* When the navigation is closed and there is no cover image */\n.nav-closed .no-cover .menu-button {\n  border-color: #BFC8CD;\n  color: #9EABB3; }\n\n.nav-closed .no-cover .menu-button:hover {\n  border-color: #555;\n  color: #555; }\n\n/* When the navigation is opened */\n.nav-opened .menu-button {\n  padding: 0 12px;\n  background: #111;\n  border-color: #111;\n  color: #fff;\n  -webkit-transform: translate3D(94px, 0, 0);\n  -ms-transform: translate3D(94px, 0, 0);\n  transform: translate3D(94px, 0, 0);\n  transition: all 0.3s ease; }\n\n.nav-opened .menu-button .word {\n  opacity: 0;\n  transition: all 0.3s ease; }\n\n/* Special styles when overlaid on an image*/\n.main-nav.overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 70px;\n  border: none;\n  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, transparent 100%); }\n\n.no-cover .main-nav.overlay {\n  background: none; }\n\n/* The details of your blog. Defined in ghost/settings/ */\n.page-title {\n  margin: 10px 0 10px 0;\n  font-size: 5rem;\n  letter-spacing: -1px;\n  font-weight: 700;\n  font-family: \"Open Sans\", sans-serif;\n  color: #fff; }\n\n.page-description {\n  margin: 0;\n  font-size: 2rem;\n  line-height: 1.5em;\n  font-weight: 400;\n  font-family: \"Merriweather\", serif;\n  letter-spacing: 0.01rem;\n  color: rgba(255, 255, 255, 0.8); }\n\n.no-cover.main-header {\n  min-height: 160px;\n  max-height: 40vh;\n  background: #f5f8fa; }\n\n.no-cover .page-title {\n  color: rgba(0, 0, 0, 0.8); }\n\n.no-cover .page-description {\n  color: rgba(0, 0, 0, 0.5); }\n\n/* Add subtle load-in animation for content on the home page */\n.home-template .page-title {\n  -webkit-animation: fade-in-down 0.6s;\n  animation: fade-in-down 0.6s;\n  -webkit-animation-delay: 0.2s;\n  animation-delay: 0.2s; }\n\n.home-template .page-description {\n  -webkit-animation: fade-in-down 0.9s;\n  animation: fade-in-down 0.9s;\n  -webkit-animation-delay: 0.1s;\n  animation-delay: 0.1s; }\n\n/* Every post, on every page, gets this style on its <article> tag */\n.post {\n  position: relative;\n  width: 80%;\n  max-width: 710px;\n  margin: 4rem auto;\n  padding-bottom: 4rem;\n  border-bottom: #EBF2F6 1px solid;\n  word-wrap: break-word; }\n\n/* Add a little circle in the middle of the border-bottom on our .post\n   just for the lolz and stylepoints. */\n.post:after {\n  display: block;\n  content: \"\";\n  width: 7px;\n  height: 7px;\n  border: #E7EEF2 1px solid;\n  position: absolute;\n  bottom: -5px;\n  left: 50%;\n  margin-left: -5px;\n  background: #FFF;\n  border-radius: 100%;\n  box-shadow: #FFF 0 0 0 5px; }\n\nbody:not(.post-template) .post-title {\n  font-size: 3.6rem; }\n\n.post-title a {\n  text-decoration: none; }\n\n.post-excerpt p {\n  margin: 0;\n  font-size: 0.9em;\n  line-height: 1.7em; }\n\n.read-more {\n  text-decoration: none; }\n\n.post-meta {\n  display: block;\n  margin: 1.75rem 0 0 0;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 1.5rem;\n  line-height: 2.2rem;\n  color: #9EABB3; }\n\n.author-thumb {\n  width: 24px;\n  height: 24px;\n  float: left;\n  margin-right: 9px;\n  border-radius: 100%; }\n\n.post-meta a {\n  color: #9EABB3;\n  text-decoration: none; }\n\n.post-meta a:hover {\n  text-decoration: underline; }\n\n.user-meta {\n  position: relative;\n  padding: 0.3rem 40px 0 100px;\n  min-height: 77px; }\n\n.post-date {\n  display: inline-block;\n  margin-left: 8px;\n  padding-left: 12px;\n  border-left: #d5dbde 1px solid;\n  text-transform: uppercase;\n  font-size: 1.3rem;\n  white-space: nowrap; }\n\n.user-image {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.user-name {\n  display: block;\n  font-weight: 700; }\n\n.user-bio {\n  display: block;\n  max-width: 440px;\n  font-size: 1.4rem;\n  line-height: 1.5em; }\n\n.publish-meta {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 4.3rem 0 4rem 0;\n  text-align: right; }\n\n.publish-heading {\n  display: block;\n  font-weight: 700; }\n\n.publish-date {\n  display: block;\n  font-size: 1.4rem;\n  line-height: 1.5em; }\n\n/* ==========================================================================\n   5. Single Post - When you click on an individual post\n   ========================================================================== */\n.post-template .post-header {\n  margin-bottom: 3.4rem; }\n\n.post-template .post-title {\n  margin-bottom: 0; }\n\n.post-template .post-meta {\n  margin: 0; }\n\n.post-template .post-date {\n  padding: 0;\n  margin: 0;\n  border: none; }\n\n/* Stop elements, such as img wider than the post content, from\n   creating horizontal scroll - slight hack due to imperfections\n   with browser width % calculations and rounding */\n.post-template .content {\n  overflow: hidden; }\n\n/* Tweak the .post wrapper style */\n.post-template .post {\n  margin-top: 0;\n  border-bottom: none;\n  padding-bottom: 0; }\n\n/* Kill that stylish little circle that was on the border, too */\n.post-template .post:after {\n  display: none; }\n\n/* Keep images centered, and allow images wider than the main\n   text column to break out. */\n.post-content img {\n  display: block;\n  max-width: 126%;\n  height: auto;\n  padding: 0.6em 0;\n  /* Centers an image by (1) pushing its left edge to the\n       center of its container and (2) shifting the entire image\n       in the opposite direction by half its own width.\n       Works for images that are larger than their containers. */\n  position: relative;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  /* for Safari and iOS */\n  -ms-transform: translateX(-50%);\n  /* for IE9 */\n  transform: translateX(-50%); }\n\n.footnotes {\n  font-style: italic;\n  font-size: 1.3rem;\n  line-height: 1.6em; }\n\n.footnotes li {\n  margin: 0.6rem 0; }\n\n.footnotes p {\n  margin: 0; }\n\n.footnotes p a:last-child {\n  text-decoration: none; }\n\n/* The author credit area after the post */\n.post-footer {\n  position: relative;\n  margin: 6rem 0 0 0;\n  padding: 3rem 0 0 0;\n  border-top: #EBF2F6 1px solid; }\n\n.post-footer h4 {\n  font-size: 1.8rem;\n  margin: 0; }\n\n.post-footer p {\n  margin: 1rem 0;\n  font-size: 1.4rem;\n  line-height: 1.75em; }\n\n/* list of author links - location / url */\n.author-meta {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  font-size: 1.4rem;\n  line-height: 1;\n  font-style: italic;\n  color: #9EABB3; }\n\n.author-meta a {\n  color: #9EABB3; }\n\n.author-meta a:hover {\n  color: #111; }\n\n/* Create some space to the right for the share links */\n.post-footer .author {\n  margin-right: 180px; }\n\n.post-footer h4 a {\n  color: #2e2e2e;\n  text-decoration: none; }\n\n.post-footer h4 a:hover {\n  text-decoration: underline; }\n\n/* Drop the share links in the space to the right.\n   Doing it like this means it's easier for the author bio\n   to be flexible at smaller screen sizes while the share\n   links remain at a fixed width the whole time */\n.post-footer .share {\n  position: absolute;\n  top: 3rem;\n  right: 0;\n  width: 140px; }\n\n.post-footer .share a {\n  font-size: 1.8rem;\n  display: inline-block;\n  margin: 1rem 1.6rem 1.6rem 0;\n  color: #BBC7CC;\n  text-decoration: none; }\n\n.post-footer .share .icon-twitter:hover {\n  color: #55acee; }\n\n.post-footer .share .icon-facebook:hover {\n  color: #3b5998; }\n\n.post-footer .share .icon-google-plus:hover {\n  color: #dd4b39; }\n\n/* ==========================================================================\n   6. Author profile\n   ========================================================================== */\n.post-head.main-header {\n  height: 65vh;\n  min-height: 180px; }\n\n.no-cover.post-head.main-header {\n  height: 85px;\n  min-height: 0;\n  margin-bottom: 0;\n  background: transparent; }\n\n.tag-head.main-header {\n  height: 40vh;\n  min-height: 180px; }\n\n.author-head.main-header {\n  height: 40vh;\n  min-height: 180px; }\n\n.no-cover.author-head.main-header {\n  height: 10vh;\n  min-height: 100px;\n  background: transparent; }\n\n.author-profile {\n  padding: 0 15px 5rem 15px;\n  border-bottom: #EBF2F6 1px solid;\n  text-align: center; }\n\n/* Add a little circle in the middle of the border-bottom */\n.author-profile:after {\n  display: block;\n  content: \"\";\n  width: 7px;\n  height: 7px;\n  border: #E7EEF2 1px solid;\n  position: absolute;\n  bottom: -5px;\n  left: 50%;\n  margin-left: -5px;\n  background: #FFF;\n  border-radius: 100%;\n  box-shadow: #FFF 0 0 0 5px; }\n\n.author-image {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  display: block;\n  position: absolute;\n  top: -40px;\n  left: 50%;\n  margin-left: -40px;\n  width: 80px;\n  height: 80px;\n  border-radius: 100%;\n  overflow: hidden;\n  padding: 6px;\n  background: #fff;\n  z-index: 2;\n  box-shadow: #E7EEF2 0 0 0 1px; }\n\n.author-image .img {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-size: cover;\n  background-position: center center;\n  border-radius: 100%; }\n\n.author-profile .author-image {\n  position: relative;\n  left: auto;\n  top: auto;\n  width: 120px;\n  height: 120px;\n  padding: 3px;\n  margin: -100px auto 0 auto;\n  box-shadow: none; }\n\n.author-title {\n  margin: 1.5rem 0 1rem; }\n\n.author-bio {\n  font-size: 1.8rem;\n  line-height: 1.5em;\n  font-weight: 200;\n  color: #50585D;\n  letter-spacing: 0;\n  text-indent: 0; }\n\n.author-meta {\n  margin: 1.6rem 0; }\n\n/* Location, website, and link */\n.author-profile .author-meta {\n  margin: 2rem 0;\n  font-family: \"Merriweather\", serif;\n  letter-spacing: 0.01rem;\n  font-size: 1.7rem; }\n\n.author-meta span {\n  display: inline-block;\n  margin: 0 2rem 1rem 0;\n  word-wrap: break-word; }\n\n.author-meta a {\n  text-decoration: none; }\n\n/* Turn off meta for page2+ to make room for extra\n   pagination prev/next links */\n.archive-template .author-profile .author-meta {\n  display: none; }\n\n/* ==========================================================================\n   7. Read More - Next/Prev Post Links\n   ========================================================================== */\n.read-next {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  margin-top: 10rem; }\n\n.read-next-story {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n  -ms-flex-positive: 1;\n  flex-grow: 1;\n  min-width: 50%;\n  text-decoration: none;\n  position: relative;\n  text-align: center;\n  color: #fff;\n  background: #222 no-repeat center center;\n  background-size: cover;\n  overflow: hidden; }\n\n.read-next-story:hover:before {\n  background: rgba(0, 0, 0, 0.8);\n  transition: all 0.2s ease; }\n\n.read-next-story:hover .post:before {\n  color: #222;\n  background: #fff;\n  transition: all 0.2s ease; }\n\n.read-next-story:before {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.7);\n  transition: all 0.5s ease; }\n\n.read-next-story .post {\n  padding-top: 6rem;\n  padding-bottom: 6rem; }\n\n.read-next-story .post:before {\n  content: \"Read This Next\";\n  padding: 4px 10px 5px;\n  text-transform: uppercase;\n  font-size: 1.1rem;\n  font-family: \"Open Sans\", sans-serif;\n  color: rgba(255, 255, 255, 0.8);\n  border: rgba(255, 255, 255, 0.5) 1px solid;\n  border-radius: 4px;\n  transition: all 0.5s ease; }\n\n.read-next-story.prev .post:before {\n  content: \"You Might Enjoy\"; }\n\n.read-next-story h2 {\n  margin-top: 1rem;\n  color: #fff; }\n\n.read-next-story p {\n  margin: 0;\n  color: rgba(255, 255, 255, 0.8); }\n\n/* Special styles for posts with no cover images */\n.read-next-story.no-cover {\n  background: #f5f8fa; }\n\n.read-next-story.no-cover:before {\n  display: none; }\n\n.read-next-story.no-cover .post:before {\n  color: rgba(0, 0, 0, 0.5);\n  border-color: rgba(0, 0, 0, 0.2); }\n\n.read-next-story.no-cover h2 {\n  color: rgba(0, 0, 0, 0.8); }\n\n.read-next-story.no-cover p {\n  color: rgba(0, 0, 0, 0.5); }\n\n/* if there are two posts without covers, put a border between them */\n.read-next-story.no-cover + .read-next-story.no-cover {\n  border-left: rgba(0, 0, 100, 0.04) 1px solid;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n/* Correctly position site-footer when next to the .read-next container */\n.read-next + .site-footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: 0; }\n\n/* ==========================================================================\n   8. Third Party Elements - Embeds from other services\n   ========================================================================== */\n/* Github */\n.gist table {\n  margin: 0;\n  font-size: 1.4rem;\n  text-rendering: auto; }\n\n.gist td {\n  line-height: 1.4; }\n\n.gist .line-number {\n  min-width: 25px; }\n\n/* Pastebin */\n.content .embedPastebin {\n  margin-bottom: 1.75em; }\n\n/* ==========================================================================\n   9. Pagination - Tools to let you flick between pages\n   ========================================================================== */\n/* The main wrapper for our pagination links */\n.pagination {\n  position: relative;\n  width: 80%;\n  max-width: 710px;\n  margin: 4rem auto;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 1.3rem;\n  color: #9EABB3;\n  text-align: center; }\n\n.pagination a {\n  color: #9EABB3;\n  transition: all 0.2s ease; }\n\n/* Push the previous/next links out to the left/right */\n.older-posts,\n.newer-posts {\n  position: absolute;\n  display: inline-block;\n  padding: 0 15px;\n  border: #bfc8cd 1px solid;\n  text-decoration: none;\n  border-radius: 4px;\n  transition: border 0.3s ease; }\n\n.older-posts {\n  right: 0; }\n\n.page-number {\n  display: inline-block;\n  padding: 2px 0;\n  min-width: 100px; }\n\n.newer-posts {\n  left: 0; }\n\n.older-posts:hover,\n.newer-posts:hover {\n  color: #889093;\n  border-color: #98a0a4; }\n\n.extra-pagination {\n  display: none;\n  border-bottom: #EBF2F6 1px solid; }\n\n.extra-pagination:after {\n  display: block;\n  content: \"\";\n  width: 7px;\n  height: 7px;\n  border: #E7EEF2 1px solid;\n  position: absolute;\n  bottom: -5px;\n  left: 50%;\n  margin-left: -5px;\n  background: #FFF;\n  border-radius: 100%;\n  box-shadow: #FFF 0 0 0 5px; }\n\n.extra-pagination .pagination {\n  width: auto; }\n\n/* On page2+ make all the headers smaller */\n.archive-template .main-header {\n  max-height: 30vh; }\n\n/* On page2+ show extra pagination controls at the top of post list */\n.archive-template .extra-pagination {\n  display: block; }\n\n/* ==========================================================================\n   10. Subscribe - Generate those email subscribers\n   ========================================================================== */\n.gh-subscribe {\n  border: #e7eef2 1px solid;\n  padding: 3rem;\n  margin-top: 3rem;\n  text-align: center;\n  background: #f5f8fa;\n  border-radius: 5px; }\n\n.gh-subscribe-title {\n  margin-bottom: 0;\n  font-size: 2.4rem; }\n\n.gh-subscribe p {\n  margin-top: 0;\n  font-size: 1.5rem; }\n\n.gh-subscribe form {\n  display: flex;\n  justify-content: center;\n  margin: 20px 0 0 0; }\n\n.gh-subscribe .form-group {\n  flex-grow: 1;\n  max-width: 300px; }\n\n.gh-subscribe .subscribe-email {\n  box-sizing: border-box;\n  width: 100%;\n  margin: 0;\n  border-radius: 4px 0 0 4px;\n  transition: all ease 0.5s; }\n\n.gh-subscribe .subscribe-email:focus {\n  border: #5ba4e5 1px solid;\n  transition: all ease 0.2s; }\n\n.gh-subscribe button {\n  margin-left: -1px;\n  border-radius: 0 4px 4px 0; }\n\n.gh-subscribe-rss {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 1.2rem;\n  line-height: 1.4em; }\n\n/* ==========================================================================\n   11. Footer - The bottom of every page\n   ========================================================================== */\n.site-footer {\n  position: relative;\n  margin: 8rem 0 0 0;\n  padding: 1rem 15px;\n  font-family: \"Open Sans\", sans-serif;\n  font-size: 1rem;\n  line-height: 1.75em;\n  color: #BBC7CC; }\n\n.site-footer a {\n  color: #BBC7CC;\n  text-decoration: none;\n  font-weight: bold; }\n\n.site-footer a:hover {\n  border-bottom: #bbc7cc 1px solid; }\n\n.poweredby {\n  display: block;\n  width: 45%;\n  float: right;\n  text-align: right; }\n\n.copyright {\n  display: block;\n  width: 45%;\n  float: left; }\n\n/* ==========================================================================\n   12. Media Queries - Smaller than 900px\n   ========================================================================== */\n@media only screen and (max-width: 900px) {\n  blockquote {\n    margin-left: 0; }\n  .main-header {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    height: auto;\n    min-height: 240px;\n    height: 60vh;\n    padding: 15% 0; }\n  .scroll-down,\n  .home-template .main-header:after {\n    display: none; }\n  .archive-template .main-header {\n    min-height: 180px;\n    padding: 10% 0; }\n  .blog-logo img {\n    padding: 4px 0; }\n  .page-title {\n    font-size: 4rem;\n    letter-spacing: -1px; }\n  .page-description {\n    font-size: 1.8rem;\n    line-height: 1.5em; }\n  .post {\n    font-size: 0.95em; }\n  body:not(.post-template) .post-title {\n    font-size: 3.2rem; }\n  hr {\n    margin: 2.4em 0; }\n  ol, ul {\n    padding-left: 2em; }\n  h1 {\n    font-size: 4.5rem;\n    text-indent: -2px; }\n  h2 {\n    font-size: 3.6rem; }\n  h3 {\n    font-size: 3.1rem; }\n  h4 {\n    font-size: 2.5rem; }\n  h5 {\n    font-size: 2.2rem; }\n  h6 {\n    font-size: 1.8rem; }\n  .author-profile {\n    padding-bottom: 4rem; }\n  .author-profile .author-bio {\n    font-size: 1.6rem; }\n  .author-meta span {\n    display: block;\n    margin: 1.5rem 0; }\n  .author-profile .author-meta span {\n    font-size: 1.6rem; }\n  .post-head.main-header {\n    height: 45vh; }\n  .tag-head.main-header,\n  .author-head.main-header {\n    height: 30vh; }\n  .no-cover.post-head.main-header {\n    height: 55px;\n    padding: 0; }\n  .no-cover.author-head.main-header {\n    padding: 0; }\n  .gh-subscribe {\n    padding: 2rem; }\n  .gh-subscribe-title {\n    font-size: 2rem; }\n  .gh-subscribe p {\n    font-size: 1.4rem; }\n  .read-next {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    margin-top: 4rem; }\n  .read-next p {\n    display: none; }\n  .read-next-story.no-cover + .read-next-story.no-cover {\n    border-top: rgba(0, 0, 100, 0.06) 1px solid;\n    border-left: none; } }\n\n/* ==========================================================================\n   13. Media Queries - Smaller than 500px\n   ========================================================================== */\n@media only screen and (max-width: 500px) {\n  .main-header {\n    margin-bottom: 15px;\n    height: 40vh; }\n  .no-cover.main-header {\n    height: 30vh; }\n  .archive-template .main-header {\n    max-height: 20vh;\n    min-height: 160px;\n    padding: 10% 0; }\n  .main-nav {\n    padding: 5px;\n    margin-bottom: 2rem; }\n  .blog-logo {\n    padding: 5px; }\n  .blog-logo img {\n    height: 30px; }\n  .menu-button {\n    padding: 0 5px;\n    border-radius: 0;\n    border-width: 0;\n    color: #2e2e2e;\n    background: transparent; }\n  .menu-button:hover {\n    color: #2e2e2e;\n    border-color: transparent;\n    background: none; }\n  body.nav-opened .menu-button {\n    background: none;\n    border: transparent; }\n  .main-nav.overlay a:hover {\n    color: #fff;\n    border-color: transparent;\n    background: transparent; }\n  .no-cover .main-nav.overlay {\n    background: none; }\n  .no-cover .main-nav.overlay .menu-button {\n    border: none; }\n  .main-nav.overlay .menu-button {\n    border-color: transparent; }\n  .nav-title {\n    top: 25px; }\n  .nav-close {\n    position: absolute;\n    top: 18px; }\n  .nav ul {\n    padding: 60px 9% 5%; }\n  .inner,\n  .pagination {\n    width: auto;\n    margin: 2rem auto; }\n  .post {\n    width: auto;\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n    margin-left: 16px;\n    margin-right: 16px;\n    padding-bottom: 2rem;\n    line-height: 1.65em; }\n  .post-date {\n    display: none; }\n  .post-template .post-header {\n    margin-bottom: 2rem; }\n  .post-template .post-date {\n    display: inline-block; }\n  hr {\n    margin: 1.75em 0; }\n  p, ul, ol, dl {\n    font-size: 0.95em;\n    margin: 0 0 2.5rem 0; }\n  .page-title {\n    font-size: 3rem; }\n  .post-excerpt p {\n    font-size: 0.85em; }\n  .page-description {\n    font-size: 1.6rem; }\n  h1, h2, h3,\n  h4, h5, h6 {\n    margin: 0 0 0.3em 0; }\n  h1 {\n    font-size: 2.8rem;\n    letter-spacing: -1px; }\n  h2 {\n    font-size: 2.4rem;\n    letter-spacing: 0; }\n  h3 {\n    font-size: 2.1rem; }\n  h4 {\n    font-size: 1.9rem; }\n  h5 {\n    font-size: 1.8rem; }\n  h6 {\n    font-size: 1.8rem; }\n  body:not(.post-template) .post-title {\n    font-size: 2.5rem; }\n  .post-template .site-footer {\n    margin-top: 0; }\n  .post-content img {\n    padding: 0;\n    width: calc(100% + 32px);\n    /* expand with to image + margins */\n    min-width: 0;\n    max-width: 112%;\n    /* fallback when calc doesn't work */ }\n  .post-meta {\n    font-size: 1.3rem;\n    margin-top: 1rem; }\n  .post-footer {\n    padding: 5rem 0 3rem 0;\n    text-align: center; }\n  .post-footer .author {\n    margin: 0 0 2rem 0;\n    padding: 0 0 1.6rem 0;\n    border-bottom: #EBF2F6 1px dashed; }\n  .post-footer .share {\n    position: static;\n    width: auto; }\n  .post-footer .share a {\n    margin: 1.4rem 0.8rem 0 0.8rem; }\n  .author-meta li {\n    float: none;\n    margin: 0;\n    line-height: 1.75em; }\n  .author-meta li:before {\n    display: none; }\n  .older-posts,\n  .newer-posts {\n    position: static;\n    margin: 10px 0; }\n  .page-number {\n    display: block; }\n  .site-footer {\n    margin-top: 3rem; }\n  .author-profile {\n    padding-bottom: 2rem; }\n  .post-head.main-header {\n    height: 30vh; }\n  .tag-head.main-header,\n  .author-head.main-header {\n    height: 20vh; }\n  .post-footer .author-image {\n    top: -60px; }\n  .author-profile .author-image {\n    margin-top: -70px; }\n  .author-profile .author-meta span {\n    font-size: 1.4rem; }\n  .archive-template .main-header .page-description {\n    display: none; }\n  .gh-subscribe {\n    padding: 15px; }\n  .gh-subscribe form {\n    margin-top: 10px; }\n  .read-next {\n    margin-top: 2rem;\n    margin-bottom: -37px; }\n  .read-next .post {\n    width: 100%; } }\n\n/* ==========================================================================\n   14. Animations\n   ========================================================================== */\n/* Used to fade in title/desc on the home page */\n@-webkit-keyframes fade-in-down {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n@keyframes fade-in-down {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n/* Used to bounce .scroll-down on home page */\n@-webkit-keyframes bounce {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateY(0) rotate(-90deg);\n    transform: translateY(0) rotate(-90deg); }\n  20% {\n    -webkit-transform: translateY(-10px) rotate(-90deg);\n    transform: translateY(-10px) rotate(-90deg); }\n  30% {\n    -webkit-transform: translateY(-5px) rotate(-90deg);\n    transform: translateY(-5px) rotate(-90deg); } }\n\n@keyframes bounce {\n  0%, 10%, 25%, 40%, 50% {\n    -webkit-transform: translateY(0) rotate(-90deg);\n    transform: translateY(0) rotate(-90deg); }\n  20% {\n    -webkit-transform: translateY(-10px) rotate(-90deg);\n    transform: translateY(-10px) rotate(-90deg); }\n  30% {\n    -webkit-transform: translateY(-5px) rotate(-90deg);\n    transform: translateY(-5px) rotate(-90deg); } }\n\n/* ==========================================================================\n   End of file. Animations should be the last thing here. Do not add stuff\n   below this point, or it will probably fuck everything up.\n   ========================================================================== */\n"; });
define('text!resources/elements/pagination.css', ['module'], function(module) { module.exports = ""; });
define('text!posts/post-in-list.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/excerpt\"></require>\n<require\n  from=\"resources/value-converters/date-format\"></require>\n<require\n  from=\"../tags/tags-flat-list\"></require>\n<article\n  class=\"post\">\n  <header\n    class=\"post-header\">\n    <h2\n      class=\"post-title\"><a href=\"${post.url}\">${post.title}</a></h2>\n  </header>\n  <section class=\"post-excerpt\">\n    <p>\n      ${post.html|excerpt:{ length: 26, type: 'words' }}\n      <a\n        class=\"read-more\" href=\"${post.url}\">&raquo;</a>\n    </p>\n  </section>\n  <footer\n    class=\"post-meta\">\n    <img\n      if.bind=\"post.author.image\"\n      class=\"author-thumb\"\n      src.bind=\"post.author.image\"\n      alt.bind=\"post.author.name\"\n      nopin=\"nopin\" />\n      ${post.author.name}\n      on\n      <tags-flat-list\n        tags.bind=\"post.tags\"></tags-flat-list>\n      <time\n        class=\"post-date\"\n        datetime=\"${date|dateFormat:'YYYY-MM-DD'}\">\n        ${date|dateFormat:'DD MMMM YYYY'}\n      </time>\n  </footer>\n</article>\n</template>\n"; });
define('text!posts/post.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/date-format\"></require>\n<require\n  from=\"../tags/tags-flat-list\"></require>\n<require\n  from=\"./author\"></require>\n<require\n  from=\"./share\"></require>\n<require\n  from=\"./subscribe\"></require>\n<require\n  from=\"./continue-reading\"></require>\n<main\n  class=\"content\"\n  role=\"main\">\n  <article\n    class=\"post\">\n\n    <header\n      class=\"post-header\">\n      <h1\n        class=\"post-title\">${post.title}</h1>\n      <section\n        class=\"post-meta\">\n        <time\n          class=\"post-date\"\n          datetime=\"${post.date|dateFormat:'YYYY-MM-DD'}\">\n          ${post.date|dateFormat:'DD MMMM YYYY'}\n        </time>\n        on\n        <tags-flat-list\n          tags.bind=\"post.tags\"></tags-flat-list>\n      </section>\n    </header>\n\n    <section\n      class=\"post-content\"\n      innerHTML.bind=\"post.html\"></section>\n\n    <footer\n      class=\"post-footer\">\n      <author\n        author.bind=\"post.author\"></author>\n      <share\n        post.bind=\"post\"></share>\n      <subscribe\n        if.bind=\"labs.subscribers\"></subscribe>\n    </footer>\n\n  </article>\n</main>\n\n<continue-reading\n  current.bind=\"post\"></continue-reading>\n\n</template>\n"; });
define('text!posts/share.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/encode\"></require>\n<require\n  from=\"resources/value-converters/absolute-url\"></require>\n<require\n  from=\"resources/attributes/popup\"></require>\n<section\n  class=\"share\">\n  <h4>Share this post</h4>\n  <a\n    class=\"icon-twitter\"\n    href=\"https://twitter.com/intent/tweet?text=${post.title|encode}&amp;url=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Twitter</span>\n  </a>\n  <a\n    class=\"icon-facebook\"\n    href=\"https://www.facebook.com/sharer/sharer.php?u=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Facebook</span>\n  </a>\n  <a\n    class=\"icon-google-plus\"\n    href=\"https://plus.google.com/share?url=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Google+</span>\n  </a>\n</section>\n</template>\n"; });
define('text!posts/subscribe.html', ['module'], function(module) { module.exports = "<template>\n<section\n  class=\"gh-subscribe\">\n  <h3\n    class=\"gh-subscribe-title\">Subscribe to ${blog.title}</h3>\n  <p>Get the latest posts delivered right to your inbox.</p>\n  <form></form>\n  <span\n    class=\"gh-subscribe-rss\">or subscribe <a href=\"http://cloud.feedly.com/#subscription/feed/${blog.url}/rss/\">via RSS</a> with Feedly!</span>\n</section>\n</template>\n"; });
define('text!tags/tags-flat-list.html', ['module'], function(module) { module.exports = "<template>\n<span\n  repeat.for=\"tag of tags\">\n  <a\n    route-href=\"route: tag; params.bind: { tag: tag.slug }\">${tag.name}</a><span\n    if.bind=\"!$last\">, </span>\n</span>\n</template>\n"; });
define('text!resources/elements/pagination.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./pagination.css\"></require>\n<div>\n  <ul\n    class=\"pagination\">\n    <li\n      class=\"paginate_button previous ${current == 1 ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != 1) && navigateTo($event, current - 1)\">Previous</a>\n    </li>\n    <li\n      class=\"\n        paginate_button\n        ${current == page ? 'active' : ''}\n        ${loading == page ? 'loading' : ''}\"\n      repeat.for=\"page of pages\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"navigateTo($event, page)\">${page}</a>\n    </li>\n    <li\n      class=\"paginate_button next ${current == lastPage ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != lastPage) && navigateTo($event, current + 1)\">Next</a>\n    </li>\n  </ul>\n</div>\n</template>\n"; });
define('text!resources/elements/main-header.html', ['module'], function(module) { module.exports = "<template>\n<header\n  class=\"main-header post-head ${cover ? '' : 'no-cover'}\"\n  css=\"background-image: url(${cover})\">\n  <nav\n    class=\"main-nav clearfix ${cover ? 'overlay' : ''}\">\n    <a\n      if.bind=\"blog.logo\"\n      class=\"blog-logo\"\n      route-href=\"route: home\">\n      <img\n        src.bind=\"blog.logo\"\n        alt.bind=\"blog.title\" />\n    </a>\n    <a\n      if.bind=\"blog.navigation\"\n      class=\"menu-button icon-menu\"\n      href=\"#\">\n      <span\n        class=\"word\">Menu</span>\n    </a>\n  </nav>\n</header>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map