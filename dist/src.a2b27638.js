// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/config/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// allow for creating elements without any options with default params.
var _default = function _default(tagName) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children;

  // Create an object that doesn't inherit from Obj with no proto props.
  var vElem = Object.create(null);
  Object.assign(vElem, {
    tagName: tagName,
    attrs: attrs,
    children: children
  });
  return vElem;
};

exports.default = _default;
},{}],"src/config/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Translate our virtual dom elements to real DOM Nodes.
var render = function render(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

var renderElem = function renderElem(_ref) {
  var tagName = _ref.tagName,
      attrs = _ref.attrs,
      children = _ref.children;
  // create the element
  var $el = document.createElement(tagName); // add all attribute as specified

  var _arr = Object.entries(attrs);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];

    $el.setAttribute(k, v);
  } // append all children recursively.


  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;
      $el.appendChild(render(child));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return $el;
};

var _default = render;
exports.default = _default;
},{}],"src/config/mount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default($node, $target) {
  $target.replaceWith($node);
  return $node;
};

exports.default = _default;
},{}],"src/config/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// take in two arrays, return a 'zipped' array where it pushes an array with the
// i index of each array. Loops through the shortest array.
var zip = function zip(arr1, arr2) {
  var zipped = [];

  for (var i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    zipped.push([arr1[i], arr2[i]]);
  }

  return zipped;
}; // Method to diff the attributes of the old virtual dom and the new virtual dom.


var diffAttrs = function diffAttrs(oldAttrs, newAttrs) {
  var patches = []; // setting newAttrs

  var _arr = Object.entries(newAttrs);

  var _loop2 = function _loop2() {
    var _arr$_i = _slicedToArray(_arr[_i], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];

    patches.push(function ($node) {
      $node.setAttribute(k, v);
      return $node;
    });
  };

  for (var _i = 0; _i < _arr.length; _i++) {
    _loop2();
  } // removing attrs if they don't exist in the newattrs


  var _loop = function _loop(k) {
    if (!(k in newAttrs)) {
      patches.push(function ($node) {
        $node.removeAttribute(k);
        return $node;
      });
    }
  };

  for (var k in oldAttrs) {
    _loop(k);
  } // once called with $node, loop through all patches and return the updated node.


  return function ($node) {
    for (var _i2 = 0; _i2 < patches.length; _i2++) {
      var patch = patches[_i2];
      patch($node);
    }

    return $node;
  };
}; // Method to diff the children of the old virtual dom and the new virtual dom.


var diffChildren = function diffChildren(oldVChildren, newVChildren) {
  // loop through all children up to the oldchildren length. to check changes
  var childPatches = [];
  oldVChildren.forEach(function (oldVChild, i) {
    childPatches.push(diff(oldVChild, newVChildren[i]));
  }); // slice the newchildren array from the length of oldchildren since they are diffed in the previous method, then for each
  // additional child, create the functions that will append the child once ran through render (create real dom nodes)

  var additionalPatches = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop3 = function _loop3() {
      var additionalVChild = _step.value;
      additionalPatches.push(function ($node) {
        $node.appendChild((0, _render.default)(additionalVChild));
        return $node;
      });
    };

    for (var _iterator = newVChildren.slice(oldVChildren.length)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop3();
    } // since childPatches methods are expecting the $child, not $parent, we will get the childnodes for the parent and use the zip
    // method to return the matching patch as per index.

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return function ($parent) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = zip(childPatches, $parent.childNodes)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2),
            patch = _step2$value[0],
            $child = _step2$value[1];

        patch($child);
      } // for any remaining patches (zip func above ensures only new nodes are passed here) apply the patch

    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    for (var _i3 = 0; _i3 < additionalPatches.length; _i3++) {
      var patch = additionalPatches[_i3];
      patch($parent);
    }

    return $parent;
  };
};

var diff = function diff(oldVTree, newVTree) {
  // let's assume oldVTree is not undefined!
  if (newVTree === undefined) {
    return function ($node) {
      $node.remove(); // the patch should return the new root node. since there is none in this case,
      // we will just return undefined.

      return undefined;
    };
  }

  if (typeof oldVTree === "string" || typeof newVTree === "string") {
    if (oldVTree !== newVTree) {
      // could be 2 cases:
      // 1. both trees are string and they have different values
      // 2. one of the trees is text node and the other one is elem node
      // Either case, we will just render(newVTree)!
      return function ($node) {
        var $newNode = (0, _render.default)(newVTree);
        $node.replaceWith($newNode);
        return $newNode;
      };
    } // this means that both trees are string and they have the same values
    else {
        return function ($node) {
          return $node;
        };
      }
  } // we assume that they are totally different and will not attempt to find the differences.
  // simply render the newVTree and mount it.


  if (oldVTree.tagName !== newVTree.tagName) {
    return function ($node) {
      var $newNode = (0, _render.default)(newVTree);
      $node.replaceWith($newNode);
      return $newNode;
    };
  }

  var patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
  var patchChildren = diffChildren(oldVTree.children, newVTree.children);
  return function ($node) {
    patchAttrs($node);
    patchChildren($node);
    return $node;
  };
};

var _default = diff;
exports.default = _default;
},{"./render":"src/config/render.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _createElement = _interopRequireDefault(require("./config/createElement"));

var _render = _interopRequireDefault(require("./config/render"));

var _mount = _interopRequireDefault(require("./config/mount"));

var _diff = _interopRequireDefault(require("./config/diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var createVirtualApp = function createVirtualApp(count) {
  return (0, _createElement.default)("div", {
    attrs: {
      id: "app",
      dataCount: count
    },
    children: ["The current count is: ", count.toString()].concat(_toConsumableArray(Array.from({
      length: count
    }, function () {
      return (0, _createElement.default)("div", {
        attrs: {},
        children: [(0, _createElement.default)("img", {
          attrs: {
            src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif"
          }
        }), count % 2 === 0 ? "Caption!" : ""]
      });
    })))
  });
}; // create the initial object representation of dom elements including root tag name, it's attributes and children;


var virtualApp = createVirtualApp(0); // create the initial dom elements.

var $app = (0, _render.default)(virtualApp); // mount the initial dom elements.

var $rootEl = (0, _mount.default)($app, document.getElementById("app"));
setInterval(function () {
  var n = Math.floor(Math.random() * 10); // create the new object representation of dom elements

  var updatedVirtualApp = createVirtualApp(n); // diff the two virtual representations and store the patches to be made

  var patch = (0, _diff.default)(virtualApp, updatedVirtualApp); // Apply the patches.

  $rootEl = patch($rootEl);
  virtualApp = updatedVirtualApp;
}, 4000);
},{"./config/createElement":"src/config/createElement.js","./config/render":"src/config/render.js","./config/mount":"src/config/mount.js","./config/diff":"src/config/diff.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63740" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.map