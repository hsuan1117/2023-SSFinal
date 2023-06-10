window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  1: [ function(require, module, exports) {
    const {Deque: Deque} = require("./src/deque");
    exports.Deque = Deque;
  }, {
    "./src/deque": 2
  } ],
  2: [ function(require, module, exports) {
    class Deque {
      constructor(elements) {
        this._backElements = Array.isArray(elements) ? elements : [];
        this._frontElements = [];
        this._backOffset = 0;
        this._frontOffset = 0;
      }
      pushFront(element) {
        this._frontElements.push(element);
        return this;
      }
      pushBack(element) {
        this._backElements.push(element);
        return this;
      }
      popFront() {
        if (0 === this.size()) return null;
        if (this._frontElements.length > 0) {
          const front = this._frontElements.pop();
          if (this._frontOffset >= this._frontElements.length) {
            this._frontElements = this._frontElements.slice(this._frontOffset);
            this._frontOffset = 0;
          }
          return front;
        }
        const front = this.front();
        this._backOffset += 1;
        if (2 * this._backOffset < this._backElements.length) return front;
        this._backElements = this._backElements.slice(this._backOffset);
        this._backOffset = 0;
        return front;
      }
      popBack() {
        if (0 === this.size()) return null;
        if (this._backElements.length > 0) {
          const back = this._backElements.pop();
          if (this._backOffset >= this._backElements.length) {
            this._backElements = this._backElements.slice(this._backOffset);
            this._backOffset = 0;
          }
          return back;
        }
        const back = this.back();
        this._frontOffset += 1;
        if (2 * this._frontOffset < this._frontElements.length) return back;
        this._frontElements = this._frontElements.slice(this._frontOffset);
        this._frontOffset = 0;
        return back;
      }
      front() {
        if (0 === this.size()) return null;
        if (this._frontElements.length > 0) return this._frontElements[this._frontElements.length - 1];
        return this._backElements[this._backOffset];
      }
      back() {
        if (0 === this.size()) return null;
        if (this._backElements.length > 0) return this._backElements[this._backElements.length - 1];
        return this._frontElements[this._frontOffset];
      }
      size() {
        const frontSize = this._frontElements.length - this._frontOffset;
        const backSize = this._backElements.length - this._backOffset;
        return frontSize + backSize;
      }
      isEmpty() {
        return 0 === this.size();
      }
      toArray() {
        const backElements = this._backElements.slice(this._backOffset);
        const frontElements = this._frontElements.slice(this._frontElements);
        return frontElements.reverse().concat(backElements);
      }
      clear() {
        this._backElements = [];
        this._frontElements = [];
        this._backOffset = 0;
        this._frontOffset = 0;
      }
      clone() {
        return new Deque(this.toArray());
      }
      static fromArray(elements) {
        return new Deque(elements);
      }
    }
    exports.Deque = Deque;
  }, {} ],
  3: [ function(require, module, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        "value" in descriptor && (descriptor.writable = true);
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      protoProps && _defineProperties(Constructor.prototype, protoProps);
      staticProps && _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _inherits(subClass, superClass) {
      if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: true,
          configurable: true
        }
      });
      Object.defineProperty(subClass, "prototype", {
        writable: false
      });
      superClass && _setPrototypeOf(subClass, superClass);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
      return _setPrototypeOf(o, p);
    }
    function _isNativeReflectConstruct() {
      if ("undefined" === typeof Reflect || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if ("function" === typeof Proxy) return true;
      try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _assertThisInitialized(self) {
      if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return self;
    }
    function _possibleConstructorReturn(self, call) {
      if (call && ("object" === typeof call || "function" === typeof call)) return call;
      if (void 0 !== call) throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(self);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn(this, result);
      };
    }
    var Channel = function() {
      function Channel() {
        _classCallCheck(this, Channel);
      }
      _createClass(Channel, [ {
        key: "listenForWhisper",
        value: function listenForWhisper(event, callback) {
          return this.listen(".client-" + event, callback);
        }
      }, {
        key: "notification",
        value: function notification(callback) {
          return this.listen(".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated", callback);
        }
      }, {
        key: "stopListeningForWhisper",
        value: function stopListeningForWhisper(event, callback) {
          return this.stopListening(".client-" + event, callback);
        }
      } ]);
      return Channel;
    }();
    var EventFormatter = function() {
      function EventFormatter(namespace) {
        _classCallCheck(this, EventFormatter);
        this.setNamespace(namespace);
      }
      _createClass(EventFormatter, [ {
        key: "format",
        value: function format(event) {
          if ("." === event.charAt(0) || "\\" === event.charAt(0)) return event.substr(1);
          this.namespace && (event = this.namespace + "." + event);
          return event.replace(/\./g, "\\");
        }
      }, {
        key: "setNamespace",
        value: function setNamespace(value) {
          this.namespace = value;
        }
      } ]);
      return EventFormatter;
    }();
    var PusherChannel = function(_Channel) {
      _inherits(PusherChannel, _Channel);
      var _super = _createSuper(PusherChannel);
      function PusherChannel(pusher, name, options) {
        var _this;
        _classCallCheck(this, PusherChannel);
        _this = _super.call(this);
        _this.name = name;
        _this.pusher = pusher;
        _this.options = options;
        _this.eventFormatter = new EventFormatter(_this.options.namespace);
        _this.subscribe();
        return _this;
      }
      _createClass(PusherChannel, [ {
        key: "subscribe",
        value: function subscribe() {
          this.subscription = this.pusher.subscribe(this.name);
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          this.pusher.unsubscribe(this.name);
        }
      }, {
        key: "listen",
        value: function listen(event, callback) {
          this.on(this.eventFormatter.format(event), callback);
          return this;
        }
      }, {
        key: "listenToAll",
        value: function listenToAll(callback) {
          var _this2 = this;
          this.subscription.bind_global(function(event, data) {
            if (event.startsWith("pusher:")) return;
            var namespace = _this2.options.namespace.replace(/\./g, "\\");
            var formattedEvent = event.startsWith(namespace) ? event.substring(namespace.length + 1) : "." + event;
            callback(formattedEvent, data);
          });
          return this;
        }
      }, {
        key: "stopListening",
        value: function stopListening(event, callback) {
          callback ? this.subscription.unbind(this.eventFormatter.format(event), callback) : this.subscription.unbind(this.eventFormatter.format(event));
          return this;
        }
      }, {
        key: "stopListeningToAll",
        value: function stopListeningToAll(callback) {
          callback ? this.subscription.unbind_global(callback) : this.subscription.unbind_global();
          return this;
        }
      }, {
        key: "subscribed",
        value: function subscribed(callback) {
          this.on("pusher:subscription_succeeded", function() {
            callback();
          });
          return this;
        }
      }, {
        key: "error",
        value: function error(callback) {
          this.on("pusher:subscription_error", function(status) {
            callback(status);
          });
          return this;
        }
      }, {
        key: "on",
        value: function on(event, callback) {
          this.subscription.bind(event, callback);
          return this;
        }
      } ]);
      return PusherChannel;
    }(Channel);
    var PusherPrivateChannel = function(_PusherChannel) {
      _inherits(PusherPrivateChannel, _PusherChannel);
      var _super = _createSuper(PusherPrivateChannel);
      function PusherPrivateChannel() {
        _classCallCheck(this, PusherPrivateChannel);
        return _super.apply(this, arguments);
      }
      _createClass(PusherPrivateChannel, [ {
        key: "whisper",
        value: function whisper(eventName, data) {
          this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
          return this;
        }
      } ]);
      return PusherPrivateChannel;
    }(PusherChannel);
    var PusherEncryptedPrivateChannel = function(_PusherChannel) {
      _inherits(PusherEncryptedPrivateChannel, _PusherChannel);
      var _super = _createSuper(PusherEncryptedPrivateChannel);
      function PusherEncryptedPrivateChannel() {
        _classCallCheck(this, PusherEncryptedPrivateChannel);
        return _super.apply(this, arguments);
      }
      _createClass(PusherEncryptedPrivateChannel, [ {
        key: "whisper",
        value: function whisper(eventName, data) {
          this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
          return this;
        }
      } ]);
      return PusherEncryptedPrivateChannel;
    }(PusherChannel);
    var PusherPresenceChannel = function(_PusherChannel) {
      _inherits(PusherPresenceChannel, _PusherChannel);
      var _super = _createSuper(PusherPresenceChannel);
      function PusherPresenceChannel() {
        _classCallCheck(this, PusherPresenceChannel);
        return _super.apply(this, arguments);
      }
      _createClass(PusherPresenceChannel, [ {
        key: "here",
        value: function here(callback) {
          this.on("pusher:subscription_succeeded", function(data) {
            callback(Object.keys(data.members).map(function(k) {
              return data.members[k];
            }));
          });
          return this;
        }
      }, {
        key: "joining",
        value: function joining(callback) {
          this.on("pusher:member_added", function(member) {
            callback(member.info);
          });
          return this;
        }
      }, {
        key: "whisper",
        value: function whisper(eventName, data) {
          this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
          return this;
        }
      }, {
        key: "leaving",
        value: function leaving(callback) {
          this.on("pusher:member_removed", function(member) {
            callback(member.info);
          });
          return this;
        }
      } ]);
      return PusherPresenceChannel;
    }(PusherChannel);
    var SocketIoChannel = function(_Channel) {
      _inherits(SocketIoChannel, _Channel);
      var _super = _createSuper(SocketIoChannel);
      function SocketIoChannel(socket, name, options) {
        var _this;
        _classCallCheck(this, SocketIoChannel);
        _this = _super.call(this);
        _this.events = {};
        _this.listeners = {};
        _this.name = name;
        _this.socket = socket;
        _this.options = options;
        _this.eventFormatter = new EventFormatter(_this.options.namespace);
        _this.subscribe();
        return _this;
      }
      _createClass(SocketIoChannel, [ {
        key: "subscribe",
        value: function subscribe() {
          this.socket.emit("subscribe", {
            channel: this.name,
            auth: this.options.auth || {}
          });
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          this.unbind();
          this.socket.emit("unsubscribe", {
            channel: this.name,
            auth: this.options.auth || {}
          });
        }
      }, {
        key: "listen",
        value: function listen(event, callback) {
          this.on(this.eventFormatter.format(event), callback);
          return this;
        }
      }, {
        key: "stopListening",
        value: function stopListening(event, callback) {
          this.unbindEvent(this.eventFormatter.format(event), callback);
          return this;
        }
      }, {
        key: "subscribed",
        value: function subscribed(callback) {
          this.on("connect", function(socket) {
            callback(socket);
          });
          return this;
        }
      }, {
        key: "error",
        value: function error(callback) {
          return this;
        }
      }, {
        key: "on",
        value: function on(event, callback) {
          var _this2 = this;
          this.listeners[event] = this.listeners[event] || [];
          if (!this.events[event]) {
            this.events[event] = function(channel, data) {
              _this2.name === channel && _this2.listeners[event] && _this2.listeners[event].forEach(function(cb) {
                return cb(data);
              });
            };
            this.socket.on(event, this.events[event]);
          }
          this.listeners[event].push(callback);
          return this;
        }
      }, {
        key: "unbind",
        value: function unbind() {
          var _this3 = this;
          Object.keys(this.events).forEach(function(event) {
            _this3.unbindEvent(event);
          });
        }
      }, {
        key: "unbindEvent",
        value: function unbindEvent(event, callback) {
          this.listeners[event] = this.listeners[event] || [];
          callback && (this.listeners[event] = this.listeners[event].filter(function(cb) {
            return cb !== callback;
          }));
          if (!callback || 0 === this.listeners[event].length) {
            if (this.events[event]) {
              this.socket.removeListener(event, this.events[event]);
              delete this.events[event];
            }
            delete this.listeners[event];
          }
        }
      } ]);
      return SocketIoChannel;
    }(Channel);
    var SocketIoPrivateChannel = function(_SocketIoChannel) {
      _inherits(SocketIoPrivateChannel, _SocketIoChannel);
      var _super = _createSuper(SocketIoPrivateChannel);
      function SocketIoPrivateChannel() {
        _classCallCheck(this, SocketIoPrivateChannel);
        return _super.apply(this, arguments);
      }
      _createClass(SocketIoPrivateChannel, [ {
        key: "whisper",
        value: function whisper(eventName, data) {
          this.socket.emit("client event", {
            channel: this.name,
            event: "client-".concat(eventName),
            data: data
          });
          return this;
        }
      } ]);
      return SocketIoPrivateChannel;
    }(SocketIoChannel);
    var SocketIoPresenceChannel = function(_SocketIoPrivateChann) {
      _inherits(SocketIoPresenceChannel, _SocketIoPrivateChann);
      var _super = _createSuper(SocketIoPresenceChannel);
      function SocketIoPresenceChannel() {
        _classCallCheck(this, SocketIoPresenceChannel);
        return _super.apply(this, arguments);
      }
      _createClass(SocketIoPresenceChannel, [ {
        key: "here",
        value: function here(callback) {
          this.on("presence:subscribed", function(members) {
            callback(members.map(function(m) {
              return m.user_info;
            }));
          });
          return this;
        }
      }, {
        key: "joining",
        value: function joining(callback) {
          this.on("presence:joining", function(member) {
            return callback(member.user_info);
          });
          return this;
        }
      }, {
        key: "whisper",
        value: function whisper(eventName, data) {
          this.socket.emit("client event", {
            channel: this.name,
            event: "client-".concat(eventName),
            data: data
          });
          return this;
        }
      }, {
        key: "leaving",
        value: function leaving(callback) {
          this.on("presence:leaving", function(member) {
            return callback(member.user_info);
          });
          return this;
        }
      } ]);
      return SocketIoPresenceChannel;
    }(SocketIoPrivateChannel);
    var NullChannel = function(_Channel) {
      _inherits(NullChannel, _Channel);
      var _super = _createSuper(NullChannel);
      function NullChannel() {
        _classCallCheck(this, NullChannel);
        return _super.apply(this, arguments);
      }
      _createClass(NullChannel, [ {
        key: "subscribe",
        value: function subscribe() {}
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {}
      }, {
        key: "listen",
        value: function listen(event, callback) {
          return this;
        }
      }, {
        key: "listenToAll",
        value: function listenToAll(callback) {
          return this;
        }
      }, {
        key: "stopListening",
        value: function stopListening(event, callback) {
          return this;
        }
      }, {
        key: "subscribed",
        value: function subscribed(callback) {
          return this;
        }
      }, {
        key: "error",
        value: function error(callback) {
          return this;
        }
      }, {
        key: "on",
        value: function on(event, callback) {
          return this;
        }
      } ]);
      return NullChannel;
    }(Channel);
    var NullPrivateChannel = function(_NullChannel) {
      _inherits(NullPrivateChannel, _NullChannel);
      var _super = _createSuper(NullPrivateChannel);
      function NullPrivateChannel() {
        _classCallCheck(this, NullPrivateChannel);
        return _super.apply(this, arguments);
      }
      _createClass(NullPrivateChannel, [ {
        key: "whisper",
        value: function whisper(eventName, data) {
          return this;
        }
      } ]);
      return NullPrivateChannel;
    }(NullChannel);
    var NullPresenceChannel = function(_NullChannel) {
      _inherits(NullPresenceChannel, _NullChannel);
      var _super = _createSuper(NullPresenceChannel);
      function NullPresenceChannel() {
        _classCallCheck(this, NullPresenceChannel);
        return _super.apply(this, arguments);
      }
      _createClass(NullPresenceChannel, [ {
        key: "here",
        value: function here(callback) {
          return this;
        }
      }, {
        key: "joining",
        value: function joining(callback) {
          return this;
        }
      }, {
        key: "whisper",
        value: function whisper(eventName, data) {
          return this;
        }
      }, {
        key: "leaving",
        value: function leaving(callback) {
          return this;
        }
      } ]);
      return NullPresenceChannel;
    }(NullChannel);
    var Connector = function() {
      function Connector(options) {
        _classCallCheck(this, Connector);
        this._defaultOptions = {
          auth: {
            headers: {}
          },
          authEndpoint: "/broadcasting/auth",
          userAuthentication: {
            endpoint: "/broadcasting/user-auth",
            headers: {}
          },
          broadcaster: "pusher",
          csrfToken: null,
          bearerToken: null,
          host: null,
          key: null,
          namespace: "App.Events"
        };
        this.setOptions(options);
        this.connect();
      }
      _createClass(Connector, [ {
        key: "setOptions",
        value: function setOptions(options) {
          this.options = _extends(this._defaultOptions, options);
          var token = this.csrfToken();
          if (token) {
            this.options.auth.headers["X-CSRF-TOKEN"] = token;
            this.options.userAuthentication.headers["X-CSRF-TOKEN"] = token;
          }
          token = this.options.bearerToken;
          if (token) {
            this.options.auth.headers["Authorization"] = "Bearer " + token;
            this.options.userAuthentication.headers["Authorization"] = "Bearer " + token;
          }
          return options;
        }
      }, {
        key: "csrfToken",
        value: function csrfToken() {
          var selector;
          if ("undefined" !== typeof window && window["Laravel"] && window["Laravel"].csrfToken) return window["Laravel"].csrfToken;
          if (this.options.csrfToken) return this.options.csrfToken;
          if ("undefined" !== typeof document && "function" === typeof document.querySelector && (selector = document.querySelector('meta[name="csrf-token"]'))) return selector.getAttribute("content");
          return null;
        }
      } ]);
      return Connector;
    }();
    var PusherConnector = function(_Connector) {
      _inherits(PusherConnector, _Connector);
      var _super = _createSuper(PusherConnector);
      function PusherConnector() {
        var _this;
        _classCallCheck(this, PusherConnector);
        _this = _super.apply(this, arguments);
        _this.channels = {};
        return _this;
      }
      _createClass(PusherConnector, [ {
        key: "connect",
        value: function connect() {
          "undefined" !== typeof this.options.client ? this.pusher = this.options.client : this.options.Pusher ? this.pusher = new this.options.Pusher(this.options.key, this.options) : this.pusher = new Pusher(this.options.key, this.options);
        }
      }, {
        key: "signin",
        value: function signin() {
          this.pusher.signin();
        }
      }, {
        key: "listen",
        value: function listen(name, event, callback) {
          return this.channel(name).listen(event, callback);
        }
      }, {
        key: "channel",
        value: function channel(name) {
          this.channels[name] || (this.channels[name] = new PusherChannel(this.pusher, name, this.options));
          return this.channels[name];
        }
      }, {
        key: "privateChannel",
        value: function privateChannel(name) {
          this.channels["private-" + name] || (this.channels["private-" + name] = new PusherPrivateChannel(this.pusher, "private-" + name, this.options));
          return this.channels["private-" + name];
        }
      }, {
        key: "encryptedPrivateChannel",
        value: function encryptedPrivateChannel(name) {
          this.channels["private-encrypted-" + name] || (this.channels["private-encrypted-" + name] = new PusherEncryptedPrivateChannel(this.pusher, "private-encrypted-" + name, this.options));
          return this.channels["private-encrypted-" + name];
        }
      }, {
        key: "presenceChannel",
        value: function presenceChannel(name) {
          this.channels["presence-" + name] || (this.channels["presence-" + name] = new PusherPresenceChannel(this.pusher, "presence-" + name, this.options));
          return this.channels["presence-" + name];
        }
      }, {
        key: "leave",
        value: function leave(name) {
          var _this2 = this;
          var channels = [ name, "private-" + name, "private-encrypted-" + name, "presence-" + name ];
          channels.forEach(function(name, index) {
            _this2.leaveChannel(name);
          });
        }
      }, {
        key: "leaveChannel",
        value: function leaveChannel(name) {
          if (this.channels[name]) {
            this.channels[name].unsubscribe();
            delete this.channels[name];
          }
        }
      }, {
        key: "socketId",
        value: function socketId() {
          return this.pusher.connection.socket_id;
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          this.pusher.disconnect();
        }
      } ]);
      return PusherConnector;
    }(Connector);
    var SocketIoConnector = function(_Connector) {
      _inherits(SocketIoConnector, _Connector);
      var _super = _createSuper(SocketIoConnector);
      function SocketIoConnector() {
        var _this;
        _classCallCheck(this, SocketIoConnector);
        _this = _super.apply(this, arguments);
        _this.channels = {};
        return _this;
      }
      _createClass(SocketIoConnector, [ {
        key: "connect",
        value: function connect() {
          var _this2 = this;
          var io = this.getSocketIO();
          this.socket = io(this.options.host, this.options);
          this.socket.on("reconnect", function() {
            Object.values(_this2.channels).forEach(function(channel) {
              channel.subscribe();
            });
          });
          return this.socket;
        }
      }, {
        key: "getSocketIO",
        value: function getSocketIO() {
          if ("undefined" !== typeof this.options.client) return this.options.client;
          if ("undefined" !== typeof io) return io;
          throw new Error("Socket.io client not found. Should be globally available or passed via options.client");
        }
      }, {
        key: "listen",
        value: function listen(name, event, callback) {
          return this.channel(name).listen(event, callback);
        }
      }, {
        key: "channel",
        value: function channel(name) {
          this.channels[name] || (this.channels[name] = new SocketIoChannel(this.socket, name, this.options));
          return this.channels[name];
        }
      }, {
        key: "privateChannel",
        value: function privateChannel(name) {
          this.channels["private-" + name] || (this.channels["private-" + name] = new SocketIoPrivateChannel(this.socket, "private-" + name, this.options));
          return this.channels["private-" + name];
        }
      }, {
        key: "presenceChannel",
        value: function presenceChannel(name) {
          this.channels["presence-" + name] || (this.channels["presence-" + name] = new SocketIoPresenceChannel(this.socket, "presence-" + name, this.options));
          return this.channels["presence-" + name];
        }
      }, {
        key: "leave",
        value: function leave(name) {
          var _this3 = this;
          var channels = [ name, "private-" + name, "presence-" + name ];
          channels.forEach(function(name) {
            _this3.leaveChannel(name);
          });
        }
      }, {
        key: "leaveChannel",
        value: function leaveChannel(name) {
          if (this.channels[name]) {
            this.channels[name].unsubscribe();
            delete this.channels[name];
          }
        }
      }, {
        key: "socketId",
        value: function socketId() {
          return this.socket.id;
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          this.socket.disconnect();
        }
      } ]);
      return SocketIoConnector;
    }(Connector);
    var NullConnector = function(_Connector) {
      _inherits(NullConnector, _Connector);
      var _super = _createSuper(NullConnector);
      function NullConnector() {
        var _this;
        _classCallCheck(this, NullConnector);
        _this = _super.apply(this, arguments);
        _this.channels = {};
        return _this;
      }
      _createClass(NullConnector, [ {
        key: "connect",
        value: function connect() {}
      }, {
        key: "listen",
        value: function listen(name, event, callback) {
          return new NullChannel();
        }
      }, {
        key: "channel",
        value: function channel(name) {
          return new NullChannel();
        }
      }, {
        key: "privateChannel",
        value: function privateChannel(name) {
          return new NullPrivateChannel();
        }
      }, {
        key: "encryptedPrivateChannel",
        value: function encryptedPrivateChannel(name) {
          return new NullPrivateChannel();
        }
      }, {
        key: "presenceChannel",
        value: function presenceChannel(name) {
          return new NullPresenceChannel();
        }
      }, {
        key: "leave",
        value: function leave(name) {}
      }, {
        key: "leaveChannel",
        value: function leaveChannel(name) {}
      }, {
        key: "socketId",
        value: function socketId() {
          return "fake-socket-id";
        }
      }, {
        key: "disconnect",
        value: function disconnect() {}
      } ]);
      return NullConnector;
    }(Connector);
    var Echo = function() {
      function Echo(options) {
        _classCallCheck(this, Echo);
        this.options = options;
        this.connect();
        this.options.withoutInterceptors || this.registerInterceptors();
      }
      _createClass(Echo, [ {
        key: "channel",
        value: function channel(_channel) {
          return this.connector.channel(_channel);
        }
      }, {
        key: "connect",
        value: function connect() {
          "pusher" == this.options.broadcaster ? this.connector = new PusherConnector(this.options) : "socket.io" == this.options.broadcaster ? this.connector = new SocketIoConnector(this.options) : "null" == this.options.broadcaster ? this.connector = new NullConnector(this.options) : "function" == typeof this.options.broadcaster && (this.connector = new this.options.broadcaster(this.options));
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          this.connector.disconnect();
        }
      }, {
        key: "join",
        value: function join(channel) {
          return this.connector.presenceChannel(channel);
        }
      }, {
        key: "leave",
        value: function leave(channel) {
          this.connector.leave(channel);
        }
      }, {
        key: "leaveChannel",
        value: function leaveChannel(channel) {
          this.connector.leaveChannel(channel);
        }
      }, {
        key: "leaveAllChannels",
        value: function leaveAllChannels() {
          for (var channel in this.connector.channels) this.leaveChannel(channel);
        }
      }, {
        key: "listen",
        value: function listen(channel, event, callback) {
          return this.connector.listen(channel, event, callback);
        }
      }, {
        key: "private",
        value: function _private(channel) {
          return this.connector.privateChannel(channel);
        }
      }, {
        key: "encryptedPrivate",
        value: function encryptedPrivate(channel) {
          return this.connector.encryptedPrivateChannel(channel);
        }
      }, {
        key: "socketId",
        value: function socketId() {
          return this.connector.socketId();
        }
      }, {
        key: "registerInterceptors",
        value: function registerInterceptors() {
          "function" === typeof Vue && Vue.http && this.registerVueRequestInterceptor();
          "function" === typeof axios && this.registerAxiosRequestInterceptor();
          "function" === typeof jQuery && this.registerjQueryAjaxSetup();
          "object" === ("undefined" === typeof Turbo ? "undefined" : _typeof(Turbo)) && this.registerTurboRequestInterceptor();
        }
      }, {
        key: "registerVueRequestInterceptor",
        value: function registerVueRequestInterceptor() {
          var _this = this;
          Vue.http.interceptors.push(function(request, next) {
            _this.socketId() && request.headers.set("X-Socket-ID", _this.socketId());
            next();
          });
        }
      }, {
        key: "registerAxiosRequestInterceptor",
        value: function registerAxiosRequestInterceptor() {
          var _this2 = this;
          axios.interceptors.request.use(function(config) {
            _this2.socketId() && (config.headers["X-Socket-Id"] = _this2.socketId());
            return config;
          });
        }
      }, {
        key: "registerjQueryAjaxSetup",
        value: function registerjQueryAjaxSetup() {
          var _this3 = this;
          "undefined" != typeof jQuery.ajax && jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
            _this3.socketId() && xhr.setRequestHeader("X-Socket-Id", _this3.socketId());
          });
        }
      }, {
        key: "registerTurboRequestInterceptor",
        value: function registerTurboRequestInterceptor() {
          var _this4 = this;
          document.addEventListener("turbo:before-fetch-request", function(event) {
            event.detail.fetchOptions.headers["X-Socket-Id"] = _this4.socketId();
          });
        }
      } ]);
      return Echo;
    }();
    exports.Channel = Channel;
    exports["default"] = Echo;
  }, {} ],
  AnimController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a93993hzXpHXqfPxe1jVC5W", "AnimController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AnimController = class AnimController extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
      }
      set state(state) {
        this.onStateChange(this._state, state);
        this._state = state;
      }
      get state() {
        return this._state;
      }
    };
    __decorate([ property(cc.Animation) ], AnimController.prototype, "anim", void 0);
    AnimController = __decorate([ ccclass ], AnimController);
    exports.default = AnimController;
    cc._RF.pop();
  }, {} ],
  Attributes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e56cfI7HuJGAp3JU3H5HbB1", "Attributes");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ProjectileAttr = exports.AttrNum = void 0;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrNum = class AttrNum {
      constructor(defaultValue = 0) {
        this.onChangeCallback = [];
        this._defaultValue = 0;
        this._addFactor = 0;
        this._percentageFactor = 100;
        this.defaultValue = defaultValue;
      }
      get percentageFactor() {
        return this._percentageFactor;
      }
      set percentageFactor(value) {
        this._percentageFactor = value;
        this.onChange();
      }
      get addFactor() {
        return this._addFactor;
      }
      set addFactor(value) {
        this._addFactor = value;
        this.onChange();
      }
      get defaultValue() {
        return this._defaultValue;
      }
      set defaultValue(value) {
        this._defaultValue = value;
        this.onChange();
      }
      get value() {
        return this.defaultValue * this._percentageFactor / 100 + this._addFactor;
      }
      toString() {
        return `${this.value} (${this.defaultValue} * ${this.percentageFactor}% + ${this.addFactor})`;
      }
      reset() {
        this.addFactor = 0;
        this.percentageFactor = 100;
      }
      onChange() {
        this.onChangeCallback.forEach(callback => {
          callback(this.value);
        });
      }
    };
    __decorate([ property() ], AttrNum.prototype, "defaultValue", null);
    __decorate([ property() ], AttrNum.prototype, "_defaultValue", void 0);
    AttrNum = __decorate([ ccclass("AttrNum") ], AttrNum);
    exports.AttrNum = AttrNum;
    let ProjectileAttr = class ProjectileAttr {
      constructor(flySpeed = 0, damage = 0, existDuration = 0, bounceOnEnemyTimes = 0, penetrateTimes = 0) {
        this.flySpeed = new AttrNum();
        this.damage = new AttrNum();
        this.existDuration = new AttrNum();
        this.bounceOnEnemyTimes = new AttrNum();
        this.penetrateTimes = new AttrNum();
        this.flySpeed.defaultValue = flySpeed;
        this.damage.defaultValue = damage;
        this.existDuration.defaultValue = existDuration;
        this.bounceOnEnemyTimes.defaultValue = bounceOnEnemyTimes;
        this.penetrateTimes.defaultValue = penetrateTimes;
      }
    };
    __decorate([ property(AttrNum) ], ProjectileAttr.prototype, "flySpeed", void 0);
    __decorate([ property(AttrNum) ], ProjectileAttr.prototype, "damage", void 0);
    __decorate([ property(AttrNum) ], ProjectileAttr.prototype, "existDuration", void 0);
    __decorate([ property({
      type: AttrNum,
      tooltip: "\u5728\u6575\u4eba\u9593\u5f48\u8df3\u7684\u6b21\u6578\u3002\u5982\u679c\u7a7f\u900f\u6b21\u6578\u548c\u5f48\u8df3\u6b21\u6578\u90fd\u4e0d\u70ba 0\uff0c\u5247\u6703\u4e9b\u628a\u5f48\u8df3\u6b21\u6578\u7528\u5b8c\u518d\u7a7f\u900f"
    }) ], ProjectileAttr.prototype, "bounceOnEnemyTimes", void 0);
    __decorate([ property(AttrNum) ], ProjectileAttr.prototype, "penetrateTimes", void 0);
    ProjectileAttr = __decorate([ ccclass("ProjectileAttr") ], ProjectileAttr);
    exports.ProjectileAttr = ProjectileAttr;
    cc._RF.pop();
  }, {} ],
  Buff: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d433euTgxJfpNVxSh9DOXY", "Buff");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuffsName = exports.Buffs = void 0;
    const PlayerController_1 = require("../Controller/PlayerController");
    const GameManager_1 = require("../Manager/GameManager");
    const ProjectileController_1 = require("../Controller/ProjectileController");
    const Attributes_1 = require("./Attributes");
    class IncreaseAttackSpeed {
      constructor(addPercentage = 20) {
        this.addPercentage = 0;
        this.addPercentage = addPercentage;
      }
      get description() {
        return `Increase attack speed by ${this.addPercentage}%`;
      }
      _apply(player) {
        player.mainWeapon.attackSpeed.percentageFactor += this.addPercentage;
      }
    }
    class IncreaseMaxHP {
      constructor(incHP = 1) {
        this.incHP = 0;
        this.incHP = incHP;
      }
      get description() {
        return `Increase max HP by ${this.incHP}`;
      }
      _apply(player) {
        player.maxHp.addFactor += this.incHP;
        player.currentHP.addFactor += this.incHP;
      }
    }
    class ExplosionOnDash {
      constructor(damage) {
        this.damage = 0;
        this.DURATION = .3;
        this.prefabPath = "Prefab/Projectile/Explosion";
        this.prefab = null;
        this.damage = damage;
      }
      get description() {
        return "Explosion on dash";
      }
      _apply(player) {
        cc.resources.load(this.prefabPath, cc.Prefab, (err, prefab) => {
          this.prefab = prefab;
        });
        player.event.on(PlayerController_1.default.PLAYER_DASH, () => {
          const proj = GameManager_1.default.instance.poolManager.createPrefab(this.prefab).getComponent(ProjectileController_1.default);
          proj.node.position = player.node.position;
          proj.node.parent = GameManager_1.default.instance.bulletLayer;
          proj.init(new Attributes_1.ProjectileAttr(0, this.damage, this.DURATION, 0, 0), null, 0);
          proj.shootToDirection(cc.Vec2.ZERO);
        }, this);
      }
    }
    exports.Buffs = {
      IncreaseAttackSpeed: IncreaseAttackSpeed,
      IncreaseMaxHP: IncreaseMaxHP,
      ExplosionOnDash: ExplosionOnDash
    };
    exports.BuffsName = {
      IncreaseAttackSpeed: "\u589e\u52a0\u653b\u901f",
      IncreaseMaxHP: "\u52a0HP",
      ExplosionOnDash: "\u79fb\u52d5\u6642\u7206\u70b8"
    };
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Controller/ProjectileController": "ProjectileController",
    "../Manager/GameManager": "GameManager",
    "./Attributes": "Attributes"
  } ],
  BumpingMonster: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ff68wCKC9NtLAiFKd3jYOZ", "BumpingMonster");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const EnemyController_1 = require("../Controller/EnemyController");
    const Attributes_1 = require("../Helper/Attributes");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BumpingMonster = class BumpingMonster extends EnemyController_1.default {
      constructor() {
        super(...arguments);
        this.bumpingSpeed = 500;
        this.bumpingDirection = cc.Vec2.ZERO;
        this.bumpingTime = -1;
        this.triggerRadius = new Attributes_1.AttrNum();
      }
      onLoad() {
        super.onLoad();
        this.triggerRadius.defaultValue = 200;
        this.skillCoolDown.defaultValue = 5;
      }
      update(dt) {
        if (this.skillCoolDownTime >= this.skillCoolDown.value && this.bumpingTime < 0 && this.findClosestPlayer().sub(this.node.position).mag() < this.triggerRadius.value) {
          this.bumpingTime = 0;
          this.bumpingDirection = this.findClosestPlayer().sub(this.node.position).normalize();
          return;
        }
        if (this.bumpingTime >= 0) {
          this.bumpingPlayer(dt);
          return;
        }
        this.skillCoolDownTime < this.skillCoolDown.value && (this.skillCoolDownTime += dt);
        this.followPlayer();
        this.playAnim();
      }
      bumpingPlayer(dt) {
        this.bumpingTime += dt;
        if (this.bumpingTime < .5) this.rb.linearVelocity = cc.Vec2.ZERO; else if (this.bumpingTime < 1.6) this.rb.linearVelocity = this.bumpingDirection.mul(this.bumpingSpeed); else {
          this.bumpingTime = -1;
          this.skillCoolDownTime = 0;
        }
      }
    };
    __decorate([ property(Attributes_1.AttrNum) ], BumpingMonster.prototype, "triggerRadius", void 0);
    BumpingMonster = __decorate([ ccclass ], BumpingMonster);
    exports.default = BumpingMonster;
    cc._RF.pop();
  }, {
    "../Controller/EnemyController": "EnemyController",
    "../Helper/Attributes": "Attributes"
  } ],
  CameraController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c975wRojRA4rvnCRkS2rEg", "CameraController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let CameraController = class CameraController extends cc.Component {
      constructor() {
        super(...arguments);
        this.lerpRatio = .1;
        this.initPos = cc.v3(480, 320, 0);
      }
      update(dt) {
        var _a;
        let targetPos = cc.v3(0, 0);
        let cnt = 0;
        for (let uid of GameManager_1.default.instance.playerManager.allPlayerIDs) {
          const pos = null === (_a = GameManager_1.default.instance.playerManager.getPlayerNodeByID(uid)) || void 0 === _a ? void 0 : _a.position;
          pos && ++cnt && targetPos.addSelf(pos);
        }
        if (cnt) {
          targetPos.divSelf(cnt);
          this.node.position = this.node.position.lerp(targetPos.add(this.initPos), this.lerpRatio);
        }
      }
    };
    __decorate([ property ], CameraController.prototype, "lerpRatio", void 0);
    CameraController = __decorate([ ccclass ], CameraController);
    exports.default = CameraController;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager"
  } ],
  ChooseCharaUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f36abEM+h9F7Z88aBxmO15+", "ChooseCharaUI");
    cc._RF.pop();
  }, {} ],
  DamagePlayerOnCollide: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "58fe4YxUzRDDZclH7Px7R8n", "DamagePlayerOnCollide");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerController_1 = require("./PlayerController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let DamagePlayerOnCollide = class DamagePlayerOnCollide extends cc.Component {
      constructor() {
        super(...arguments);
        this.countDown = 0;
      }
      init(damage, coolDown) {
        this.damage = damage;
        this.coolDown = coolDown;
      }
      update(dt) {
        this.countDown -= dt;
      }
      onBeginContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController_1.default);
        if (this.countDown <= 0 && player) {
          player.hurt(this.damage);
          this.countDown = this.coolDown;
        }
      }
    };
    DamagePlayerOnCollide = __decorate([ ccclass ], DamagePlayerOnCollide);
    exports.default = DamagePlayerOnCollide;
    cc._RF.pop();
  }, {
    "./PlayerController": "PlayerController"
  } ],
  DropController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a615fBm5C1K7LHfqG20o7Sc", "DropController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DropController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const PlayerController_1 = require("./PlayerController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let DropController = DropController_1 = class DropController extends cc.Component {
      constructor() {
        super(...arguments);
        this.isCollected = false;
        this.dropType = "exp";
        this.dropValue = 1;
        this.collector = null;
        this.firstCollect = false;
        this.speedRatio = 0;
      }
      onLoad() {
        let collider = this.node.addComponent(cc.CircleCollider);
        collider.radius = 20;
      }
      update(dt) {
        this.isCollected && this.magnetic();
      }
      collectBy(collector) {
        this.collector = collector;
        this.isCollected = true;
      }
      magnetic() {
        if (this.firstCollect) Math.abs(this.speedRatio) < .05 ? this.speedRatio += .01 : this.speedRatio += .05; else {
          this.firstCollect = true;
          this.speedRatio = -.5;
        }
        let collectorPos = this.collector.position;
        this.node.position = this.node.position.lerp(collectorPos, .1 * this.speedRatio);
        if (this.node.position.sub(collectorPos).magSqr() < 15) {
          this.dropType == DropController_1.DROP_TYPE_EXP ? GameManager_1.default.instance.gameSystem.emitExpChange(this.dropValue) : this.dropType == DropController_1.DROP_TYPE_COIN ? GameManager_1.default.instance.gameSystem.emitCoinChange(this.dropValue) : this.dropType == DropController_1.DROP_TYPE_HEALTH_PACK && this.collector.getComponent(PlayerController_1.default).recover(this.dropValue);
          this.node.destroy();
        }
      }
    };
    DropController.DROP_TYPE_COIN = "coin";
    DropController.DROP_TYPE_EXP = "exp";
    DropController.DROP_TYPE_HEALTH_PACK = "health pack";
    DropController.DROP_TYPE_CHEST = "chest";
    __decorate([ property({
      tooltip: "\u5fc5\u9808\u70ba\uff1a'coin', 'exp', 'health pack', 'chest' \u4e4b\u4e00"
    }) ], DropController.prototype, "dropType", void 0);
    DropController = DropController_1 = __decorate([ ccclass ], DropController);
    exports.default = DropController;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "./PlayerController": "PlayerController"
  } ],
  EnemyAnimController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48597dRxOJNkqge1dQfGu3a", "EnemyAnimController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AnimController_1 = require("./AnimController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnemyAnimController = class EnemyAnimController extends AnimController_1.default {
      constructor() {
        super(...arguments);
        this.enemyIdleAnim = "enemy_idle";
        this.enemyMoveAnim = "enemy_move";
        this.enemyHurtAnim = "enemy_hurt";
        this.enemyDeadAnim = "enemy_dead";
        this.enemySkillAnim = "enemy_skill";
        this._state = {
          isMoving: false,
          isDead: false,
          isHurt: false,
          isSkill: false
        };
      }
      initState() {
        this._state = {
          isMoving: false,
          isSkill: false,
          isDead: false,
          isHurt: false
        };
      }
      onStateChange(oldState, newState) {
        newState.isDead ? this.anim.play(this.enemyDeadAnim) : newState.isHurt ? this.anim.play(this.enemyHurtAnim) : newState.isMoving ? this.anim.play(this.enemyMoveAnim) : newState.isSkill && this.anim.play(this.enemySkillAnim);
      }
    };
    __decorate([ property() ], EnemyAnimController.prototype, "enemyIdleAnim", void 0);
    __decorate([ property() ], EnemyAnimController.prototype, "enemyMoveAnim", void 0);
    __decorate([ property() ], EnemyAnimController.prototype, "enemyHurtAnim", void 0);
    __decorate([ property() ], EnemyAnimController.prototype, "enemyDeadAnim", void 0);
    __decorate([ property() ], EnemyAnimController.prototype, "enemySkillAnim", void 0);
    EnemyAnimController = __decorate([ ccclass ], EnemyAnimController);
    exports.default = EnemyAnimController;
    cc._RF.pop();
  }, {
    "./AnimController": "AnimController"
  } ],
  EnemyController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f628d90jGVGxJqCeFG+5Vps", "EnemyController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const utils_1 = require("../Helper/utils");
    const Attributes_1 = require("../Helper/Attributes");
    const DamagePlayerOnCollide_1 = require("./DamagePlayerOnCollide");
    const WaveManager_1 = require("../Manager/WaveManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnemyController = class EnemyController extends cc.Component {
      constructor() {
        super(...arguments);
        this.searchable = true;
        this.DENSITY = 10;
        this.LINEAR_DAMP = 100;
        this.rb = null;
        this.moveSpeed = new Attributes_1.AttrNum();
        this.skillCoolDown = new Attributes_1.AttrNum();
        this.hp = new Attributes_1.AttrNum();
        this.collideDamage = new Attributes_1.AttrNum();
        this.collideDamageCoolDown = new Attributes_1.AttrNum();
        this.skillCoolDownTime = 0;
      }
      onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide_1.default).init(this.collideDamage.value, this.collideDamageCoolDown.value);
      }
      playAnim() {
        this.rb.linearVelocity.x >= 0 ? this.node.scaleX = 1 : this.node.scaleX = -1;
      }
      update(dt) {
        this.followPlayer();
        this.playAnim();
      }
      init() {
        this.hp.reset();
        this.skillCoolDownTime = 0;
      }
      hurt(damage, byUid) {
        this.hp.addFactor -= damage;
        this.hp.value <= 0 && this.dead(byUid);
      }
      runAwayFromPlayer() {
        let target = this.findClosestPlayer();
        if (!target) {
          this.rb.linearVelocity = cc.Vec2.ZERO;
          return;
        }
        let direction = target.sub(this.node.position);
        this.rb.linearVelocity = utils_1.ignoreZ(direction.normalize().mul(-2 * this.moveSpeed.value));
      }
      followPlayer() {
        let target = this.findClosestPlayer();
        if (!target) {
          this.rb.linearVelocity = cc.Vec2.ZERO;
          return;
        }
        let direction = target.sub(this.node.position);
        let distance = direction.mag();
        this.rb.linearVelocity = distance > 10 ? utils_1.ignoreZ(direction.normalize().mul(this.moveSpeed.value)) : cc.Vec2.ZERO;
      }
      dead(killByUid) {
        GameManager_1.default.instance.waveManager.event.emit(WaveManager_1.default.ON_ENEMY_DIE, {
          enemyPosition: this.node.getPosition(),
          killByUid: killByUid
        });
        GameManager_1.default.instance.poolManager.recycle(this.node);
      }
      findClosestPlayer() {
        let target = null, minDistance = 1e10;
        GameManager_1.default.instance.playerManager.allPlayerIDs.forEach(id => {
          let player = GameManager_1.default.instance.playerManager.getPlayer(id);
          if (player.node.position.sub(this.node.position).mag() < minDistance) {
            minDistance = player.node.position.sub(this.node.position).mag();
            target = player.node.position;
          }
        });
        return target;
      }
    };
    __decorate([ property(Attributes_1.AttrNum) ], EnemyController.prototype, "moveSpeed", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], EnemyController.prototype, "skillCoolDown", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], EnemyController.prototype, "hp", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], EnemyController.prototype, "collideDamage", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], EnemyController.prototype, "collideDamageCoolDown", void 0);
    EnemyController = __decorate([ ccclass ], EnemyController);
    exports.default = EnemyController;
    cc._RF.pop();
  }, {
    "../Helper/Attributes": "Attributes",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "../Manager/WaveManager": "WaveManager",
    "./DamagePlayerOnCollide": "DamagePlayerOnCollide"
  } ],
  EnterGameUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "36984kt1ctL25jrL/FjU6uk", "EnterGameUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerController_1 = require("../Controller/PlayerController");
    const GameManager_1 = require("../Manager/GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnterGameUI = class EnterGameUI extends cc.Component {
      onBeginContact(contact, selfCollider, otherCollider) {
        otherCollider.getComponent(PlayerController_1.default) && GameManager_1.default.instance.gameSystem.emitGameStart();
      }
    };
    EnterGameUI = __decorate([ ccclass ], EnterGameUI);
    exports.default = EnterGameUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Manager/GameManager": "GameManager"
  } ],
  ExpBarUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f045emKmehJWrwzayTYof/l", "ExpBarUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ExpBarUI = class ExpBarUI extends cc.Component {
      onLoad() {
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_STAT_CHANGE, this.updateExpBar, this);
      }
      updateExpBar() {
        const expBar = this.node.getComponent(cc.ProgressBar);
        expBar.progress = GameManager_1.default.instance.exp.value / GameManager_1.default.instance.upgradeExp.value;
        const levelLabel = this.node.getChildByName("Level").getComponent(cc.Label);
        levelLabel.string = GameManager_1.default.instance.level.value.toString();
      }
    };
    ExpBarUI = __decorate([ ccclass ], ExpBarUI);
    exports.default = ExpBarUI;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager"
  } ],
  FaceTo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "609dbdUOcJDO7c4q0MYaHM4", "FaceTo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let FaceTo = class FaceTo extends cc.Component {
      constructor() {
        super(...arguments);
        this.faceTo = null;
        this.rotateTarget = null;
      }
      update(dt) {
        this.faceTo && this.faceTo.isValid && (this.rotateTarget.angle = 180 * this.faceTo.convertToWorldSpaceAR(cc.Vec2.ZERO).sub(this.rotateTarget.convertToWorldSpaceAR(cc.Vec2.ZERO)).signAngle(cc.Vec2.RIGHT) / Math.PI * -1);
      }
      init(rotateTarget) {
        this.rotateTarget = rotateTarget;
      }
      setFaceTo(faceTo) {
        this.faceTo = faceTo;
      }
    };
    FaceTo = __decorate([ ccclass ], FaceTo);
    exports.default = FaceTo;
    cc._RF.pop();
  }, {} ],
  FixedUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "708e8E1yIRGKoF2LD6lq/7w", "FixedUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const PlayerManager_1 = require("../Manager/PlayerManager");
    const PlayerStatUI_1 = require("./PlayerStatUI");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let FixedUI = class FixedUI extends cc.Component {
      onLoad() {
        GameManager_1.default.instance.playerManager.event.on(PlayerManager_1.default.PLAYER_INSTANTIATED, () => {
          let childIdx = 1;
          for (let id of GameManager_1.default.instance.playerManager.allPlayerIDs) this.enablePlayerStatUIForPlayer(id, childIdx++);
        }, this);
      }
      start() {}
      enablePlayerStatUIForPlayer(id, childIdx) {
        let player = GameManager_1.default.instance.playerManager.getPlayer(id);
        if (!player) return;
        let playerStatUI = this.node.getChildByName(`PlayerStatUI${childIdx}`).getComponent(PlayerStatUI_1.default);
        playerStatUI.node.parent = this.node;
        playerStatUI.init(player);
      }
    };
    FixedUI = __decorate([ ccclass ], FixedUI);
    exports.default = FixedUI;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "../Manager/PlayerManager": "PlayerManager",
    "./PlayerStatUI": "PlayerStatUI"
  } ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "864e4SkfiNNfI2hyNnfWltd", "GameManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var GameManager_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const InputManager_1 = require("./InputManager");
    const PoolManager_1 = require("./PoolManager");
    const PlayerManager_1 = require("./PlayerManager");
    const WaveManager_1 = require("./WaveManager");
    const Attributes_1 = require("../Helper/Attributes");
    const utils_1 = require("../Helper/utils");
    const GameSystem_1 = require("./GameSystem");
    const PlayerController_1 = require("../Controller/PlayerController");
    const PlayerFocus_1 = require("../UI/PlayerFocus");
    const PlayerHPUI_1 = require("../UI/PlayerHPUI");
    const MapManager_1 = require("./MapManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameManager = GameManager_1 = class GameManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.killEnemyCnt = new Attributes_1.AttrNum(0);
        this.coinCnt = new Attributes_1.AttrNum(0);
        this.upgradeExp = new Attributes_1.AttrNum(100);
        this.level = new Attributes_1.AttrNum(1);
        this.exp = new Attributes_1.AttrNum(0);
        this.UPGRADE_EXP_GROWTH = 20;
      }
      static get instance() {
        GameManager_1._instance || (GameManager_1._instance = cc.find("Game").getComponent(GameManager_1));
        return GameManager_1._instance;
      }
      get inputManager() {
        return this._inputManager;
      }
      get poolManager() {
        return this._poolManager;
      }
      get playerManager() {
        return this._playerManager;
      }
      get waveManager() {
        return this._waveManager;
      }
      get gameSystem() {
        return this._gameSystem;
      }
      get playerEnemyLayer() {
        return this._playerEnemyLayer;
      }
      get bulletLayer() {
        return this._bulletLayer;
      }
      get itemLayer() {
        return this._itemLayer;
      }
      get backgroundLayer() {
        return this._backgroundLayer;
      }
      onLoad() {
        cc.game.setFrameRate(29);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.game.addPersistRootNode(this.node);
        this._inputManager = this.node.addComponent(InputManager_1.default);
        this._poolManager = this.node.addComponent(PoolManager_1.default);
        this._playerManager = this.node.addComponent(PlayerManager_1.default);
        this._waveManager = this.node.addComponent(WaveManager_1.default);
        this._mapManager = this.node.addComponent(MapManager_1.default);
        this._gameSystem = new GameSystem_1.GameSystem();
        this.event = new cc.EventTarget();
        const onGameStatCh = () => {
          this.event.emit(GameManager_1.ON_GAME_STAT_CHANGE);
        };
        this.killEnemyCnt.onChangeCallback.push(onGameStatCh);
        this.coinCnt.onChangeCallback.push(onGameStatCh);
        this.exp.onChangeCallback.push(onGameStatCh);
        this.level.onChangeCallback.push(onGameStatCh);
        this.upgradeExp.onChangeCallback.push(onGameStatCh);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode: keyCode}) => {
          if (keyCode === cc.macro.KEY.u) this.exp.addFactor += 5; else if (keyCode === cc.macro.KEY.p) if (cc.director.isPaused()) {
            console.log("Game Resumed");
            cc.director.resume();
          } else {
            console.log("Game Paused");
            cc.director.pause();
          } else keyCode == cc.macro.KEY.x ? this.onGameStart() : keyCode == cc.macro.KEY.h ? this.gameSystem.emitPlayerHPChange("p1", -1) : keyCode == cc.macro.KEY.e && utils_1.loadResource("Prefab/Enemy/BumpingPig", cc.Prefab).then(prefab => {
            const enemy = this.poolManager.createPrefab(prefab);
            enemy.setPosition(0, 0);
            enemy.parent = this.node;
          });
        });
        this.exp.onChangeCallback.push(() => {
          while (this.exp.value >= this.upgradeExp.value) {
            this.exp.addFactor -= this.upgradeExp.value;
            this.level.addFactor += 1;
            this.upgradeExp.percentageFactor += this.UPGRADE_EXP_GROWTH;
          }
        });
        this.level.onChangeCallback.push(() => {
          this.event.emit(GameManager_1.ON_LEVEL_UP);
          this.upgrade();
        });
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_EXP_CHANGE, this.onExpChange, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_COIN_CHANGE, this.onCoinChange, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_GAME_START, this.onGameStart, this);
      }
      start() {
        this.generateLobbyScene();
        this._waveManager.init();
      }
      pauseGame() {
        cc.director.pause();
      }
      resumeGame() {
        cc.director.resume();
      }
      onGameStart() {
        this.destroyLobbyScene();
        this.generateGameScene();
        this._mapManager.init("IceStage");
      }
      generateGameScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          let fixedUI, enemy, drop, upgradeUI;
          let promises = [];
          promises.push(utils_1.loadResource("Prefab/UI/FixedUI", cc.Prefab).then(prefab => {
            fixedUI = cc.instantiate(prefab);
            fixedUI.parent = this.node;
            fixedUI.setPosition(0, 0);
          }));
          promises.push(utils_1.loadResource("Prefab/UI/UpgradeUI", cc.Prefab).then(prefab => {
            upgradeUI = cc.instantiate(prefab);
            upgradeUI.parent = this.node;
            upgradeUI.setPosition(0, 0);
          }));
          function instantiateHP(uid) {
            return __awaiter(this, void 0, void 0, function*() {
              const hpOffset = cc.v3(0, -20);
              utils_1.loadResource("Prefab/UI/PlayerHPUI", cc.Prefab).then(prefab => {
                let hp = cc.instantiate(prefab);
                hp.parent = GameManager_1.instance.playerManager.getPlayerNodeByID(uid);
                hp.setPosition(hpOffset);
                hp.getComponent(PlayerHPUI_1.default).init(GameManager_1.instance.playerManager.getPlayer(uid));
              });
            });
          }
          for (let uid of this.playerManager.allPlayerIDs) promises.push(this.playerManager.instantiatePlayer(uid).then(() => instantiateHP(uid)));
          yield Promise.all(promises);
          this.event.emit(GameManager_1.ON_GAME_READY);
          this._waveManager.setWave(1);
        });
      }
      generateLobbyScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          let uids = [ "p1", "p2" ];
          GameManager_1.instance.inputManager.addLocalPlayerInput("p1", InputManager_1.WASD_TO_CONTROLLER);
          GameManager_1.instance.inputManager.addLocalPlayerInput("p2", InputManager_1.ARROW_TO_CONTROLLER);
          let lobby, enterGame;
          let previewCharas = [];
          yield utils_1.loadResource("Prefab/Lobby", cc.Prefab).then(prefab => {
            lobby = cc.instantiate(prefab);
            lobby.parent = this.backgroundLayer;
            lobby.setPosition(0, 0);
            for (let chara of lobby.children) chara.getComponent(PlayerController_1.default) && previewCharas.push(chara);
          });
          let chooseChara = () => new Promise((resolve, reject) => {
            const pf = lobby.getComponent(PlayerFocus_1.default);
            pf.init(previewCharas, cc.v2(0, 20), true);
            pf.focusOnIndex("p1", 0);
            pf.focusOnIndex("p2", 0);
            let choseResult = {};
            pf.event.on(PlayerFocus_1.default.ON_CONFIRM, ({uid: uid, node: node}) => {
              for (let res of Object.values(choseResult)) if (res == node.name) return;
              pf.removeFocus(uid);
              choseResult[uid] = node.name;
              Object.keys(choseResult).length === uids.length && resolve(choseResult);
            });
          });
          let instantiateChooseResult = chooseResult => new Promise((resolve, reject) => {
            for (let uid of uids) {
              this.playerManager.createPlayerLocally(uid, chooseResult[uid]);
              this.playerManager.instantiatePlayer(uid).then(player => {
                for (let chara of previewCharas) if (chara.name === chooseResult[uid]) {
                  player.node.setPosition(chara.getPosition());
                  chara.destroy();
                }
              });
            }
          });
          chooseChara().then(instantiateChooseResult);
        });
      }
      buildLayers() {
        this._backgroundLayer = new cc.Node("BackgroundLayer");
        this._itemLayer = new cc.Node("ItemLayer");
        this._playerEnemyLayer = new cc.Node("PlayerEnemyLayer");
        this._bulletLayer = new cc.Node("BulletLayer");
        this._backgroundLayer.parent = this.node;
        this._itemLayer.parent = this.node;
        this._playerEnemyLayer.parent = this.node;
        this._bulletLayer.parent = this.node;
      }
      destroyLobbyScene() {
        for (let child of this.node.children) child.destroy();
      }
      onExpChange({deltaExp: deltaExp}) {
        this.exp.addFactor += deltaExp;
      }
      onCoinChange({deltaCoin: deltaCoin}) {
        this.coinCnt.addFactor += deltaCoin;
      }
      upgrade() {
        this.gameSystem.event.once(GameSystem_1.GameSystem.ON_BUFF_APPLY, () => {
          this.resumeGame();
        });
        this.event.emit(GameManager_1.ON_UPGRADE);
        this.pauseGame();
      }
      showLoading() {}
      hideLoading() {}
    };
    GameManager.ON_GAME_STAT_CHANGE = "GAME_STAT_CHANGE";
    GameManager.ON_LEVEL_UP = "LEVEL_UP";
    GameManager.ON_UPGRADE = "UPGRADE";
    GameManager.ON_GAME_READY = "GAME_READY";
    GameManager._instance = null;
    GameManager = GameManager_1 = __decorate([ ccclass ], GameManager);
    exports.default = GameManager;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Helper/Attributes": "Attributes",
    "../Helper/utils": "utils",
    "../UI/PlayerFocus": "PlayerFocus",
    "../UI/PlayerHPUI": "PlayerHPUI",
    "./GameSystem": "GameSystem",
    "./InputManager": "InputManager",
    "./MapManager": "MapManager",
    "./PlayerManager": "PlayerManager",
    "./PoolManager": "PoolManager",
    "./WaveManager": "WaveManager"
  } ],
  GameSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea78e82x1RL2Irt9KJEJOCP", "GameSystem");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameSystem = void 0;
    const GameManager_1 = require("./GameManager");
    const laravel_echo_1 = require("laravel-echo");
    class GameSystem {
      constructor() {
        this.buffReadyToApply = [];
        this.event = new cc.EventTarget();
      }
      emitApplyBuff(uid, buffId) {
        console.log("buffReadyToApply: ", this.buffReadyToApply);
        this.buffReadyToApply.push({
          uid: uid,
          buffId: buffId
        });
        if (this.buffReadyToApply.length >= GameManager_1.default.instance.playerManager.allPlayerIDs.length) {
          for (let bf of this.buffReadyToApply) this.event.emit(GameSystem.ON_BUFF_APPLY, bf);
          this.buffReadyToApply = [];
        }
      }
      emitPlayerHPChange(uid, deltaHP) {
        this.event.emit(GameSystem.ON_PLAYER_HP_CHANGE, {
          uid: uid,
          deltaHP: deltaHP
        });
      }
      emitExpChange(deltaExp) {
        this.event.emit(GameSystem.ON_EXP_CHANGE, {
          deltaExp: deltaExp
        });
      }
      emitCoinChange(deltaCoin) {
        this.event.emit(GameSystem.ON_COIN_CHANGE, {
          deltaCoin: deltaCoin
        });
      }
      emitInput(input) {
        this.event.emit(GameSystem.ON_INPUT, {
          input: input
        });
      }
      emitCreatePlayer(uid, charaId) {
        this.event.emit(GameSystem.ON_CREATE_PLAYER, {
          uid: uid,
          charaId: charaId
        });
      }
      emitGameStart() {
        this.event.emit(GameSystem.ON_GAME_START);
      }
    }
    exports.GameSystem = GameSystem;
    GameSystem.ON_BUFF_APPLY = "ON_BUFF_ADD";
    GameSystem.ON_PLAYER_HP_CHANGE = "ON_PLAYER_HP_CHANGE";
    GameSystem.ON_EXP_CHANGE = "ON_EXP_CHANGE";
    GameSystem.ON_COIN_CHANGE = "ON_COIN_CHANGE";
    GameSystem.ON_INPUT = "ON_INPUT";
    GameSystem.ON_CREATE_PLAYER = "ON_CREATE_PLAYER";
    GameSystem.ON_GAME_START = "ON_GAME_START";
    class RemoteGameSystem extends GameSystem {
      constructor() {
        super();
        this.PUSHER_CONFIG = {
          broadcaster: "pusher",
          key: "app-key",
          cluster: "mt1",
          forceTLS: false,
          wsHost: "final.hsuan.app",
          wsPath: "/websockets",
          wsPort: ""
        };
      }
      createEchoInstanceFromToken(token) {
        localStorage.setItem("token", token);
        this.echoInstance = new laravel_echo_1.default(Object.assign(Object.assign({}, this.PUSHER_CONFIG), {
          authorizer: (channel, options) => ({
            authorize: (socketId, callback) => {
              fetch("/broadcasting/auth", {
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                  socket_id: socketId,
                  channel_name: channel.name
                })
              }).then(res => res.json()).then(response => {
                callback(null, response);
              }).catch(error => {
                callback(error);
              });
            }
          })
        }));
      }
      emitApplyBuff(uid, buffId) {}
      emitPlayerHPChange(uid, deltaHP) {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
      }
      emitExpChange(deltaExp) {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
        this.event.emit(GameSystem.ON_EXP_CHANGE, {
          deltaExp: deltaExp
        });
      }
      emitCoinChange(deltaCoin) {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
        this.event.emit(GameSystem.ON_COIN_CHANGE, {
          deltaCoin: deltaCoin
        });
      }
      emitInput(input) {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
        this.event.emit(GameSystem.ON_INPUT, {
          input: input
        });
      }
      emitCreatePlayer(uid, charaId) {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
        this.event.emit(GameSystem.ON_CREATE_PLAYER, {
          uid: uid,
          charaId: charaId
        });
      }
      emitGameStart() {
        fetch("https://final.hsuan.app/api/", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => res.json());
        this.event.emit(GameSystem.ON_GAME_START);
      }
      login(email, password) {
        fetch("https://final.hsuan.app/api/sanctum/token", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }).then(res => res.json()).then(response => {
          localStorage.setItem("token", response.token);
          this.createEchoInstanceFromToken(response.token);
        });
      }
      register(name, email, password) {
        fetch("https://final.hsuan.app/api/sanctum/token", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }).then(res => res.json()).then(response => {
          localStorage.setItem("token", response.token);
          this.createEchoInstanceFromToken(response.token);
        });
      }
    }
    cc._RF.pop();
  }, {
    "./GameManager": "GameManager",
    "laravel-echo": 3
  } ],
  ISearchTarget: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dedb3Qi3IhNG53HaUb2EpkZ", "ISearchTarget");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    cc._RF.pop();
  }, {} ],
  InputManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13751IMhINF2q+B8jRtNBOX", "InputManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var InputManager_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ARROW_TO_CONTROLLER = exports.WASD_TO_CONTROLLER = exports.Input = exports.InputType = void 0;
    const GameManager_1 = require("./GameManager");
    const GameSystem_1 = require("./GameSystem");
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var InputType;
    (function(InputType) {
      InputType["STICK"] = "STICK";
      InputType["BUTTON_DOWN"] = "BUTTON_DOWN";
      InputType["BUTTON_UP"] = "BUTTON_UP";
    })(InputType = exports.InputType || (exports.InputType = {}));
    class Input {
      constructor(uid, type, btnCode, lX, lY) {
        this.uid = uid;
        this.type = type;
        this.btnCode = btnCode;
        this.lX = Math.ceil(lX);
        this.lY = Math.ceil(lY);
      }
      toString() {
        return `uid: ${this.uid}, type: ${this.type}, btnCode: ${this.btnCode}, LXScaleBy1000: ${this.lX}, LYScaleBy1000: ${this.lY}`;
      }
      serialize() {
        return JSON.stringify(this);
      }
    }
    exports.Input = Input;
    exports.WASD_TO_CONTROLLER = {
      [cc.macro.KEY.w]: "L_UP",
      [cc.macro.KEY.s]: "L_DOWN",
      [cc.macro.KEY.a]: "L_LEFT",
      [cc.macro.KEY.d]: "L_RIGHT",
      [cc.macro.KEY.space]: "A"
    };
    exports.ARROW_TO_CONTROLLER = {
      [cc.macro.KEY.up]: "L_UP",
      [cc.macro.KEY.down]: "L_DOWN",
      [cc.macro.KEY.left]: "L_LEFT",
      [cc.macro.KEY.right]: "L_RIGHT",
      [cc.macro.KEY.shift]: "A"
    };
    let InputManager = InputManager_1 = class InputManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.event = new cc.EventTarget();
        this.conversionOfUid = new Map();
        this._currentLStick = new Map();
        this._isPressing = new Map();
      }
      onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      }
      start() {
        GameManager_1.default.instance.gameSystem.event.on(GameSystem_1.GameSystem.ON_INPUT, ({input: input}) => this.performInput(input), this);
      }
      static lrOfStick(stick) {
        return stick.x > 700 ? utils_1.Direction.RIGHT : stick.x < -700 ? utils_1.Direction.LEFT : null;
      }
      addLocalPlayerInput(uid, conversion) {
        this.conversionOfUid.set(uid, conversion);
        this._currentLStick.set(uid, cc.v2(0, 0));
        this._isPressing.set(uid, new Map([ [ "X", false ], [ "Y", false ], [ "A", false ], [ "B", false ], [ "L_UP", false ], [ "L_DOWN", false ], [ "L_LEFT", false ], [ "L_RIGHT", false ] ]));
      }
      isPressing(uid, btnCode) {
        var _a;
        return null !== (_a = this._isPressing.get(uid).get(btnCode)) && void 0 !== _a && _a;
      }
      lStick(uid) {
        return this._currentLStick.get(uid);
      }
      performInput(input) {
        this.event.emit(InputManager_1.ON_INPUT, input);
      }
      onKeyDown({keyCode: keyCode}) {
        for (const [uid, conversion] of this.conversionOfUid) {
          if (!conversion[keyCode]) continue;
          if (this._isPressing.get(uid).get(conversion[keyCode])) continue;
          this._isPressing.get(uid).set(conversion[keyCode], true);
          if ("A" == conversion[keyCode] || "B" == conversion[keyCode] || "X" == conversion[keyCode] || "Y" == conversion[keyCode]) GameManager_1.default.instance.gameSystem.emitInput(new Input(uid, InputType.BUTTON_DOWN, conversion[keyCode], 0, 0)); else if ("L_UP" == conversion[keyCode] || "L_DOWN" == conversion[keyCode] || "L_LEFT" == conversion[keyCode] || "L_RIGHT" == conversion[keyCode]) {
            this.updateStick(uid);
            GameManager_1.default.instance.gameSystem.emitInput(new Input(uid, InputType.STICK, "", this._currentLStick.get(uid).x, this._currentLStick.get(uid).y));
          }
        }
      }
      onKeyUp({keyCode: keyCode}) {
        for (const [uid, conversion] of this.conversionOfUid) {
          if (!conversion[keyCode]) continue;
          this._isPressing.get(uid).set(conversion[keyCode], false);
          if ("A" == conversion[keyCode] || "B" == conversion[keyCode] || "X" == conversion[keyCode] || "Y" == conversion[keyCode]) GameManager_1.default.instance.gameSystem.emitInput(new Input(uid, InputType.BUTTON_UP, conversion[keyCode], 0, 0)); else if ("L_UP" == conversion[keyCode] || "L_DOWN" == conversion[keyCode] || "L_LEFT" == conversion[keyCode] || "L_RIGHT" == conversion[keyCode]) {
            this.updateStick(uid);
            GameManager_1.default.instance.gameSystem.emitInput(new Input(uid, InputType.STICK, "", this._currentLStick.get(uid).x, this._currentLStick.get(uid).y));
          }
        }
      }
      updateStick(uid) {
        this._currentLStick.get(uid).x = -this._isPressing.get(uid).get("L_LEFT") + +this._isPressing.get(uid).get("L_RIGHT");
        this._currentLStick.get(uid).y = -this._isPressing.get(uid).get("L_DOWN") + +this._isPressing.get(uid).get("L_UP");
        this._currentLStick.get(uid).normalizeSelf().mulSelf(1e3);
      }
    };
    InputManager.ON_INPUT = "ON_INPUT";
    InputManager = InputManager_1 = __decorate([ ccclass ], InputManager);
    exports.default = InputManager;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "./GameManager": "GameManager",
    "./GameSystem": "GameSystem"
  } ],
  MapManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "405f4CQAkNPpZWrmVPA2jhu", "MapManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("./GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapManager = class MapManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.stageName = "ForestStage";
        this.stageMap = null;
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.visPos = {};
        this.started = false;
      }
      init(stageName) {
        this.stageName = stageName;
        this.started = true;
        cc.resources.load("Map/" + this.stageName, cc.TiledMapAsset, (err, map) => {
          cc.log("map = ", map);
          this.stageMap = map;
          this.mapWidth = 512;
          this.mapHeight = 512;
        });
      }
      generateBlock(pos) {
        let node = new cc.Node();
        let mp = node.addComponent(cc.TiledMap);
        mp.tmxAsset = this.stageMap;
        node.position = pos;
        node.parent = GameManager_1.default.instance.backgroundLayer;
      }
      posHash(x, y) {
        return `${x}*${y}`;
      }
      start() {}
      autoGenerateMap() {
        let pos = cc.Camera.main.node.position;
        let tx = Math.floor(pos.x / this.mapWidth);
        let ty = Math.floor(pos.y / this.mapHeight);
        let combinedKey = this.posHash(tx, ty);
        for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) {
          let key = this.posHash(tx + i, ty + j);
          if (key in this.visPos) continue;
          this.visPos[key] = true;
          let pos = cc.v2((tx + i) * this.mapWidth, (ty + j) * this.mapHeight);
          this.generateBlock(pos);
        }
      }
      update(dt) {
        this.started && this.autoGenerateMap();
      }
    };
    MapManager = __decorate([ ccclass ], MapManager);
    exports.default = MapManager;
    cc._RF.pop();
  }, {
    "./GameManager": "GameManager"
  } ],
  PlayerAnimController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01ab6nJ7i9AIKSo5Y3paBSz", "PlayerAnimController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AnimController_1 = require("./AnimController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerAnimController = class PlayerAnimController extends AnimController_1.default {
      constructor() {
        super(...arguments);
        this.playerIdleAnim = "player_idle";
        this.playerMoveAnim = "player_move";
        this.playerDashAnim = "player_dash";
        this.playerHurtAnim = "player_hurt";
        this.playerDeadAnim = "player_dead";
        this._state = {
          isMoving: false,
          isDashing: false,
          isDead: false,
          isHurt: false,
          faceLeftOrRight: 1
        };
      }
      initState() {
        this._state = {
          isMoving: false,
          isDashing: false,
          isDead: false,
          isHurt: false,
          faceLeftOrRight: 1
        };
      }
      onStateChange(oldState, newState) {
        newState.isDead ? this.anim.play(this.playerDeadAnim) : newState.isHurt ? this.anim.play(this.playerHurtAnim) : newState.isDashing ? this.anim.play(this.playerDashAnim) : newState.isMoving ? this.anim.play(this.playerMoveAnim) : this.anim.play(this.playerIdleAnim);
        newState.faceLeftOrRight && (this.anim.node.scaleX = newState.faceLeftOrRight);
      }
    };
    __decorate([ property() ], PlayerAnimController.prototype, "playerIdleAnim", void 0);
    __decorate([ property() ], PlayerAnimController.prototype, "playerMoveAnim", void 0);
    __decorate([ property() ], PlayerAnimController.prototype, "playerDashAnim", void 0);
    __decorate([ property() ], PlayerAnimController.prototype, "playerHurtAnim", void 0);
    __decorate([ property() ], PlayerAnimController.prototype, "playerDeadAnim", void 0);
    PlayerAnimController = __decorate([ ccclass ], PlayerAnimController);
    exports.default = PlayerAnimController;
    cc._RF.pop();
  }, {
    "./AnimController": "AnimController"
  } ],
  PlayerController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfa71Q353hKSZrSsOz7x96r", "PlayerController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PlayerController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const Attributes_1 = require("../Helper/Attributes");
    const WeaponController_1 = require("./WeaponController");
    const SearchDrop_1 = require("../Helper/SearchDrop");
    const DropController_1 = require("./DropController");
    const PlayerAnimController_1 = require("./Anim/PlayerAnimController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerController = PlayerController_1 = class PlayerController extends cc.Component {
      constructor() {
        super(...arguments);
        this.moveSpeed = new Attributes_1.AttrNum();
        this.maxHp = new Attributes_1.AttrNum();
        this.expGainPercentage = new Attributes_1.AttrNum();
        this.dashCoolDown = new Attributes_1.AttrNum();
        this.dashSpeed = new Attributes_1.AttrNum();
        this.mainWeaponPrefab = null;
        this.uid = "";
        this.mainWeapon = null;
        this.currentHP = new Attributes_1.AttrNum(10);
        this.killEnemyCnt = new Attributes_1.AttrNum(0);
        this.appliedBuff = [];
        this.animCtrl = null;
        this.rb = null;
        this.searchTarget = new SearchDrop_1.default();
        this.DENSITY = 1;
        this.DASH_DURATION = .1;
        this.dashCountDown = 0;
        this.isDashing = false;
        this.movingDir = cc.v2(0, 0);
      }
      onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.addComponent(SearchDrop_1.default);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.animCtrl = this.node.getComponent(PlayerAnimController_1.default);
        this.event = new cc.EventTarget();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode: keyCode}) => {
          keyCode == cc.macro.KEY.q && GameManager_1.default.instance.gameSystem.emitApplyBuff(this.uid, "ExplosionOnDash");
        });
        this.mainWeapon = this.mainWeaponPrefab ? this.addWeapon(this.mainWeaponPrefab) : null;
        const attrOnCh = () => {
          this.event.emit(PlayerController_1.PLAYER_ATTR_CHANGE);
        };
        this.moveSpeed.onChangeCallback.push(attrOnCh);
        this.maxHp.onChangeCallback.push(attrOnCh);
        this.expGainPercentage.onChangeCallback.push(attrOnCh);
        this.dashCoolDown.onChangeCallback.push(attrOnCh);
        this.dashSpeed.onChangeCallback.push(attrOnCh);
        this.currentHP.onChangeCallback.push(attrOnCh);
        this.killEnemyCnt.onChangeCallback.push(attrOnCh);
        const weaponOnCh = () => {
          this.event.emit(PlayerController_1.PLAYER_ATTR_CHANGE);
        };
        this.mainWeapon.attackSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shotPerAttack.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.shootSpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.damage.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.flySpeed.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.existDuration.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.bounceOnEnemyTimes.onChangeCallback.push(weaponOnCh);
        this.mainWeapon.projectileAttr.penetrateTimes.onChangeCallback.push(weaponOnCh);
      }
      start() {
        this.event.emit(PlayerController_1.PLAYER_STOP_MOVE);
      }
      update(dt) {
        this.dashCountDown -= dt;
        this.isDashing || (this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value));
        this.collectDrop();
      }
      hurt(damage) {
        const deltaHP = Math.min(this.currentHP.value, damage);
        GameManager_1.default.instance.gameSystem.emitPlayerHPChange(this.uid, -damage);
      }
      recover(val) {
        const deltaHP = Math.min(this.maxHp.value - this.currentHP.value, val);
        GameManager_1.default.instance.gameSystem.emitPlayerHPChange(this.uid, deltaHP);
      }
      addWeapon(weaponPrefab) {
        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController_1.default);
        weapon.node.parent = this.node;
        weapon.init(this);
        return weapon;
      }
      setMovingDir(newDir) {
        if (this.movingDir.equals(cc.v2(0, 0)) && !newDir.equals(cc.v2(0, 0))) {
          this.event.emit(PlayerController_1.PLAYER_START_MOVE);
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isMoving: true
          });
        } else if (!this.movingDir.equals(cc.v2(0, 0)) && newDir.equals(cc.v2(0, 0))) {
          this.event.emit(PlayerController_1.PLAYER_STOP_MOVE);
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isMoving: false
          });
        }
        this.movingDir = newDir;
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          faceLeftOrRight: this.movingDir.x < 0 ? -1 : this.movingDir.x > 0 ? 1 : 0
        });
      }
      dash() {
        if (this.isDashing || this.dashCountDown > 0) return;
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isDashing: true
        });
        this.event.emit(PlayerController_1.PLAYER_DASH);
        this.isDashing = true;
        this.dashCountDown = this.dashCoolDown.value;
        this.rb.linearVelocity = this.movingDir.mul(this.dashSpeed.value);
        this.scheduleOnce(() => {
          this.isDashing = false;
          this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isDashing: false
          });
        }, this.DASH_DURATION);
      }
      addBuff(buff) {
        buff._apply(this);
        this.appliedBuff.push(buff);
        this.event.emit(PlayerController_1.PLAYER_ATTR_CHANGE, buff);
      }
      collectDrop() {
        while (this.getComponent(SearchDrop_1.default).getTarget()) {
          let target = this.getComponent(SearchDrop_1.default).getTarget();
          target.getComponent(DropController_1.default).collectBy(this.node);
        }
      }
    };
    PlayerController.PLAYER_START_MOVE = "PLAYER_START_MOVE";
    PlayerController.PLAYER_STOP_MOVE = "PLAYER_STOP_MOVE";
    PlayerController.PLAYER_DASH = "PLAYER_DASH";
    PlayerController.PLAYER_ATTR_CHANGE = "PLAYER_ATTR_CHANGE";
    __decorate([ property(Attributes_1.AttrNum) ], PlayerController.prototype, "moveSpeed", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], PlayerController.prototype, "maxHp", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], PlayerController.prototype, "expGainPercentage", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], PlayerController.prototype, "dashCoolDown", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], PlayerController.prototype, "dashSpeed", void 0);
    __decorate([ property(cc.Prefab) ], PlayerController.prototype, "mainWeaponPrefab", void 0);
    PlayerController = PlayerController_1 = __decorate([ ccclass ], PlayerController);
    exports.default = PlayerController;
    cc._RF.pop();
  }, {
    "../Helper/Attributes": "Attributes",
    "../Helper/SearchDrop": "SearchDrop",
    "../Manager/GameManager": "GameManager",
    "./Anim/PlayerAnimController": "PlayerAnimController",
    "./DropController": "DropController",
    "./WeaponController": "WeaponController"
  } ],
  PlayerFocus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "610ec4zOGVD8ZeGYfFQ0sje", "PlayerFocus");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var PlayerFocus_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const InputManager_1 = require("../Manager/InputManager");
    const GameManager_1 = require("../Manager/GameManager");
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerFocus = PlayerFocus_1 = class PlayerFocus extends cc.Component {
      constructor() {
        super(...arguments);
        this.SPACING_Y = 0;
      }
      onLoad() {
        this.event = new cc.EventTarget();
      }
      start() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_INPUT, this.onInput, this);
      }
      onDestroy() {
        GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_INPUT, this.onInput, this);
      }
      init(focusTarget, offSet, sortByPosition = false) {
        this.focus = {};
        this.focusTarget = [ ...focusTarget ];
        this.pointerContainer = {};
        this.pointer = {};
        this.focusTarget.sort((a, b) => {
          if (a.position < b.position) return -1;
          return 0;
        });
        for (let tid in this.focusTarget) {
          this.pointerContainer[tid] = new cc.Node(`PointerContainer${tid}`);
          const layout = this.pointerContainer[tid].addComponent(cc.Layout);
          layout.type = cc.Layout.Type.VERTICAL;
          layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          layout.spacingY = this.SPACING_Y;
          this.pointerContainer[tid].parent = this.node;
          this.pointerContainer[tid].setPosition(this.focusTarget[tid].position.add(utils_1.padZ(offSet)));
          this.pointerContainer[tid].group = "FixedUI";
        }
      }
      focusOnNode(uid, node) {
        for (let tid in this.focusTarget) if (this.focusTarget[tid] === node) {
          this.focus[uid] = parseInt(tid);
          break;
        }
        this.updateView();
      }
      focusOnIndex(uid, tid) {
        this.focus[uid] = tid;
        console.log("focusOnIndex: ", uid, tid);
        console.log("focusOnIndex Result: ", this.focus);
        this.updateView();
      }
      removeFocus(uid) {
        delete this.focus[uid];
        this.pointer[uid].destroy();
        delete this.pointer[uid];
        this.updateView();
      }
      onInput(input) {
        if (!this.focus.hasOwnProperty(input.uid)) return;
        const uid = input.uid;
        const dir = InputManager_1.default.lrOfStick(cc.v2(input.lX, input.lY));
        if ("A" === input.btnCode) this.event.emit(PlayerFocus_1.ON_CONFIRM, {
          uid: uid,
          node: this.focusTarget[this.focus[uid]]
        }); else if (dir == utils_1.Direction.LEFT) {
          this.focus[uid] = (this.focus[uid] - 1 + this.focusTarget.length) % this.focusTarget.length;
          this.updateView();
        } else if (dir == utils_1.Direction.RIGHT) {
          this.focus[uid] = (this.focus[uid] + 1) % this.focusTarget.length;
          this.updateView();
        }
      }
      updateView() {
        for (let uid in this.focus) {
          if (!this.pointer[uid]) {
            this.pointer[uid] = new cc.Node(`Pointer${uid}`);
            const label = this.pointer[uid].addComponent(cc.Label);
            label.string = `<${uid}>`;
            label.fontSize = 10;
            label.lineHeight = 0;
          }
          this.pointer[uid].parent = this.pointerContainer[this.focus[uid]];
          this.pointer[uid].setPosition(0, 0);
          this.pointerContainer[this.focus[uid]].getComponent(cc.Layout).updateLayout();
        }
      }
    };
    PlayerFocus.ON_CONFIRM = "CONFIRM";
    PlayerFocus = PlayerFocus_1 = __decorate([ ccclass ], PlayerFocus);
    exports.default = PlayerFocus;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "../Manager/InputManager": "InputManager"
  } ],
  PlayerHPUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0d21l6kBJOvZnhgdgnM1qf", "PlayerHPUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerController_1 = require("../Controller/PlayerController");
    const GameManager_1 = require("../Manager/GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerHPUI = class PlayerHPUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.hpIcon = null;
      }
      onDestroy() {
        this.player.event.off(PlayerController_1.default.PLAYER_ATTR_CHANGE, this.onPlayerAttrChange, this);
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_GAME_READY, this.onPlayerAttrChange, this);
      }
      init(player) {
        this.player = player;
        this.player.event.on(PlayerController_1.default.PLAYER_ATTR_CHANGE, this.onPlayerAttrChange, this);
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_READY, this.onPlayerAttrChange, this);
      }
      onPlayerAttrChange() {
        console.log(`Player: ${this.player.uid} HP: ${this.player.currentHP}`);
        this.node.removeAllChildren();
        for (let i = 0; i < this.player.currentHP.value; i++) {
          const hp = GameManager_1.default.instance.poolManager.createPrefab(this.hpIcon);
          hp.parent = this.node;
        }
      }
    };
    __decorate([ property(cc.Prefab) ], PlayerHPUI.prototype, "hpIcon", void 0);
    PlayerHPUI = __decorate([ ccclass ], PlayerHPUI);
    exports.default = PlayerHPUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Manager/GameManager": "GameManager"
  } ],
  PlayerManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e7581qHB7NHQbTXvwmnkXM8", "PlayerManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var PlayerManager_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("./GameManager");
    const PlayerController_1 = require("../Controller/PlayerController");
    const InputManager_1 = require("./InputManager");
    const utils_1 = require("../Helper/utils");
    const GameSystem_1 = require("./GameSystem");
    const Buff_1 = require("../Helper/Buff");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerManager = PlayerManager_1 = class PlayerManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.event = new cc.EventTarget();
        this.playerIds = [];
        this.isLocalPlayer = {};
        this.playerChara = {};
        this.playerControllers = {};
        this.playerDeltaHp = {};
      }
      get allPlayerIDs() {
        return this.playerIds;
      }
      get localUids() {
        return this.playerIds.filter(id => this.isLocalPlayer[id]);
      }
      start() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_INPUT, this.onInput, this);
        GameManager_1.default.instance.gameSystem.event.on(GameSystem_1.GameSystem.ON_BUFF_APPLY, this.onBuffApply, this);
        GameManager_1.default.instance.gameSystem.event.on(GameSystem_1.GameSystem.ON_PLAYER_HP_CHANGE, this.onHPChange, this);
        GameManager_1.default.instance.gameSystem.event.on(GameSystem_1.GameSystem.ON_CREATE_PLAYER, this.createPlayer, this);
      }
      getPlayerNodeByID(id) {
        var _a;
        return null === (_a = this.playerControllers[id]) || void 0 === _a ? void 0 : _a.node;
      }
      getPlayer(id) {
        return this.playerControllers[id];
      }
      isLocal(id) {
        return true == this.isLocalPlayer[id];
      }
      createPlayerLocally(uid, charaId) {
        this.createPlayer({
          uid: uid,
          charaId: charaId
        });
        this.isLocalPlayer[uid] = true;
        GameManager_1.default.instance.gameSystem.emitCreatePlayer(uid, charaId);
      }
      instantiatePlayer(uid) {
        return __awaiter(this, void 0, void 0, function*() {
          return yield utils_1.loadResource(`Prefab/Chara/${this.playerChara[uid]}`, cc.Prefab).then(prefab => {
            const player = cc.instantiate(prefab).getComponent(PlayerController_1.default);
            player.node.parent = GameManager_1.default.instance.playerEnemyLayer;
            this.playerControllers[uid] = player;
            player.uid = uid;
            this.event.emit(PlayerManager_1.PLAYER_INSTANTIATED, uid);
            return player;
          });
        });
      }
      createPlayer({uid: uid, charaId: charaId}) {
        if (this.isLocalPlayer[uid]) return;
        this.playerIds.push(uid);
        this.playerChara[uid] = charaId;
        this.playerDeltaHp[uid] = 0;
        this.isLocalPlayer[uid] = false;
      }
      onInput(input) {
        if (!this.playerControllers[input.uid]) return;
        input.type == InputManager_1.InputType.STICK ? this.playerControllers[input.uid].setMovingDir(cc.v2(input.lX / 1e3, input.lY / 1e3)) : input.type == InputManager_1.InputType.BUTTON_DOWN && "A" == input.btnCode && this.playerControllers[input.uid].dash();
      }
      onBuffApply({uid: uid, buffId: buffId}) {
        this.playerControllers[uid].addBuff(new Buff_1.Buffs[buffId]());
      }
      onHPChange({uid: uid, deltaHP: deltaHP}) {
        this.playerDeltaHp[uid] += deltaHP;
        this.playerControllers[uid].currentHP.addFactor += deltaHP;
      }
    };
    PlayerManager.PLAYER_INSTANTIATED = "PLAYER_CREATED";
    PlayerManager = PlayerManager_1 = __decorate([ ccclass ], PlayerManager);
    exports.default = PlayerManager;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Helper/Buff": "Buff",
    "../Helper/utils": "utils",
    "./GameManager": "GameManager",
    "./GameSystem": "GameSystem",
    "./InputManager": "InputManager"
  } ],
  PlayerStatUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99dce4zARdI5ZPwAWaisMN1", "PlayerStatUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerController_1 = require("../Controller/PlayerController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerStatUI = class PlayerStatUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.player = null;
      }
      init(player) {
        this.player = player;
        this.player.event.on(PlayerController_1.default.PLAYER_ATTR_CHANGE, this.updateUI, this);
        this.updateUI();
      }
      updateUI() {
        const label = this.node.getComponent(cc.Label);
        label.string = "Player Attributes:\n" + `current HP: ${this.player.currentHP.toString()}\n` + `move speed: ${this.player.moveSpeed.toString()}\n` + `max HP: ${this.player.maxHp.toString()}\n` + `exp gain: ${this.player.expGainPercentage.toString()}\n` + `dash cool down: ${this.player.dashCoolDown.toString()}\n` + `dash speed: ${this.player.dashSpeed.toString()}\n` + `attack speed: ${this.player.mainWeapon.attackSpeed.toString()}\n` + `shot per attack: ${this.player.mainWeapon.shotPerAttack.toString()}\n` + `shoot speed: ${this.player.mainWeapon.shootSpeed.toString()}\n` + `damage: ${this.player.mainWeapon.projectileAttr.damage.toString()}\n` + `fly speed: ${this.player.mainWeapon.projectileAttr.flySpeed.toString()}\n` + `exist duration: ${this.player.mainWeapon.projectileAttr.existDuration.toString()}\n` + `bounce on enemy times: ${this.player.mainWeapon.projectileAttr.bounceOnEnemyTimes.toString()}\n` + `penetrate times: ${this.player.mainWeapon.projectileAttr.penetrateTimes.toString()}\n`;
        label.string += "\nBuffs:\n";
        for (const buff of this.player.appliedBuff) label.string += `${buff.description}\n`;
      }
    };
    __decorate([ property() ], PlayerStatUI.prototype, "player", void 0);
    PlayerStatUI = __decorate([ ccclass ], PlayerStatUI);
    exports.default = PlayerStatUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController"
  } ],
  PoolManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd1b24oIF5DQL1mbrjFn6Lx", "PoolManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PoolManager = class PoolManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.pool = {};
      }
      createPrefab(prefab, dontUsePool = false) {
        if (dontUsePool) return cc.instantiate(prefab);
        this.pool[prefab.name] || (this.pool[prefab.name] = new cc.NodePool());
        if (this.pool[prefab.name].size() <= 0) {
          const node = cc.instantiate(prefab);
          return node;
        }
        return this.pool[prefab.name].get();
      }
      recycle(node) {
        if (!this.pool[node.name]) {
          node.destroy();
          return;
        }
        this.pool[node.name].put(node);
      }
      preCreate(prefab, count) {
        this.pool || (this.pool[prefab.name] = new cc.NodePool());
        for (let i = 0; i < count; i++) this.pool[prefab.name].put(cc.instantiate(prefab));
      }
    };
    PoolManager = __decorate([ ccclass ], PoolManager);
    exports.default = PoolManager;
    cc._RF.pop();
  }, {} ],
  ProjectileController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7289eUMHZpExpJGOiK42kq1", "ProjectileController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const EnemyController_1 = require("./EnemyController");
    const GameManager_1 = require("../Manager/GameManager");
    var requireComponent = cc._decorator.requireComponent;
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ProjectileController = class ProjectileController extends cc.Component {
      constructor() {
        super(...arguments);
        this.projectileAttr = null;
        this.rb = null;
        this.onHitCallback = null;
        this.bounceMixRandomRate = .4;
        this._shootByUid = null;
        this.bounceCnt = 0;
        this.bounceDir = null;
        this.penetrateCnt = 0;
        this.existCountDown = 0;
      }
      get shootByUid() {
        return this._shootByUid;
      }
      onLoad() {
        this.rb = this.getComponent(cc.RigidBody);
        this.rb.bullet = true;
      }
      onCollisionEnter(other, self) {}
      onBeginContact(contact, self, other) {
        const enemy = other.getComponent(EnemyController_1.default);
        if (enemy) {
          this.onHitCallback && this.onHitCallback({
            enemy: enemy,
            projectile: this
          });
          enemy.hurt(this.projectileAttr.damage.value, this.shootByUid);
          if (this.bounceCnt < this.projectileAttr.bounceOnEnemyTimes.value) {
            this.bounceCnt++;
            const newDir = this.bounceDir.mul(this.bounceMixRandomRate).add(this.rb.linearVelocity.normalize().neg().mul(1 - this.bounceMixRandomRate)).normalize();
            this.rb.linearVelocity = newDir.mul(this.projectileAttr.flySpeed.value);
          } else this.penetrateCnt < this.projectileAttr.penetrateTimes.value ? this.penetrateCnt++ : this.deleteProjectile();
        }
      }
      update(dt) {
        this.existCountDown -= dt;
        this.existCountDown <= 0 && this.deleteProjectile();
      }
      init(projectileAttr, onHitCallback = null, bounceDirIdx = 0, shootByUid = null) {
        this.projectileAttr = projectileAttr;
        this.onHitCallback = onHitCallback;
        this.bounceCnt = 0;
        this.bounceDir = utils_1.eightDirections[bounceDirIdx];
        this.penetrateCnt = 0;
        this._shootByUid = shootByUid;
      }
      shootToDirection(direction) {
        this.rb.linearVelocity = direction.mul(this.projectileAttr.flySpeed.value);
        this.existCountDown = this.projectileAttr.existDuration.value;
      }
      deleteProjectile() {
        GameManager_1.default.instance.poolManager.recycle(this.node);
      }
    };
    ProjectileController = __decorate([ ccclass, requireComponent(cc.RigidBody), requireComponent(cc.Collider) ], ProjectileController);
    exports.default = ProjectileController;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "./EnemyController": "EnemyController"
  } ],
  SearchDrop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac66bbFXbhMc6wX7s/xnFG5", "SearchDrop");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    const deque_1 = require("@datastructures-js/deque");
    const DropController_1 = require("../Controller/DropController");
    let SearchDrop = class SearchDrop extends cc.Component {
      constructor() {
        super(...arguments);
        this._searchRange = 100;
        this.collider = null;
        this.targetQueue = new deque_1.Deque();
      }
      set searchRange(value) {
        this.collider.radius = value;
        this._searchRange = value;
      }
      onLoad() {
        this.collider = this.node.addComponent(cc.CircleCollider);
        this.collider.radius = this._searchRange;
      }
      onCollisionEnter(other, self) {
        this.isTarget(other.node) && this.targetQueue.pushBack(other.node);
      }
      getTarget() {
        while (this.targetQueue.size() && !this.isTarget(this.targetQueue.front())) this.targetQueue.popFront();
        return this.targetQueue.size() ? this.targetQueue.front() : null;
      }
      isTarget(target) {
        var _a;
        return false === (null === (_a = target.getComponent(DropController_1.default)) || void 0 === _a ? void 0 : _a.isCollected);
      }
    };
    __decorate([ property({
      type: cc.Integer,
      tooltip: "\u641c\u7d22\u7bc4\u570d",
      visible: true
    }) ], SearchDrop.prototype, "_searchRange", void 0);
    SearchDrop = __decorate([ ccclass ], SearchDrop);
    exports.default = SearchDrop;
    cc._RF.pop();
  }, {
    "../Controller/DropController": "DropController",
    "@datastructures-js/deque": 1
  } ],
  SearchEnemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23c54wm2K1AF4/xHJ8qHxFl", "SearchEnemy");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const utils_1 = require("./utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    const EnemyController_1 = require("../Controller/EnemyController");
    let SearchEnemy = class SearchEnemy extends cc.Component {
      constructor() {
        super(...arguments);
        this._searchRange = 1e3;
      }
      get searchRange() {
        return this._searchRange;
      }
      getTarget() {
        const pos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const rec = new cc.Rect(pos.x - this._searchRange, pos.y - this._searchRange, 2 * this._searchRange, 2 * this._searchRange);
        const aabbRes = cc.director.getPhysicsManager().testAABB(rec);
        let minDistance = Infinity;
        let target = null;
        for (const pc of aabbRes) if (this.isTarget(pc.node)) {
          const distance = utils_1.nodeDistanceSqr(this.node, pc.node);
          if (distance < minDistance) {
            minDistance = distance;
            target = pc.node;
          }
        }
        return target;
      }
      isTarget(target) {
        var _a;
        return (null === target || void 0 === target ? void 0 : target.isValid) && (null === (_a = target.getComponent(EnemyController_1.default)) || void 0 === _a ? void 0 : _a.searchable);
      }
    };
    SearchEnemy = __decorate([ ccclass ], SearchEnemy);
    exports.default = SearchEnemy;
    cc._RF.pop();
  }, {
    "../Controller/EnemyController": "EnemyController",
    "./utils": "utils"
  } ],
  SettingUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18cd21fA5VOA7N0wzeV4R2y", "SettingUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const InputManager_1 = require("../Manager/InputManager");
    const PlayerController_1 = require("../Controller/PlayerController");
    const PlayerFocus_1 = require("./PlayerFocus");
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SettingUI = class SettingUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.isOn = false;
        this.command = {};
        this.isCollide = {};
        this.settingPopUp = null;
        this.playerFocus = null;
      }
      onLoad() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_INPUT, this.onInput, this);
        this.settingPopUp = this.node.getChildByName("SettingPopUp");
        this.playerFocus = this.node.getComponent(PlayerFocus_1.default);
        this.playerFocus.init(this.settingPopUp.children, cc.v2(0, 20).add(utils_1.ignoreZ(this.settingPopUp.position)), true);
      }
      onDestroy() {
        GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_INPUT, this.onInput, this);
      }
      start() {
        this.playerFocus.event.on(PlayerFocus_1.default.ON_CONFIRM, this.onConfirm, this);
        this.command["Exit"] = () => {
          this.popDown();
        };
        this.command["ToggleMusic"] = () => {
          console.log("In Setting: ToggleMusic");
        };
        this.command["ToggleSoundEffect"] = () => {
          console.log("In Setting: ToggleSoundEffect");
        };
        this.popDown();
      }
      onBeginContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController_1.default);
        if (player) {
          this.isCollide[player.uid] = true;
          console.log(`SettingUI collide with ${player.uid}`);
        }
      }
      onEndContact(contact, selfCollider, otherCollider) {
        const player = otherCollider.getComponent(PlayerController_1.default);
        if (player) {
          this.isCollide[player.uid] = false;
          console.log(`SettingUI end collide with ${player.uid}`);
        }
      }
      onInput(input) {
        if (!GameManager_1.default.instance.playerManager.isLocal(input.uid)) return;
        if (!this.isCollide[input.uid]) return;
        this.isOn || input.type != InputManager_1.InputType.BUTTON_DOWN || "A" != input.btnCode || this.popUp();
      }
      onConfirm({node: node}) {
        this.command[node.name]();
      }
      popDown() {
        GameManager_1.default.instance.resumeGame();
        for (let uid of GameManager_1.default.instance.playerManager.localUids) this.playerFocus.removeFocus(uid);
        this.isOn = false;
        this.settingPopUp.active = false;
      }
      popUp() {
        this.isOn = true;
        this.settingPopUp.active = true;
        for (let uid of GameManager_1.default.instance.playerManager.localUids) this.playerFocus.focusOnIndex(uid, 0);
        console.log("Local Uids", GameManager_1.default.instance.playerManager.localUids);
        GameManager_1.default.instance.pauseGame();
      }
    };
    SettingUI = __decorate([ ccclass ], SettingUI);
    exports.default = SettingUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "../Manager/InputManager": "InputManager",
    "./PlayerFocus": "PlayerFocus"
  } ],
  UpgradeUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eaaddFhST5JRprj1ak3GZCo", "UpgradeUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const GameSystem_1 = require("../Manager/GameSystem");
    const Buff_1 = require("../Helper/Buff");
    const utils_1 = require("../Helper/utils");
    const InputManager_1 = require("../Manager/InputManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UpgradeUI = class UpgradeUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.buffs = null;
        this.buffCards = null;
        this.chosenIndex = null;
        this.confirmed = null;
      }
      start() {
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_UPGRADE, this.popUpUpgradeUI, this);
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_INPUT, input => this.onInput(input), this);
        this.node.active = false;
      }
      popUpUpgradeUI(buffAmount) {
        GameManager_1.default.instance.gameSystem.event.once(GameSystem_1.GameSystem.ON_BUFF_APPLY, this.closeUpgradeUI, this);
        this.node.active = true;
        this.buffs = Object.keys(Buff_1.Buffs);
        this.buffCards = [].fill(null, 0, buffAmount);
        this.chosenIndex = {};
        this.confirmed = {};
        utils_1.shuffle(this.buffs);
        this.buffs = this.buffs.slice(0, buffAmount);
        let promise = [];
        for (let i = 0; i < this.buffs.length; i++) promise.push(utils_1.loadResource("Art/BuffCard/" + this.buffs[i], cc.SpriteFrame).then(sprite => {
          console.log("load buff icon: ", this.buffs[i]);
          this.buffCards[i] = this.node.getChildByName("CardContainer").getChildByName(`BuffCard${i}`);
          this.buffCards[i].getChildByName("Sprite").getComponent(cc.Sprite).spriteFrame = sprite;
          this.buffCards[i].getChildByName("Label").getComponent(cc.Label).string = Buff_1.BuffsName[this.buffs[i]];
        }));
        Promise.all(promise).then(() => {
          for (let b of this.buffCards) b.active = true;
          for (let uid of GameManager_1.default.instance.playerManager.allPlayerIDs) {
            this.chosenIndex[uid] = 0;
            this.buffCards[0].getChildByName("PointerLabel").getComponent(cc.Label).string += "v";
          }
        });
      }
      onInput(input) {
        if (!this.node.active) return;
        const dir = InputManager_1.default.lrOfStick(cc.v2(input.lX, input.lY));
        const uid = input.uid;
        if (this.confirmed[uid]) return;
        if (input.type == InputManager_1.InputType.BUTTON_DOWN && "A" == input.btnCode) {
          this.confirmed[uid] = true;
          this.buffCards[this.chosenIndex[uid]].getChildByName("PointerLabel").getComponent(cc.Label).string = this.buffCards[this.chosenIndex[uid]].getChildByName("PointerLabel").getComponent(cc.Label).string.slice(0, -1);
          GameManager_1.default.instance.gameSystem.emitApplyBuff(uid, this.buffs[this.chosenIndex[uid]]);
        } else dir == utils_1.Direction.LEFT ? this.shiftBuff(uid, -1) : dir == utils_1.Direction.RIGHT && this.shiftBuff(uid, 1);
      }
      shiftBuff(uid, deltaIndex) {
        const label = this.buffCards[this.chosenIndex[uid]].getChildByName("PointerLabel").getComponent(cc.Label);
        label.string = label.string.slice(0, -1);
        this.chosenIndex[uid] = (this.chosenIndex[uid] + deltaIndex + this.buffCards.length) % this.buffCards.length;
        this.buffCards[this.chosenIndex[uid]].getChildByName("PointerLabel").getComponent(cc.Label).string += "v";
      }
      closeUpgradeUI() {
        this.node.active = false;
      }
    };
    UpgradeUI = __decorate([ ccclass ], UpgradeUI);
    exports.default = UpgradeUI;
    cc._RF.pop();
  }, {
    "../Helper/Buff": "Buff",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "../Manager/GameSystem": "GameSystem",
    "../Manager/InputManager": "InputManager"
  } ],
  WaveManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c1b8GNMoZMCoclc7NiExwk", "WaveManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var WaveManager_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const utils_1 = require("../Helper/utils");
    const utils_2 = require("../Helper/utils");
    const GameManager_1 = require("./GameManager");
    var winSize = cc.winSize;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WaveManager = WaveManager_1 = class WaveManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.enemyDropItemsType = [ "Coin", "ExpStone", "HpPack" ];
        this.enemyDropItemsRate = [ .3, .5, .2 ];
        this.enemyTypes = [ "BumpingPig", "SmallSkeleton" ];
        this.waveData = null;
        this.waveDataName = "testwave";
        this.enemyPrefabs = [];
        this.enemyPrefabPath = "Prefab/Enemy";
        this.spawnRadius = 600;
        this.currentWave = null;
        this.spawnCenter = null;
        this.countDowns = [];
      }
      setWave(wave) {
        this.currentWave = this.waveData.json[wave];
      }
      init() {
        for (const enemyType of this.enemyTypes) cc.resources.load("Prefab/Enemy/" + enemyType, cc.Prefab, (err, prefab) => {
          this.enemyPrefabs[enemyType] = prefab;
        });
        cc.resources.load("Wave data/" + this.waveDataName, cc.JsonAsset, (err, json) => {
          this.waveData = json;
        });
        this.enemyDropItems = {};
        for (let i = 0; i < this.enemyDropItemsType.length; i++) {
          const type = this.enemyDropItemsType[i];
          utils_1.loadResource("Prefab/Drops/" + type, cc.Prefab).then(prefab => {
            this.enemyDropItems[type] = prefab;
          });
        }
      }
      onLoad() {
        this.event = new cc.EventTarget();
        this.event.on(WaveManager_1.ON_ENEMY_DIE, this.onEnemyDie, this);
      }
      update(dt) {
        this.spawnCenter = utils_1.ignoreZ(cc.Camera.main.node.position).sub(cc.v2(winSize.width / 2, cc.winSize.height / 2));
        for (const key in this.currentWave) {
          void 0 === this.countDowns[key] && (this.countDowns[key] = 0);
          if (this.countDowns[key] <= 0) {
            for (let i = 0; i < this.currentWave[key]["spawnNum"]; i++) this.spawnEnemy(this.enemyPrefabs[key], this.randomSpawnPos());
            this.countDowns[key] = this.currentWave[key].spawnInterval;
          } else this.countDowns[key] -= dt;
        }
      }
      randomSpawnPos() {
        let angle = 2 * Math.random() * Math.PI;
        let vec = cc.v2(Math.cos(angle) * this.spawnRadius, Math.sin(angle) * this.spawnRadius);
        return this.spawnCenter.add(vec);
      }
      spawnEnemy(enemyPrefab, pos) {
        let enemy = GameManager_1.default.instance.poolManager.createPrefab(enemyPrefab);
        enemy.position = utils_2.padZ(pos);
        cc.log(enemy);
        enemy.active = true;
        enemy.parent = this.node;
        enemy.getComponent("EnemyController").init();
      }
      onEnemyDie({enemyPosition: enemyPosition, killByUid: killByUid}) {
        this.dropRandomItem(enemyPosition);
      }
      dropRandomItem(position) {
        const random = Math.random();
        let sum = 0;
        for (let i = 0; i < this.enemyDropItemsType.length; i++) {
          sum += this.enemyDropItemsRate[i];
          if (random < sum) {
            let item = GameManager_1.default.instance.poolManager.createPrefab(this.enemyDropItems[this.enemyDropItemsType[i]]);
            item.position = position;
            item.active = true;
            item.parent = GameManager_1.default.instance.itemLayer;
            break;
          }
        }
      }
    };
    WaveManager.ON_ENEMY_DIE = "onEnemyDie";
    WaveManager = WaveManager_1 = __decorate([ ccclass ], WaveManager);
    exports.default = WaveManager;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "./GameManager": "GameManager"
  } ],
  WeaponController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55b95yvGJxEn65jBcYaTb3x", "WeaponController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Attributes_1 = require("../Helper/Attributes");
    const PlayerController_1 = require("./PlayerController");
    const ProjectileController_1 = require("./ProjectileController");
    const GameManager_1 = require("../Manager/GameManager");
    const utils_1 = require("../Helper/utils");
    const SearchEnemy_1 = require("../Helper/SearchEnemy");
    const FaceTo_1 = require("./FaceTo");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponController = class WeaponController extends cc.Component {
      constructor() {
        super(...arguments);
        this.attackSpeed = new Attributes_1.AttrNum();
        this.shotPerAttack = new Attributes_1.AttrNum();
        this.shootSpeed = new Attributes_1.AttrNum();
        this.projectileAttr = new Attributes_1.ProjectileAttr();
        this.castTime = new Attributes_1.AttrNum();
        this.range = new Attributes_1.AttrNum();
        this.projectilePrefab = null;
        this.player = null;
        this.searchTarget = null;
        this.canAttack = false;
        this.shotCnt = 0;
        this.nextShotCountDown = 0;
        this.attackCountDown = 0;
        this.bounceDirIdx = 0;
      }
      onLoad() {
        this.node.getComponent(FaceTo_1.default).init(this.node);
        this.searchTarget = this.node.addComponent(SearchEnemy_1.default);
      }
      update(dt) {
        this.nextShotCountDown -= dt;
        this.attackCountDown -= dt;
        if (this.canAttack && this.attackCountDown <= 0) {
          this.shotCnt = 0;
          this.nextShotCountDown = 0;
          this.attackCountDown = 1 / this.attackSpeed.value;
          this.bounceDirIdx = Math.floor(8 * Math.random());
        }
        if (this.canAttack && this.shotCnt < this.shotPerAttack.value && this.nextShotCountDown <= 0) {
          this.shoot();
          this.nextShotCountDown = 1 / this.shootSpeed.value;
          this.shotCnt++;
        }
      }
      init(player) {
        this.canAttack = false;
        this.player = player;
        this.player.event.on(PlayerController_1.default.PLAYER_START_MOVE, this.stopAttack, this);
        this.player.event.on(PlayerController_1.default.PLAYER_STOP_MOVE, this.startAttack, this);
      }
      startAttack() {
        this.canAttack = true;
        this.attackCountDown = Math.max(this.attackCountDown, this.castTime.value);
      }
      stopAttack() {
        this.canAttack = false;
        this.shotCnt = Infinity;
      }
      shoot() {
        const target = this.searchTarget.getTarget();
        if (!target) return;
        this.getComponent(FaceTo_1.default).setFaceTo(target);
        const projectile = GameManager_1.default.instance.poolManager.createPrefab(this.projectilePrefab).getComponent(ProjectileController_1.default);
        const pos = GameManager_1.default.instance.node.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(cc.v2(0, 0)));
        projectile.node.setPosition(pos);
        projectile.init(Object.assign({}, this.projectileAttr), null, this.bounceDirIdx, this.player.uid);
        projectile.node.parent = GameManager_1.default.instance.bulletLayer;
        projectile.shootToDirection(utils_1.ignoreZ(target.position.sub(this.player.node.position)).normalize());
      }
    };
    __decorate([ property({
      type: Attributes_1.AttrNum,
      tooltip: "\u653b\u64ca\u983b\u7387"
    }) ], WeaponController.prototype, "attackSpeed", void 0);
    __decorate([ property({
      type: Attributes_1.AttrNum,
      tooltip: "\u6bcf\u6b21\u653b\u64ca\u767c\u5c04\u5b50\u5f48\u6578\u91cf"
    }) ], WeaponController.prototype, "shotPerAttack", void 0);
    __decorate([ property({
      type: Attributes_1.AttrNum,
      tooltip: "\u6bcf\u767c\u5b50\u5f48\u983b\u7387"
    }) ], WeaponController.prototype, "shootSpeed", void 0);
    __decorate([ property(Attributes_1.ProjectileAttr) ], WeaponController.prototype, "projectileAttr", void 0);
    __decorate([ property({
      type: Attributes_1.AttrNum,
      tooltip: "\u5f9e\u8d70\u52d5\u72c0\u614b\u8f49\u63db\u5230\u653b\u64ca\u72c0\u614b\u7684\u6642\u9593"
    }) ], WeaponController.prototype, "castTime", void 0);
    __decorate([ property(Attributes_1.AttrNum) ], WeaponController.prototype, "range", void 0);
    __decorate([ property(cc.Prefab) ], WeaponController.prototype, "projectilePrefab", void 0);
    WeaponController = __decorate([ ccclass ], WeaponController);
    exports.default = WeaponController;
    cc._RF.pop();
  }, {
    "../Helper/Attributes": "Attributes",
    "../Helper/SearchEnemy": "SearchEnemy",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "./FaceTo": "FaceTo",
    "./PlayerController": "PlayerController",
    "./ProjectileController": "ProjectileController"
  } ],
  utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f136f63jVpKW5QsM7FgFSZ2", "utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shuffle = exports.loadResource = exports.nodeDistanceSqr = exports.padZ = exports.ignoreZ = exports.eightDirections = exports.Direction = void 0;
    exports.Direction = {
      UP: cc.v2(0, 1),
      DOWN: cc.v2(0, -1),
      LEFT: cc.v2(-1, 0),
      RIGHT: cc.v2(1, 0)
    };
    exports.eightDirections = [];
    for (let i = 0; i < 8; i++) exports.eightDirections.push(cc.v2(Math.cos(i * Math.PI / 4), Math.sin(i * Math.PI / 4)));
    function ignoreZ(v3) {
      return cc.v2(v3.x, v3.y);
    }
    exports.ignoreZ = ignoreZ;
    function padZ(v2) {
      return cc.v3(v2.x, v2.y, 0);
    }
    exports.padZ = padZ;
    function nodeDistanceSqr(node1, node2) {
      return node1.convertToWorldSpaceAR(cc.v2(0, 0)).sub(node2.convertToWorldSpaceAR(cc.v2(0, 0))).magSqr();
    }
    exports.nodeDistanceSqr = nodeDistanceSqr;
    function loadResource(path, type) {
      return new Promise((resolve, reject) => {
        cc.resources.load(path, type, (err, res) => err ? reject(err) : resolve(res));
      });
    }
    exports.loadResource = loadResource;
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [ arr[j], arr[i] ];
      }
    }
    exports.shuffle = shuffle;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AnimController", "EnemyAnimController", "PlayerAnimController", "CameraController", "DamagePlayerOnCollide", "DropController", "EnemyController", "FaceTo", "PlayerController", "ProjectileController", "WeaponController", "Attributes", "Buff", "ISearchTarget", "SearchDrop", "SearchEnemy", "utils", "GameManager", "GameSystem", "InputManager", "MapManager", "PlayerManager", "PoolManager", "WaveManager", "BumpingMonster", "ChooseCharaUI", "EnterGameUI", "ExpBarUI", "FixedUI", "PlayerFocus", "PlayerHPUI", "PlayerStatUI", "SettingUI", "UpgradeUI" ]);