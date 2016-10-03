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
        moduleId: './posts/post'
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

                this.post = results.posts[0];

                console.log(this.post);

              case 7:
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!resources/elements/pagination.css', ['module'], function(module) { module.exports = ""; });
define('text!posts/author.html', ['module'], function(module) { module.exports = "<template>\n<figure\n  if.bind=\"author.image\"\n  class=\"author-image\">\n  <a\n    class=\"img\"\n    href.bind=\"author.url\"\n    css=\"background-image: url(${author.image})\">\n    <span\n      class=\"hidden\">${author.name}'s Picture</span>\n  </a>\n</figure>\n<section\n  class=\"author\">\n  <h4>\n    <a\n      href.bind=\"author.url\">${author.name}\n    </a>\n  </h4>\n  <p\n    if.bind=\"author.bio\">${author.bio}</p>\n  <p\n    if.bind=\"!author.bio\">Read <a href.bind=\"author.url\">more posts</a> by this author.</p>\n  <div\n    class=\"author-meta\">\n    <span\n      if.bind=\"author.location\"\n      class=\"author-location icon-location\">\n      ${author.location}\n    </span>\n    <span\n      if.bind=\"author.website\"\n      class=\"author-link icon-link\">\n      <a\n        href=\"${author.website}\">${author.website}\n      </a>\n    </span>\n  </div>\n</section>\n\n</template>\n"; });
define('text!posts/continue-reading.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/excerpt\"></require>\n<aside\n  class=\"read-next\">\n  <a\n    if.bind=\"next\"\n    class=\"read-next-story ${next.image ? '' : 'no-cover'}\"\n    css=\"background-image: url(${next.image})\"\n    href=\"${next.url}\">\n    <section\n      class=\"post\">\n      <h2>${next.title}</h2>\n      <p>${next.html|excerpt:{ length: 19, type: 'words' }}&hellip;</p>\n    </section>\n  </a>\n  <a\n    if.bind=\"previous\"\n    class=\"read-next-story ${previous.image ? '' : 'no-cover'}\"\n    css=\"background-image: url(${previous.image})\"\n    href=\"${previous.url}\">\n    <section\n      class=\"post\">\n      <h2>${previous.title}</h2>\n      <p>${previous.html|excerpt:{ length: 19, type: 'words' }}&hellip;</p>\n    </section>\n  </a>\n</aside>\n</template>\n"; });
define('text!posts/list.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/elements/pagination\"></require>\n<require\n  from=\"./post-in-list\"></require>\n\n<pagination\n  total.bind=\"total\"\n  per-page.bind=\"perPage\"\n  current.bind=\"current\"\n  navigate.call=\"navigate($event)\"></pagination>\n\n<post-in-list\n  repeat.for=\"post of posts\"\n  post.bind=\"post\"></post-in-list>\n\n<pagination\n  total.bind=\"total\"\n  per-page.bind=\"perPage\"\n  current.bind=\"current\"\n  navigate.call=\"navigate($event)\"></pagination>\n</template>\n"; });
define('text!posts/post-in-list.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/excerpt\"></require>\n<require\n  from=\"resources/value-converters/date-format\"></require>\n<require\n  from=\"../tags/tags-flat-list\"></require>\n<article\n  class=\"post\">\n  <header\n    class=\"post-header\">\n    <h2\n      class=\"post-title\"><a href=\"${post.url}\">${post.title}</a></h2>\n  </header>\n  <section class=\"post-excerpt\">\n    <p>\n      ${post.html|excerpt:{ length: 26, type: 'words' }}\n      <a\n        class=\"read-more\" href=\"${post.url}\">&raquo;</a>\n    </p>\n  </section>\n  <footer\n    class=\"post-meta\">\n    <img\n      if.bind=\"post.author.image\"\n      class=\"author-thumb\"\n      src.bind=\"post.author.image\"\n      alt.bind=\"post.author.name\"\n      nopin=\"nopin\" />\n      ${post.author.name}\n      on\n      <tags-flat-list\n        tags.bind=\"post.tags\"></tags-flat-list>\n      <time\n        class=\"post-date\"\n        datetime=\"${date|dateFormat:'YYYY-MM-DD'}\">\n        ${date|dateFormat:'DD MMMM YYYY'}\n      </time>\n  </footer>\n</article>\n</template>\n"; });
define('text!posts/post.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/date-format\"></require>\n<require\n  from=\"../tags/tags-flat-list\"></require>\n<require\n  from=\"./author\"></require>\n<require\n  from=\"./share\"></require>\n<require\n  from=\"./subscribe\"></require>\n<require\n  from=\"./continue-reading\"></require>\n<main\n  class=\"content\"\n  role=\"main\">\n  <article\n    class=\"post\">\n\n    <header\n      class=\"post-header\">\n      <h1\n        class=\"post-title\">${post.title}</h1>\n      <section\n        class=\"post-meta\">\n        <time\n          class=\"post-date\"\n          datetime=\"${post.date|dateFormat:'YYYY-MM-DD'}\">\n          ${post.date|dateFormat:'DD MMMM YYYY'}\n        </time>\n        on\n        <tags-flat-list\n          tags.bind=\"post.tags\"></tags-flat-list>\n      </section>\n    </header>\n\n    <section\n      class=\"post-content\"\n      innerHTML.bind=\"post.html\"></section>\n\n    <footer\n      class=\"post-footer\">\n      <author\n        author.bind=\"post.author\"></author>\n      <share\n        post.bind=\"post\"></share>\n      <subscribe\n        if.bind=\"labs.subscribers\"></subscribe>\n    </footer>\n\n  </article>\n</main>\n\n<continue-reading\n  current.bind=\"post\"></continue-reading>\n\n</template>\n"; });
define('text!posts/share.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"resources/value-converters/encode\"></require>\n<require\n  from=\"resources/value-converters/absolute-url\"></require>\n<require\n  from=\"resources/attributes/popup\"></require>\n<section\n  class=\"share\">\n  <h4>Share this post</h4>\n  <a\n    class=\"icon-twitter\"\n    href=\"https://twitter.com/intent/tweet?text=${post.title|encode}&amp;url=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Twitter</span>\n  </a>\n  <a\n    class=\"icon-facebook\"\n    href=\"https://www.facebook.com/sharer/sharer.php?u=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Facebook</span>\n  </a>\n  <a\n    class=\"icon-google-plus\"\n    href=\"https://plus.google.com/share?url=${post.url|absoluteUrl}\"\n    popup>\n    <span class=\"hidden\">Google+</span>\n  </a>\n</section>\n</template>\n"; });
define('text!posts/subscribe.html', ['module'], function(module) { module.exports = "<template>\n<section\n  class=\"gh-subscribe\">\n  <h3\n    class=\"gh-subscribe-title\">Subscribe to ${blog.title}</h3>\n  <p>Get the latest posts delivered right to your inbox.</p>\n  <form></form>\n  <span\n    class=\"gh-subscribe-rss\">or subscribe <a href=\"http://cloud.feedly.com/#subscription/feed/${blog.url}/rss/\">via RSS</a> with Feedly!</span>\n</section>\n</template>\n"; });
define('text!tags/tags-flat-list.html', ['module'], function(module) { module.exports = "<template>\n<span\n  repeat.for=\"tag of tags\">\n  <a\n    route-href=\"route: tag; params.bind: { tag: tag.slug }\">${tag.name}</a><span\n    if.bind=\"!$last\">, </span>\n</span>\n</template>\n"; });
define('text!resources/elements/pagination.html', ['module'], function(module) { module.exports = "<template>\n<require\n  from=\"./pagination.css\"></require>\n<div>\n  <ul\n    class=\"pagination\">\n    <li\n      class=\"paginate_button previous ${current == 1 ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != 1) && navigateTo($event, current - 1)\">Previous</a>\n    </li>\n    <li\n      class=\"\n        paginate_button\n        ${current == page ? 'active' : ''}\n        ${loading == page ? 'loading' : ''}\"\n      repeat.for=\"page of pages\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"navigateTo($event, page)\">${page}</a>\n    </li>\n    <li\n      class=\"paginate_button next ${current == lastPage ? 'disabled' : ''}\">\n      <a\n        href=\"#\"\n        tabindex=\"0\"\n        click.delegate=\"(current != lastPage) && navigateTo($event, current + 1)\">Next</a>\n    </li>\n  </ul>\n</div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map