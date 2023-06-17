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
  4: [ function(require, module, exports) {
    (function webpackUniversalModuleDefinition(root, factory) {
      "object" === typeof exports && "object" === typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define([], factory) : "object" === typeof exports ? exports["Pusher"] = factory() : root["Pusher"] = factory();
    })(window, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.l = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
          __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
        };
        __webpack_require__.r = function(exports) {
          "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
          });
          Object.defineProperty(exports, "__esModule", {
            value: true
          });
        };
        __webpack_require__.t = function(value, mode) {
          1 & mode && (value = __webpack_require__(value));
          if (8 & mode) return value;
          if (4 & mode && "object" === typeof value && value && value.__esModule) return value;
          var ns = Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", {
            enumerable: true,
            value: value
          });
          if (2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
          }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module) {
          var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
          } : function getModuleExports() {
            return module;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 2);
      }([ function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = this && this.__extends || function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }();
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        var INVALID_BYTE = 256;
        var Coder = function() {
          function Coder(_paddingCharacter) {
            void 0 === _paddingCharacter && (_paddingCharacter = "=");
            this._paddingCharacter = _paddingCharacter;
          }
          Coder.prototype.encodedLength = function(length) {
            if (!this._paddingCharacter) return (8 * length + 5) / 6 | 0;
            return (length + 2) / 3 * 4 | 0;
          };
          Coder.prototype.encode = function(data) {
            var out = "";
            var i = 0;
            for (;i < data.length - 2; i += 3) {
              var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
              out += this._encodeByte(c >>> 18 & 63);
              out += this._encodeByte(c >>> 12 & 63);
              out += this._encodeByte(c >>> 6 & 63);
              out += this._encodeByte(c >>> 0 & 63);
            }
            var left = data.length - i;
            if (left > 0) {
              var c = data[i] << 16 | (2 === left ? data[i + 1] << 8 : 0);
              out += this._encodeByte(c >>> 18 & 63);
              out += this._encodeByte(c >>> 12 & 63);
              out += 2 === left ? this._encodeByte(c >>> 6 & 63) : this._paddingCharacter || "";
              out += this._paddingCharacter || "";
            }
            return out;
          };
          Coder.prototype.maxDecodedLength = function(length) {
            if (!this._paddingCharacter) return (6 * length + 7) / 8 | 0;
            return length / 4 * 3 | 0;
          };
          Coder.prototype.decodedLength = function(s) {
            return this.maxDecodedLength(s.length - this._getPaddingLength(s));
          };
          Coder.prototype.decode = function(s) {
            if (0 === s.length) return new Uint8Array(0);
            var paddingLength = this._getPaddingLength(s);
            var length = s.length - paddingLength;
            var out = new Uint8Array(this.maxDecodedLength(length));
            var op = 0;
            var i = 0;
            var haveBad = 0;
            var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
            for (;i < length - 4; i += 4) {
              v0 = this._decodeChar(s.charCodeAt(i + 0));
              v1 = this._decodeChar(s.charCodeAt(i + 1));
              v2 = this._decodeChar(s.charCodeAt(i + 2));
              v3 = this._decodeChar(s.charCodeAt(i + 3));
              out[op++] = v0 << 2 | v1 >>> 4;
              out[op++] = v1 << 4 | v2 >>> 2;
              out[op++] = v2 << 6 | v3;
              haveBad |= v0 & INVALID_BYTE;
              haveBad |= v1 & INVALID_BYTE;
              haveBad |= v2 & INVALID_BYTE;
              haveBad |= v3 & INVALID_BYTE;
            }
            if (i < length - 1) {
              v0 = this._decodeChar(s.charCodeAt(i));
              v1 = this._decodeChar(s.charCodeAt(i + 1));
              out[op++] = v0 << 2 | v1 >>> 4;
              haveBad |= v0 & INVALID_BYTE;
              haveBad |= v1 & INVALID_BYTE;
            }
            if (i < length - 2) {
              v2 = this._decodeChar(s.charCodeAt(i + 2));
              out[op++] = v1 << 4 | v2 >>> 2;
              haveBad |= v2 & INVALID_BYTE;
            }
            if (i < length - 3) {
              v3 = this._decodeChar(s.charCodeAt(i + 3));
              out[op++] = v2 << 6 | v3;
              haveBad |= v3 & INVALID_BYTE;
            }
            if (0 !== haveBad) throw new Error("Base64Coder: incorrect characters for decoding");
            return out;
          };
          Coder.prototype._encodeByte = function(b) {
            var result = b;
            result += 65;
            result += 25 - b >>> 8 & 6;
            result += 51 - b >>> 8 & -75;
            result += 61 - b >>> 8 & -15;
            result += 62 - b >>> 8 & 3;
            return String.fromCharCode(result);
          };
          Coder.prototype._decodeChar = function(c) {
            var result = INVALID_BYTE;
            result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
            result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
            result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
            result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
            result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
            return result;
          };
          Coder.prototype._getPaddingLength = function(s) {
            var paddingLength = 0;
            if (this._paddingCharacter) {
              for (var i = s.length - 1; i >= 0; i--) {
                if (s[i] !== this._paddingCharacter) break;
                paddingLength++;
              }
              if (s.length < 4 || paddingLength > 2) throw new Error("Base64Coder: incorrect padding");
            }
            return paddingLength;
          };
          return Coder;
        }();
        exports.Coder = Coder;
        var stdCoder = new Coder();
        function encode(data) {
          return stdCoder.encode(data);
        }
        exports.encode = encode;
        function decode(s) {
          return stdCoder.decode(s);
        }
        exports.decode = decode;
        var URLSafeCoder = function(_super) {
          __extends(URLSafeCoder, _super);
          function URLSafeCoder() {
            return null !== _super && _super.apply(this, arguments) || this;
          }
          URLSafeCoder.prototype._encodeByte = function(b) {
            var result = b;
            result += 65;
            result += 25 - b >>> 8 & 6;
            result += 51 - b >>> 8 & -75;
            result += 61 - b >>> 8 & -13;
            result += 62 - b >>> 8 & 49;
            return String.fromCharCode(result);
          };
          URLSafeCoder.prototype._decodeChar = function(c) {
            var result = INVALID_BYTE;
            result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
            result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
            result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
            result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
            result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
            return result;
          };
          return URLSafeCoder;
        }(Coder);
        exports.URLSafeCoder = URLSafeCoder;
        var urlSafeCoder = new URLSafeCoder();
        function encodeURLSafe(data) {
          return urlSafeCoder.encode(data);
        }
        exports.encodeURLSafe = encodeURLSafe;
        function decodeURLSafe(s) {
          return urlSafeCoder.decode(s);
        }
        exports.decodeURLSafe = decodeURLSafe;
        exports.encodedLength = function(length) {
          return stdCoder.encodedLength(length);
        };
        exports.maxDecodedLength = function(length) {
          return stdCoder.maxDecodedLength(length);
        };
        exports.decodedLength = function(s) {
          return stdCoder.decodedLength(s);
        };
      }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        var INVALID_UTF16 = "utf8: invalid string";
        var INVALID_UTF8 = "utf8: invalid source encoding";
        function encode(s) {
          var arr = new Uint8Array(encodedLength(s));
          var pos = 0;
          for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 128) arr[pos++] = c; else if (c < 2048) {
              arr[pos++] = 192 | c >> 6;
              arr[pos++] = 128 | 63 & c;
            } else if (c < 55296) {
              arr[pos++] = 224 | c >> 12;
              arr[pos++] = 128 | c >> 6 & 63;
              arr[pos++] = 128 | 63 & c;
            } else {
              i++;
              c = (1023 & c) << 10;
              c |= 1023 & s.charCodeAt(i);
              c += 65536;
              arr[pos++] = 240 | c >> 18;
              arr[pos++] = 128 | c >> 12 & 63;
              arr[pos++] = 128 | c >> 6 & 63;
              arr[pos++] = 128 | 63 & c;
            }
          }
          return arr;
        }
        exports.encode = encode;
        function encodedLength(s) {
          var result = 0;
          for (var i = 0; i < s.length; i++) {
            var c = s.charCodeAt(i);
            if (c < 128) result += 1; else if (c < 2048) result += 2; else if (c < 55296) result += 3; else {
              if (!(c <= 57343)) throw new Error(INVALID_UTF16);
              if (i >= s.length - 1) throw new Error(INVALID_UTF16);
              i++;
              result += 4;
            }
          }
          return result;
        }
        exports.encodedLength = encodedLength;
        function decode(arr) {
          var chars = [];
          for (var i = 0; i < arr.length; i++) {
            var b = arr[i];
            if (128 & b) {
              var min = void 0;
              if (b < 224) {
                if (i >= arr.length) throw new Error(INVALID_UTF8);
                var n1 = arr[++i];
                if (128 !== (192 & n1)) throw new Error(INVALID_UTF8);
                b = (31 & b) << 6 | 63 & n1;
                min = 128;
              } else if (b < 240) {
                if (i >= arr.length - 1) throw new Error(INVALID_UTF8);
                var n1 = arr[++i];
                var n2 = arr[++i];
                if (128 !== (192 & n1) || 128 !== (192 & n2)) throw new Error(INVALID_UTF8);
                b = (15 & b) << 12 | (63 & n1) << 6 | 63 & n2;
                min = 2048;
              } else {
                if (!(b < 248)) throw new Error(INVALID_UTF8);
                if (i >= arr.length - 2) throw new Error(INVALID_UTF8);
                var n1 = arr[++i];
                var n2 = arr[++i];
                var n3 = arr[++i];
                if (128 !== (192 & n1) || 128 !== (192 & n2) || 128 !== (192 & n3)) throw new Error(INVALID_UTF8);
                b = (15 & b) << 18 | (63 & n1) << 12 | (63 & n2) << 6 | 63 & n3;
                min = 65536;
              }
              if (b < min || b >= 55296 && b <= 57343) throw new Error(INVALID_UTF8);
              if (b >= 65536) {
                if (b > 1114111) throw new Error(INVALID_UTF8);
                b -= 65536;
                chars.push(String.fromCharCode(55296 | b >> 10));
                b = 56320 | 1023 & b;
              }
            }
            chars.push(String.fromCharCode(b));
          }
          return chars.join("");
        }
        exports.decode = decode;
      }, function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(3).default;
      }, function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var ScriptReceiverFactory = function() {
          function ScriptReceiverFactory(prefix, name) {
            this.lastId = 0;
            this.prefix = prefix;
            this.name = name;
          }
          ScriptReceiverFactory.prototype.create = function(callback) {
            this.lastId++;
            var number = this.lastId;
            var id = this.prefix + number;
            var name = this.name + "[" + number + "]";
            var called = false;
            var callbackWrapper = function() {
              if (!called) {
                callback.apply(null, arguments);
                called = true;
              }
            };
            this[number] = callbackWrapper;
            return {
              number: number,
              id: id,
              name: name,
              callback: callbackWrapper
            };
          };
          ScriptReceiverFactory.prototype.remove = function(receiver) {
            delete this[receiver.number];
          };
          return ScriptReceiverFactory;
        }();
        var ScriptReceivers = new ScriptReceiverFactory("_pusher_script_", "Pusher.ScriptReceivers");
        var Defaults = {
          VERSION: "8.0.2",
          PROTOCOL: 7,
          wsPort: 80,
          wssPort: 443,
          wsPath: "",
          httpHost: "sockjs.pusher.com",
          httpPort: 80,
          httpsPort: 443,
          httpPath: "/pusher",
          stats_host: "stats.pusher.com",
          authEndpoint: "/pusher/auth",
          authTransport: "ajax",
          activityTimeout: 12e4,
          pongTimeout: 3e4,
          unavailableTimeout: 1e4,
          userAuthentication: {
            endpoint: "/pusher/user-auth",
            transport: "ajax"
          },
          channelAuthorization: {
            endpoint: "/pusher/auth",
            transport: "ajax"
          },
          cdn_http: "http://js.pusher.com",
          cdn_https: "https://js.pusher.com",
          dependency_suffix: ""
        };
        var defaults = Defaults;
        var dependency_loader_DependencyLoader = function() {
          function DependencyLoader(options) {
            this.options = options;
            this.receivers = options.receivers || ScriptReceivers;
            this.loading = {};
          }
          DependencyLoader.prototype.load = function(name, options, callback) {
            var self = this;
            if (self.loading[name] && self.loading[name].length > 0) self.loading[name].push(callback); else {
              self.loading[name] = [ callback ];
              var request = runtime.createScriptRequest(self.getPath(name, options));
              var receiver = self.receivers.create(function(error) {
                self.receivers.remove(receiver);
                if (self.loading[name]) {
                  var callbacks = self.loading[name];
                  delete self.loading[name];
                  var successCallback = function(wasSuccessful) {
                    wasSuccessful || request.cleanup();
                  };
                  for (var i = 0; i < callbacks.length; i++) callbacks[i](error, successCallback);
                }
              });
              request.send(receiver);
            }
          };
          DependencyLoader.prototype.getRoot = function(options) {
            var cdn;
            var protocol = runtime.getDocument().location.protocol;
            cdn = options && options.useTLS || "https:" === protocol ? this.options.cdn_https : this.options.cdn_http;
            return cdn.replace(/\/*$/, "") + "/" + this.options.version;
          };
          DependencyLoader.prototype.getPath = function(name, options) {
            return this.getRoot(options) + "/" + name + this.options.suffix + ".js";
          };
          return DependencyLoader;
        }();
        var dependency_loader = dependency_loader_DependencyLoader;
        var DependenciesReceivers = new ScriptReceiverFactory("_pusher_dependencies", "Pusher.DependenciesReceivers");
        var Dependencies = new dependency_loader({
          cdn_http: defaults.cdn_http,
          cdn_https: defaults.cdn_https,
          version: defaults.VERSION,
          suffix: defaults.dependency_suffix,
          receivers: DependenciesReceivers
        });
        var urlStore = {
          baseUrl: "https://pusher.com",
          urls: {
            authenticationEndpoint: {
              path: "/docs/channels/server_api/authenticating_users"
            },
            authorizationEndpoint: {
              path: "/docs/channels/server_api/authorizing-users/"
            },
            javascriptQuickStart: {
              path: "/docs/javascript_quick_start"
            },
            triggeringClientEvents: {
              path: "/docs/client_api_guide/client_events#trigger-events"
            },
            encryptedChannelSupport: {
              fullUrl: "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support"
            }
          }
        };
        var buildLogSuffix = function(key) {
          var urlPrefix = "See:";
          var urlObj = urlStore.urls[key];
          if (!urlObj) return "";
          var url;
          urlObj.fullUrl ? url = urlObj.fullUrl : urlObj.path && (url = urlStore.baseUrl + urlObj.path);
          if (!url) return "";
          return urlPrefix + " " + url;
        };
        var url_store = {
          buildLogSuffix: buildLogSuffix
        };
        var AuthRequestType;
        (function(AuthRequestType) {
          AuthRequestType["UserAuthentication"] = "user-authentication";
          AuthRequestType["ChannelAuthorization"] = "channel-authorization";
        })(AuthRequestType || (AuthRequestType = {}));
        var __extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var BadEventName = function(_super) {
          __extends(BadEventName, _super);
          function BadEventName(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return BadEventName;
        }(Error);
        var BadChannelName = function(_super) {
          __extends(BadChannelName, _super);
          function BadChannelName(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return BadChannelName;
        }(Error);
        var RequestTimedOut = function(_super) {
          __extends(RequestTimedOut, _super);
          function RequestTimedOut(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return RequestTimedOut;
        }(Error);
        var TransportPriorityTooLow = function(_super) {
          __extends(TransportPriorityTooLow, _super);
          function TransportPriorityTooLow(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return TransportPriorityTooLow;
        }(Error);
        var TransportClosed = function(_super) {
          __extends(TransportClosed, _super);
          function TransportClosed(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return TransportClosed;
        }(Error);
        var UnsupportedFeature = function(_super) {
          __extends(UnsupportedFeature, _super);
          function UnsupportedFeature(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return UnsupportedFeature;
        }(Error);
        var UnsupportedTransport = function(_super) {
          __extends(UnsupportedTransport, _super);
          function UnsupportedTransport(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return UnsupportedTransport;
        }(Error);
        var UnsupportedStrategy = function(_super) {
          __extends(UnsupportedStrategy, _super);
          function UnsupportedStrategy(msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return UnsupportedStrategy;
        }(Error);
        var HTTPAuthError = function(_super) {
          __extends(HTTPAuthError, _super);
          function HTTPAuthError(status, msg) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, msg) || this;
            _this.status = status;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
          }
          return HTTPAuthError;
        }(Error);
        var ajax = function(context, query, authOptions, authRequestType, callback) {
          var xhr = runtime.createXHR();
          xhr.open("POST", authOptions.endpoint, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          for (var headerName in authOptions.headers) xhr.setRequestHeader(headerName, authOptions.headers[headerName]);
          if (null != authOptions.headersProvider) {
            var dynamicHeaders = authOptions.headersProvider();
            for (var headerName in dynamicHeaders) xhr.setRequestHeader(headerName, dynamicHeaders[headerName]);
          }
          xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) if (200 === xhr.status) {
              var data = void 0;
              var parsed = false;
              try {
                data = JSON.parse(xhr.responseText);
                parsed = true;
              } catch (e) {
                callback(new HTTPAuthError(200, "JSON returned from " + authRequestType.toString() + " endpoint was invalid, yet status code was 200. Data was: " + xhr.responseText), null);
              }
              parsed && callback(null, data);
            } else {
              var suffix = "";
              switch (authRequestType) {
               case AuthRequestType.UserAuthentication:
                suffix = url_store.buildLogSuffix("authenticationEndpoint");
                break;

               case AuthRequestType.ChannelAuthorization:
                suffix = "Clients must be authorized to join private or presence channels. " + url_store.buildLogSuffix("authorizationEndpoint");
              }
              callback(new HTTPAuthError(xhr.status, "Unable to retrieve auth string from " + authRequestType.toString() + " endpoint - received status: " + xhr.status + " from " + authOptions.endpoint + ". " + suffix), null);
            }
          };
          xhr.send(query);
          return xhr;
        };
        var xhr_auth = ajax;
        function encode(s) {
          return btoa(utob(s));
        }
        var fromCharCode = String.fromCharCode;
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64tab = {};
        for (var base64_i = 0, l = b64chars.length; base64_i < l; base64_i++) b64tab[b64chars.charAt(base64_i)] = base64_i;
        var cb_utob = function(c) {
          var cc = c.charCodeAt(0);
          return cc < 128 ? c : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | 63 & cc) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | 63 & cc);
        };
        var utob = function(u) {
          return u.replace(/[^\x00-\x7F]/g, cb_utob);
        };
        var cb_encode = function(ccc) {
          var padlen = [ 0, 2, 1 ][ccc.length % 3];
          var ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0);
          var chars = [ b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(63 & ord) ];
          return chars.join("");
        };
        var btoa = window.btoa || function(b) {
          return b.replace(/[\s\S]{1,3}/g, cb_encode);
        };
        var Timer = function() {
          function Timer(set, clear, delay, callback) {
            var _this = this;
            this.clear = clear;
            this.timer = set(function() {
              _this.timer && (_this.timer = callback(_this.timer));
            }, delay);
          }
          Timer.prototype.isRunning = function() {
            return null !== this.timer;
          };
          Timer.prototype.ensureAborted = function() {
            if (this.timer) {
              this.clear(this.timer);
              this.timer = null;
            }
          };
          return Timer;
        }();
        var abstract_timer = Timer;
        var timers_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        function timers_clearTimeout(timer) {
          window.clearTimeout(timer);
        }
        function timers_clearInterval(timer) {
          window.clearInterval(timer);
        }
        var OneOffTimer = function(_super) {
          timers_extends(OneOffTimer, _super);
          function OneOffTimer(delay, callback) {
            return _super.call(this, setTimeout, timers_clearTimeout, delay, function(timer) {
              callback();
              return null;
            }) || this;
          }
          return OneOffTimer;
        }(abstract_timer);
        var PeriodicTimer = function(_super) {
          timers_extends(PeriodicTimer, _super);
          function PeriodicTimer(delay, callback) {
            return _super.call(this, setInterval, timers_clearInterval, delay, function(timer) {
              callback();
              return timer;
            }) || this;
          }
          return PeriodicTimer;
        }(abstract_timer);
        var Util = {
          now: function() {
            return Date.now ? Date.now() : new Date().valueOf();
          },
          defer: function(callback) {
            return new OneOffTimer(0, callback);
          },
          method: function(name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
            var boundArguments = Array.prototype.slice.call(arguments, 1);
            return function(object) {
              return object[name].apply(object, boundArguments.concat(arguments));
            };
          }
        };
        var util = Util;
        function extend(target) {
          var sources = [];
          for (var _i = 1; _i < arguments.length; _i++) sources[_i - 1] = arguments[_i];
          for (var i = 0; i < sources.length; i++) {
            var extensions = sources[i];
            for (var property in extensions) extensions[property] && extensions[property].constructor && extensions[property].constructor === Object ? target[property] = extend(target[property] || {}, extensions[property]) : target[property] = extensions[property];
          }
          return target;
        }
        function stringify() {
          var m = [ "Pusher" ];
          for (var i = 0; i < arguments.length; i++) "string" === typeof arguments[i] ? m.push(arguments[i]) : m.push(safeJSONStringify(arguments[i]));
          return m.join(" : ");
        }
        function arrayIndexOf(array, item) {
          var nativeIndexOf = Array.prototype.indexOf;
          if (null === array) return -1;
          if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
          for (var i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
          return -1;
        }
        function objectApply(object, f) {
          for (var key in object) Object.prototype.hasOwnProperty.call(object, key) && f(object[key], key, object);
        }
        function keys(object) {
          var keys = [];
          objectApply(object, function(_, key) {
            keys.push(key);
          });
          return keys;
        }
        function values(object) {
          var values = [];
          objectApply(object, function(value) {
            values.push(value);
          });
          return values;
        }
        function apply(array, f, context) {
          for (var i = 0; i < array.length; i++) f.call(context || window, array[i], i, array);
        }
        function map(array, f) {
          var result = [];
          for (var i = 0; i < array.length; i++) result.push(f(array[i], i, array, result));
          return result;
        }
        function mapObject(object, f) {
          var result = {};
          objectApply(object, function(value, key) {
            result[key] = f(value);
          });
          return result;
        }
        function filter(array, test) {
          test = test || function(value) {
            return !!value;
          };
          var result = [];
          for (var i = 0; i < array.length; i++) test(array[i], i, array, result) && result.push(array[i]);
          return result;
        }
        function filterObject(object, test) {
          var result = {};
          objectApply(object, function(value, key) {
            (test && test(value, key, object, result) || Boolean(value)) && (result[key] = value);
          });
          return result;
        }
        function flatten(object) {
          var result = [];
          objectApply(object, function(value, key) {
            result.push([ key, value ]);
          });
          return result;
        }
        function any(array, test) {
          for (var i = 0; i < array.length; i++) if (test(array[i], i, array)) return true;
          return false;
        }
        function collections_all(array, test) {
          for (var i = 0; i < array.length; i++) if (!test(array[i], i, array)) return false;
          return true;
        }
        function encodeParamsObject(data) {
          return mapObject(data, function(value) {
            "object" === typeof value && (value = safeJSONStringify(value));
            return encodeURIComponent(encode(value.toString()));
          });
        }
        function buildQueryString(data) {
          var params = filterObject(data, function(value) {
            return void 0 !== value;
          });
          var query = map(flatten(encodeParamsObject(params)), util.method("join", "=")).join("&");
          return query;
        }
        function decycleObject(object) {
          var objects = [], paths = [];
          return function derez(value, path) {
            var i, name, nu;
            switch (typeof value) {
             case "object":
              if (!value) return null;
              for (i = 0; i < objects.length; i += 1) if (objects[i] === value) return {
                $ref: paths[i]
              };
              objects.push(value);
              paths.push(path);
              if ("[object Array]" === Object.prototype.toString.apply(value)) {
                nu = [];
                for (i = 0; i < value.length; i += 1) nu[i] = derez(value[i], path + "[" + i + "]");
              } else {
                nu = {};
                for (name in value) Object.prototype.hasOwnProperty.call(value, name) && (nu[name] = derez(value[name], path + "[" + JSON.stringify(name) + "]"));
              }
              return nu;

             case "number":
             case "string":
             case "boolean":
              return value;
            }
          }(object, "$");
        }
        function safeJSONStringify(source) {
          try {
            return JSON.stringify(source);
          } catch (e) {
            return JSON.stringify(decycleObject(source));
          }
        }
        var logger_Logger = function() {
          function Logger() {
            this.globalLog = function(message) {
              window.console && window.console.log && window.console.log(message);
            };
          }
          Logger.prototype.debug = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            this.log(this.globalLog, args);
          };
          Logger.prototype.warn = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            this.log(this.globalLogWarn, args);
          };
          Logger.prototype.error = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            this.log(this.globalLogError, args);
          };
          Logger.prototype.globalLogWarn = function(message) {
            window.console && window.console.warn ? window.console.warn(message) : this.globalLog(message);
          };
          Logger.prototype.globalLogError = function(message) {
            window.console && window.console.error ? window.console.error(message) : this.globalLogWarn(message);
          };
          Logger.prototype.log = function(defaultLoggingFunction) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
            var message = stringify.apply(this, arguments);
            if (core_pusher.log) core_pusher.log(message); else if (core_pusher.logToConsole) {
              var log = defaultLoggingFunction.bind(this);
              log(message);
            }
          };
          return Logger;
        }();
        var logger = new logger_Logger();
        var jsonp = function(context, query, authOptions, authRequestType, callback) {
          void 0 === authOptions.headers && null == authOptions.headersProvider || logger.warn("To send headers with the " + authRequestType.toString() + " request, you must use AJAX, rather than JSONP.");
          var callbackName = context.nextAuthCallbackID.toString();
          context.nextAuthCallbackID++;
          var document = context.getDocument();
          var script = document.createElement("script");
          context.auth_callbacks[callbackName] = function(data) {
            callback(null, data);
          };
          var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
          script.src = authOptions.endpoint + "?callback=" + encodeURIComponent(callback_name) + "&" + query;
          var head = document.getElementsByTagName("head")[0] || document.documentElement;
          head.insertBefore(script, head.firstChild);
        };
        var jsonp_auth = jsonp;
        var ScriptRequest = function() {
          function ScriptRequest(src) {
            this.src = src;
          }
          ScriptRequest.prototype.send = function(receiver) {
            var self = this;
            var errorString = "Error loading " + self.src;
            self.script = document.createElement("script");
            self.script.id = receiver.id;
            self.script.src = self.src;
            self.script.type = "text/javascript";
            self.script.charset = "UTF-8";
            if (self.script.addEventListener) {
              self.script.onerror = function() {
                receiver.callback(errorString);
              };
              self.script.onload = function() {
                receiver.callback(null);
              };
            } else self.script.onreadystatechange = function() {
              "loaded" !== self.script.readyState && "complete" !== self.script.readyState || receiver.callback(null);
            };
            if (void 0 === self.script.async && document.attachEvent && /opera/i.test(navigator.userAgent)) {
              self.errorScript = document.createElement("script");
              self.errorScript.id = receiver.id + "_error";
              self.errorScript.text = receiver.name + "('" + errorString + "');";
              self.script.async = self.errorScript.async = false;
            } else self.script.async = true;
            var head = document.getElementsByTagName("head")[0];
            head.insertBefore(self.script, head.firstChild);
            self.errorScript && head.insertBefore(self.errorScript, self.script.nextSibling);
          };
          ScriptRequest.prototype.cleanup = function() {
            if (this.script) {
              this.script.onload = this.script.onerror = null;
              this.script.onreadystatechange = null;
            }
            this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script);
            this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript);
            this.script = null;
            this.errorScript = null;
          };
          return ScriptRequest;
        }();
        var script_request = ScriptRequest;
        var jsonp_request_JSONPRequest = function() {
          function JSONPRequest(url, data) {
            this.url = url;
            this.data = data;
          }
          JSONPRequest.prototype.send = function(receiver) {
            if (this.request) return;
            var query = buildQueryString(this.data);
            var url = this.url + "/" + receiver.number + "?" + query;
            this.request = runtime.createScriptRequest(url);
            this.request.send(receiver);
          };
          JSONPRequest.prototype.cleanup = function() {
            this.request && this.request.cleanup();
          };
          return JSONPRequest;
        }();
        var jsonp_request = jsonp_request_JSONPRequest;
        var getAgent = function(sender, useTLS) {
          return function(data, callback) {
            var scheme = "http" + (useTLS ? "s" : "") + "://";
            var url = scheme + (sender.host || sender.options.host) + sender.options.path;
            var request = runtime.createJSONPRequest(url, data);
            var receiver = runtime.ScriptReceivers.create(function(error, result) {
              ScriptReceivers.remove(receiver);
              request.cleanup();
              result && result.host && (sender.host = result.host);
              callback && callback(error, result);
            });
            request.send(receiver);
          };
        };
        var jsonp_timeline_jsonp = {
          name: "jsonp",
          getAgent: getAgent
        };
        var jsonp_timeline = jsonp_timeline_jsonp;
        function getGenericURL(baseScheme, params, path) {
          var scheme = baseScheme + (params.useTLS ? "s" : "");
          var host = params.useTLS ? params.hostTLS : params.hostNonTLS;
          return scheme + "://" + host + path;
        }
        function getGenericPath(key, queryString) {
          var path = "/app/" + key;
          var query = "?protocol=" + defaults.PROTOCOL + "&client=js&version=" + defaults.VERSION + (queryString ? "&" + queryString : "");
          return path + query;
        }
        var ws = {
          getInitial: function(key, params) {
            var path = (params.httpPath || "") + getGenericPath(key, "flash=false");
            return getGenericURL("ws", params, path);
          }
        };
        var http = {
          getInitial: function(key, params) {
            var path = (params.httpPath || "/pusher") + getGenericPath(key);
            return getGenericURL("http", params, path);
          }
        };
        var sockjs = {
          getInitial: function(key, params) {
            return getGenericURL("http", params, params.httpPath || "/pusher");
          },
          getPath: function(key, params) {
            return getGenericPath(key);
          }
        };
        var callback_registry_CallbackRegistry = function() {
          function CallbackRegistry() {
            this._callbacks = {};
          }
          CallbackRegistry.prototype.get = function(name) {
            return this._callbacks[prefix(name)];
          };
          CallbackRegistry.prototype.add = function(name, callback, context) {
            var prefixedEventName = prefix(name);
            this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
            this._callbacks[prefixedEventName].push({
              fn: callback,
              context: context
            });
          };
          CallbackRegistry.prototype.remove = function(name, callback, context) {
            if (!name && !callback && !context) {
              this._callbacks = {};
              return;
            }
            var names = name ? [ prefix(name) ] : keys(this._callbacks);
            callback || context ? this.removeCallback(names, callback, context) : this.removeAllCallbacks(names);
          };
          CallbackRegistry.prototype.removeCallback = function(names, callback, context) {
            apply(names, function(name) {
              this._callbacks[name] = filter(this._callbacks[name] || [], function(binding) {
                return callback && callback !== binding.fn || context && context !== binding.context;
              });
              0 === this._callbacks[name].length && delete this._callbacks[name];
            }, this);
          };
          CallbackRegistry.prototype.removeAllCallbacks = function(names) {
            apply(names, function(name) {
              delete this._callbacks[name];
            }, this);
          };
          return CallbackRegistry;
        }();
        var callback_registry = callback_registry_CallbackRegistry;
        function prefix(name) {
          return "_" + name;
        }
        var dispatcher_Dispatcher = function() {
          function Dispatcher(failThrough) {
            this.callbacks = new callback_registry();
            this.global_callbacks = [];
            this.failThrough = failThrough;
          }
          Dispatcher.prototype.bind = function(eventName, callback, context) {
            this.callbacks.add(eventName, callback, context);
            return this;
          };
          Dispatcher.prototype.bind_global = function(callback) {
            this.global_callbacks.push(callback);
            return this;
          };
          Dispatcher.prototype.unbind = function(eventName, callback, context) {
            this.callbacks.remove(eventName, callback, context);
            return this;
          };
          Dispatcher.prototype.unbind_global = function(callback) {
            if (!callback) {
              this.global_callbacks = [];
              return this;
            }
            this.global_callbacks = filter(this.global_callbacks || [], function(c) {
              return c !== callback;
            });
            return this;
          };
          Dispatcher.prototype.unbind_all = function() {
            this.unbind();
            this.unbind_global();
            return this;
          };
          Dispatcher.prototype.emit = function(eventName, data, metadata) {
            for (var i = 0; i < this.global_callbacks.length; i++) this.global_callbacks[i](eventName, data);
            var callbacks = this.callbacks.get(eventName);
            var args = [];
            metadata ? args.push(data, metadata) : data && args.push(data);
            if (callbacks && callbacks.length > 0) for (var i = 0; i < callbacks.length; i++) callbacks[i].fn.apply(callbacks[i].context || window, args); else this.failThrough && this.failThrough(eventName, data);
            return this;
          };
          return Dispatcher;
        }();
        var dispatcher = dispatcher_Dispatcher;
        var transport_connection_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var transport_connection_TransportConnection = function(_super) {
          transport_connection_extends(TransportConnection, _super);
          function TransportConnection(hooks, name, priority, key, options) {
            var _this = _super.call(this) || this;
            _this.initialize = runtime.transportConnectionInitializer;
            _this.hooks = hooks;
            _this.name = name;
            _this.priority = priority;
            _this.key = key;
            _this.options = options;
            _this.state = "new";
            _this.timeline = options.timeline;
            _this.activityTimeout = options.activityTimeout;
            _this.id = _this.timeline.generateUniqueID();
            return _this;
          }
          TransportConnection.prototype.handlesActivityChecks = function() {
            return Boolean(this.hooks.handlesActivityChecks);
          };
          TransportConnection.prototype.supportsPing = function() {
            return Boolean(this.hooks.supportsPing);
          };
          TransportConnection.prototype.connect = function() {
            var _this = this;
            if (this.socket || "initialized" !== this.state) return false;
            var url = this.hooks.urls.getInitial(this.key, this.options);
            try {
              this.socket = this.hooks.getSocket(url, this.options);
            } catch (e) {
              util.defer(function() {
                _this.onError(e);
                _this.changeState("closed");
              });
              return false;
            }
            this.bindListeners();
            logger.debug("Connecting", {
              transport: this.name,
              url: url
            });
            this.changeState("connecting");
            return true;
          };
          TransportConnection.prototype.close = function() {
            if (this.socket) {
              this.socket.close();
              return true;
            }
            return false;
          };
          TransportConnection.prototype.send = function(data) {
            var _this = this;
            if ("open" === this.state) {
              util.defer(function() {
                _this.socket && _this.socket.send(data);
              });
              return true;
            }
            return false;
          };
          TransportConnection.prototype.ping = function() {
            "open" === this.state && this.supportsPing() && this.socket.ping();
          };
          TransportConnection.prototype.onOpen = function() {
            this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
            this.changeState("open");
            this.socket.onopen = void 0;
          };
          TransportConnection.prototype.onError = function(error) {
            this.emit("error", {
              type: "WebSocketError",
              error: error
            });
            this.timeline.error(this.buildTimelineMessage({
              error: error.toString()
            }));
          };
          TransportConnection.prototype.onClose = function(closeEvent) {
            closeEvent ? this.changeState("closed", {
              code: closeEvent.code,
              reason: closeEvent.reason,
              wasClean: closeEvent.wasClean
            }) : this.changeState("closed");
            this.unbindListeners();
            this.socket = void 0;
          };
          TransportConnection.prototype.onMessage = function(message) {
            this.emit("message", message);
          };
          TransportConnection.prototype.onActivity = function() {
            this.emit("activity");
          };
          TransportConnection.prototype.bindListeners = function() {
            var _this = this;
            this.socket.onopen = function() {
              _this.onOpen();
            };
            this.socket.onerror = function(error) {
              _this.onError(error);
            };
            this.socket.onclose = function(closeEvent) {
              _this.onClose(closeEvent);
            };
            this.socket.onmessage = function(message) {
              _this.onMessage(message);
            };
            this.supportsPing() && (this.socket.onactivity = function() {
              _this.onActivity();
            });
          };
          TransportConnection.prototype.unbindListeners = function() {
            if (this.socket) {
              this.socket.onopen = void 0;
              this.socket.onerror = void 0;
              this.socket.onclose = void 0;
              this.socket.onmessage = void 0;
              this.supportsPing() && (this.socket.onactivity = void 0);
            }
          };
          TransportConnection.prototype.changeState = function(state, params) {
            this.state = state;
            this.timeline.info(this.buildTimelineMessage({
              state: state,
              params: params
            }));
            this.emit(state, params);
          };
          TransportConnection.prototype.buildTimelineMessage = function(message) {
            return extend({
              cid: this.id
            }, message);
          };
          return TransportConnection;
        }(dispatcher);
        var transport_connection = transport_connection_TransportConnection;
        var transport_Transport = function() {
          function Transport(hooks) {
            this.hooks = hooks;
          }
          Transport.prototype.isSupported = function(environment) {
            return this.hooks.isSupported(environment);
          };
          Transport.prototype.createConnection = function(name, priority, key, options) {
            return new transport_connection(this.hooks, name, priority, key, options);
          };
          return Transport;
        }();
        var transports_transport = transport_Transport;
        var WSTransport = new transports_transport({
          urls: ws,
          handlesActivityChecks: false,
          supportsPing: false,
          isInitialized: function() {
            return Boolean(runtime.getWebSocketAPI());
          },
          isSupported: function() {
            return Boolean(runtime.getWebSocketAPI());
          },
          getSocket: function(url) {
            return runtime.createWebSocket(url);
          }
        });
        var httpConfiguration = {
          urls: http,
          handlesActivityChecks: false,
          supportsPing: true,
          isInitialized: function() {
            return true;
          }
        };
        var streamingConfiguration = extend({
          getSocket: function(url) {
            return runtime.HTTPFactory.createStreamingSocket(url);
          }
        }, httpConfiguration);
        var pollingConfiguration = extend({
          getSocket: function(url) {
            return runtime.HTTPFactory.createPollingSocket(url);
          }
        }, httpConfiguration);
        var xhrConfiguration = {
          isSupported: function() {
            return runtime.isXHRSupported();
          }
        };
        var XHRStreamingTransport = new transports_transport(extend({}, streamingConfiguration, xhrConfiguration));
        var XHRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xhrConfiguration));
        var Transports = {
          ws: WSTransport,
          xhr_streaming: XHRStreamingTransport,
          xhr_polling: XHRPollingTransport
        };
        var transports = Transports;
        var SockJSTransport = new transports_transport({
          file: "sockjs",
          urls: sockjs,
          handlesActivityChecks: true,
          supportsPing: false,
          isSupported: function() {
            return true;
          },
          isInitialized: function() {
            return void 0 !== window.SockJS;
          },
          getSocket: function(url, options) {
            return new window.SockJS(url, null, {
              js_path: Dependencies.getPath("sockjs", {
                useTLS: options.useTLS
              }),
              ignore_null_origin: options.ignoreNullOrigin
            });
          },
          beforeOpen: function(socket, path) {
            socket.send(JSON.stringify({
              path: path
            }));
          }
        });
        var xdrConfiguration = {
          isSupported: function(environment) {
            var yes = runtime.isXDRSupported(environment.useTLS);
            return yes;
          }
        };
        var XDRStreamingTransport = new transports_transport(extend({}, streamingConfiguration, xdrConfiguration));
        var XDRPollingTransport = new transports_transport(extend({}, pollingConfiguration, xdrConfiguration));
        transports.xdr_streaming = XDRStreamingTransport;
        transports.xdr_polling = XDRPollingTransport;
        transports.sockjs = SockJSTransport;
        var transports_transports = transports;
        var net_info_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var NetInfo = function(_super) {
          net_info_extends(NetInfo, _super);
          function NetInfo() {
            var _this = _super.call(this) || this;
            var self = _this;
            if (void 0 !== window.addEventListener) {
              window.addEventListener("online", function() {
                self.emit("online");
              }, false);
              window.addEventListener("offline", function() {
                self.emit("offline");
              }, false);
            }
            return _this;
          }
          NetInfo.prototype.isOnline = function() {
            return void 0 === window.navigator.onLine || window.navigator.onLine;
          };
          return NetInfo;
        }(dispatcher);
        var net_info_Network = new NetInfo();
        var assistant_to_the_transport_manager_AssistantToTheTransportManager = function() {
          function AssistantToTheTransportManager(manager, transport, options) {
            this.manager = manager;
            this.transport = transport;
            this.minPingDelay = options.minPingDelay;
            this.maxPingDelay = options.maxPingDelay;
            this.pingDelay = void 0;
          }
          AssistantToTheTransportManager.prototype.createConnection = function(name, priority, key, options) {
            var _this = this;
            options = extend({}, options, {
              activityTimeout: this.pingDelay
            });
            var connection = this.transport.createConnection(name, priority, key, options);
            var openTimestamp = null;
            var onOpen = function() {
              connection.unbind("open", onOpen);
              connection.bind("closed", onClosed);
              openTimestamp = util.now();
            };
            var onClosed = function(closeEvent) {
              connection.unbind("closed", onClosed);
              if (1002 === closeEvent.code || 1003 === closeEvent.code) _this.manager.reportDeath(); else if (!closeEvent.wasClean && openTimestamp) {
                var lifespan = util.now() - openTimestamp;
                if (lifespan < 2 * _this.maxPingDelay) {
                  _this.manager.reportDeath();
                  _this.pingDelay = Math.max(lifespan / 2, _this.minPingDelay);
                }
              }
            };
            connection.bind("open", onOpen);
            return connection;
          };
          AssistantToTheTransportManager.prototype.isSupported = function(environment) {
            return this.manager.isAlive() && this.transport.isSupported(environment);
          };
          return AssistantToTheTransportManager;
        }();
        var assistant_to_the_transport_manager = assistant_to_the_transport_manager_AssistantToTheTransportManager;
        var Protocol = {
          decodeMessage: function(messageEvent) {
            try {
              var messageData = JSON.parse(messageEvent.data);
              var pusherEventData = messageData.data;
              if ("string" === typeof pusherEventData) try {
                pusherEventData = JSON.parse(messageData.data);
              } catch (e) {}
              var pusherEvent = {
                event: messageData.event,
                channel: messageData.channel,
                data: pusherEventData
              };
              messageData.user_id && (pusherEvent.user_id = messageData.user_id);
              return pusherEvent;
            } catch (e) {
              throw {
                type: "MessageParseError",
                error: e,
                data: messageEvent.data
              };
            }
          },
          encodeMessage: function(event) {
            return JSON.stringify(event);
          },
          processHandshake: function(messageEvent) {
            var message = Protocol.decodeMessage(messageEvent);
            if ("pusher:connection_established" === message.event) {
              if (!message.data.activity_timeout) throw "No activity timeout specified in handshake";
              return {
                action: "connected",
                id: message.data.socket_id,
                activityTimeout: 1e3 * message.data.activity_timeout
              };
            }
            if ("pusher:error" === message.event) return {
              action: this.getCloseAction(message.data),
              error: this.getCloseError(message.data)
            };
            throw "Invalid handshake";
          },
          getCloseAction: function(closeEvent) {
            return closeEvent.code < 4e3 ? closeEvent.code >= 1002 && closeEvent.code <= 1004 ? "backoff" : null : 4e3 === closeEvent.code ? "tls_only" : closeEvent.code < 4100 ? "refused" : closeEvent.code < 4200 ? "backoff" : closeEvent.code < 4300 ? "retry" : "refused";
          },
          getCloseError: function(closeEvent) {
            return 1e3 !== closeEvent.code && 1001 !== closeEvent.code ? {
              type: "PusherError",
              data: {
                code: closeEvent.code,
                message: closeEvent.reason || closeEvent.message
              }
            } : null;
          }
        };
        var protocol_protocol = Protocol;
        var connection_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var connection_Connection = function(_super) {
          connection_extends(Connection, _super);
          function Connection(id, transport) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.transport = transport;
            _this.activityTimeout = transport.activityTimeout;
            _this.bindListeners();
            return _this;
          }
          Connection.prototype.handlesActivityChecks = function() {
            return this.transport.handlesActivityChecks();
          };
          Connection.prototype.send = function(data) {
            return this.transport.send(data);
          };
          Connection.prototype.send_event = function(name, data, channel) {
            var event = {
              event: name,
              data: data
            };
            channel && (event.channel = channel);
            logger.debug("Event sent", event);
            return this.send(protocol_protocol.encodeMessage(event));
          };
          Connection.prototype.ping = function() {
            this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {});
          };
          Connection.prototype.close = function() {
            this.transport.close();
          };
          Connection.prototype.bindListeners = function() {
            var _this = this;
            var listeners = {
              message: function(messageEvent) {
                var pusherEvent;
                try {
                  pusherEvent = protocol_protocol.decodeMessage(messageEvent);
                } catch (e) {
                  _this.emit("error", {
                    type: "MessageParseError",
                    error: e,
                    data: messageEvent.data
                  });
                }
                if (void 0 !== pusherEvent) {
                  logger.debug("Event recd", pusherEvent);
                  switch (pusherEvent.event) {
                   case "pusher:error":
                    _this.emit("error", {
                      type: "PusherError",
                      data: pusherEvent.data
                    });
                    break;

                   case "pusher:ping":
                    _this.emit("ping");
                    break;

                   case "pusher:pong":
                    _this.emit("pong");
                  }
                  _this.emit("message", pusherEvent);
                }
              },
              activity: function() {
                _this.emit("activity");
              },
              error: function(error) {
                _this.emit("error", error);
              },
              closed: function(closeEvent) {
                unbindListeners();
                closeEvent && closeEvent.code && _this.handleCloseEvent(closeEvent);
                _this.transport = null;
                _this.emit("closed");
              }
            };
            var unbindListeners = function() {
              objectApply(listeners, function(listener, event) {
                _this.transport.unbind(event, listener);
              });
            };
            objectApply(listeners, function(listener, event) {
              _this.transport.bind(event, listener);
            });
          };
          Connection.prototype.handleCloseEvent = function(closeEvent) {
            var action = protocol_protocol.getCloseAction(closeEvent);
            var error = protocol_protocol.getCloseError(closeEvent);
            error && this.emit("error", error);
            action && this.emit(action, {
              action: action,
              error: error
            });
          };
          return Connection;
        }(dispatcher);
        var connection_connection = connection_Connection;
        var handshake_Handshake = function() {
          function Handshake(transport, callback) {
            this.transport = transport;
            this.callback = callback;
            this.bindListeners();
          }
          Handshake.prototype.close = function() {
            this.unbindListeners();
            this.transport.close();
          };
          Handshake.prototype.bindListeners = function() {
            var _this = this;
            this.onMessage = function(m) {
              _this.unbindListeners();
              var result;
              try {
                result = protocol_protocol.processHandshake(m);
              } catch (e) {
                _this.finish("error", {
                  error: e
                });
                _this.transport.close();
                return;
              }
              if ("connected" === result.action) _this.finish("connected", {
                connection: new connection_connection(result.id, _this.transport),
                activityTimeout: result.activityTimeout
              }); else {
                _this.finish(result.action, {
                  error: result.error
                });
                _this.transport.close();
              }
            };
            this.onClosed = function(closeEvent) {
              _this.unbindListeners();
              var action = protocol_protocol.getCloseAction(closeEvent) || "backoff";
              var error = protocol_protocol.getCloseError(closeEvent);
              _this.finish(action, {
                error: error
              });
            };
            this.transport.bind("message", this.onMessage);
            this.transport.bind("closed", this.onClosed);
          };
          Handshake.prototype.unbindListeners = function() {
            this.transport.unbind("message", this.onMessage);
            this.transport.unbind("closed", this.onClosed);
          };
          Handshake.prototype.finish = function(action, params) {
            this.callback(extend({
              transport: this.transport,
              action: action
            }, params));
          };
          return Handshake;
        }();
        var connection_handshake = handshake_Handshake;
        var timeline_sender_TimelineSender = function() {
          function TimelineSender(timeline, options) {
            this.timeline = timeline;
            this.options = options || {};
          }
          TimelineSender.prototype.send = function(useTLS, callback) {
            if (this.timeline.isEmpty()) return;
            this.timeline.send(runtime.TimelineTransport.getAgent(this, useTLS), callback);
          };
          return TimelineSender;
        }();
        var timeline_sender = timeline_sender_TimelineSender;
        var channel_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var channel_Channel = function(_super) {
          channel_extends(Channel, _super);
          function Channel(name, pusher) {
            var _this = _super.call(this, function(event, data) {
              logger.debug("No callbacks on " + name + " for " + event);
            }) || this;
            _this.name = name;
            _this.pusher = pusher;
            _this.subscribed = false;
            _this.subscriptionPending = false;
            _this.subscriptionCancelled = false;
            return _this;
          }
          Channel.prototype.authorize = function(socketId, callback) {
            return callback(null, {
              auth: ""
            });
          };
          Channel.prototype.trigger = function(event, data) {
            if (0 !== event.indexOf("client-")) throw new BadEventName("Event '" + event + "' does not start with 'client-'");
            if (!this.subscribed) {
              var suffix = url_store.buildLogSuffix("triggeringClientEvents");
              logger.warn("Client event triggered before channel 'subscription_succeeded' event . " + suffix);
            }
            return this.pusher.send_event(event, data, this.name);
          };
          Channel.prototype.disconnect = function() {
            this.subscribed = false;
            this.subscriptionPending = false;
          };
          Channel.prototype.handleEvent = function(event) {
            var eventName = event.event;
            var data = event.data;
            if ("pusher_internal:subscription_succeeded" === eventName) this.handleSubscriptionSucceededEvent(event); else if ("pusher_internal:subscription_count" === eventName) this.handleSubscriptionCountEvent(event); else if (0 !== eventName.indexOf("pusher_internal:")) {
              var metadata = {};
              this.emit(eventName, data, metadata);
            }
          };
          Channel.prototype.handleSubscriptionSucceededEvent = function(event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit("pusher:subscription_succeeded", event.data);
          };
          Channel.prototype.handleSubscriptionCountEvent = function(event) {
            event.data.subscription_count && (this.subscriptionCount = event.data.subscription_count);
            this.emit("pusher:subscription_count", event.data);
          };
          Channel.prototype.subscribe = function() {
            var _this = this;
            if (this.subscribed) return;
            this.subscriptionPending = true;
            this.subscriptionCancelled = false;
            this.authorize(this.pusher.connection.socket_id, function(error, data) {
              if (error) {
                _this.subscriptionPending = false;
                logger.error(error.toString());
                _this.emit("pusher:subscription_error", Object.assign({}, {
                  type: "AuthError",
                  error: error.message
                }, error instanceof HTTPAuthError ? {
                  status: error.status
                } : {}));
              } else _this.pusher.send_event("pusher:subscribe", {
                auth: data.auth,
                channel_data: data.channel_data,
                channel: _this.name
              });
            });
          };
          Channel.prototype.unsubscribe = function() {
            this.subscribed = false;
            this.pusher.send_event("pusher:unsubscribe", {
              channel: this.name
            });
          };
          Channel.prototype.cancelSubscription = function() {
            this.subscriptionCancelled = true;
          };
          Channel.prototype.reinstateSubscription = function() {
            this.subscriptionCancelled = false;
          };
          return Channel;
        }(dispatcher);
        var channels_channel = channel_Channel;
        var private_channel_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var PrivateChannel = function(_super) {
          private_channel_extends(PrivateChannel, _super);
          function PrivateChannel() {
            return null !== _super && _super.apply(this, arguments) || this;
          }
          PrivateChannel.prototype.authorize = function(socketId, callback) {
            return this.pusher.config.channelAuthorizer({
              channelName: this.name,
              socketId: socketId
            }, callback);
          };
          return PrivateChannel;
        }(channels_channel);
        var private_channel = PrivateChannel;
        var members_Members = function() {
          function Members() {
            this.reset();
          }
          Members.prototype.get = function(id) {
            return Object.prototype.hasOwnProperty.call(this.members, id) ? {
              id: id,
              info: this.members[id]
            } : null;
          };
          Members.prototype.each = function(callback) {
            var _this = this;
            objectApply(this.members, function(member, id) {
              callback(_this.get(id));
            });
          };
          Members.prototype.setMyID = function(id) {
            this.myID = id;
          };
          Members.prototype.onSubscription = function(subscriptionData) {
            this.members = subscriptionData.presence.hash;
            this.count = subscriptionData.presence.count;
            this.me = this.get(this.myID);
          };
          Members.prototype.addMember = function(memberData) {
            null === this.get(memberData.user_id) && this.count++;
            this.members[memberData.user_id] = memberData.user_info;
            return this.get(memberData.user_id);
          };
          Members.prototype.removeMember = function(memberData) {
            var member = this.get(memberData.user_id);
            if (member) {
              delete this.members[memberData.user_id];
              this.count--;
            }
            return member;
          };
          Members.prototype.reset = function() {
            this.members = {};
            this.count = 0;
            this.myID = null;
            this.me = null;
          };
          return Members;
        }();
        var members = members_Members;
        var presence_channel_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var __awaiter = (void 0, function(thisArg, _arguments, P, generator) {
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
        });
        var __generator = (void 0, function(thisArg, body) {
          var _ = {
            label: 0,
            sent: function() {
              if (1 & t[0]) throw t[1];
              return t[1];
            },
            trys: [],
            ops: []
          }, f, y, t, g;
          return g = {
            next: verb(0),
            throw: verb(1),
            return: verb(2)
          }, "function" === typeof Symbol && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([ n, v ]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
              if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 
              0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              (y = 0, t) && (op = [ 2 & op[0], t.value ]);
              switch (op[0]) {
               case 0:
               case 1:
                t = op;
                break;

               case 4:
                _.label++;
                return {
                  value: op[1],
                  done: false
                };

               case 5:
                _.label++;
                y = op[1];
                op = [ 0 ];
                continue;

               case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;

               default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                  _ = 0;
                  continue;
                }
                if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (6 === op[0] && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                t[2] && _.ops.pop();
                _.trys.pop();
                continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [ 6, e ];
              y = 0;
            } finally {
              f = t = 0;
            }
            if (5 & op[0]) throw op[1];
            return {
              value: op[0] ? op[1] : void 0,
              done: true
            };
          }
        });
        var presence_channel_PresenceChannel = function(_super) {
          presence_channel_extends(PresenceChannel, _super);
          function PresenceChannel(name, pusher) {
            var _this = _super.call(this, name, pusher) || this;
            _this.members = new members();
            return _this;
          }
          PresenceChannel.prototype.authorize = function(socketId, callback) {
            var _this = this;
            _super.prototype.authorize.call(this, socketId, function(error, authData) {
              return __awaiter(_this, void 0, void 0, function() {
                var channelData, suffix;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                   case 0:
                    if (!!error) return [ 3, 3 ];
                    authData = authData;
                    if (!(null != authData.channel_data)) return [ 3, 1 ];
                    channelData = JSON.parse(authData.channel_data);
                    this.members.setMyID(channelData.user_id);
                    return [ 3, 3 ];

                   case 1:
                    return [ 4, this.pusher.user.signinDonePromise ];

                   case 2:
                    _a.sent();
                    if (null == this.pusher.user.user_data) {
                      suffix = url_store.buildLogSuffix("authorizationEndpoint");
                      logger.error("Invalid auth response for channel '" + this.name + "', expected 'channel_data' field. " + suffix + ", or the user should be signed in.");
                      callback("Invalid auth response");
                      return [ 2 ];
                    }
                    this.members.setMyID(this.pusher.user.user_data.id);
                    _a.label = 3;

                   case 3:
                    callback(error, authData);
                    return [ 2 ];
                  }
                });
              });
            });
          };
          PresenceChannel.prototype.handleEvent = function(event) {
            var eventName = event.event;
            if (0 === eventName.indexOf("pusher_internal:")) this.handleInternalEvent(event); else {
              var data = event.data;
              var metadata = {};
              event.user_id && (metadata.user_id = event.user_id);
              this.emit(eventName, data, metadata);
            }
          };
          PresenceChannel.prototype.handleInternalEvent = function(event) {
            var eventName = event.event;
            var data = event.data;
            switch (eventName) {
             case "pusher_internal:subscription_succeeded":
              this.handleSubscriptionSucceededEvent(event);
              break;

             case "pusher_internal:subscription_count":
              this.handleSubscriptionCountEvent(event);
              break;

             case "pusher_internal:member_added":
              var addedMember = this.members.addMember(data);
              this.emit("pusher:member_added", addedMember);
              break;

             case "pusher_internal:member_removed":
              var removedMember = this.members.removeMember(data);
              removedMember && this.emit("pusher:member_removed", removedMember);
            }
          };
          PresenceChannel.prototype.handleSubscriptionSucceededEvent = function(event) {
            this.subscriptionPending = false;
            this.subscribed = true;
            if (this.subscriptionCancelled) this.pusher.unsubscribe(this.name); else {
              this.members.onSubscription(event.data);
              this.emit("pusher:subscription_succeeded", this.members);
            }
          };
          PresenceChannel.prototype.disconnect = function() {
            this.members.reset();
            _super.prototype.disconnect.call(this);
          };
          return PresenceChannel;
        }(private_channel);
        var presence_channel = presence_channel_PresenceChannel;
        var utf8 = __webpack_require__(1);
        var base64 = __webpack_require__(0);
        var encrypted_channel_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var encrypted_channel_EncryptedChannel = function(_super) {
          encrypted_channel_extends(EncryptedChannel, _super);
          function EncryptedChannel(name, pusher, nacl) {
            var _this = _super.call(this, name, pusher) || this;
            _this.key = null;
            _this.nacl = nacl;
            return _this;
          }
          EncryptedChannel.prototype.authorize = function(socketId, callback) {
            var _this = this;
            _super.prototype.authorize.call(this, socketId, function(error, authData) {
              if (error) {
                callback(error, authData);
                return;
              }
              var sharedSecret = authData["shared_secret"];
              if (!sharedSecret) {
                callback(new Error("No shared_secret key in auth payload for encrypted channel: " + _this.name), null);
                return;
              }
              _this.key = Object(base64["decode"])(sharedSecret);
              delete authData["shared_secret"];
              callback(null, authData);
            });
          };
          EncryptedChannel.prototype.trigger = function(event, data) {
            throw new UnsupportedFeature("Client events are not currently supported for encrypted channels");
          };
          EncryptedChannel.prototype.handleEvent = function(event) {
            var eventName = event.event;
            var data = event.data;
            if (0 === eventName.indexOf("pusher_internal:") || 0 === eventName.indexOf("pusher:")) {
              _super.prototype.handleEvent.call(this, event);
              return;
            }
            this.handleEncryptedEvent(eventName, data);
          };
          EncryptedChannel.prototype.handleEncryptedEvent = function(event, data) {
            var _this = this;
            if (!this.key) {
              logger.debug("Received encrypted event before key has been retrieved from the authEndpoint");
              return;
            }
            if (!data.ciphertext || !data.nonce) {
              logger.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + data);
              return;
            }
            var cipherText = Object(base64["decode"])(data.ciphertext);
            if (cipherText.length < this.nacl.secretbox.overheadLength) {
              logger.error("Expected encrypted event ciphertext length to be " + this.nacl.secretbox.overheadLength + ", got: " + cipherText.length);
              return;
            }
            var nonce = Object(base64["decode"])(data.nonce);
            if (nonce.length < this.nacl.secretbox.nonceLength) {
              logger.error("Expected encrypted event nonce length to be " + this.nacl.secretbox.nonceLength + ", got: " + nonce.length);
              return;
            }
            var bytes = this.nacl.secretbox.open(cipherText, nonce, this.key);
            if (null === bytes) {
              logger.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint...");
              this.authorize(this.pusher.connection.socket_id, function(error, authData) {
                if (error) {
                  logger.error("Failed to make a request to the authEndpoint: " + authData + ". Unable to fetch new key, so dropping encrypted event");
                  return;
                }
                bytes = _this.nacl.secretbox.open(cipherText, nonce, _this.key);
                if (null === bytes) {
                  logger.error("Failed to decrypt event with new key. Dropping encrypted event");
                  return;
                }
                _this.emit(event, _this.getDataToEmit(bytes));
                return;
              });
              return;
            }
            this.emit(event, this.getDataToEmit(bytes));
          };
          EncryptedChannel.prototype.getDataToEmit = function(bytes) {
            var raw = Object(utf8["decode"])(bytes);
            try {
              return JSON.parse(raw);
            } catch (_a) {
              return raw;
            }
          };
          return EncryptedChannel;
        }(private_channel);
        var encrypted_channel = encrypted_channel_EncryptedChannel;
        var connection_manager_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var connection_manager_ConnectionManager = function(_super) {
          connection_manager_extends(ConnectionManager, _super);
          function ConnectionManager(key, options) {
            var _this = _super.call(this) || this;
            _this.state = "initialized";
            _this.connection = null;
            _this.key = key;
            _this.options = options;
            _this.timeline = _this.options.timeline;
            _this.usingTLS = _this.options.useTLS;
            _this.errorCallbacks = _this.buildErrorCallbacks();
            _this.connectionCallbacks = _this.buildConnectionCallbacks(_this.errorCallbacks);
            _this.handshakeCallbacks = _this.buildHandshakeCallbacks(_this.errorCallbacks);
            var Network = runtime.getNetwork();
            Network.bind("online", function() {
              _this.timeline.info({
                netinfo: "online"
              });
              "connecting" !== _this.state && "unavailable" !== _this.state || _this.retryIn(0);
            });
            Network.bind("offline", function() {
              _this.timeline.info({
                netinfo: "offline"
              });
              _this.connection && _this.sendActivityCheck();
            });
            _this.updateStrategy();
            return _this;
          }
          ConnectionManager.prototype.connect = function() {
            if (this.connection || this.runner) return;
            if (!this.strategy.isSupported()) {
              this.updateState("failed");
              return;
            }
            this.updateState("connecting");
            this.startConnecting();
            this.setUnavailableTimer();
          };
          ConnectionManager.prototype.send = function(data) {
            return !!this.connection && this.connection.send(data);
          };
          ConnectionManager.prototype.send_event = function(name, data, channel) {
            return !!this.connection && this.connection.send_event(name, data, channel);
          };
          ConnectionManager.prototype.disconnect = function() {
            this.disconnectInternally();
            this.updateState("disconnected");
          };
          ConnectionManager.prototype.isUsingTLS = function() {
            return this.usingTLS;
          };
          ConnectionManager.prototype.startConnecting = function() {
            var _this = this;
            var callback = function(error, handshake) {
              if (error) _this.runner = _this.strategy.connect(0, callback); else if ("error" === handshake.action) {
                _this.emit("error", {
                  type: "HandshakeError",
                  error: handshake.error
                });
                _this.timeline.error({
                  handshakeError: handshake.error
                });
              } else {
                _this.abortConnecting();
                _this.handshakeCallbacks[handshake.action](handshake);
              }
            };
            this.runner = this.strategy.connect(0, callback);
          };
          ConnectionManager.prototype.abortConnecting = function() {
            if (this.runner) {
              this.runner.abort();
              this.runner = null;
            }
          };
          ConnectionManager.prototype.disconnectInternally = function() {
            this.abortConnecting();
            this.clearRetryTimer();
            this.clearUnavailableTimer();
            if (this.connection) {
              var connection = this.abandonConnection();
              connection.close();
            }
          };
          ConnectionManager.prototype.updateStrategy = function() {
            this.strategy = this.options.getStrategy({
              key: this.key,
              timeline: this.timeline,
              useTLS: this.usingTLS
            });
          };
          ConnectionManager.prototype.retryIn = function(delay) {
            var _this = this;
            this.timeline.info({
              action: "retry",
              delay: delay
            });
            delay > 0 && this.emit("connecting_in", Math.round(delay / 1e3));
            this.retryTimer = new OneOffTimer(delay || 0, function() {
              _this.disconnectInternally();
              _this.connect();
            });
          };
          ConnectionManager.prototype.clearRetryTimer = function() {
            if (this.retryTimer) {
              this.retryTimer.ensureAborted();
              this.retryTimer = null;
            }
          };
          ConnectionManager.prototype.setUnavailableTimer = function() {
            var _this = this;
            this.unavailableTimer = new OneOffTimer(this.options.unavailableTimeout, function() {
              _this.updateState("unavailable");
            });
          };
          ConnectionManager.prototype.clearUnavailableTimer = function() {
            this.unavailableTimer && this.unavailableTimer.ensureAborted();
          };
          ConnectionManager.prototype.sendActivityCheck = function() {
            var _this = this;
            this.stopActivityCheck();
            this.connection.ping();
            this.activityTimer = new OneOffTimer(this.options.pongTimeout, function() {
              _this.timeline.error({
                pong_timed_out: _this.options.pongTimeout
              });
              _this.retryIn(0);
            });
          };
          ConnectionManager.prototype.resetActivityCheck = function() {
            var _this = this;
            this.stopActivityCheck();
            this.connection && !this.connection.handlesActivityChecks() && (this.activityTimer = new OneOffTimer(this.activityTimeout, function() {
              _this.sendActivityCheck();
            }));
          };
          ConnectionManager.prototype.stopActivityCheck = function() {
            this.activityTimer && this.activityTimer.ensureAborted();
          };
          ConnectionManager.prototype.buildConnectionCallbacks = function(errorCallbacks) {
            var _this = this;
            return extend({}, errorCallbacks, {
              message: function(message) {
                _this.resetActivityCheck();
                _this.emit("message", message);
              },
              ping: function() {
                _this.send_event("pusher:pong", {});
              },
              activity: function() {
                _this.resetActivityCheck();
              },
              error: function(error) {
                _this.emit("error", error);
              },
              closed: function() {
                _this.abandonConnection();
                _this.shouldRetry() && _this.retryIn(1e3);
              }
            });
          };
          ConnectionManager.prototype.buildHandshakeCallbacks = function(errorCallbacks) {
            var _this = this;
            return extend({}, errorCallbacks, {
              connected: function(handshake) {
                _this.activityTimeout = Math.min(_this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
                _this.clearUnavailableTimer();
                _this.setConnection(handshake.connection);
                _this.socket_id = _this.connection.id;
                _this.updateState("connected", {
                  socket_id: _this.socket_id
                });
              }
            });
          };
          ConnectionManager.prototype.buildErrorCallbacks = function() {
            var _this = this;
            var withErrorEmitted = function(callback) {
              return function(result) {
                result.error && _this.emit("error", {
                  type: "WebSocketError",
                  error: result.error
                });
                callback(result);
              };
            };
            return {
              tls_only: withErrorEmitted(function() {
                _this.usingTLS = true;
                _this.updateStrategy();
                _this.retryIn(0);
              }),
              refused: withErrorEmitted(function() {
                _this.disconnect();
              }),
              backoff: withErrorEmitted(function() {
                _this.retryIn(1e3);
              }),
              retry: withErrorEmitted(function() {
                _this.retryIn(0);
              })
            };
          };
          ConnectionManager.prototype.setConnection = function(connection) {
            this.connection = connection;
            for (var event in this.connectionCallbacks) this.connection.bind(event, this.connectionCallbacks[event]);
            this.resetActivityCheck();
          };
          ConnectionManager.prototype.abandonConnection = function() {
            if (!this.connection) return;
            this.stopActivityCheck();
            for (var event in this.connectionCallbacks) this.connection.unbind(event, this.connectionCallbacks[event]);
            var connection = this.connection;
            this.connection = null;
            return connection;
          };
          ConnectionManager.prototype.updateState = function(newState, data) {
            var previousState = this.state;
            this.state = newState;
            if (previousState !== newState) {
              var newStateDescription = newState;
              "connected" === newStateDescription && (newStateDescription += " with new socket ID " + data.socket_id);
              logger.debug("State changed", previousState + " -> " + newStateDescription);
              this.timeline.info({
                state: newState,
                params: data
              });
              this.emit("state_change", {
                previous: previousState,
                current: newState
              });
              this.emit(newState, data);
            }
          };
          ConnectionManager.prototype.shouldRetry = function() {
            return "connecting" === this.state || "connected" === this.state;
          };
          return ConnectionManager;
        }(dispatcher);
        var connection_manager = connection_manager_ConnectionManager;
        var channels_Channels = function() {
          function Channels() {
            this.channels = {};
          }
          Channels.prototype.add = function(name, pusher) {
            this.channels[name] || (this.channels[name] = createChannel(name, pusher));
            return this.channels[name];
          };
          Channels.prototype.all = function() {
            return values(this.channels);
          };
          Channels.prototype.find = function(name) {
            return this.channels[name];
          };
          Channels.prototype.remove = function(name) {
            var channel = this.channels[name];
            delete this.channels[name];
            return channel;
          };
          Channels.prototype.disconnect = function() {
            objectApply(this.channels, function(channel) {
              channel.disconnect();
            });
          };
          return Channels;
        }();
        var channels = channels_Channels;
        function createChannel(name, pusher) {
          if (0 === name.indexOf("private-encrypted-")) {
            if (pusher.config.nacl) return factory.createEncryptedChannel(name, pusher, pusher.config.nacl);
            var errMsg = "Tried to subscribe to a private-encrypted- channel but no nacl implementation available";
            var suffix = url_store.buildLogSuffix("encryptedChannelSupport");
            throw new UnsupportedFeature(errMsg + ". " + suffix);
          }
          if (0 === name.indexOf("private-")) return factory.createPrivateChannel(name, pusher);
          if (0 === name.indexOf("presence-")) return factory.createPresenceChannel(name, pusher);
          if (0 === name.indexOf("#")) throw new BadChannelName('Cannot create a channel with name "' + name + '".');
          return factory.createChannel(name, pusher);
        }
        var Factory = {
          createChannels: function() {
            return new channels();
          },
          createConnectionManager: function(key, options) {
            return new connection_manager(key, options);
          },
          createChannel: function(name, pusher) {
            return new channels_channel(name, pusher);
          },
          createPrivateChannel: function(name, pusher) {
            return new private_channel(name, pusher);
          },
          createPresenceChannel: function(name, pusher) {
            return new presence_channel(name, pusher);
          },
          createEncryptedChannel: function(name, pusher, nacl) {
            return new encrypted_channel(name, pusher, nacl);
          },
          createTimelineSender: function(timeline, options) {
            return new timeline_sender(timeline, options);
          },
          createHandshake: function(transport, callback) {
            return new connection_handshake(transport, callback);
          },
          createAssistantToTheTransportManager: function(manager, transport, options) {
            return new assistant_to_the_transport_manager(manager, transport, options);
          }
        };
        var factory = Factory;
        var transport_manager_TransportManager = function() {
          function TransportManager(options) {
            this.options = options || {};
            this.livesLeft = this.options.lives || Infinity;
          }
          TransportManager.prototype.getAssistant = function(transport) {
            return factory.createAssistantToTheTransportManager(this, transport, {
              minPingDelay: this.options.minPingDelay,
              maxPingDelay: this.options.maxPingDelay
            });
          };
          TransportManager.prototype.isAlive = function() {
            return this.livesLeft > 0;
          };
          TransportManager.prototype.reportDeath = function() {
            this.livesLeft -= 1;
          };
          return TransportManager;
        }();
        var transport_manager = transport_manager_TransportManager;
        var sequential_strategy_SequentialStrategy = function() {
          function SequentialStrategy(strategies, options) {
            this.strategies = strategies;
            this.loop = Boolean(options.loop);
            this.failFast = Boolean(options.failFast);
            this.timeout = options.timeout;
            this.timeoutLimit = options.timeoutLimit;
          }
          SequentialStrategy.prototype.isSupported = function() {
            return any(this.strategies, util.method("isSupported"));
          };
          SequentialStrategy.prototype.connect = function(minPriority, callback) {
            var _this = this;
            var strategies = this.strategies;
            var current = 0;
            var timeout = this.timeout;
            var runner = null;
            var tryNextStrategy = function(error, handshake) {
              if (handshake) callback(null, handshake); else {
                current += 1;
                _this.loop && (current %= strategies.length);
                if (current < strategies.length) {
                  if (timeout) {
                    timeout *= 2;
                    _this.timeoutLimit && (timeout = Math.min(timeout, _this.timeoutLimit));
                  }
                  runner = _this.tryStrategy(strategies[current], minPriority, {
                    timeout: timeout,
                    failFast: _this.failFast
                  }, tryNextStrategy);
                } else callback(true);
              }
            };
            runner = this.tryStrategy(strategies[current], minPriority, {
              timeout: timeout,
              failFast: this.failFast
            }, tryNextStrategy);
            return {
              abort: function() {
                runner.abort();
              },
              forceMinPriority: function(p) {
                minPriority = p;
                runner && runner.forceMinPriority(p);
              }
            };
          };
          SequentialStrategy.prototype.tryStrategy = function(strategy, minPriority, options, callback) {
            var timer = null;
            var runner = null;
            options.timeout > 0 && (timer = new OneOffTimer(options.timeout, function() {
              runner.abort();
              callback(true);
            }));
            runner = strategy.connect(minPriority, function(error, handshake) {
              if (error && timer && timer.isRunning() && !options.failFast) return;
              timer && timer.ensureAborted();
              callback(error, handshake);
            });
            return {
              abort: function() {
                timer && timer.ensureAborted();
                runner.abort();
              },
              forceMinPriority: function(p) {
                runner.forceMinPriority(p);
              }
            };
          };
          return SequentialStrategy;
        }();
        var sequential_strategy = sequential_strategy_SequentialStrategy;
        var best_connected_ever_strategy_BestConnectedEverStrategy = function() {
          function BestConnectedEverStrategy(strategies) {
            this.strategies = strategies;
          }
          BestConnectedEverStrategy.prototype.isSupported = function() {
            return any(this.strategies, util.method("isSupported"));
          };
          BestConnectedEverStrategy.prototype.connect = function(minPriority, callback) {
            return connect(this.strategies, minPriority, function(i, runners) {
              return function(error, handshake) {
                runners[i].error = error;
                if (error) {
                  allRunnersFailed(runners) && callback(true);
                  return;
                }
                apply(runners, function(runner) {
                  runner.forceMinPriority(handshake.transport.priority);
                });
                callback(null, handshake);
              };
            });
          };
          return BestConnectedEverStrategy;
        }();
        var best_connected_ever_strategy = best_connected_ever_strategy_BestConnectedEverStrategy;
        function connect(strategies, minPriority, callbackBuilder) {
          var runners = map(strategies, function(strategy, i, _, rs) {
            return strategy.connect(minPriority, callbackBuilder(i, rs));
          });
          return {
            abort: function() {
              apply(runners, abortRunner);
            },
            forceMinPriority: function(p) {
              apply(runners, function(runner) {
                runner.forceMinPriority(p);
              });
            }
          };
        }
        function allRunnersFailed(runners) {
          return collections_all(runners, function(runner) {
            return Boolean(runner.error);
          });
        }
        function abortRunner(runner) {
          if (!runner.error && !runner.aborted) {
            runner.abort();
            runner.aborted = true;
          }
        }
        var cached_strategy_CachedStrategy = function() {
          function CachedStrategy(strategy, transports, options) {
            this.strategy = strategy;
            this.transports = transports;
            this.ttl = options.ttl || 18e5;
            this.usingTLS = options.useTLS;
            this.timeline = options.timeline;
          }
          CachedStrategy.prototype.isSupported = function() {
            return this.strategy.isSupported();
          };
          CachedStrategy.prototype.connect = function(minPriority, callback) {
            var usingTLS = this.usingTLS;
            var info = fetchTransportCache(usingTLS);
            var strategies = [ this.strategy ];
            if (info && info.timestamp + this.ttl >= util.now()) {
              var transport = this.transports[info.transport];
              if (transport) {
                this.timeline.info({
                  cached: true,
                  transport: info.transport,
                  latency: info.latency
                });
                strategies.push(new sequential_strategy([ transport ], {
                  timeout: 2 * info.latency + 1e3,
                  failFast: true
                }));
              }
            }
            var startTimestamp = util.now();
            var runner = strategies.pop().connect(minPriority, function cb(error, handshake) {
              if (error) {
                flushTransportCache(usingTLS);
                if (strategies.length > 0) {
                  startTimestamp = util.now();
                  runner = strategies.pop().connect(minPriority, cb);
                } else callback(error);
              } else {
                storeTransportCache(usingTLS, handshake.transport.name, util.now() - startTimestamp);
                callback(null, handshake);
              }
            });
            return {
              abort: function() {
                runner.abort();
              },
              forceMinPriority: function(p) {
                minPriority = p;
                runner && runner.forceMinPriority(p);
              }
            };
          };
          return CachedStrategy;
        }();
        var cached_strategy = cached_strategy_CachedStrategy;
        function getTransportCacheKey(usingTLS) {
          return "pusherTransport" + (usingTLS ? "TLS" : "NonTLS");
        }
        function fetchTransportCache(usingTLS) {
          var storage = runtime.getLocalStorage();
          if (storage) try {
            var serializedCache = storage[getTransportCacheKey(usingTLS)];
            if (serializedCache) return JSON.parse(serializedCache);
          } catch (e) {
            flushTransportCache(usingTLS);
          }
          return null;
        }
        function storeTransportCache(usingTLS, transport, latency) {
          var storage = runtime.getLocalStorage();
          if (storage) try {
            storage[getTransportCacheKey(usingTLS)] = safeJSONStringify({
              timestamp: util.now(),
              transport: transport,
              latency: latency
            });
          } catch (e) {}
        }
        function flushTransportCache(usingTLS) {
          var storage = runtime.getLocalStorage();
          if (storage) try {
            delete storage[getTransportCacheKey(usingTLS)];
          } catch (e) {}
        }
        var delayed_strategy_DelayedStrategy = function() {
          function DelayedStrategy(strategy, _a) {
            var number = _a.delay;
            this.strategy = strategy;
            this.options = {
              delay: number
            };
          }
          DelayedStrategy.prototype.isSupported = function() {
            return this.strategy.isSupported();
          };
          DelayedStrategy.prototype.connect = function(minPriority, callback) {
            var strategy = this.strategy;
            var runner;
            var timer = new OneOffTimer(this.options.delay, function() {
              runner = strategy.connect(minPriority, callback);
            });
            return {
              abort: function() {
                timer.ensureAborted();
                runner && runner.abort();
              },
              forceMinPriority: function(p) {
                minPriority = p;
                runner && runner.forceMinPriority(p);
              }
            };
          };
          return DelayedStrategy;
        }();
        var delayed_strategy = delayed_strategy_DelayedStrategy;
        var IfStrategy = function() {
          function IfStrategy(test, trueBranch, falseBranch) {
            this.test = test;
            this.trueBranch = trueBranch;
            this.falseBranch = falseBranch;
          }
          IfStrategy.prototype.isSupported = function() {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.isSupported();
          };
          IfStrategy.prototype.connect = function(minPriority, callback) {
            var branch = this.test() ? this.trueBranch : this.falseBranch;
            return branch.connect(minPriority, callback);
          };
          return IfStrategy;
        }();
        var if_strategy = IfStrategy;
        var FirstConnectedStrategy = function() {
          function FirstConnectedStrategy(strategy) {
            this.strategy = strategy;
          }
          FirstConnectedStrategy.prototype.isSupported = function() {
            return this.strategy.isSupported();
          };
          FirstConnectedStrategy.prototype.connect = function(minPriority, callback) {
            var runner = this.strategy.connect(minPriority, function(error, handshake) {
              handshake && runner.abort();
              callback(error, handshake);
            });
            return runner;
          };
          return FirstConnectedStrategy;
        }();
        var first_connected_strategy = FirstConnectedStrategy;
        function testSupportsStrategy(strategy) {
          return function() {
            return strategy.isSupported();
          };
        }
        var getDefaultStrategy = function(config, baseOptions, defineTransport) {
          var definedTransports = {};
          function defineTransportStrategy(name, type, priority, options, manager) {
            var transport = defineTransport(config, name, type, priority, options, manager);
            definedTransports[name] = transport;
            return transport;
          }
          var ws_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.wsHost + ":" + config.wsPort,
            hostTLS: config.wsHost + ":" + config.wssPort,
            httpPath: config.wsPath
          });
          var wss_options = Object.assign({}, ws_options, {
            useTLS: true
          });
          var sockjs_options = Object.assign({}, baseOptions, {
            hostNonTLS: config.httpHost + ":" + config.httpPort,
            hostTLS: config.httpHost + ":" + config.httpsPort,
            httpPath: config.httpPath
          });
          var timeouts = {
            loop: true,
            timeout: 15e3,
            timeoutLimit: 6e4
          };
          var ws_manager = new transport_manager({
            lives: 2,
            minPingDelay: 1e4,
            maxPingDelay: config.activityTimeout
          });
          var streaming_manager = new transport_manager({
            lives: 2,
            minPingDelay: 1e4,
            maxPingDelay: config.activityTimeout
          });
          var ws_transport = defineTransportStrategy("ws", "ws", 3, ws_options, ws_manager);
          var wss_transport = defineTransportStrategy("wss", "ws", 3, wss_options, ws_manager);
          var sockjs_transport = defineTransportStrategy("sockjs", "sockjs", 1, sockjs_options);
          var xhr_streaming_transport = defineTransportStrategy("xhr_streaming", "xhr_streaming", 1, sockjs_options, streaming_manager);
          var xdr_streaming_transport = defineTransportStrategy("xdr_streaming", "xdr_streaming", 1, sockjs_options, streaming_manager);
          var xhr_polling_transport = defineTransportStrategy("xhr_polling", "xhr_polling", 1, sockjs_options);
          var xdr_polling_transport = defineTransportStrategy("xdr_polling", "xdr_polling", 1, sockjs_options);
          var ws_loop = new sequential_strategy([ ws_transport ], timeouts);
          var wss_loop = new sequential_strategy([ wss_transport ], timeouts);
          var sockjs_loop = new sequential_strategy([ sockjs_transport ], timeouts);
          var streaming_loop = new sequential_strategy([ new if_strategy(testSupportsStrategy(xhr_streaming_transport), xhr_streaming_transport, xdr_streaming_transport) ], timeouts);
          var polling_loop = new sequential_strategy([ new if_strategy(testSupportsStrategy(xhr_polling_transport), xhr_polling_transport, xdr_polling_transport) ], timeouts);
          var http_loop = new sequential_strategy([ new if_strategy(testSupportsStrategy(streaming_loop), new best_connected_ever_strategy([ streaming_loop, new delayed_strategy(polling_loop, {
            delay: 4e3
          }) ]), polling_loop) ], timeouts);
          var http_fallback_loop = new if_strategy(testSupportsStrategy(http_loop), http_loop, sockjs_loop);
          var wsStrategy;
          wsStrategy = baseOptions.useTLS ? new best_connected_ever_strategy([ ws_loop, new delayed_strategy(http_fallback_loop, {
            delay: 2e3
          }) ]) : new best_connected_ever_strategy([ ws_loop, new delayed_strategy(wss_loop, {
            delay: 2e3
          }), new delayed_strategy(http_fallback_loop, {
            delay: 5e3
          }) ]);
          return new cached_strategy(new first_connected_strategy(new if_strategy(testSupportsStrategy(ws_transport), wsStrategy, http_fallback_loop)), definedTransports, {
            ttl: 18e5,
            timeline: baseOptions.timeline,
            useTLS: baseOptions.useTLS
          });
        };
        var default_strategy = getDefaultStrategy;
        var transport_connection_initializer = function() {
          var self = this;
          self.timeline.info(self.buildTimelineMessage({
            transport: self.name + (self.options.useTLS ? "s" : "")
          }));
          if (self.hooks.isInitialized()) self.changeState("initialized"); else if (self.hooks.file) {
            self.changeState("initializing");
            Dependencies.load(self.hooks.file, {
              useTLS: self.options.useTLS
            }, function(error, callback) {
              if (self.hooks.isInitialized()) {
                self.changeState("initialized");
                callback(true);
              } else {
                error && self.onError(error);
                self.onClose();
                callback(false);
              }
            });
          } else self.onClose();
        };
        var http_xdomain_request_hooks = {
          getRequest: function(socket) {
            var xdr = new window.XDomainRequest();
            xdr.ontimeout = function() {
              socket.emit("error", new RequestTimedOut());
              socket.close();
            };
            xdr.onerror = function(e) {
              socket.emit("error", e);
              socket.close();
            };
            xdr.onprogress = function() {
              xdr.responseText && xdr.responseText.length > 0 && socket.onChunk(200, xdr.responseText);
            };
            xdr.onload = function() {
              xdr.responseText && xdr.responseText.length > 0 && socket.onChunk(200, xdr.responseText);
              socket.emit("finished", 200);
              socket.close();
            };
            return xdr;
          },
          abortRequest: function(xdr) {
            xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
            xdr.abort();
          }
        };
        var http_xdomain_request = http_xdomain_request_hooks;
        var http_request_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var MAX_BUFFER_LENGTH = 262144;
        var http_request_HTTPRequest = function(_super) {
          http_request_extends(HTTPRequest, _super);
          function HTTPRequest(hooks, method, url) {
            var _this = _super.call(this) || this;
            _this.hooks = hooks;
            _this.method = method;
            _this.url = url;
            return _this;
          }
          HTTPRequest.prototype.start = function(payload) {
            var _this = this;
            this.position = 0;
            this.xhr = this.hooks.getRequest(this);
            this.unloader = function() {
              _this.close();
            };
            runtime.addUnloadListener(this.unloader);
            this.xhr.open(this.method, this.url, true);
            this.xhr.setRequestHeader && this.xhr.setRequestHeader("Content-Type", "application/json");
            this.xhr.send(payload);
          };
          HTTPRequest.prototype.close = function() {
            if (this.unloader) {
              runtime.removeUnloadListener(this.unloader);
              this.unloader = null;
            }
            if (this.xhr) {
              this.hooks.abortRequest(this.xhr);
              this.xhr = null;
            }
          };
          HTTPRequest.prototype.onChunk = function(status, data) {
            while (true) {
              var chunk = this.advanceBuffer(data);
              if (!chunk) break;
              this.emit("chunk", {
                status: status,
                data: chunk
              });
            }
            this.isBufferTooLong(data) && this.emit("buffer_too_long");
          };
          HTTPRequest.prototype.advanceBuffer = function(buffer) {
            var unreadData = buffer.slice(this.position);
            var endOfLinePosition = unreadData.indexOf("\n");
            if (-1 !== endOfLinePosition) {
              this.position += endOfLinePosition + 1;
              return unreadData.slice(0, endOfLinePosition);
            }
            return null;
          };
          HTTPRequest.prototype.isBufferTooLong = function(buffer) {
            return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
          };
          return HTTPRequest;
        }(dispatcher);
        var http_request = http_request_HTTPRequest;
        var State;
        (function(State) {
          State[State["CONNECTING"] = 0] = "CONNECTING";
          State[State["OPEN"] = 1] = "OPEN";
          State[State["CLOSED"] = 3] = "CLOSED";
        })(State || (State = {}));
        var state = State;
        var autoIncrement = 1;
        var http_socket_HTTPSocket = function() {
          function HTTPSocket(hooks, url) {
            this.hooks = hooks;
            this.session = randomNumber(1e3) + "/" + randomString(8);
            this.location = getLocation(url);
            this.readyState = state.CONNECTING;
            this.openStream();
          }
          HTTPSocket.prototype.send = function(payload) {
            return this.sendRaw(JSON.stringify([ payload ]));
          };
          HTTPSocket.prototype.ping = function() {
            this.hooks.sendHeartbeat(this);
          };
          HTTPSocket.prototype.close = function(code, reason) {
            this.onClose(code, reason, true);
          };
          HTTPSocket.prototype.sendRaw = function(payload) {
            if (this.readyState !== state.OPEN) return false;
            try {
              runtime.createSocketRequest("POST", getUniqueURL(getSendURL(this.location, this.session))).start(payload);
              return true;
            } catch (e) {
              return false;
            }
          };
          HTTPSocket.prototype.reconnect = function() {
            this.closeStream();
            this.openStream();
          };
          HTTPSocket.prototype.onClose = function(code, reason, wasClean) {
            this.closeStream();
            this.readyState = state.CLOSED;
            this.onclose && this.onclose({
              code: code,
              reason: reason,
              wasClean: wasClean
            });
          };
          HTTPSocket.prototype.onChunk = function(chunk) {
            if (200 !== chunk.status) return;
            this.readyState === state.OPEN && this.onActivity();
            var payload;
            var type = chunk.data.slice(0, 1);
            switch (type) {
             case "o":
              payload = JSON.parse(chunk.data.slice(1) || "{}");
              this.onOpen(payload);
              break;

             case "a":
              payload = JSON.parse(chunk.data.slice(1) || "[]");
              for (var i = 0; i < payload.length; i++) this.onEvent(payload[i]);
              break;

             case "m":
              payload = JSON.parse(chunk.data.slice(1) || "null");
              this.onEvent(payload);
              break;

             case "h":
              this.hooks.onHeartbeat(this);
              break;

             case "c":
              payload = JSON.parse(chunk.data.slice(1) || "[]");
              this.onClose(payload[0], payload[1], true);
            }
          };
          HTTPSocket.prototype.onOpen = function(options) {
            if (this.readyState === state.CONNECTING) {
              options && options.hostname && (this.location.base = replaceHost(this.location.base, options.hostname));
              this.readyState = state.OPEN;
              this.onopen && this.onopen();
            } else this.onClose(1006, "Server lost session", true);
          };
          HTTPSocket.prototype.onEvent = function(event) {
            this.readyState === state.OPEN && this.onmessage && this.onmessage({
              data: event
            });
          };
          HTTPSocket.prototype.onActivity = function() {
            this.onactivity && this.onactivity();
          };
          HTTPSocket.prototype.onError = function(error) {
            this.onerror && this.onerror(error);
          };
          HTTPSocket.prototype.openStream = function() {
            var _this = this;
            this.stream = runtime.createSocketRequest("POST", getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
            this.stream.bind("chunk", function(chunk) {
              _this.onChunk(chunk);
            });
            this.stream.bind("finished", function(status) {
              _this.hooks.onFinished(_this, status);
            });
            this.stream.bind("buffer_too_long", function() {
              _this.reconnect();
            });
            try {
              this.stream.start();
            } catch (error) {
              util.defer(function() {
                _this.onError(error);
                _this.onClose(1006, "Could not start streaming", false);
              });
            }
          };
          HTTPSocket.prototype.closeStream = function() {
            if (this.stream) {
              this.stream.unbind_all();
              this.stream.close();
              this.stream = null;
            }
          };
          return HTTPSocket;
        }();
        function getLocation(url) {
          var parts = /([^\?]*)\/*(\??.*)/.exec(url);
          return {
            base: parts[1],
            queryString: parts[2]
          };
        }
        function getSendURL(url, session) {
          return url.base + "/" + session + "/xhr_send";
        }
        function getUniqueURL(url) {
          var separator = -1 === url.indexOf("?") ? "?" : "&";
          return url + separator + "t=" + +new Date() + "&n=" + autoIncrement++;
        }
        function replaceHost(url, hostname) {
          var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
          return urlParts[1] + hostname + urlParts[3];
        }
        function randomNumber(max) {
          return runtime.randomInt(max);
        }
        function randomString(length) {
          var result = [];
          for (var i = 0; i < length; i++) result.push(randomNumber(32).toString(32));
          return result.join("");
        }
        var http_socket = http_socket_HTTPSocket;
        var http_streaming_socket_hooks = {
          getReceiveURL: function(url, session) {
            return url.base + "/" + session + "/xhr_streaming" + url.queryString;
          },
          onHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          sendHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          onFinished: function(socket, status) {
            socket.onClose(1006, "Connection interrupted (" + status + ")", false);
          }
        };
        var http_streaming_socket = http_streaming_socket_hooks;
        var http_polling_socket_hooks = {
          getReceiveURL: function(url, session) {
            return url.base + "/" + session + "/xhr" + url.queryString;
          },
          onHeartbeat: function() {},
          sendHeartbeat: function(socket) {
            socket.sendRaw("[]");
          },
          onFinished: function(socket, status) {
            200 === status ? socket.reconnect() : socket.onClose(1006, "Connection interrupted (" + status + ")", false);
          }
        };
        var http_polling_socket = http_polling_socket_hooks;
        var http_xhr_request_hooks = {
          getRequest: function(socket) {
            var Constructor = runtime.getXHRAPI();
            var xhr = new Constructor();
            xhr.onreadystatechange = xhr.onprogress = function() {
              switch (xhr.readyState) {
               case 3:
                xhr.responseText && xhr.responseText.length > 0 && socket.onChunk(xhr.status, xhr.responseText);
                break;

               case 4:
                xhr.responseText && xhr.responseText.length > 0 && socket.onChunk(xhr.status, xhr.responseText);
                socket.emit("finished", xhr.status);
                socket.close();
              }
            };
            return xhr;
          },
          abortRequest: function(xhr) {
            xhr.onreadystatechange = null;
            xhr.abort();
          }
        };
        var http_xhr_request = http_xhr_request_hooks;
        var HTTP = {
          createStreamingSocket: function(url) {
            return this.createSocket(http_streaming_socket, url);
          },
          createPollingSocket: function(url) {
            return this.createSocket(http_polling_socket, url);
          },
          createSocket: function(hooks, url) {
            return new http_socket(hooks, url);
          },
          createXHR: function(method, url) {
            return this.createRequest(http_xhr_request, method, url);
          },
          createRequest: function(hooks, method, url) {
            return new http_request(hooks, method, url);
          }
        };
        var http_http = HTTP;
        http_http.createXDR = function(method, url) {
          return this.createRequest(http_xdomain_request, method, url);
        };
        var web_http_http = http_http;
        var Runtime = {
          nextAuthCallbackID: 1,
          auth_callbacks: {},
          ScriptReceivers: ScriptReceivers,
          DependenciesReceivers: DependenciesReceivers,
          getDefaultStrategy: default_strategy,
          Transports: transports_transports,
          transportConnectionInitializer: transport_connection_initializer,
          HTTPFactory: web_http_http,
          TimelineTransport: jsonp_timeline,
          getXHRAPI: function() {
            return window.XMLHttpRequest;
          },
          getWebSocketAPI: function() {
            return window.WebSocket || window.MozWebSocket;
          },
          setup: function(PusherClass) {
            var _this = this;
            window.Pusher = PusherClass;
            var initializeOnDocumentBody = function() {
              _this.onDocumentBody(PusherClass.ready);
            };
            window.JSON ? initializeOnDocumentBody() : Dependencies.load("json2", {}, initializeOnDocumentBody);
          },
          getDocument: function() {
            return document;
          },
          getProtocol: function() {
            return this.getDocument().location.protocol;
          },
          getAuthorizers: function() {
            return {
              ajax: xhr_auth,
              jsonp: jsonp_auth
            };
          },
          onDocumentBody: function(callback) {
            var _this = this;
            document.body ? callback() : setTimeout(function() {
              _this.onDocumentBody(callback);
            }, 0);
          },
          createJSONPRequest: function(url, data) {
            return new jsonp_request(url, data);
          },
          createScriptRequest: function(src) {
            return new script_request(src);
          },
          getLocalStorage: function() {
            try {
              return window.localStorage;
            } catch (e) {
              return;
            }
          },
          createXHR: function() {
            return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR();
          },
          createXMLHttpRequest: function() {
            var Constructor = this.getXHRAPI();
            return new Constructor();
          },
          createMicrosoftXHR: function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
          },
          getNetwork: function() {
            return net_info_Network;
          },
          createWebSocket: function(url) {
            var Constructor = this.getWebSocketAPI();
            return new Constructor(url);
          },
          createSocketRequest: function(method, url) {
            if (this.isXHRSupported()) return this.HTTPFactory.createXHR(method, url);
            if (this.isXDRSupported(0 === url.indexOf("https:"))) return this.HTTPFactory.createXDR(method, url);
            throw "Cross-origin HTTP requests are not supported";
          },
          isXHRSupported: function() {
            var Constructor = this.getXHRAPI();
            return Boolean(Constructor) && void 0 !== new Constructor().withCredentials;
          },
          isXDRSupported: function(useTLS) {
            var protocol = useTLS ? "https:" : "http:";
            var documentProtocol = this.getProtocol();
            return Boolean(window["XDomainRequest"]) && documentProtocol === protocol;
          },
          addUnloadListener: function(listener) {
            void 0 !== window.addEventListener ? window.addEventListener("unload", listener, false) : void 0 !== window.attachEvent && window.attachEvent("onunload", listener);
          },
          removeUnloadListener: function(listener) {
            void 0 !== window.addEventListener ? window.removeEventListener("unload", listener, false) : void 0 !== window.detachEvent && window.detachEvent("onunload", listener);
          },
          randomInt: function(max) {
            var random = function() {
              var crypto = window.crypto || window["msCrypto"];
              var random = crypto.getRandomValues(new Uint32Array(1))[0];
              return random / Math.pow(2, 32);
            };
            return Math.floor(random() * max);
          }
        };
        var runtime = Runtime;
        var TimelineLevel;
        (function(TimelineLevel) {
          TimelineLevel[TimelineLevel["ERROR"] = 3] = "ERROR";
          TimelineLevel[TimelineLevel["INFO"] = 6] = "INFO";
          TimelineLevel[TimelineLevel["DEBUG"] = 7] = "DEBUG";
        })(TimelineLevel || (TimelineLevel = {}));
        var timeline_level = TimelineLevel;
        var timeline_Timeline = function() {
          function Timeline(key, session, options) {
            this.key = key;
            this.session = session;
            this.events = [];
            this.options = options || {};
            this.sent = 0;
            this.uniqueID = 0;
          }
          Timeline.prototype.log = function(level, event) {
            if (level <= this.options.level) {
              this.events.push(extend({}, event, {
                timestamp: util.now()
              }));
              this.options.limit && this.events.length > this.options.limit && this.events.shift();
            }
          };
          Timeline.prototype.error = function(event) {
            this.log(timeline_level.ERROR, event);
          };
          Timeline.prototype.info = function(event) {
            this.log(timeline_level.INFO, event);
          };
          Timeline.prototype.debug = function(event) {
            this.log(timeline_level.DEBUG, event);
          };
          Timeline.prototype.isEmpty = function() {
            return 0 === this.events.length;
          };
          Timeline.prototype.send = function(sendfn, callback) {
            var _this = this;
            var data = extend({
              session: this.session,
              bundle: this.sent + 1,
              key: this.key,
              lib: "js",
              version: this.options.version,
              cluster: this.options.cluster,
              features: this.options.features,
              timeline: this.events
            }, this.options.params);
            this.events = [];
            sendfn(data, function(error, result) {
              error || _this.sent++;
              callback && callback(error, result);
            });
            return true;
          };
          Timeline.prototype.generateUniqueID = function() {
            this.uniqueID++;
            return this.uniqueID;
          };
          return Timeline;
        }();
        var timeline_timeline = timeline_Timeline;
        var transport_strategy_TransportStrategy = function() {
          function TransportStrategy(name, priority, transport, options) {
            this.name = name;
            this.priority = priority;
            this.transport = transport;
            this.options = options || {};
          }
          TransportStrategy.prototype.isSupported = function() {
            return this.transport.isSupported({
              useTLS: this.options.useTLS
            });
          };
          TransportStrategy.prototype.connect = function(minPriority, callback) {
            var _this = this;
            if (!this.isSupported()) return failAttempt(new UnsupportedStrategy(), callback);
            if (this.priority < minPriority) return failAttempt(new TransportPriorityTooLow(), callback);
            var connected = false;
            var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
            var handshake = null;
            var onInitialized = function() {
              transport.unbind("initialized", onInitialized);
              transport.connect();
            };
            var onOpen = function() {
              handshake = factory.createHandshake(transport, function(result) {
                connected = true;
                unbindListeners();
                callback(null, result);
              });
            };
            var onError = function(error) {
              unbindListeners();
              callback(error);
            };
            var onClosed = function() {
              unbindListeners();
              var serializedTransport;
              serializedTransport = safeJSONStringify(transport);
              callback(new TransportClosed(serializedTransport));
            };
            var unbindListeners = function() {
              transport.unbind("initialized", onInitialized);
              transport.unbind("open", onOpen);
              transport.unbind("error", onError);
              transport.unbind("closed", onClosed);
            };
            transport.bind("initialized", onInitialized);
            transport.bind("open", onOpen);
            transport.bind("error", onError);
            transport.bind("closed", onClosed);
            transport.initialize();
            return {
              abort: function() {
                if (connected) return;
                unbindListeners();
                handshake ? handshake.close() : transport.close();
              },
              forceMinPriority: function(p) {
                if (connected) return;
                _this.priority < p && (handshake ? handshake.close() : transport.close());
              }
            };
          };
          return TransportStrategy;
        }();
        var transport_strategy = transport_strategy_TransportStrategy;
        function failAttempt(error, callback) {
          util.defer(function() {
            callback(error);
          });
          return {
            abort: function() {},
            forceMinPriority: function() {}
          };
        }
        var strategy_builder_Transports = runtime.Transports;
        var strategy_builder_defineTransport = function(config, name, type, priority, options, manager) {
          var transportClass = strategy_builder_Transports[type];
          if (!transportClass) throw new UnsupportedTransport(type);
          var enabled = (!config.enabledTransports || -1 !== arrayIndexOf(config.enabledTransports, name)) && (!config.disabledTransports || -1 === arrayIndexOf(config.disabledTransports, name));
          var transport;
          if (enabled) {
            options = Object.assign({
              ignoreNullOrigin: config.ignoreNullOrigin
            }, options);
            transport = new transport_strategy(name, priority, manager ? manager.getAssistant(transportClass) : transportClass, options);
          } else transport = strategy_builder_UnsupportedStrategy;
          return transport;
        };
        var strategy_builder_UnsupportedStrategy = {
          isSupported: function() {
            return false;
          },
          connect: function(_, callback) {
            var deferred = util.defer(function() {
              callback(new UnsupportedStrategy());
            });
            return {
              abort: function() {
                deferred.ensureAborted();
              },
              forceMinPriority: function() {}
            };
          }
        };
        function validateOptions(options) {
          if (null == options) throw "You must pass an options object";
          if (null == options.cluster) throw "Options object must provide a cluster";
          "disableStats" in options && logger.warn("The disableStats option is deprecated in favor of enableStats");
        }
        var composeChannelQuery = function(params, authOptions) {
          var query = "socket_id=" + encodeURIComponent(params.socketId);
          for (var key in authOptions.params) query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(authOptions.params[key]);
          if (null != authOptions.paramsProvider) {
            var dynamicParams = authOptions.paramsProvider();
            for (var key in dynamicParams) query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(dynamicParams[key]);
          }
          return query;
        };
        var UserAuthenticator = function(authOptions) {
          if ("undefined" === typeof runtime.getAuthorizers()[authOptions.transport]) throw "'" + authOptions.transport + "' is not a recognized auth transport";
          return function(params, callback) {
            var query = composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.UserAuthentication, callback);
          };
        };
        var user_authenticator = UserAuthenticator;
        var channel_authorizer_composeChannelQuery = function(params, authOptions) {
          var query = "socket_id=" + encodeURIComponent(params.socketId);
          query += "&channel_name=" + encodeURIComponent(params.channelName);
          for (var key in authOptions.params) query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(authOptions.params[key]);
          if (null != authOptions.paramsProvider) {
            var dynamicParams = authOptions.paramsProvider();
            for (var key in dynamicParams) query += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(dynamicParams[key]);
          }
          return query;
        };
        var ChannelAuthorizer = function(authOptions) {
          if ("undefined" === typeof runtime.getAuthorizers()[authOptions.transport]) throw "'" + authOptions.transport + "' is not a recognized auth transport";
          return function(params, callback) {
            var query = channel_authorizer_composeChannelQuery(params, authOptions);
            runtime.getAuthorizers()[authOptions.transport](runtime, query, authOptions, AuthRequestType.ChannelAuthorization, callback);
          };
        };
        var channel_authorizer = ChannelAuthorizer;
        var ChannelAuthorizerProxy = function(pusher, authOptions, channelAuthorizerGenerator) {
          var deprecatedAuthorizerOptions = {
            authTransport: authOptions.transport,
            authEndpoint: authOptions.endpoint,
            auth: {
              params: authOptions.params,
              headers: authOptions.headers
            }
          };
          return function(params, callback) {
            var channel = pusher.channel(params.channelName);
            var channelAuthorizer = channelAuthorizerGenerator(channel, deprecatedAuthorizerOptions);
            channelAuthorizer.authorize(params.socketId, callback);
          };
        };
        var __assign = (void 0, function() {
          __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
            }
            return t;
          };
          return __assign.apply(this, arguments);
        });
        function getConfig(opts, pusher) {
          var config = {
            activityTimeout: opts.activityTimeout || defaults.activityTimeout,
            cluster: opts.cluster,
            httpPath: opts.httpPath || defaults.httpPath,
            httpPort: opts.httpPort || defaults.httpPort,
            httpsPort: opts.httpsPort || defaults.httpsPort,
            pongTimeout: opts.pongTimeout || defaults.pongTimeout,
            statsHost: opts.statsHost || defaults.stats_host,
            unavailableTimeout: opts.unavailableTimeout || defaults.unavailableTimeout,
            wsPath: opts.wsPath || defaults.wsPath,
            wsPort: opts.wsPort || defaults.wsPort,
            wssPort: opts.wssPort || defaults.wssPort,
            enableStats: getEnableStatsConfig(opts),
            httpHost: getHttpHost(opts),
            useTLS: shouldUseTLS(opts),
            wsHost: getWebsocketHost(opts),
            userAuthenticator: buildUserAuthenticator(opts),
            channelAuthorizer: buildChannelAuthorizer(opts, pusher)
          };
          "disabledTransports" in opts && (config.disabledTransports = opts.disabledTransports);
          "enabledTransports" in opts && (config.enabledTransports = opts.enabledTransports);
          "ignoreNullOrigin" in opts && (config.ignoreNullOrigin = opts.ignoreNullOrigin);
          "timelineParams" in opts && (config.timelineParams = opts.timelineParams);
          "nacl" in opts && (config.nacl = opts.nacl);
          return config;
        }
        function getHttpHost(opts) {
          if (opts.httpHost) return opts.httpHost;
          if (opts.cluster) return "sockjs-" + opts.cluster + ".pusher.com";
          return defaults.httpHost;
        }
        function getWebsocketHost(opts) {
          if (opts.wsHost) return opts.wsHost;
          return getWebsocketHostFromCluster(opts.cluster);
        }
        function getWebsocketHostFromCluster(cluster) {
          return "ws-" + cluster + ".pusher.com";
        }
        function shouldUseTLS(opts) {
          if ("https:" === runtime.getProtocol()) return true;
          if (false === opts.forceTLS) return false;
          return true;
        }
        function getEnableStatsConfig(opts) {
          if ("enableStats" in opts) return opts.enableStats;
          if ("disableStats" in opts) return !opts.disableStats;
          return false;
        }
        function buildUserAuthenticator(opts) {
          var userAuthentication = __assign(__assign({}, defaults.userAuthentication), opts.userAuthentication);
          if ("customHandler" in userAuthentication && null != userAuthentication["customHandler"]) return userAuthentication["customHandler"];
          return user_authenticator(userAuthentication);
        }
        function buildChannelAuth(opts, pusher) {
          var channelAuthorization;
          if ("channelAuthorization" in opts) channelAuthorization = __assign(__assign({}, defaults.channelAuthorization), opts.channelAuthorization); else {
            channelAuthorization = {
              transport: opts.authTransport || defaults.authTransport,
              endpoint: opts.authEndpoint || defaults.authEndpoint
            };
            if ("auth" in opts) {
              "params" in opts.auth && (channelAuthorization.params = opts.auth.params);
              "headers" in opts.auth && (channelAuthorization.headers = opts.auth.headers);
            }
            "authorizer" in opts && (channelAuthorization.customHandler = ChannelAuthorizerProxy(pusher, channelAuthorization, opts.authorizer));
          }
          return channelAuthorization;
        }
        function buildChannelAuthorizer(opts, pusher) {
          var channelAuthorization = buildChannelAuth(opts, pusher);
          if ("customHandler" in channelAuthorization && null != channelAuthorization["customHandler"]) return channelAuthorization["customHandler"];
          return channel_authorizer(channelAuthorization);
        }
        var watchlist_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var watchlist_WatchlistFacade = function(_super) {
          watchlist_extends(WatchlistFacade, _super);
          function WatchlistFacade(pusher) {
            var _this = _super.call(this, function(eventName, data) {
              logger.debug("No callbacks on watchlist events for " + eventName);
            }) || this;
            _this.pusher = pusher;
            _this.bindWatchlistInternalEvent();
            return _this;
          }
          WatchlistFacade.prototype.handleEvent = function(pusherEvent) {
            var _this = this;
            pusherEvent.data.events.forEach(function(watchlistEvent) {
              _this.emit(watchlistEvent.name, watchlistEvent);
            });
          };
          WatchlistFacade.prototype.bindWatchlistInternalEvent = function() {
            var _this = this;
            this.pusher.connection.bind("message", function(pusherEvent) {
              var eventName = pusherEvent.event;
              "pusher_internal:watchlist_events" === eventName && _this.handleEvent(pusherEvent);
            });
          };
          return WatchlistFacade;
        }(dispatcher);
        var watchlist = watchlist_WatchlistFacade;
        function flatPromise() {
          var resolve, reject;
          var promise = new Promise(function(res, rej) {
            resolve = res;
            reject = rej;
          });
          return {
            promise: promise,
            resolve: resolve,
            reject: reject
          };
        }
        var flat_promise = flatPromise;
        var user_extends = (void 0, function() {
          var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(d, b) {
              d.__proto__ = b;
            } || function(d, b) {
              for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            };
            return extendStatics(d, b);
          };
          return function(d, b) {
            extendStatics(d, b);
            function __() {
              this.constructor = d;
            }
            d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
          };
        }());
        var user_UserFacade = function(_super) {
          user_extends(UserFacade, _super);
          function UserFacade(pusher) {
            var _this = _super.call(this, function(eventName, data) {
              logger.debug("No callbacks on user for " + eventName);
            }) || this;
            _this.signin_requested = false;
            _this.user_data = null;
            _this.serverToUserChannel = null;
            _this.signinDonePromise = null;
            _this._signinDoneResolve = null;
            _this._onAuthorize = function(err, authData) {
              if (err) {
                logger.warn("Error during signin: " + err);
                _this._cleanup();
                return;
              }
              _this.pusher.send_event("pusher:signin", {
                auth: authData.auth,
                user_data: authData.user_data
              });
            };
            _this.pusher = pusher;
            _this.pusher.connection.bind("state_change", function(_a) {
              var previous = _a.previous, current = _a.current;
              "connected" !== previous && "connected" === current && _this._signin();
              if ("connected" === previous && "connected" !== current) {
                _this._cleanup();
                _this._newSigninPromiseIfNeeded();
              }
            });
            _this.watchlist = new watchlist(pusher);
            _this.pusher.connection.bind("message", function(event) {
              var eventName = event.event;
              "pusher:signin_success" === eventName && _this._onSigninSuccess(event.data);
              _this.serverToUserChannel && _this.serverToUserChannel.name === event.channel && _this.serverToUserChannel.handleEvent(event);
            });
            return _this;
          }
          UserFacade.prototype.signin = function() {
            if (this.signin_requested) return;
            this.signin_requested = true;
            this._signin();
          };
          UserFacade.prototype._signin = function() {
            if (!this.signin_requested) return;
            this._newSigninPromiseIfNeeded();
            if ("connected" !== this.pusher.connection.state) return;
            this.pusher.config.userAuthenticator({
              socketId: this.pusher.connection.socket_id
            }, this._onAuthorize);
          };
          UserFacade.prototype._onSigninSuccess = function(data) {
            try {
              this.user_data = JSON.parse(data.user_data);
            } catch (e) {
              logger.error("Failed parsing user data after signin: " + data.user_data);
              this._cleanup();
              return;
            }
            if ("string" !== typeof this.user_data.id || "" === this.user_data.id) {
              logger.error("user_data doesn't contain an id. user_data: " + this.user_data);
              this._cleanup();
              return;
            }
            this._signinDoneResolve();
            this._subscribeChannels();
          };
          UserFacade.prototype._subscribeChannels = function() {
            var _this = this;
            var ensure_subscribed = function(channel) {
              channel.subscriptionPending && channel.subscriptionCancelled ? channel.reinstateSubscription() : channel.subscriptionPending || "connected" !== _this.pusher.connection.state || channel.subscribe();
            };
            this.serverToUserChannel = new channels_channel("#server-to-user-" + this.user_data.id, this.pusher);
            this.serverToUserChannel.bind_global(function(eventName, data) {
              if (0 === eventName.indexOf("pusher_internal:") || 0 === eventName.indexOf("pusher:")) return;
              _this.emit(eventName, data);
            });
            ensure_subscribed(this.serverToUserChannel);
          };
          UserFacade.prototype._cleanup = function() {
            this.user_data = null;
            if (this.serverToUserChannel) {
              this.serverToUserChannel.unbind_all();
              this.serverToUserChannel.disconnect();
              this.serverToUserChannel = null;
            }
            this.signin_requested && this._signinDoneResolve();
          };
          UserFacade.prototype._newSigninPromiseIfNeeded = function() {
            if (!this.signin_requested) return;
            if (this.signinDonePromise && !this.signinDonePromise.done) return;
            var _a = flat_promise(), promise = _a.promise, resolve = _a.resolve, _ = _a.reject;
            promise.done = false;
            var setDone = function() {
              promise.done = true;
            };
            promise.then(setDone)["catch"](setDone);
            this.signinDonePromise = promise;
            this._signinDoneResolve = resolve;
          };
          return UserFacade;
        }(dispatcher);
        var user = user_UserFacade;
        var pusher_Pusher = function() {
          function Pusher(app_key, options) {
            var _this = this;
            checkAppKey(app_key);
            validateOptions(options);
            this.key = app_key;
            this.config = getConfig(options, this);
            this.channels = factory.createChannels();
            this.global_emitter = new dispatcher();
            this.sessionID = runtime.randomInt(1e9);
            this.timeline = new timeline_timeline(this.key, this.sessionID, {
              cluster: this.config.cluster,
              features: Pusher.getClientFeatures(),
              params: this.config.timelineParams || {},
              limit: 50,
              level: timeline_level.INFO,
              version: defaults.VERSION
            });
            this.config.enableStats && (this.timelineSender = factory.createTimelineSender(this.timeline, {
              host: this.config.statsHost,
              path: "/timeline/v2/" + runtime.TimelineTransport.name
            }));
            var getStrategy = function(options) {
              return runtime.getDefaultStrategy(_this.config, options, strategy_builder_defineTransport);
            };
            this.connection = factory.createConnectionManager(this.key, {
              getStrategy: getStrategy,
              timeline: this.timeline,
              activityTimeout: this.config.activityTimeout,
              pongTimeout: this.config.pongTimeout,
              unavailableTimeout: this.config.unavailableTimeout,
              useTLS: Boolean(this.config.useTLS)
            });
            this.connection.bind("connected", function() {
              _this.subscribeAll();
              _this.timelineSender && _this.timelineSender.send(_this.connection.isUsingTLS());
            });
            this.connection.bind("message", function(event) {
              var eventName = event.event;
              var internal = 0 === eventName.indexOf("pusher_internal:");
              if (event.channel) {
                var channel = _this.channel(event.channel);
                channel && channel.handleEvent(event);
              }
              internal || _this.global_emitter.emit(event.event, event.data);
            });
            this.connection.bind("connecting", function() {
              _this.channels.disconnect();
            });
            this.connection.bind("disconnected", function() {
              _this.channels.disconnect();
            });
            this.connection.bind("error", function(err) {
              logger.warn(err);
            });
            Pusher.instances.push(this);
            this.timeline.info({
              instances: Pusher.instances.length
            });
            this.user = new user(this);
            Pusher.isReady && this.connect();
          }
          Pusher.ready = function() {
            Pusher.isReady = true;
            for (var i = 0, l = Pusher.instances.length; i < l; i++) Pusher.instances[i].connect();
          };
          Pusher.getClientFeatures = function() {
            return keys(filterObject({
              ws: runtime.Transports.ws
            }, function(t) {
              return t.isSupported({});
            }));
          };
          Pusher.prototype.channel = function(name) {
            return this.channels.find(name);
          };
          Pusher.prototype.allChannels = function() {
            return this.channels.all();
          };
          Pusher.prototype.connect = function() {
            this.connection.connect();
            if (this.timelineSender && !this.timelineSenderTimer) {
              var usingTLS = this.connection.isUsingTLS();
              var timelineSender = this.timelineSender;
              this.timelineSenderTimer = new PeriodicTimer(6e4, function() {
                timelineSender.send(usingTLS);
              });
            }
          };
          Pusher.prototype.disconnect = function() {
            this.connection.disconnect();
            if (this.timelineSenderTimer) {
              this.timelineSenderTimer.ensureAborted();
              this.timelineSenderTimer = null;
            }
          };
          Pusher.prototype.bind = function(event_name, callback, context) {
            this.global_emitter.bind(event_name, callback, context);
            return this;
          };
          Pusher.prototype.unbind = function(event_name, callback, context) {
            this.global_emitter.unbind(event_name, callback, context);
            return this;
          };
          Pusher.prototype.bind_global = function(callback) {
            this.global_emitter.bind_global(callback);
            return this;
          };
          Pusher.prototype.unbind_global = function(callback) {
            this.global_emitter.unbind_global(callback);
            return this;
          };
          Pusher.prototype.unbind_all = function(callback) {
            this.global_emitter.unbind_all();
            return this;
          };
          Pusher.prototype.subscribeAll = function() {
            var channelName;
            for (channelName in this.channels.channels) this.channels.channels.hasOwnProperty(channelName) && this.subscribe(channelName);
          };
          Pusher.prototype.subscribe = function(channel_name) {
            var channel = this.channels.add(channel_name, this);
            channel.subscriptionPending && channel.subscriptionCancelled ? channel.reinstateSubscription() : channel.subscriptionPending || "connected" !== this.connection.state || channel.subscribe();
            return channel;
          };
          Pusher.prototype.unsubscribe = function(channel_name) {
            var channel = this.channels.find(channel_name);
            if (channel && channel.subscriptionPending) channel.cancelSubscription(); else {
              channel = this.channels.remove(channel_name);
              channel && channel.subscribed && channel.unsubscribe();
            }
          };
          Pusher.prototype.send_event = function(event_name, data, channel) {
            return this.connection.send_event(event_name, data, channel);
          };
          Pusher.prototype.shouldUseTLS = function() {
            return this.config.useTLS;
          };
          Pusher.prototype.signin = function() {
            this.user.signin();
          };
          Pusher.instances = [];
          Pusher.isReady = false;
          Pusher.logToConsole = false;
          Pusher.Runtime = runtime;
          Pusher.ScriptReceivers = runtime.ScriptReceivers;
          Pusher.DependenciesReceivers = runtime.DependenciesReceivers;
          Pusher.auth_callbacks = runtime.auth_callbacks;
          return Pusher;
        }();
        var core_pusher = __webpack_exports__["default"] = pusher_Pusher;
        function checkAppKey(key) {
          if (null === key || void 0 === key) throw "You must pass your app key when you instantiate Pusher.";
        }
        runtime.setup(pusher_Pusher);
      } ]);
    });
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
        const oldState = this._state;
        this._state = state;
        this.onStateChange(oldState, state);
      }
      get state() {
        return this._state;
      }
      onLoad() {}
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
      constructor(flySpeed = 0, damage = 0, existDuration = 0, bounceOnEnemyTimes = 0, penetrateTimes = 0, notFly = false, lockTargetLerpRatio = 1) {
        this.flySpeed = new AttrNum();
        this.damage = new AttrNum();
        this.existDuration = new AttrNum();
        this.bounceOnEnemyTimes = new AttrNum();
        this.penetrateTimes = new AttrNum();
        this.notFly = false;
        this.lockTargetLerpRatio = 1;
        this.flySpeed.defaultValue = flySpeed;
        this.damage.defaultValue = damage;
        this.existDuration.defaultValue = existDuration;
        this.bounceOnEnemyTimes.defaultValue = bounceOnEnemyTimes;
        this.penetrateTimes.defaultValue = penetrateTimes;
        this.notFly = notFly;
        this.lockTargetLerpRatio = lockTargetLerpRatio;
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
    __decorate([ property() ], ProjectileAttr.prototype, "notFly", void 0);
    __decorate([ property() ], ProjectileAttr.prototype, "lockTargetLerpRatio", void 0);
    ProjectileAttr = __decorate([ ccclass("ProjectileAttr") ], ProjectileAttr);
    exports.ProjectileAttr = ProjectileAttr;
    cc._RF.pop();
  }, {} ],
  AudioManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b19a8Nf+TVOCq14/0BkQ5PS", "AudioManager");
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
    let AudioManager = class AudioManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgmLists = {};
        this.effectLists = {};
      }
      start() {
        cc.resources.loadDir("AudioClip/BGM", cc.AudioClip, (err, clips) => {
          for (const clip of clips) this.bgmLists[clip.name] = clip;
        });
        cc.resources.loadDir("AudioClip/Effect", cc.AudioClip, (err, clips) => {
          for (const clip of clips) this.effectLists[clip.name] = clip;
        });
      }
      setBGMVolume(volume) {
        cc.audioEngine.setMusicVolume(volume);
      }
      setEffectVolume(volume) {
        cc.audioEngine.setEffectsVolume(volume);
      }
      stopBGM() {
        cc.audioEngine.stopMusic();
      }
      playEffect(effectName) {
        cc.audioEngine.playEffect(this.effectLists[effectName], false);
      }
      playBGM(bgmName, loop = true) {
        this.stopBGM();
        cc.audioEngine.playMusic(this.bgmLists[bgmName], loop);
      }
    };
    AudioManager = __decorate([ ccclass ], AudioManager);
    exports.default = AudioManager;
    cc._RF.pop();
  }, {} ],
  BossController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "87a55FzeJlBLKwJXus1XR57", "BossController");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var BossController_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const EnemyAnimController_1 = require("./Anim/EnemyAnimController");
    const WaveManager_1 = require("../Manager/WaveManager");
    const DamagePlayerOnCollide_1 = require("./DamagePlayerOnCollide");
    const EnemyController_1 = require("./EnemyController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BossController = BossController_1 = class BossController extends EnemyController_1.default {
      constructor() {
        super(...arguments);
        this.skillTriggeredTime = 0;
        this.skillLastTime = 3;
        this.isBoss = true;
        this.startFight = false;
      }
      onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide_1.default).init(this.collideDamage.value, this.collideDamageCoolDown.value);
        this.animCtrl = this.node.getComponent(EnemyAnimController_1.default);
        this.animCtrl.initState();
        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.skillCoolDownTime = this.skillCoolDown.value;
      }
      start() {
        this.searchable = false;
        GameManager_1.default.instance.waveManager.setWave(0);
      }
      update(dt) {
        !this.startFight && this.node.position.sub(this.findClosestPlayer()).mag() < 300 && this.startBossFight();
        this.startFight && this.attack();
        this.followPlayer();
        this.playAnim();
      }
      hurt(damage, byUid) {
        GameManager_1.default.instance.waveManager.event.emit(WaveManager_1.default.ON_ENEMY_HIT, {
          enemyPosition: this.node.getPosition(),
          killByUid: byUid
        });
        this.hp.addFactor -= damage;
        this.hp.value <= 0 && this.dead(byUid);
      }
      startBossFight() {
        this.startFight = true;
        this.searchable = true;
        this.skillCoolDownTime = 0;
        this.roar();
        this.retreatEnemy();
      }
      retreatEnemy() {
        for (let enemy of GameManager_1.default.instance.playerEnemyLayer.children) {
          let enemyController = enemy.getComponent(EnemyController_1.default);
          if (enemy.getComponent(BossController_1)) continue;
          enemyController && enemyController.retreat();
        }
      }
      roar() {
        GameManager_1.default.instance.particleManager.createParticle("Roar", cc.v3(5 * this.node.scaleX, 20, 0), .2, 1, this.node);
      }
      attack() {
        if (this.skillCoolDownTime > 0) {
          this.skillCoolDownTime -= cc.director.getDeltaTime();
          this.skillTriggeredTime = 0;
          return;
        }
        if (this.skillTriggeredTime > this.skillLastTime) {
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isSkill: false
          });
          this.skillCoolDownTime = this.skillCoolDown.value;
        } else {
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isSkill: true
          });
          this.skillTriggeredTime += cc.director.getDeltaTime();
        }
      }
      dead(killByUid) {
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isDead: true
        });
        this.scheduleOnce(() => {
          this.selfDestroy();
          GameManager_1.default.instance.particleManager.createParticle("Open Chest", this.node.position, .2, 3);
        }, 1);
        GameManager_1.default.instance.waveManager.event.emit(WaveManager_1.default.ON_ENEMY_DIE, {
          enemyPosition: this.node.getPosition(),
          killByUid: killByUid
        });
      }
    };
    BossController = BossController_1 = __decorate([ ccclass ], BossController);
    exports.default = BossController;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "../Manager/WaveManager": "WaveManager",
    "./Anim/EnemyAnimController": "EnemyAnimController",
    "./DamagePlayerOnCollide": "DamagePlayerOnCollide",
    "./EnemyController": "EnemyController"
  } ],
  BuffIconUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11da9Whi8ZMHZwoHdkHqf70", "BuffIconUI");
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BuffIconUI = class BuffIconUI extends cc.Component {
      constructor() {
        super(...arguments);
        this._buffSprite = null;
        this._buff = null;
        this._alwaysShow = false;
      }
      init(buff, alwaysShow = false) {
        return __awaiter(this, void 0, void 0, function*() {
          this._buff = buff;
          this._alwaysShow = alwaysShow;
          this._buffSprite = yield utils_1.loadResource("Art/BuffCard/" + this._buff.id, cc.SpriteFrame);
          this.node.getComponent(cc.Sprite).spriteFrame = this._buffSprite;
          this.node.opacity = 255;
          this.node.color = cc.Color.WHITE;
          this.node.scale = 1;
        });
      }
      update(dt) {
        if (this._alwaysShow || this._buff.isAvailable) {
          this.node.opacity = 255;
          this.node.color = cc.Color.WHITE;
        } else {
          this.node.opacity = 100;
          this.node.color = cc.Color.GRAY;
        }
      }
    };
    BuffIconUI = __decorate([ ccclass ], BuffIconUI);
    exports.default = BuffIconUI;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils"
  } ],
  Buff: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d433euTgxJfpNVxSh9DOXY", "Buff");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuffsDescription = exports.BuffsName = exports.Buffs = exports.GetExited = exports.EffectOnce = exports.IBuff = void 0;
    const PlayerController_1 = require("../Controller/PlayerController");
    const GameManager_1 = require("../Manager/GameManager");
    const ProjectileController_1 = require("../Controller/ProjectileController");
    const Attributes_1 = require("./Attributes");
    const WaveManager_1 = require("../Manager/WaveManager");
    const utils_1 = require("./utils");
    const SearchDrop_1 = require("./SearchDrop");
    const BuffIconUI_1 = require("../UI/BuffIconUI");
    class IBuff {
      constructor(coolDown) {
        this._coolDown = 0;
        this._coolDownTimer = 0;
        this._coolDown = coolDown;
      }
      get isAvailable() {
        return 0 === this._coolDownTimer || 0 == this._coolDown;
      }
      _apply(player) {}
      intoCoolDown(player) {
        this._coolDownTimer = 1;
        player.schedule(() => this._coolDownTimer = 0, this._coolDown);
      }
      showBuffTriggered(player) {
        console.log(this.showName);
        let show = () => {
          const buffIcon = GameManager_1.default.instance.poolManager.createPrefab(IBuff._buffIconPrefab).getComponent(BuffIconUI_1.default);
          buffIcon.init(this, true);
          buffIcon.node.parent = player.node;
          buffIcon.node.position = cc.v3(0, 0);
          const animState = buffIcon.node.getComponent(cc.Animation).play("BuffIconFadedOut");
          animState && animState.on("finished", () => {
            console.log("Ibuff recycle!");
            GameManager_1.default.instance.poolManager.recycle(buffIcon.node);
          });
        };
        IBuff._buffIconPrefab ? show() : utils_1.loadResource("Prefab/UI/BuffIcon", cc.Prefab).then(prefab => IBuff._buffIconPrefab = prefab).then(show);
      }
    }
    exports.IBuff = IBuff;
    IBuff._buffIconPrefab = null;
    class EffectOnce extends IBuff {
      constructor(coolDown) {
        super(coolDown);
      }
      _apply(player) {
        if (player.appliedBuff.find(buff => buff.id === this.id)) return;
      }
    }
    exports.EffectOnce = EffectOnce;
    class GetExited extends EffectOnce {
      constructor(killToEnable = 10, duration = 5, damageFactor = 150, speedFactor = 200) {
        super(0);
        this.showName = "\u3008\u795e\u8aed\u3009 \u72c2\u8e81\n";
        this.description = "\u7576\u7d2f\u8a08\u6bba\u6b7b\u5341\u500b\u6575\u4eba\uff0c \u5927\u5e45\u589e\u52a0\u50b7\u5bb3\u548c\u8dd1\u901f\uff0c \u6301\u7e8c\u4e94\u79d2\u3002 \u6548\u679c\u53ef\u4ee5\u758a\u52a0\n";
        this.id = "GetExited";
        this.killCount = 0;
        this._killToEnable = killToEnable;
        this._duration = duration;
        this._damageFactor = damageFactor;
        this._speedFactor = speedFactor;
      }
      _apply(player) {
        super._apply(player);
        GameManager_1.default.instance.waveManager.event.on(WaveManager_1.default.ON_ENEMY_DIE, ({enemyPosition: enemyPosition, killByUid: killByUid}) => {
          if (killByUid != player.uid) return;
          this.killCount++;
          if (this.killCount > 0 && this.killCount % this._killToEnable == 0) {
            this.showBuffTriggered(player);
            player.mainWeapon.projectileAttr.damage.percentageFactor += this._damageFactor;
            player.moveSpeed.addFactor += this._speedFactor;
            player.scheduleOnce(() => {
              player.mainWeapon.projectileAttr.damage.percentageFactor -= this._damageFactor;
              player.moveSpeed.addFactor -= this._speedFactor;
            }, this._duration);
          }
        });
      }
    }
    exports.GetExited = GetExited;
    class RunAway extends EffectOnce {
      constructor(coolDown = 1) {
        super(coolDown);
        this.showName = "\u3008\u795e\u8aed\u3009 \u8d70\u70ba\u4e0a\u7b56\n";
        this.description = "\u7576\u4f60\u53d7\u50b7\uff0c \u7acb\u5373\u91cd\u7f6e\u885d\u523a\u7684\u51b7\u537b\u6642\u9593\u3002 \u51b7\u537b\u6642\u9593\u4e00\u79d2\u3002 ";
        this.id = "RunAway";
      }
      _apply(player) {
        super._apply(player);
        player.event.on(PlayerController_1.default.PLAYER_HURT, () => {
          if (this._coolDownTimer > 0) return;
          this.intoCoolDown(player);
          this.showBuffTriggered(player);
          player.dashCountDown = 0;
        });
      }
    }
    class Guinsoo extends EffectOnce {
      constructor(duration = 6, attackSpeedFactor = 30, maxStack = 6) {
        super(0);
        this.showName = "\u3008\u795e\u8aed\u3009 \u9b3c\u7d22\u7684\u72c2\u66b4\u4e4b\u62f3\n";
        this.description = "\u7576\u50b7\u5bb3\u6575\u4eba\uff0c \u589e\u52a0\u653b\u64ca\u901f\u5ea6\uff0c \u6301\u7e8c 6 \u79d2\u3002 \u6548\u679c\u758a\u52a0\u6700\u591a 6 \u6b21\n";
        this.id = "Guinsoo";
        this._attackSpeedFactor = 20;
        this._maxStack = 5;
        this.curStack = 0;
        this._attackSpeedFactor = attackSpeedFactor;
        this._maxStack = maxStack;
        this._duration = duration;
      }
      _apply(player) {
        super._apply(player);
        GameManager_1.default.instance.waveManager.event.on(WaveManager_1.default.ON_ENEMY_HIT, ({enemyPosition: enemyPosition, killByUid: killByUid}) => {
          if (this.curStack >= this._maxStack) return;
          if (killByUid != player.uid) return;
          this.showBuffTriggered(player);
          this.curStack++;
          player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedFactor;
          player.scheduleOnce(() => {
            this.curStack--;
            player.mainWeapon.attackSpeed.percentageFactor -= this._attackSpeedFactor;
          }, this._duration);
        });
      }
    }
    class Tiamat extends EffectOnce {
      constructor(coolDown = .5, damageFactor = 20) {
        super(coolDown);
        this.showName = "\u3008\u795e\u8aed\u3009 \u63d0\u4e9e\u746a\u7279\n";
        this.description = "\u7576\u50b7\u5bb3\u6575\u4eba\uff0c \u5c0d\u5468\u570d\u6575\u4eba\u9020\u6210\u50b7\u5bb3\u3002 \u51b7\u537b\u6642\u9593 0.5 \u79d2\n";
        this.id = "Tiamat";
        this._prefabPath = "Prefab/Projectile/Tiamat";
        this._dealDamagePercentage = 20;
        this._dealDamagePercentage = damageFactor;
      }
      _apply(player) {
        super._apply(player);
        utils_1.loadResource(this._prefabPath, cc.Prefab).then(prefab => this._prefab = prefab);
        GameManager_1.default.instance.waveManager.event.on(WaveManager_1.default.ON_ENEMY_HIT, ({enemyPosition: enemyPosition, killByUid: killByUid}) => {
          if (killByUid != player.uid) return;
          if (this._coolDownTimer > 0) return;
          this.intoCoolDown(player);
          this.showBuffTriggered(player);
          const proj = GameManager_1.default.instance.poolManager.createPrefab(this._prefab).getComponent(ProjectileController_1.default);
          proj.node.setPosition(enemyPosition);
          proj.node.parent = GameManager_1.default.instance.bulletLayer;
          proj.init(new Attributes_1.ProjectileAttr(0, 200, .5, 0, 0, true));
          proj.shootToDirection(cc.Vec2.ZERO);
        });
      }
    }
    class GA extends EffectOnce {
      constructor(invincibleTime = 1, coolDown = 100) {
        super(coolDown);
        this.showName = "\u3008\u795e\u8aed\u3009 \u5b88\u8b77\u5929\u4f7f\n";
        this.description = "\u7576\u4f60\u53d7\u5230\u81f4\u547d\u50b7\u5bb3\uff0c \u7acb\u5373\u56de\u5fa9\u6240\u6709\u751f\u547d\u503c\uff0c \u4e26\u4e14\u7121\u6575\u4e00\u79d2\u3002 \u51b7\u537b\u6642\u9593 100 \u79d2\n";
        this.id = "GA";
        this._invincibleTime = invincibleTime;
      }
      _apply(player) {
        super._apply(player);
        player.event.on(PlayerController_1.default.PLAYER_HURT, damageInfo => {
          if (this._coolDownTimer > 0) return;
          if (player.currentHP.value > damageInfo.damage) return;
          this.intoCoolDown(player);
          this.showBuffTriggered(player);
          damageInfo.damage = 0;
          player.recover(player.maxHp.value);
          player.isInvincible++;
          player.scheduleOnce(() => {
            player.isInvincible--;
          }, this._invincibleTime);
        });
      }
    }
    class Mash extends EffectOnce {
      constructor(duration = 5, coolDown = 10, damage = 50) {
        super(coolDown);
        this.showName = "\u3008\u795e\u8aed\u3009 \u746a\u4fee\n";
        this.description = "\u7576\u73a9\u5bb6\u53d7\u50b7\uff0c \u53ec\u559a\u5728\u5468\u570d\u65cb\u8f49\u7684\u8b77\u76fe\uff0c \u6301\u7e8c 5 \u79d2\u3002 \u51b7\u537b\u6642\u9593 10 \u79d2\n";
        this.id = "Mash";
        this._damage = 50;
        this._prefabPath = "Prefab/Projectile/SurroundShield";
        this._duration = duration;
        this._damage = damage;
      }
      _apply(player) {
        super._apply(player);
        utils_1.loadResource(this._prefabPath, cc.Prefab).then(prefab => this._prefab = prefab);
        player.event.on(PlayerController_1.default.PLAYER_HURT, damageInfo => {
          if (this._coolDownTimer > 0) return;
          this.intoCoolDown(player);
          this.showBuffTriggered(player);
          const proj = GameManager_1.default.instance.poolManager.createPrefab(this._prefab, true).getComponent(ProjectileController_1.default);
          proj.node.setPosition(player.node.position);
          proj.init(new Attributes_1.ProjectileAttr(0, this._damage, this._duration, 0, 0, true, 1), null, null, player.uid);
          proj.node.parent = GameManager_1.default.instance.bulletLayer;
          proj.shootToTarget(player.node);
          console.log("Mash: proj", proj.node, proj);
        });
      }
    }
    class Yasuo extends EffectOnce {
      constructor(damage = 200) {
        super(0);
        this.showName = "\u3008\u795e\u8aed\u3009 \u5feb\u6a02\u98a8\u7537\n";
        this.description = "\u885d\u523a\u6642\u7528\u98a8\u5203\u50b7\u5bb3\u5468\u906d\u3002 \u82e5\u5728\u885d\u523a\u5f8c\u7acb\u5373\u6bba\u6b7b\u6575\u4eba\uff0c \u7acb\u5373\u91cd\u7f6e\u885d\u523a\u7684\u51b7\u537b\u6642\u9593\n";
        this.id = "Yasuo";
        this._damage = 50;
        this._resetTime = .2;
        this._prefabPath = "Prefab/Projectile/YasuoE";
        this._duration = .5;
        this._damage = damage;
        this._resetTime = .2;
      }
      _apply(player) {
        super._apply(player);
        utils_1.loadResource(this._prefabPath, cc.Prefab).then(prefab => this._prefab = prefab);
        player.event.on(PlayerController_1.default.PLAYER_DASH, () => {
          this.showBuffTriggered(player);
          const proj = GameManager_1.default.instance.poolManager.createPrefab(this._prefab, true).getComponent(ProjectileController_1.default);
          proj.node.setPosition(player.node.position);
          proj.init(new Attributes_1.ProjectileAttr(0, this._damage, this._duration, 0, 0, true, 1), null, null, player.uid);
          proj.node.parent = GameManager_1.default.instance.bulletLayer;
          proj.shootToDirection(cc.Vec2.ZERO);
          let resetDash = ({killByUid: killByUid}) => {
            console.log("Yasuo: resetDash", killByUid, player.uid);
            killByUid == player.uid && (player.dashCountDown = 0);
          };
          GameManager_1.default.instance.waveManager.event.once(WaveManager_1.default.ON_ENEMY_DIE, resetDash);
          player.scheduleOnce(() => {
            GameManager_1.default.instance.waveManager.event.off(WaveManager_1.default.ON_ENEMY_DIE, resetDash);
          }, this._resetTime);
        });
      }
    }
    class Domino extends EffectOnce {
      constructor(damage = 200) {
        super(0);
        this.showName = "\u3008\u795e\u8aed\u3009 \u591a\u7c73\u8afe\u6548\u61c9\n";
        this.description = "\u7576\u6bba\u6b7b\u6575\u4eba\uff0c \u7522\u751f\u7206\u70b8\u3002 \u53ef\u4ee5\u9023\u9396\u53cd\u61c9\n";
        this.id = "Domino";
        this._damage = 50;
        this._prefabPath = "Prefab/Projectile/Explosion";
        this._duration = .5;
        this._damage = damage;
      }
      _apply(player) {
        super._apply(player);
        utils_1.loadResource(this._prefabPath, cc.Prefab).then(prefab => this._prefab = prefab);
        GameManager_1.default.instance.waveManager.event.on(WaveManager_1.default.ON_ENEMY_DIE, ({enemyPosition: enemyPosition, killByUid: killByUid}) => {
          this.showBuffTriggered(player);
          const proj = GameManager_1.default.instance.poolManager.createPrefab(this._prefab, true).getComponent(ProjectileController_1.default);
          proj.node.setPosition(enemyPosition);
          proj.init(new Attributes_1.ProjectileAttr(0, this._damage, this._duration, 0, 0, true, 1), null, null, player.uid);
          proj.node.parent = GameManager_1.default.instance.bulletLayer;
          proj.shootToDirection(cc.Vec2.ZERO);
        });
      }
    }
    class TrinityForces extends IBuff {
      constructor(damagePercentage = 30, speedPercentage = 30, attackSpeedPercentage = 30) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u4e09\u76f8\u4e4b\u529b\n";
        this.description = "\u7372\u5f97\u653b\u64ca\u529b\u3001\u79fb\u52d5\u901f\u5ea6\u3001\u653b\u64ca\u901f\u5ea6\n";
        this.id = "TrinityForces";
        this._damagePercentage = damagePercentage;
        this._speedPercentage = speedPercentage;
        this._attackSpeedPercentage = attackSpeedPercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.damage.percentageFactor += this._damagePercentage;
        player.moveSpeed.percentageFactor += this._speedPercentage;
        player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedPercentage;
      }
    }
    class IncreaseMoveSpeed extends IBuff {
      constructor(speedPercentage = 30) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u654f\u6377\n";
        this.description = "\u7372\u5f97\u79fb\u52d5\u901f\u5ea6\n";
        this.id = "IncreaseMoveSpeed";
        this._speedPercentage = speedPercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.moveSpeed.percentageFactor += this._speedPercentage;
      }
    }
    class IncreaseAttackSpeed extends IBuff {
      constructor(attackSpeedPercentage = 100) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u7cbe\u6e96\u5c04\u64ca\n";
        this.description = "\u7372\u5f97\u653b\u64ca\u901f\u5ea6\n";
        this.id = "IncreaseAttackSpeed";
        this._attackSpeedPercentage = attackSpeedPercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.mainWeapon.attackSpeed.percentageFactor += this._attackSpeedPercentage;
      }
    }
    class IncreaseDamage extends IBuff {
      constructor(damagePercentage = 30) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u5de8\u4eba\u4e4b\u529b\n";
        this.description = "\u4f60\u7684\u6b66\u5668\u9020\u6210\u66f4\u591a\u50b7\u5bb3\n";
        this.id = "IncreaseDamage";
        this._damagePercentage = damagePercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.damage.percentageFactor += this._damagePercentage;
      }
    }
    class IncreaseBounceTimes extends IBuff {
      constructor(bounceTimes = 1) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u78b0\u78b0\uff01\n";
        this.description = "\u4f60\u7684\u5b50\u5f48\u7684\u5f48\u5c04\u6b21\u6578\u589e\u52a0\n";
        this.id = "IncreaseBounceTimes";
        this._bounceTimes = bounceTimes;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.bounceOnEnemyTimes.addFactor += this._bounceTimes;
      }
    }
    class IncreasePenetrateTimes extends IBuff {
      constructor(penetrateTimes = 1) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u54bb\u54bb\uff01\n";
        this.description = "\u4f60\u7684\u5b50\u5f48\u7684\u7a7f\u900f\u6b21\u6578\u589e\u52a0\n";
        this.id = "IncreasePenetrateTimes";
        this._penetrateTimes = penetrateTimes;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.mainWeapon.projectileAttr.penetrateTimes.addFactor += this._penetrateTimes;
      }
    }
    class GainMoreExp extends IBuff {
      constructor(expPercentage = 50) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u7d93\u9a57\u589e\u52a0\n";
        this.description = "\u7372\u5f97\u66f4\u591a\u7d93\u9a57\n";
        this.id = "GainMoreExp";
        this._expPercentage = expPercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.expGainPercentage.addFactor += this._expPercentage;
      }
    }
    class IncreaseMagnetRange extends IBuff {
      constructor(rangePercentage = 50) {
        super(0);
        this.showName = "\u3008\u589e\u5e45\u3009 \u78c1\u9435\n";
        this.description = "\u6389\u843d\u7269\u7684\u62fe\u53d6\u8ddd\u96e2\u589e\u52a0\n";
        this.id = "IncreaseMagnetRange";
        this._rangePercentage = rangePercentage;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.node.getComponent(SearchDrop_1.default).searchRange *= 1.5;
      }
    }
    class BuyLife extends IBuff {
      constructor(cost = 10) {
        super(0);
        this.showName = "\u3008\u60e1\u9b54\u7684\u4f4e\u8a9e\u3009 \u8996\u9322\u5982\u547d\n";
        this.description = "\u82b1\u8cbb\u4e00\u4e9b\u4f60\u5728\u5834\u5167\u8cfa\u5230\u7684\u91d1\u5e63\uff0c \u6062\u5fa9\u6240\u6709\u7684\u751f\u547d\u503c\n";
        this.id = "BuyLife";
        this._cost = cost;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.recover(1e3);
        GameManager_1.default.instance.gameSystem.emitCoinChange(Math.max(-this._cost, -GameManager_1.default.instance.coinCnt.value));
      }
    }
    class SupersonicCharge extends IBuff {
      constructor(speedPercentage = 100, coolDownAdd = 3) {
        super(0);
        this.showName = "\u3008\u60e1\u9b54\u7684\u4f4e\u8a9e\u3009 \u8d85\u97f3\u901f\u885d\u92d2\n";
        this.description = "\u4f60\u885d\u523a\u7684\u8ddd\u96e2\u52a0\u500d\u3002 \u589e\u52a0\u885d\u523a\u7684\u51b7\u537b\u6642\u9593\n";
        this.id = "SupersonicCharge";
        this._speedPercentage = speedPercentage;
        this._coolDownAdd = coolDownAdd;
      }
      _apply(player) {
        super._apply(player);
        this.showBuffTriggered(player);
        player.dashSpeed.percentageFactor += this._speedPercentage;
        player.dashCoolDown.addFactor += this._coolDownAdd;
      }
    }
    class GlassCannon extends IBuff {
      constructor(projectilePercentage = 100, hpReduce = 2) {
        super(0);
        this.showName = "\u3008\u60e1\u9b54\u7684\u4f4e\u8a9e\u3009 \u73bb\u7483\u5927\u70ae\n";
        this.description = "\u767c\u5c04\u5169\u500d\u6578\u91cf\u7684\u5b50\u5f48\u3002 \u6e1b\u5c11\u4f60\u7684\u6700\u5927\u751f\u547d\u503c\u5169\u9ede\u3002 \uff08\u8a72\u6280\u80fd\u5c0d\u6700\u5927\u751f\u547d\u503c\u4f4e\u65bc\u4e09\u9ede\u7684\u89d2\u8272\u6c92\u6709\u6548\u679c\uff09\n";
        this.id = "GlassCannon";
        this._projectilePercentage = projectilePercentage;
        this._hpReduce = hpReduce;
      }
      _apply(player) {
        super._apply(player);
        if (player.maxHp.value <= this._hpReduce) return;
        this.showBuffTriggered(player);
        player.maxHp.addFactor -= this._hpReduce;
        player.mainWeapon.shotPerAttack.percentageFactor += this._projectilePercentage;
      }
    }
    class HeartSteel extends IBuff {
      constructor(hpAdd = 1, killCntToAddHp = 10, speedPercentage = -30, damagePercentage = -20) {
        super(0);
        this.showName = "\u3008\u60e1\u9b54\u7684\u4f4e\u8a9e\u3009 \u5fc3\u4e4b\u92fc\n";
        this.description = "\u7acb\u5373\u7372\u5f97\u4e00\u9ede\u6c38\u4e45\u6700\u5927\u751f\u547d\u3002 \u96a8\u8457\u64ca\u6bba\u7684\u6575\u4eba\u8d8a\u591a\uff0c \u4f60\u7684\u6700\u5927\u751f\u547d\u503c\u6703\u6210\u9577\u3002 \u4f60\u7684\u8dd1\u901f\u964d\u4f4e\u3002 \u4f60\u7684\u6b66\u5668\u50b7\u5bb3\u964d\u4f4e\n";
        this.id = "HeartSteel";
        this._hpAdd = hpAdd;
        this._killCntToAddHp = killCntToAddHp;
        this._speedPercentage = speedPercentage;
        this._damagePercentage = damagePercentage;
        this._killCnt = 0;
      }
      _apply(player) {
        super._apply(player);
        let addHp = () => {
          this.showBuffTriggered(player);
          player.maxHp.addFactor += this._hpAdd;
          player.recover(this._hpAdd);
        };
        player.moveSpeed.percentageFactor -= this._speedPercentage;
        player.mainWeapon.projectileAttr.damage.percentageFactor -= this._damagePercentage;
        addHp();
        GameManager_1.default.instance.waveManager.event.on(WaveManager_1.default.ON_ENEMY_DIE, ({enemyPosition: enemyPosition, killByUid: killByUid}) => {
          if (killByUid != player.uid) return;
          this._killCnt++;
          this._killCnt > 0 && this._killCnt % this._killCntToAddHp == 0 && addHp();
        });
      }
    }
    let BuffsList = [ GetExited, RunAway, Guinsoo, Tiamat, GA, Mash, Yasuo, Domino, TrinityForces, IncreaseMoveSpeed, IncreaseAttackSpeed, IncreaseDamage, IncreaseBounceTimes, IncreasePenetrateTimes, GainMoreExp, IncreaseMagnetRange, BuyLife, SupersonicCharge, GlassCannon, HeartSteel ];
    exports.Buffs = {};
    exports.BuffsName = {};
    exports.BuffsDescription = {};
    for (let i = 0; i < BuffsList.length; i++) {
      const inst = new BuffsList[i](0);
      exports.Buffs[inst.id] = BuffsList[i];
      exports.BuffsName[inst.id] = inst.showName;
      exports.BuffsDescription[inst.id] = inst.description;
    }
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Controller/ProjectileController": "ProjectileController",
    "../Manager/GameManager": "GameManager",
    "../Manager/WaveManager": "WaveManager",
    "../UI/BuffIconUI": "BuffIconUI",
    "./Attributes": "Attributes",
    "./SearchDrop": "SearchDrop",
    "./utils": "utils"
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
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BumpingMonster = class BumpingMonster extends EnemyController_1.default {
      constructor() {
        super(...arguments);
        this.bumpingSpeed = 500;
        this.bumpingDirection = cc.Vec2.ZERO;
        this.bumpingStartPos = cc.Vec2.ZERO;
        this.bumpingTime = -1;
        this.triggerRadius = new Attributes_1.AttrNum();
      }
      onBeginContact(contact, selfCollider, otherCollider) {
        if ("Enemy" == otherCollider.node.group && -1 != this.bumpingTime) {
          contact.disabled = true;
          cc.log("bumping monster bumping into another monster");
          return;
        }
      }
      onLoad() {
        super.onLoad();
        this.triggerRadius.defaultValue = 200;
        this.skillCoolDown.defaultValue = 5;
      }
      skillTrigger() {
        this.bumpingTime = 0;
        this.bumpingStartPos = utils_1.ignoreZ(this.node.position);
        this.bumpingDirection = this.findClosestPlayer().sub(this.node.position).normalize();
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isMoving: false
        });
      }
      update(dt) {
        if (this.skillCoolDownTime >= this.skillCoolDown.value && this.bumpingTime < 0 && this.findClosestPlayer().sub(this.node.position).mag() < this.triggerRadius.value) {
          this.skillTrigger();
          return;
        }
        if (this.bumpingTime >= 0) {
          this.bumpingPlayer(dt);
          return;
        }
        this.skillCoolDownTime < this.skillCoolDown.value && (this.skillCoolDownTime += dt);
        super.update(dt);
      }
      bumpingPlayer(dt) {
        this.bumpingTime += dt;
        if (this.bumpingTime < .5) this.rb.linearVelocity = cc.Vec2.ZERO; else if (this.bumpingStartPos.sub(utils_1.ignoreZ(this.node.position)).mag() < this.triggerRadius.value + 50) this.rb.linearVelocity = this.bumpingDirection.mul(this.bumpingSpeed); else {
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
    "../Helper/Attributes": "Attributes",
    "../Helper/utils": "utils"
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
        } else this.node.setPosition(this.initPos);
      }
    };
    __decorate([ property ], CameraController.prototype, "lerpRatio", void 0);
    CameraController = __decorate([ ccclass ], CameraController);
    exports.default = CameraController;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager"
  } ],
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
          if (this.dropType == DropController_1.DROP_TYPE_EXP) {
            GameManager_1.default.instance.gameSystem.emitExpChange(this.dropValue);
            GameManager_1.default.instance.audioManager.playEffect("collect_exp");
          } else if (this.dropType == DropController_1.DROP_TYPE_COIN) {
            GameManager_1.default.instance.gameSystem.emitCoinChange(this.dropValue);
            GameManager_1.default.instance.audioManager.playEffect("collect_coin");
          } else if (this.dropType == DropController_1.DROP_TYPE_HEALTH_PACK) {
            this.collector.getComponent(PlayerController_1.default).recover(this.dropValue);
            GameManager_1.default.instance.audioManager.playEffect("heal");
          }
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
    __decorate([ property({
      tooltip: "\u6389\u843d\u6578\u503c"
    }) ], DropController.prototype, "dropValue", void 0);
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
          isSkill: false,
          faceLeftOrRight: 1
        };
      }
      initState() {
        this._state = {
          isMoving: false,
          isSkill: false,
          isDead: false,
          isHurt: false,
          faceLeftOrRight: 1
        };
      }
      sameState(oldState, newState) {
        return oldState.isMoving == newState.isMoving && oldState.isSkill == newState.isSkill && oldState.isDead == newState.isDead && oldState.isHurt == newState.isHurt && oldState.faceLeftOrRight == newState.faceLeftOrRight;
      }
      onStateChange(oldState, newState) {
        if (!this.anim) return;
        if (this.sameState(oldState, newState)) return;
        this.anim.stop();
        newState.isDead ? this.anim.play(this.enemyDeadAnim) : newState.isSkill ? this.anim.play(this.enemySkillAnim) : newState.isHurt ? this.anim.play(this.enemyHurtAnim) : newState.isMoving ? this.anim.play(this.enemyMoveAnim) : this.anim.play(this.enemyIdleAnim);
        newState.faceLeftOrRight && (this.anim.node.scaleX = newState.faceLeftOrRight);
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
    const EnemyAnimController_1 = require("./Anim/EnemyAnimController");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnemyController = class EnemyController extends cc.Component {
      constructor() {
        super(...arguments);
        this.searchable = true;
        this.DENSITY = 10;
        this.LINEAR_DAMP = 100;
        this.rb = null;
        this.animCtrl = null;
        this.moveSpeed = new Attributes_1.AttrNum();
        this.skillCoolDown = new Attributes_1.AttrNum();
        this.hp = new Attributes_1.AttrNum();
        this.collideDamage = new Attributes_1.AttrNum();
        this.collideDamageCoolDown = new Attributes_1.AttrNum();
        this.normalMaterial = null;
        this.hurtMaterial = null;
        this.sprite = null;
        this.skillCoolDownTime = 0;
        this.isBossFight = false;
      }
      onLoad() {
        this.rb = this.node.getComponent(cc.RigidBody);
        this.rb.enabledContactListener = true;
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.node.getComponent(cc.RigidBody).linearDamping = this.LINEAR_DAMP;
        this.addComponent(DamagePlayerOnCollide_1.default).init(this.collideDamage.value, this.collideDamageCoolDown.value);
        this.animCtrl = this.node.getComponent(EnemyAnimController_1.default);
        this.animCtrl.initState();
        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.normalMaterial = this.sprite.getMaterial(0);
        utils_1.loadResource("Material/Flash", cc.Material).then(mat => {
          this.hurtMaterial = mat;
        });
      }
      playAnim() {
        if (!this.animCtrl) return;
        this.rb.linearVelocity.x >= 0 ? this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          faceLeftOrRight: 1
        }) : this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          faceLeftOrRight: -1
        });
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isMoving: true
        });
      }
      update(dt) {
        this.isBossFight ? this.runAwayFromPlayer() : this.followPlayer();
        this.playAnim();
      }
      init() {
        this.hp.reset();
        this.skillCoolDownTime = 0;
        this.animCtrl.initState();
      }
      flashEnd() {
        this.sprite.setMaterial(0, this.normalMaterial);
      }
      hurt(damage, byUid) {
        GameManager_1.default.instance.waveManager.event.emit(WaveManager_1.default.ON_ENEMY_HIT, {
          enemyPosition: this.node.getPosition(),
          killByUid: byUid
        });
        this.hp.addFactor -= damage;
        this.sprite.setMaterial(0, this.hurtMaterial);
        this.unschedule(this.flashEnd);
        this.schedule(this.flashEnd, .1);
        this.hp.value <= 0 && this.dead(byUid);
      }
      retreat() {
        this.isBossFight = true;
        this.searchable = false;
      }
      runAwayFromPlayer() {
        let target = this.findClosestPlayer();
        if (!target) {
          this.rb.linearVelocity = cc.Vec2.ZERO;
          this.selfDestroy();
          return;
        }
        if (target.sub(this.node.position).mag() > 800) {
          this.selfDestroy();
          return;
        }
        let direction = target.sub(this.node.position);
        this.rb.linearVelocity = utils_1.ignoreZ(direction.normalize().mul(-3 * this.moveSpeed.value));
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
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isDead: true
        });
        GameManager_1.default.instance.waveManager.event.emit(WaveManager_1.default.ON_ENEMY_DIE, {
          enemyPosition: this.node.getPosition(),
          killByUid: killByUid
        });
        GameManager_1.default.instance.poolManager.recycle(this.node);
        GameManager_1.default.instance.particleManager.createParticle("Enemy Explosion", this.node.position, .001, 1);
      }
      selfDestroy() {
        GameManager_1.default.instance.poolManager.recycle(this.node);
      }
      findClosestPlayer() {
        let target = null, minDistance = 1e10;
        GameManager_1.default.instance.playerManager.allPlayerIDs.forEach(id => {
          let player = GameManager_1.default.instance.playerManager.getPlayer(id);
          if (player && player.node.position.sub(this.node.position).mag() < minDistance) {
            minDistance = player.node.position.sub(this.node.position).mag();
            target = player.node.position;
          }
        });
        if (!target) {
          this.selfDestroy();
          return null;
        }
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
    "./Anim/EnemyAnimController": "EnemyAnimController",
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
      onEnable() {
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_STAT_CHANGE, this.updateExpBar, this);
      }
      onDisable() {
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_GAME_STAT_CHANGE, this.updateExpBar, this);
      }
      start() {
        this.updateExpBar();
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
    const PlayerStatUI_1 = require("./PlayerStatUI");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let FixedUI = class FixedUI extends cc.Component {
      onLoad() {
        this.coinLabel = this.node.getChildByName("Coin").getChildByName("Label").getComponent(cc.Label);
      }
      onEnable() {
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_LOGIC_READY, this.onGameReady, this);
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_STAT_CHANGE, this.onGameStatChange, this);
      }
      onDisable() {
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_GAME_LOGIC_READY, this.onGameReady, this);
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_GAME_STAT_CHANGE, this.onGameStatChange, this);
      }
      onGameReady() {
        let childIdx = 1;
        for (let id of GameManager_1.default.instance.playerManager.allPlayerIDs) this.enablePlayerStatUIForPlayer(id, childIdx++);
        this.onGameStatChange();
      }
      enablePlayerStatUIForPlayer(uid, childIdx) {
        let player = GameManager_1.default.instance.playerManager.getPlayer(uid);
        if (!player) return;
        let playerStatUI = this.node.getChildByName(`PlayerStatUI${childIdx}`).getComponent(PlayerStatUI_1.default);
        playerStatUI.node.parent = this.node;
        playerStatUI.init(player);
      }
      onGameStatChange() {
        this.coinLabel.string = `X ${GameManager_1.default.instance.coinCnt.value.toString()}`;
      }
    };
    FixedUI = __decorate([ ccclass ], FixedUI);
    exports.default = FixedUI;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "./PlayerStatUI": "PlayerStatUI"
  } ],
  GameEndUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4decbJY+OdOjJGJ2yaAxIQx", "GameEndUI");
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameManager_1 = require("../Manager/GameManager");
    const InputManager_1 = require("../Manager/InputManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameEndUI = class GameEndUI extends cc.Component {
      onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
      }
      start() {
        this.anim.play("GameEndUIHide");
      }
      slowlyShowUp() {
        return new Promise((resolve, reject) => {
          this.node.setSiblingIndex(1e3);
          this.anim.play("GameEndUIShow");
          this.anim.on("finished", () => {
            this.waitForContinue().then(resolve);
          }, this);
        });
      }
      waitForContinue() {
        return __awaiter(this, void 0, void 0, function*() {
          console.log("waitForContinue");
          this.node.getChildByName("ContinueHint").getComponent(cc.Animation).play("ContinueHintFlicker");
          return new Promise((resolve, reject) => {
            function onInput(input) {
              if (input.type === InputManager_1.InputType.BUTTON_DOWN && "A" === input.btnCode) {
                resolve();
                GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_LOCAL_INPUT, onInput, this);
              }
            }
            GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, onInput, this);
          });
        });
      }
    };
    GameEndUI = __decorate([ ccclass ], GameEndUI);
    exports.default = GameEndUI;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "../Manager/InputManager": "InputManager"
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
    const PlayerHPUI_1 = require("../UI/PlayerHPUI");
    const MapManager_1 = require("./MapManager");
    const LobbyUI_1 = require("../UI/LobbyUI");
    const MainMenuUI_1 = require("../UI/MainMenuUI");
    const ParticleManager_1 = require("./ParticleManager");
    const GameEndUI_1 = require("../UI/GameEndUI");
    const AudioManager_1 = require("./AudioManager");
    const RandomGenerator_1 = require("../Helper/RandomGenerator");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameManager = GameManager_1 = class GameManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.loadingUIPrefab = null;
        this.UPGRADE_EXP_GROWTH = 20;
        this.killEnemyCnt = new Attributes_1.AttrNum(0);
        this.coinCnt = new Attributes_1.AttrNum(0);
        this.upgradeExp = new Attributes_1.AttrNum(100);
        this.level = new Attributes_1.AttrNum(1);
        this.exp = new Attributes_1.AttrNum(0);
        this._isPaused = false;
        this.rand = new RandomGenerator_1.default();
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
      get mapManager() {
        return this._mapManager;
      }
      get particleManager() {
        return this._particleManager;
      }
      get audioManager() {
        return this._audioManager;
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
      get currentSceneType() {
        return this._currentSceneType;
      }
      get isPaused() {
        return this._isPaused;
      }
      get gameRecord() {
        return {
          level: this.level.value,
          personal_coin: this.coinCnt.value
        };
      }
      onLoad() {
        cc.game.setFrameRate(59);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        cc.game.addPersistRootNode(this.node);
        this._inputManager = this.node.addComponent(InputManager_1.default);
        this._poolManager = this.node.addComponent(PoolManager_1.default);
        this._playerManager = this.node.addComponent(PlayerManager_1.default);
        this._waveManager = this.node.addComponent(WaveManager_1.default);
        this._mapManager = this.node.addComponent(MapManager_1.default);
        this._particleManager = this.node.addComponent(ParticleManager_1.default);
        this._audioManager = this.node.addComponent(AudioManager_1.default);
        this._gameSystem = null;
        this.event = new cc.EventTarget();
        this._isPaused = false;
        this._currentSceneType = "UNKNOWN";
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
          } else keyCode == cc.macro.KEY.x ? this.endGame() : keyCode == cc.macro.KEY.h ? this.gameSystem.emitPlayerHPChange("p1", -1) : keyCode == cc.macro.KEY.e && utils_1.loadResource("Prefab/Enemy/GraveGuard", cc.Prefab).then(prefab => {
            const enemy = this.poolManager.createPrefab(prefab);
            enemy.setPosition(0, 0);
            enemy.parent = this.node;
          });
        });
        this.exp.onChangeCallback.push(() => {
          while (this.exp.value >= this.upgradeExp.value) {
            this._audioManager.playEffect("level_up");
            this.exp.addFactor -= this.upgradeExp.value;
            this.level.addFactor += 1;
            this.upgradeExp.percentageFactor += this.UPGRADE_EXP_GROWTH;
          }
        });
        this.level.onChangeCallback.push(() => {
          this.event.emit(GameManager_1.ON_LEVEL_UP);
          this.upgrade();
        });
      }
      start() {
        this.changeScene(GameManager_1.SCENE_MAIN_MENU);
        this._waveManager.init();
        this.rand.setSeed("loli");
      }
      pauseGame() {
        this._isPaused = true;
        cc.director.pause();
      }
      resumeGame() {
        cc.director.resume();
        this._isPaused = false;
      }
      changeScene(sceneType) {
        return __awaiter(this, void 0, void 0, function*() {
          if (this._currentSceneType === GameManager_1.SCENE_GAME) {
            this._mapManager.clearMap();
            this._waveManager.clearWave();
          }
          this._audioManager.stopBGM();
          this.destroyScene();
          if (sceneType === GameManager_1.SCENE_MAIN_MENU) {
            yield this.generateMainMenuScene();
            this._audioManager.playBGM("game1");
          } else if (sceneType === GameManager_1.SCENE_LOBBY) {
            this._audioManager.playBGM("bgm_room");
            yield this.generateLobbyScene();
          } else if (sceneType === GameManager_1.SCENE_GAME) {
            this._waveManager.setWave(1);
            this._mapManager.init();
            yield this.generateGameScene();
            this._audioManager.playBGM("game2");
          } else if (sceneType === GameManager_1.SCENE_RESULT) {
            this.playerManager.clearAllChara();
            yield this.generateResultScene();
          } else if (sceneType === GameManager_1.SCENE_LEADERBOARD) {
            this.playerManager.clearAllChara();
            yield this.generateLeaderBoardScene();
          }
          this._currentSceneType = sceneType;
        });
      }
      endGame() {
        return __awaiter(this, void 0, void 0, function*() {
          console.log("!!Game End!!");
          this._audioManager.stopBGM();
          this.gameSystem.saveGameRecord(this.gameRecord);
          this.event.emit(GameManager_1.ON_GAME_END);
          yield this.backgroundLayer.getChildByName("GameEndUI").getComponent(GameEndUI_1.default).slowlyShowUp();
          this.changeScene(GameManager_1.SCENE_RESULT);
        });
      }
      initGameSystem(gameInfo) {
        this._gameSystem = GameSystem_1.createGameSystem(gameInfo);
        this._playerManager.setGameSystem(this._gameSystem);
        this._inputManager.setGameSystem(this._gameSystem);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_EXP_CHANGE, this.onExpChange, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_COIN_CHANGE, this.onCoinChange, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_GAME_START, this.onGameStart, this);
      }
      onGameStart() {
        this.changeScene(GameManager_1.SCENE_GAME);
      }
      generateMainMenuScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          yield this.showLoading(2e3);
          const mainMenuUI = yield utils_1.loadResource("Prefab/UI/MainMenuUI", cc.Prefab).then(prefab => cc.instantiate(prefab).getComponent(MainMenuUI_1.default));
          mainMenuUI.node.parent = this.backgroundLayer;
          this.inputManager.addLocalPlayerInput("anonymous", InputManager_1.WASD_TO_CONTROLLER);
          mainMenuUI.init("anonymous");
          mainMenuUI.event.once(MainMenuUI_1.default.ON_AUTH_COMPLETED, this.onAuthComplete, this);
          mainMenuUI.event.once(MainMenuUI_1.default.ON_LEADERBOARD_CLICKED, this.onLeaderBoardClicked, this);
          this.hideLoading();
        });
      }
      onAuthComplete({gameInfo: gameInfo}) {
        this._localUids = gameInfo.localUids;
        this._localUids.sort();
        this.initGameSystem(gameInfo);
        let conversion = [ InputManager_1.WASD_TO_CONTROLLER, InputManager_1.ARROW_TO_CONTROLLER ];
        if (this._localUids.length > 2) throw new Error("For now, only support 2 players");
        for (let i = 0, len = this._localUids.length; i < len; i++) this.inputManager.addLocalPlayerInput(this._localUids[i], conversion[i % conversion.length]);
        this._audioManager.playEffect("btn");
        this.inputManager.removeLocalPlayerInput("anonymous");
        this.changeScene(GameManager_1.SCENE_LOBBY);
      }
      onLeaderBoardClicked() {
        this.changeScene(GameManager_1.SCENE_LEADERBOARD);
      }
      generateGameScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          yield this.showLoading(1e3);
          let fixedUI, enemy, drop, upgradeUI, gameEndUI;
          let gameStartUIPrefab;
          let promises = [];
          promises.push(utils_1.loadResource("Prefab/UI/FixedUI", cc.Prefab).then(prefab => {
            fixedUI = cc.instantiate(prefab);
            fixedUI.parent = this.backgroundLayer;
            fixedUI.setPosition(0, 0);
          }));
          promises.push(utils_1.loadResource("Prefab/UI/UpgradeUI", cc.Prefab).then(prefab => {
            upgradeUI = cc.instantiate(prefab);
            upgradeUI.parent = this.backgroundLayer;
            upgradeUI.setPosition(0, 0);
          }));
          promises.push(utils_1.loadResource("Prefab/UI/GameEndUI", cc.Prefab).then(prefab => {
            gameEndUI = cc.instantiate(prefab);
            gameEndUI.parent = this.backgroundLayer;
            gameEndUI.setPosition(0, 0);
          }));
          promises.push(utils_1.loadResource("Prefab/UI/GameStartUI", cc.Prefab).then(prefab => {
            gameStartUIPrefab = prefab;
          }));
          function instantiateHP(uid) {
            return __awaiter(this, void 0, void 0, function*() {
              const hpOffset = cc.v3(0, -20);
              yield utils_1.loadResource("Prefab/UI/PlayerHPUI", cc.Prefab).then(prefab => {
                let hp = cc.instantiate(prefab);
                hp.parent = GameManager_1.instance.playerManager.getPlayerNodeByID(uid);
                hp.setPosition(hpOffset);
                hp.getComponent(PlayerHPUI_1.default).init(GameManager_1.instance.playerManager.getPlayer(uid));
              });
            });
          }
          for (let uid of this.playerManager.allPlayerIDs) promises.push(this.playerManager.instantiatePlayer(uid).then(() => instantiateHP(uid)));
          yield Promise.all(promises);
          this.event.emit(GameManager_1.ON_GAME_LOGIC_READY);
          this.hideLoading();
          cc.instantiate(gameStartUIPrefab).parent = this.bulletLayer;
        });
      }
      generateLobbyScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          yield this.showLoading(500);
          let enterGame;
          let previewCharas = [];
          let lobby = yield utils_1.loadResource("Prefab/UI/LobbyUI", cc.Prefab).then(prefab => cc.instantiate(prefab).getComponent(LobbyUI_1.default));
          lobby.node.parent = this.backgroundLayer;
          lobby.node.setPosition(0, 0);
          lobby.init(this._localUids);
          this.hideLoading();
          yield lobby.chooseCharaFor();
          yield lobby.createCharaFromChooseResult();
        });
      }
      generateResultScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          utils_1.loadResource("Prefab/UI/ResultUI", cc.Prefab).then(prefab => {
            let resultUI = cc.instantiate(prefab);
            resultUI.parent = this.backgroundLayer;
            resultUI.setPosition(0, 0);
          });
        });
      }
      generateLeaderBoardScene() {
        return __awaiter(this, void 0, void 0, function*() {
          this.buildLayers();
          utils_1.loadResource("Prefab/UI/LeaderBoardUI", cc.Prefab).then(prefab => {
            let resultUI = cc.instantiate(prefab);
            resultUI.parent = this.backgroundLayer;
            resultUI.setPosition(0, 0);
          });
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
      destroyScene() {
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
        this.event.emit(GameManager_1.ON_UPGRADE, {
          buffAmount: 3
        });
        this.pauseGame();
      }
      showLoading(timeOutMilliseconds) {
        return new Promise((resolve, reject) => {
          const loadingUI = cc.instantiate(this.loadingUIPrefab);
          loadingUI.parent = this.node;
          setTimeout(() => {
            resolve();
          }, timeOutMilliseconds);
        });
      }
      hideLoading() {
        this.node.removeChild(this.node.getChildByName("LoadingUI"));
      }
    };
    GameManager.ON_GAME_STAT_CHANGE = "GAME_STAT_CHANGE";
    GameManager.ON_LEVEL_UP = "LEVEL_UP";
    GameManager.ON_UPGRADE = "UPGRADE";
    GameManager.ON_GAME_LOGIC_READY = "GAME_READY";
    GameManager.ON_GAME_END = "GAME_END";
    GameManager.SCENE_GAME = "Game";
    GameManager.SCENE_MAIN_MENU = "MainMenu";
    GameManager.SCENE_LOBBY = "Lobby";
    GameManager.SCENE_RESULT = "Result";
    GameManager.SCENE_LEADERBOARD = "Leaderboard";
    GameManager._instance = null;
    __decorate([ property(cc.Prefab) ], GameManager.prototype, "loadingUIPrefab", void 0);
    GameManager = GameManager_1 = __decorate([ ccclass ], GameManager);
    exports.default = GameManager;
    cc._RF.pop();
  }, {
    "../Helper/Attributes": "Attributes",
    "../Helper/RandomGenerator": "RandomGenerator",
    "../Helper/utils": "utils",
    "../UI/GameEndUI": "GameEndUI",
    "../UI/LobbyUI": "LobbyUI",
    "../UI/MainMenuUI": "MainMenuUI",
    "../UI/PlayerHPUI": "PlayerHPUI",
    "./AudioManager": "AudioManager",
    "./GameSystem": "GameSystem",
    "./InputManager": "InputManager",
    "./MapManager": "MapManager",
    "./ParticleManager": "ParticleManager",
    "./PlayerManager": "PlayerManager",
    "./PoolManager": "PoolManager",
    "./WaveManager": "WaveManager"
  } ],
  GameSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ea78e82x1RL2Irt9KJEJOCP", "GameSystem");
    "use strict";
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createGameSystem = exports.RemoteGameSystem = exports.GameSystem = void 0;
    const GameManager_1 = require("./GameManager");
    const laravel_echo_1 = require("laravel-echo");
    const MainMenuUI_1 = require("../UI/MainMenuUI");
    const utils_1 = require("../Helper/utils");
    class GameSystem {
      constructor() {
        this.buffReadyToApply = [];
        this.event = new cc.EventTarget();
      }
      emitApplyBuff(uid, buffId) {
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
          charaId: charaId,
          isLocal: true
        });
      }
      emitGameStart() {
        this.event.emit(GameSystem.ON_GAME_START);
      }
      saveGameRecord(gameRecord) {
        const data = localStorage.getItem("gameRecord") ? JSON.parse(localStorage.getItem("gameRecord")) : {
          level: 0,
          coin: 0
        };
        data.level += gameRecord.level;
        data.coin += gameRecord.personal_coin;
        localStorage.setItem("gameRecord", JSON.stringify(data));
      }
      getGameRecord() {
        return __awaiter(this, void 0, void 0, function*() {
          const {level: level, coin: coin} = localStorage.getItem("gameRecord") ? JSON.parse(localStorage.getItem("gameRecord")) : {
            level: 0,
            coin: 0
          };
          return {
            level: level,
            coin: coin
          };
        });
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
    GameSystem.ON_GAME_END = "ON_GAME_END";
    class RemoteGameSystem extends GameSystem {
      constructor(gameInfo) {
        var _a;
        super();
        this.mem_createPlayer = [];
        this._buffReadyToApply = [];
        this.createEchoInstanceFromToken(localStorage.getItem("token"));
        this.gameInfo = gameInfo;
        this.echoInstance.join("room." + (null === (_a = this.gameInfo) || void 0 === _a ? void 0 : _a.id)).listenToAll((evt, data) => {
          console.log("receive event", evt, data);
          if (evt.startsWith(".client-")) {
            const evt_name = evt.split("client-")[1];
            "ON_CREATE_PLAYER" === evt_name && this.mem_createPlayer.push(data);
            "ON_GAME_START" === evt_name && this.dispatchCreatePlayers();
            console.log("dispatch event", evt_name, data);
            this.event.emit(evt_name, data);
          }
        });
      }
      createEchoInstanceFromToken(token) {
        localStorage.setItem("token", token);
        this.echoInstance = new laravel_echo_1.default(Object.assign(Object.assign({}, utils_1.CURRENT_ENV.PUSHER_CONFIG), {
          authorizer: (channel, options) => ({
            authorize: (socketId, callback) => {
              utils_1.api("POST", "/broadcasting/auth", {
                socket_id: socketId,
                channel_name: channel.name
              }).then(response => {
                callback(null, response);
              }).catch(error => {
                callback(error);
              });
            }
          })
        }));
      }
      dispatchEvent(evt, data) {
        var _a;
        this.event.emit(evt, data);
        this.echoInstance.join("room." + (null === (_a = this.gameInfo) || void 0 === _a ? void 0 : _a.id)).whisper(evt, data);
      }
      emitApplyBuff(uid, buffId) {
        this._buffReadyToApply.push({
          uid: uid,
          buffId: buffId
        });
        if (this._buffReadyToApply.length >= GameManager_1.default.instance.playerManager.allPlayerIDs.length) for (let bf of this._buffReadyToApply) this.dispatchEvent(GameSystem.ON_BUFF_APPLY, bf);
        this._buffReadyToApply = [];
      }
      emitPlayerHPChange(uid, deltaHP) {
        this.dispatchEvent(GameSystem.ON_PLAYER_HP_CHANGE, {
          uid: uid,
          deltaHP: deltaHP
        });
      }
      emitExpChange(deltaExp) {
        this.dispatchEvent(GameSystem.ON_EXP_CHANGE, {
          deltaExp: deltaExp
        });
      }
      emitCoinChange(deltaCoin) {
        this.dispatchEvent(GameSystem.ON_COIN_CHANGE, {
          deltaCoin: deltaCoin
        });
      }
      emitInput(input) {
        this.dispatchEvent(GameSystem.ON_INPUT, {
          input: input
        });
      }
      emitCreatePlayer(uid, charaId) {
        this.mem_createPlayer.push({
          uid: uid,
          charaId: charaId
        });
        this.dispatchEvent(GameSystem.ON_CREATE_PLAYER, {
          uid: uid,
          charaId: charaId
        });
      }
      dispatchCreatePlayers() {
        var _a;
        if ((null === (_a = this.gameInfo) || void 0 === _a ? void 0 : _a.gameStartType) === MainMenuUI_1.GameStartType.ONLINE_NEW_ROOM) for (let p of this.mem_createPlayer) this.dispatchEvent(GameSystem.ON_CREATE_PLAYER, {
          uid: p.uid,
          charaId: p.charaId
        });
      }
      emitGameStart() {
        utils_1.api("POST", `/rooms/${this.gameInfo.id}/start`, {}).then(r => r);
        this.dispatchCreatePlayers();
        this.dispatchEvent(GameSystem.ON_GAME_START, {});
      }
      saveGameRecord({level: level, personal_coin: personal_coin}) {
        return __awaiter(this, void 0, void 0, function*() {
          yield utils_1.api("POST", `/rooms/${this.gameInfo.id}/end`, {
            level: level,
            personal_coin: personal_coin
          });
        });
      }
      getGameRecord() {
        return __awaiter(this, void 0, void 0, function*() {
          const {level: level, coin: coin} = yield utils_1.api("GET", "/my");
          return {
            level: level,
            coin: coin
          };
        });
      }
    }
    exports.RemoteGameSystem = RemoteGameSystem;
    function createGameSystem(gameInfo) {
      if (gameInfo.gameType === MainMenuUI_1.GameType.OFFLINE) return new GameSystem();
      if (gameInfo.gameType === MainMenuUI_1.GameType.ONLINE) {
        window.Pusher = require("pusher-js");
        return new RemoteGameSystem(gameInfo);
      }
      throw new Error("GameType not supported");
    }
    exports.createGameSystem = createGameSystem;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "../UI/MainMenuUI": "MainMenuUI",
    "./GameManager": "GameManager",
    "laravel-echo": 3,
    "pusher-js": 4
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
      setGameSystem(gameSystem) {
        this.gameSystem = gameSystem;
        gameSystem.event.on(GameSystem_1.GameSystem.ON_INPUT, this.broadcastInputToLocal, this);
      }
      static lrOfStick(stick) {
        return stick.x > 700 ? utils_1.Direction.RIGHT : stick.x < -700 ? utils_1.Direction.LEFT : null;
      }
      addLocalPlayerInput(uid, conversion) {
        this.conversionOfUid.set(uid, conversion);
        this._currentLStick.set(uid, cc.v2(0, 0));
        this._isPressing.set(uid, new Map([ [ "X", false ], [ "Y", false ], [ "A", false ], [ "B", false ], [ "L_UP", false ], [ "L_DOWN", false ], [ "L_LEFT", false ], [ "L_RIGHT", false ] ]));
      }
      removeLocalPlayerInput(uid) {
        this.conversionOfUid.delete(uid);
        this._currentLStick.delete(uid);
        this._isPressing.delete(uid);
      }
      isPressing(uid, btnCode) {
        var _a;
        return null !== (_a = this._isPressing.get(uid).get(btnCode)) && void 0 !== _a && _a;
      }
      lStick(uid) {
        return this._currentLStick.get(uid);
      }
      emitInputToGameSystem(input) {
        this.gameSystem ? this.gameSystem.emitInput(input) : this.broadcastInputToLocal({
          input: input
        });
      }
      broadcastInputToLocal({input: input}) {
        this.conversionOfUid.has(input.uid) && this.event.emit(InputManager_1.ON_LOCAL_INPUT, input);
        this.event.emit(InputManager_1.ON_INPUT, input);
      }
      onKeyDown({keyCode: keyCode}) {
        for (const [uid, conversion] of this.conversionOfUid) {
          if (!conversion[keyCode]) continue;
          if (this._isPressing.get(uid).get(conversion[keyCode])) continue;
          this._isPressing.get(uid).set(conversion[keyCode], true);
          if ("A" == conversion[keyCode] || "B" == conversion[keyCode] || "X" == conversion[keyCode] || "Y" == conversion[keyCode]) this.emitInputToGameSystem(new Input(uid, InputType.BUTTON_DOWN, conversion[keyCode], 0, 0)); else if ("L_UP" == conversion[keyCode] || "L_DOWN" == conversion[keyCode] || "L_LEFT" == conversion[keyCode] || "L_RIGHT" == conversion[keyCode]) {
            this.updateStick(uid);
            this.emitInputToGameSystem(new Input(uid, InputType.STICK, "", this._currentLStick.get(uid).x, this._currentLStick.get(uid).y));
          }
        }
      }
      onKeyUp({keyCode: keyCode}) {
        for (const [uid, conversion] of this.conversionOfUid) {
          if (!conversion[keyCode]) continue;
          this._isPressing.get(uid).set(conversion[keyCode], false);
          if ("A" == conversion[keyCode] || "B" == conversion[keyCode] || "X" == conversion[keyCode] || "Y" == conversion[keyCode]) this.emitInputToGameSystem(new Input(uid, InputType.BUTTON_UP, conversion[keyCode], 0, 0)); else if ("L_UP" == conversion[keyCode] || "L_DOWN" == conversion[keyCode] || "L_LEFT" == conversion[keyCode] || "L_RIGHT" == conversion[keyCode]) {
            this.updateStick(uid);
            this.emitInputToGameSystem(new Input(uid, InputType.STICK, "", this._currentLStick.get(uid).x, this._currentLStick.get(uid).y));
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
    InputManager.ON_LOCAL_INPUT = "ON_LOCAL_INPUT";
    InputManager = InputManager_1 = __decorate([ ccclass ], InputManager);
    exports.default = InputManager;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "./GameSystem": "GameSystem"
  } ],
  LeaderBoardUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d75favgSLxJnaEf/o+BsfWO", "LeaderBoardUI");
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const utils_1 = require("../Helper/utils");
    const GameManager_1 = require("../Manager/GameManager");
    const InputManager_1 = require("../Manager/InputManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LeaderBoardUI = class LeaderBoardUI extends cc.Component {
      getScoreBoard(queryLimit = 8) {
        return __awaiter(this, void 0, void 0, function*() {
          return yield utils_1.api("GET", `/scoreboard?limit=${queryLimit}`);
        });
      }
      onLoad() {}
      onEnable() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      onDisable() {
        GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      start() {}
      onInput(input) {
        input.type == InputManager_1.InputType.BUTTON_DOWN && "A" === input.btnCode;
      }
    };
    LeaderBoardUI = __decorate([ ccclass ], LeaderBoardUI);
    exports.default = LeaderBoardUI;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "../Manager/InputManager": "InputManager"
  } ],
  LobbyUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "893a6WF8UFFPKXqdP1VNQwq", "LobbyUI");
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerFocus_1 = require("./PlayerFocus");
    const PlayerController_1 = require("../Controller/PlayerController");
    const GameManager_1 = require("../Manager/GameManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LobbyUI = class LobbyUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.previewCharas = [];
        this.playerFocus = null;
        this.chooseResult = {};
        this.uids = [];
      }
      onLoad() {
        this.event = new cc.EventTarget();
        this.playerFocus = this.node.getComponent(PlayerFocus_1.default);
      }
      init(uids) {
        this.uids = [ ...uids ];
        for (let chara of this.node.children) chara.getComponent(PlayerController_1.default) && this.previewCharas.push(chara);
      }
      chooseCharaFor() {
        if (!this.uids || 0 == this.uids.length) return Promise.reject("No uid to choose");
        this.playerFocus.init(this.previewCharas, cc.v2(0, 20), true);
        for (let uid of this.uids) this.playerFocus.focusOnIndex(uid, 0);
        let chooseResult = {};
        return new Promise(resolve => {
          this.playerFocus.event.on(PlayerFocus_1.default.ON_CONFIRM, ({uid: uid, node: node}) => {
            for (let res of Object.values(chooseResult)) if (res == node.name) return;
            this.playerFocus.lock(uid);
            chooseResult[uid] = node.name;
            if (Object.keys(chooseResult).length == this.uids.length) {
              this.playerFocus.removeFocusAll();
              this.chooseResult = chooseResult;
              resolve();
            }
          });
        });
      }
      createCharaFromChooseResult() {
        return __awaiter(this, void 0, void 0, function*() {
          let promises = [];
          for (let uid of this.uids) {
            GameManager_1.default.instance.gameSystem.emitCreatePlayer(uid, this.chooseResult[uid]);
            promises.push(GameManager_1.default.instance.playerManager.instantiatePlayer(uid).then(player => {
              for (let chara of this.previewCharas) if (chara.name == this.chooseResult[uid]) {
                player.node.position = chara.position;
                chara.destroy();
                break;
              }
            }));
          }
          yield Promise.all(promises);
        });
      }
    };
    LobbyUI.ON_CHARA_CHOSEN = "onCharaChosen";
    LobbyUI = __decorate([ ccclass ], LobbyUI);
    exports.default = LobbyUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Manager/GameManager": "GameManager",
    "./PlayerFocus": "PlayerFocus"
  } ],
  MainMenuUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e74bucqvpFV5OaObOPHMMh", "MainMenuUI");
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
    var MainMenuUI_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameStartType = exports.GameType = void 0;
    const PlayerFocus_1 = require("./PlayerFocus");
    const utils_1 = require("../Helper/utils");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var GameType;
    (function(GameType) {
      GameType[GameType["ONLINE"] = 0] = "ONLINE";
      GameType[GameType["OFFLINE"] = 1] = "OFFLINE";
    })(GameType = exports.GameType || (exports.GameType = {}));
    var GameStartType;
    (function(GameStartType) {
      GameStartType[GameStartType["OFFLINE_1P"] = 0] = "OFFLINE_1P";
      GameStartType[GameStartType["OFFLINE_2P"] = 1] = "OFFLINE_2P";
      GameStartType[GameStartType["ONLINE_NEW_ROOM"] = 2] = "ONLINE_NEW_ROOM";
      GameStartType[GameStartType["ONLINE_JOIN_ROOM"] = 3] = "ONLINE_JOIN_ROOM";
    })(GameStartType = exports.GameStartType || (exports.GameStartType = {}));
    let MainMenuUI = MainMenuUI_1 = class MainMenuUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.child = [ "OnlineWithNewRoom", "OnlineJoinRoom", "Offline1p", "Offline2p", "Leaderboard" ];
        this.roomType = 0;
      }
      onLoad() {
        this.playerFocus = this.node.getComponent(PlayerFocus_1.default);
        this.event = new cc.EventTarget();
      }
      init(performerUid) {
        this.uid = performerUid;
        const focusTarget = [];
        for (let i = 0; i < this.child.length; i++) focusTarget.push(this.node.getChildByName(this.child[i]));
        this.playerFocus.init(focusTarget, cc.v2(0, 50), true);
        this.playerFocus.focusOnIndex(this.uid, 0);
        this.node.getChildByName("AuthDialog").getChildByName("AuthButton").on(cc.Node.EventType.TOUCH_END, this.auth.bind(this), this);
        this.node.getChildByName("RoomDialog").getChildByName("JoinButton").on(cc.Node.EventType.TOUCH_END, this.join.bind(this), this);
        this.playerFocus.event.on(PlayerFocus_1.default.ON_CONFIRM, this.onConfirm, this);
      }
      onConfirm({uid: uid, node: node}) {
        const execute = {};
        execute["OnlineWithNewRoom"] = this.onlineWithNewRoom.bind(this);
        execute["OnlineJoinRoom"] = this.onlineJoinRoomId.bind(this);
        execute["Offline1p"] = this.offline1p.bind(this);
        execute["Offline2p"] = this.offline2p.bind(this);
        execute["Leaderboard"] = this.leaderboard.bind(this);
        execute[node.name]();
      }
      offline1p() {
        const gameInfo = {
          gameType: GameType.OFFLINE,
          localUids: [ "p1" ],
          gameStartType: GameStartType.OFFLINE_1P
        };
        this.event.emit(MainMenuUI_1.ON_AUTH_COMPLETED, {
          gameInfo: gameInfo
        });
      }
      offline2p() {
        const gameInfo = {
          gameType: GameType.OFFLINE,
          localUids: [ "p1", "p2" ],
          gameStartType: GameStartType.OFFLINE_2P
        };
        this.event.emit(MainMenuUI_1.ON_AUTH_COMPLETED, {
          gameInfo: gameInfo
        });
      }
      auth() {
        return __awaiter(this, void 0, void 0, function*() {
          let email = this.node.getChildByName("AuthDialog").getChildByName("Email").getComponent(cc.EditBox).string;
          -1 === email.indexOf("@") && (email += "@gmail.com");
          const password = this.node.getChildByName("AuthDialog").getChildByName("Password").getComponent(cc.EditBox).string;
          const res = yield utils_1.api("POST", "/sanctum/token", {
            email: email,
            password: password
          });
          if ("undefined" !== typeof res.message) {
            "Unauthenticated." !== res.message && alert(`\u932f\u8aa4\uff1a${res.message}`);
            return;
          }
          const {token: token} = res;
          localStorage.setItem("token", token);
          if (this.roomType) {
            this.node.getChildByName("AuthDialog").active = false;
            this.node.getChildByName("RoomDialog").active = true;
          } else yield this.getRoom();
        });
      }
      join() {
        return __awaiter(this, void 0, void 0, function*() {
          const code = this.node.getChildByName("RoomDialog").getChildByName("Code").getComponent(cc.EditBox).string;
          yield this.getRoom(code);
        });
      }
      getRoom(code) {
        return __awaiter(this, void 0, void 0, function*() {
          let room;
          room = this.roomType ? yield utils_1.api("POST", "/rooms/add", {
            code: code
          }) : yield utils_1.api("GET", "/rooms");
          if ("undefined" !== typeof room.message) {
            "Unauthenticated." !== room.message && alert(`\u932f\u8aa4\uff1a${room.message}`);
            return;
          }
          const userId = room.user_id;
          room = room.room;
          "undefined" === typeof code && alert(room.code);
          const gameInfo = Object.assign(Object.assign({
            gameType: GameType.ONLINE,
            localUids: [ userId ]
          }, room), {
            gameStartType: "undefined" === typeof code ? GameStartType.ONLINE_NEW_ROOM : GameStartType.ONLINE_JOIN_ROOM
          });
          this.event.emit(MainMenuUI_1.ON_AUTH_COMPLETED, {
            gameInfo: gameInfo
          });
        });
      }
      onlineWithNewRoom() {
        return __awaiter(this, void 0, void 0, function*() {
          this.roomType = 0;
          null === localStorage.getItem("token") && (this.node.getChildByName("AuthDialog").active = true);
          yield this.getRoom();
          return null;
        });
      }
      onlineJoinRoomId() {
        return __awaiter(this, void 0, void 0, function*() {
          this.roomType = 1;
          null === localStorage.getItem("token") && (this.node.getChildByName("AuthDialog").active = true);
          this.node.getChildByName("RoomDialog").active = true;
          return null;
        });
      }
      getUserData() {
        return __awaiter(this, void 0, void 0, function*() {
          return yield utils_1.api("GET", "/my");
        });
      }
      leaderboard() {
        return __awaiter(this, void 0, void 0, function*() {
          this.event.emit(MainMenuUI_1.ON_LEADERBOARD_CLICKED);
        });
      }
    };
    MainMenuUI.ON_AUTH_COMPLETED = "ON_START_GAME_INFO_PREPARED";
    MainMenuUI.ON_LEADERBOARD_CLICKED = "ON_LEADERBOARD_CLICKED";
    MainMenuUI = MainMenuUI_1 = __decorate([ ccclass ], MainMenuUI);
    exports.default = MainMenuUI;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "./PlayerFocus": "PlayerFocus"
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
        this.stageNames = [ "ForestStage", "FireStage", "IceStage", "SwampStage", "UndergroundStage" ];
        this.stageMaps = {};
        this.stageMap = null;
        this.mapWidth = 0;
        this.mapHeight = 0;
        this.visPos = {};
        this.decorationPrefabs = [];
        this.decorationPrefabName = [ "Fountain", "TimeGate", "DF_Tower", "Tree" ];
      }
      start() {
        this.mapWidth = this.mapHeight = 512;
        for (const stageName of this.stageNames) cc.resources.load("Map/" + stageName, cc.TiledMapAsset, (err, map) => {
          this.stageMaps[stageName] = map;
        });
        for (let i = 0; i < this.decorationPrefabName.length; i++) cc.resources.load("Prefab/Decoration/" + this.decorationPrefabName[i], cc.Prefab, (err, prefab) => {
          this.decorationPrefabs[i] = prefab;
        });
        this.started = false;
        this.visPos = {};
      }
      init() {
        this.started = true;
        this.visPos = {};
        let rand = GameManager_1.default.instance.rand;
        this.stageMap = this.stageMaps[this.stageNames[Math.floor(rand.random() * this.stageNames.length - 1e-7)]];
      }
      clearMap() {
        this.started = false;
        this.visPos = {};
      }
      generateBlock(pos) {
        let node = new cc.Node();
        let mp = node.addComponent(cc.TiledMap);
        mp.tmxAsset = this.stageMap;
        node.position = pos;
        node.parent = GameManager_1.default.instance.backgroundLayer;
        if (Object.keys(this.visPos).length <= 20) return;
        for (let i = 0; i < 3; i++) {
          let rand = Math.random();
          if (rand < .01) {
            let fountain = cc.instantiate(this.decorationPrefabs[i]);
            fountain.parent = node;
            return;
          }
        }
      }
      posHash(x, y) {
        return `${x}*${y}`;
      }
      autoGenerateMap() {
        let pos = cc.Camera.main.node.position;
        let tx = Math.floor(pos.x / this.mapWidth);
        let ty = Math.floor(pos.y / this.mapHeight);
        for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
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
  ParticleManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f5c9vcSr9AGZwaD8ka60J6", "ParticleManager");
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
    let ParticleManager = class ParticleManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.particleList = [ "White Explosion", "Red Explosion", "Smoke", "Level Up", "Enemy Explosion", "Open Chest", "Roar" ];
        this.particlePrefabs = {};
        this.prefabPath = "Prefab/ParticleEffect/";
      }
      createParticle(particleName, pos, delaytime, durationtime, parent = GameManager_1.default.instance.bulletLayer) {
        this.scheduleOnce(() => {
          const particle = GameManager_1.default.instance.poolManager.createPrefab(this.particlePrefabs[particleName]);
          particle.parent = parent;
          particle.position = pos;
          particle.active = true;
          particle.getComponent(cc.ParticleSystem).resetSystem();
          this.scheduleOnce(() => {
            GameManager_1.default.instance.poolManager.recycle(particle);
          }, durationtime);
        }, delaytime);
      }
      start() {
        for (const particleType of this.particleList) cc.resources.load("Prefab/ParticleEffect/" + particleType, cc.Prefab, (err, prefab) => {
          this.particlePrefabs[particleType] = prefab;
        });
      }
    };
    __decorate([ property(Array) ], ParticleManager.prototype, "particleList", void 0);
    ParticleManager = __decorate([ ccclass ], ParticleManager);
    exports.default = ParticleManager;
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
        this.afterDeadCallback = null;
        this._state = {
          isMoving: false,
          isDashing: false,
          isDead: false,
          isHurt: false,
          faceLeftOrRight: 1
        };
      }
      onLoad() {
        super.onLoad();
        this.hasDeadAnimExecuted = false;
        this.playerDeadAction = cc.sequence(cc.moveBy(.4, cc.v2(0, 40)).easing(cc.easeOut(3)), cc.moveBy(.4, cc.v2(0, -40)).easing(cc.easeIn(3)), cc.callFunc(() => this.afterDeadCallback(), this));
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
        if (newState.isDead) {
          if (!this.hasDeadAnimExecuted) {
            this.hasDeadAnimExecuted = true;
            this.anim.play(this.playerDeadAnim);
            this.anim.node.color = new cc.Color(100, 100, 100, 255);
            this.node.runAction(this.playerDeadAction);
          }
          return;
        }
        newState.isHurt ? this.anim.play(this.playerHurtAnim) : newState.isDashing ? this.anim.play(this.playerDashAnim) : newState.isMoving ? this.anim.play(this.playerMoveAnim) : this.anim.play(this.playerIdleAnim);
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
    const utils_1 = require("../Helper/utils");
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
        this.currentHP = new Attributes_1.AttrNum();
        this.appliedBuff = [];
        this.animCtrl = null;
        this.rb = null;
        this.phyCollider = null;
        this.searchTarget = new SearchDrop_1.default();
        this.DENSITY = 1;
        this.DASH_DURATION = .1;
        this._dashCountDown = 0;
        this.isDashing = false;
        this._isDead = false;
        this._isInvincible = 0;
        this.movingDir = cc.v2(0, 0);
        this.normalMaterial = null;
        this.hurtMaterial = null;
        this.sprite = null;
      }
      set dashCountDown(value) {
        this._dashCountDown = value;
      }
      get isInvincible() {
        return this._isInvincible;
      }
      set isInvincible(value) {
        this._isInvincible = value;
      }
      onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, ({keyCode: keyCode}) => {
          keyCode == cc.macro.KEY.o && this.hurt(1);
        }, this);
        this.rb = this.node.getComponent(cc.RigidBody);
        this.phyCollider = this.node.getComponent(cc.PhysicsCollider);
        this.addComponent(SearchDrop_1.default);
        this.node.getComponent(cc.PhysicsCollider).density = this.DENSITY;
        this.animCtrl = this.node.getComponent(PlayerAnimController_1.default);
        this.event = new cc.EventTarget();
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
        this.currentHP.onChangeCallback.push(this.checkIsDead.bind(this));
        this.sprite = this.node.getChildByName("Sprite").getComponent(cc.Sprite);
        this.normalMaterial = this.sprite.getMaterial(0);
        utils_1.loadResource("Material/Blood", cc.Material).then(mat => {
          this.hurtMaterial = mat;
        });
      }
      start() {
        this.event.emit(PlayerController_1.PLAYER_STOP_MOVE);
        this.currentHP.defaultValue = this.maxHp.value;
        this._isDead = false;
      }
      update(dt) {
        if (this._isDead) {
          this.rb.linearVelocity = cc.Vec2.ZERO;
          return;
        }
        this._dashCountDown -= dt;
        this.isDashing || (this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value));
        this.collectDrop();
      }
      hurt(damage) {
        if (this._isDead) return;
        if (this._isInvincible > 0) return;
        const damageInfo = {
          damage: damage
        };
        this.event.emit(PlayerController_1.PLAYER_HURT, damageInfo);
        damage = damageInfo.damage;
        const deltaHP = Math.min(this.currentHP.value, damage);
        GameManager_1.default.instance.gameSystem.emitPlayerHPChange(this.uid, -damage);
        GameManager_1.default.instance.particleManager.createParticle("Red Explosion", this.node.position, .005, 1);
        let bloodEnd = () => {
          this.sprite.setMaterial(0, this.normalMaterial);
        };
        this.sprite.setMaterial(0, this.hurtMaterial);
        this.schedule(bloodEnd, .5);
        GameManager_1.default.instance.audioManager.playEffect("hurt");
      }
      recover(val) {
        if (this._isDead) return;
        const deltaHP = Math.min(this.maxHp.value - this.currentHP.value, val);
        GameManager_1.default.instance.gameSystem.emitPlayerHPChange(this.uid, deltaHP);
      }
      addWeapon(weaponPrefab) {
        if (this._isDead) return;
        const weapon = cc.instantiate(this.mainWeaponPrefab).getComponent(WeaponController_1.default);
        weapon.node.parent = this.node;
        weapon.init(this);
        return weapon;
      }
      setMovingDir(newDir) {
        if (this._isDead) return;
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
        if (this._isDead) return;
        if (this.isDashing || this._dashCountDown > 0) return;
        this.phyCollider.enabled = false;
        this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isDashing: true
        });
        this.event.emit(PlayerController_1.PLAYER_DASH);
        this.isDashing = true;
        this._dashCountDown = this.dashCoolDown.value;
        this.rb.linearVelocity = this.movingDir.mul(this.dashSpeed.value);
        this.scheduleOnce(() => {
          this.isDashing = false;
          this.rb.linearVelocity = this.movingDir.mul(this.moveSpeed.value);
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isDashing: false
          });
          this.phyCollider.enabled = true;
        }, this.DASH_DURATION);
      }
      addBuff(buff) {
        if (this._isDead) return;
        buff._apply(this);
        this.appliedBuff.push(buff);
        this.event.emit(PlayerController_1.PLAYER_ATTR_CHANGE, buff);
      }
      collectDrop() {
        if (this._isDead) return;
        while (this.getComponent(SearchDrop_1.default).getTarget()) {
          let target = this.getComponent(SearchDrop_1.default).getTarget();
          target.getComponent(DropController_1.default).collectBy(this.node);
        }
      }
      checkIsDead() {
        if (this._isDead) return;
        if (this.currentHP.value <= 0) {
          this._isDead = true;
          this.phyCollider.enabled = false;
          this.rb.linearVelocity = cc.v2(0, 0);
          this.animCtrl.afterDeadCallback = () => {
            GameManager_1.default.instance.endGame();
          };
          this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isDead: true
          });
        }
      }
    };
    PlayerController.PLAYER_START_MOVE = "PLAYER_START_MOVE";
    PlayerController.PLAYER_STOP_MOVE = "PLAYER_STOP_MOVE";
    PlayerController.PLAYER_ATTR_CHANGE = "PLAYER_ATTR_CHANGE";
    PlayerController.PLAYER_DASH = "PLAYER_DASH";
    PlayerController.PLAYER_HURT = "PLAYER_HURT";
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
    "../Helper/utils": "utils",
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
        this.font = null;
        this.SPACING_Y = 0;
        this.isLock = {};
      }
      onLoad() {
        this.event = new cc.EventTarget();
      }
      onEnable() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      onDisable() {
        GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      init(focusTarget, offSet, sortByPosition = false) {
        for (const tid in this.pointerContainer) this.pointerContainer[tid].destroy();
        this.focus = {};
        this.focusTarget = [ ...focusTarget ];
        this.pointerContainer = {};
        this.pointer = {};
        this.isLock = {};
        sortByPosition && this.focusTarget.sort((a, b) => {
          if (a.position.x < b.position.x) return -1;
          if (a.position.y < b.position.y) return -1;
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
        this.isLock[uid] = false;
        this.updateView();
      }
      removeFocus(uid) {
        delete this.focus[uid];
        this.pointer[uid].destroy();
        delete this.pointer[uid];
        delete this.isLock[uid];
        this.updateView();
      }
      removeFocusAll() {
        for (let uid in this.focus) this.removeFocus(uid);
      }
      lock(uid) {
        this.isLock[uid] = true;
        this.pointer || (this.pointer[uid] = new cc.Node(`Pointer${uid}`));
        const label = this.pointer[uid].addComponent(cc.Label);
        label.font = this.font;
        label.string = `<<${uid}>>`;
        this.setFontStyle(label, cc.Color.BLACK);
        this.updateView();
      }
      onInput(input) {
        var _a;
        if (!(null === (_a = this.focus) || void 0 === _a ? void 0 : _a.hasOwnProperty(input.uid))) return;
        if (this.isLock[input.uid]) return;
        const uid = input.uid;
        const dir = InputManager_1.default.lrOfStick(cc.v2(input.lX, input.lY));
        if (input.type == InputManager_1.InputType.BUTTON_DOWN && "A" === input.btnCode) this.event.emit(PlayerFocus_1.ON_CONFIRM, {
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
            label.string = `<  ${uid}  >`;
            this.setFontStyle(label, cc.Color.RED);
          }
          this.pointer[uid].parent = this.pointerContainer[this.focus[uid]];
          this.pointer[uid].setPosition(0, 0);
          this.pointerContainer[this.focus[uid]].getComponent(cc.Layout).updateLayout();
        }
      }
      setFontStyle(label, color) {
        label.node.scaleX = .25;
        label.node.scaleY = .25;
        label.fontSize = 80;
        label.lineHeight = 60;
        label.node.color = color;
        label.font = this.font;
        label.enableBold = true;
      }
    };
    PlayerFocus.ON_CONFIRM = "CONFIRM";
    __decorate([ property(cc.Font) ], PlayerFocus.prototype, "font", void 0);
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
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_GAME_LOGIC_READY, this.onPlayerAttrChange, this);
      }
      init(player) {
        this.player = player;
        this.player.event.on(PlayerController_1.default.PLAYER_ATTR_CHANGE, this.onPlayerAttrChange, this);
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_GAME_LOGIC_READY, this.onPlayerAttrChange, this);
      }
      onPlayerAttrChange() {
        this.node.removeAllChildren();
        for (let i = 0; i < this.player.maxHp.value; i++) {
          const hp = GameManager_1.default.instance.poolManager.createPrefab(this.hpIcon);
          hp.parent = this.node;
          i < this.player.currentHP.value ? hp.color = cc.Color.WHITE : hp.color = cc.Color.BLACK;
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
        this.clearAllChara();
      }
      getPlayerNodeByID(id) {
        var _a;
        return null === (_a = this.playerControllers[id]) || void 0 === _a ? void 0 : _a.node;
      }
      getPlayer(id) {
        return this.playerControllers[id];
      }
      getPlayerChara(id) {
        return this.playerChara[id];
      }
      isLocal(id) {
        return true == this.isLocalPlayer[id];
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
      setGameSystem(gameSystem) {
        this.gameSystem = gameSystem;
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_BUFF_APPLY, this.onBuffApply, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_PLAYER_HP_CHANGE, this.onHPChange, this);
        this.gameSystem.event.on(GameSystem_1.GameSystem.ON_CREATE_PLAYER, this.createPlayer, this);
      }
      clearAllChara() {
        this.playerIds = [];
        this.isLocalPlayer = {};
        this.playerChara = {};
        this.playerControllers = {};
        this.playerDeltaHp = {};
      }
      createPlayer({uid: uid, charaId: charaId, isLocal: isLocal}) {
        if (this.isLocalPlayer[uid]) return;
        if (this.playerIds.includes(uid)) return;
        this.playerIds.push(uid);
        this.playerChara[uid] = charaId;
        this.playerDeltaHp[uid] = 0;
        this.isLocalPlayer[uid] = isLocal;
      }
      onInput(input) {
        if (!this.playerControllers[input.uid]) return;
        input.type == InputManager_1.InputType.STICK ? this.playerControllers[input.uid].setMovingDir(cc.v2(input.lX / 1e3, input.lY / 1e3)) : input.type != InputManager_1.InputType.BUTTON_DOWN || GameManager_1.default.instance.isPaused || "A" == input.btnCode && this.playerControllers[input.uid].dash();
      }
      onBuffApply({uid: uid, buffId: buffId}) {
        this.playerControllers[uid].addBuff(new Buff_1.Buffs[buffId]());
        GameManager_1.default.instance.particleManager.createParticle("Level Up", cc.v3(0, -10, 0), 0, 2, this.playerControllers[uid].node);
        GameManager_1.default.instance.audioManager.playEffect("get_buff");
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PlayerController_1 = require("../Controller/PlayerController");
    const utils_1 = require("../Helper/utils");
    const GameManager_1 = require("../Manager/GameManager");
    const BuffIconUI_1 = require("./BuffIconUI");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PlayerStatUI = class PlayerStatUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.player = null;
        this._buffIconPrefab = null;
        this.showedBuff = [];
      }
      onLoad() {
        this.label = this.node.getChildByName("AttrLabel").getComponent(cc.Label);
        this.buffIconContainer = this.node.getChildByName("Buff");
        utils_1.loadResource("Prefab/UI/BuffIcon", cc.Prefab).then(prefab => this._buffIconPrefab = prefab);
      }
      init(player) {
        this.player = player;
        this.player.event.on(PlayerController_1.default.PLAYER_ATTR_CHANGE, this.updateUI, this);
        this.updateUI();
      }
      updateUI() {
        return __awaiter(this, void 0, void 0, function*() {
          this.label.string = `\u79fb\u52d5\u901f\u5ea6: ${this.player.moveSpeed.value}\n` + `\u6700\u5927\u751f\u547d: ${this.player.maxHp.value}\n` + `\u7d93\u9a57\u589e\u76ca: ${this.player.expGainPercentage.value}%\n` + `\u885d\u523a\u51b7\u537b\u6642\u9593: ${this.player.dashCoolDown.value}\n` + `\u653b\u64ca\u901f\u5ea6: ${this.player.mainWeapon.attackSpeed.value}\n` + `\u57fa\u790e\u50b7\u5bb3: ${this.player.mainWeapon.projectileAttr.damage.value}\n` + `\u5b50\u5f48\u98db\u884c\u901f\u5ea6: ${this.player.mainWeapon.projectileAttr.flySpeed.value}\n`;
          let toAdds = [];
          let i = 0;
          while (i < this.showedBuff.length && this.showedBuff[i] === this.player.appliedBuff[i]) i++;
          toAdds = this.player.appliedBuff.slice(i);
          this.showedBuff = [ ...this.showedBuff, ...toAdds ];
          for (const toAdd of toAdds) {
            const buffIcon = GameManager_1.default.instance.poolManager.createPrefab(this._buffIconPrefab).getComponent(BuffIconUI_1.default);
            yield buffIcon.init(toAdd);
            buffIcon.node.parent = this.buffIconContainer;
          }
        });
      }
    };
    PlayerStatUI = __decorate([ ccclass ], PlayerStatUI);
    exports.default = PlayerStatUI;
    cc._RF.pop();
  }, {
    "../Controller/PlayerController": "PlayerController",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "./BuffIconUI": "BuffIconUI"
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
        this.lockTarget = null;
        this._animation = null;
      }
      get shootByUid() {
        return this._shootByUid;
      }
      onLoad() {
        this.rb = this.getComponent(cc.RigidBody);
        this.rb.bullet = true;
        this._animation = this.node.getChildByName("Sprite").getComponent(cc.Animation);
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
          if (!this.projectileAttr.notFly) if (this.bounceCnt < this.projectileAttr.bounceOnEnemyTimes.value) {
            this.bounceCnt++;
            const newDir = this.bounceDir.mul(this.bounceMixRandomRate).add(this.rb.linearVelocity.normalize().neg().mul(1 - this.bounceMixRandomRate)).normalize();
            this.rb.linearVelocity = newDir.mul(this.projectileAttr.flySpeed.value);
          } else if (this.penetrateCnt < this.projectileAttr.penetrateTimes.value) this.penetrateCnt++; else {
            GameManager_1.default.instance.particleManager.createParticle("White Explosion", this.node.position, .1, .5);
            this.deleteProjectile();
          }
        }
      }
      update(dt) {
        this.lockTarget && this.node.setPosition(this.node.position.lerp(this.lockTarget.position, this.projectileAttr.lockTargetLerpRatio));
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
        this._animation && this._animation.play();
      }
      shootToTarget(lockTarget) {
        const dir = lockTarget.position.sub(this.node.position).normalize();
        this.lockTarget = lockTarget;
        this.shootToDirection(utils_1.ignoreZ(dir));
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
  RandomGenerator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbb9dGF2RFM6I4o0eD6ryBW", "RandomGenerator");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class RandomGenerator {
      constructor() {
        this.seed = [ 0, 0, 0, 0 ];
        this.randomGenerator = null;
      }
      setSeed(seed) {
        this.seed = this.cyrb128(seed);
        this.randomGenerator = this.sfc32(this.seed[0], this.seed[1], this.seed[2], this.seed[3]);
      }
      random() {
        return this.randomGenerator();
      }
      cyrb128(str) {
        let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
          k = str.charCodeAt(i);
          h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
          h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
          h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
          h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
        h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
        h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
        h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
        return [ (h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0 ];
      }
      sfc32(a, b, c, d) {
        return function() {
          a >>>= 0;
          b >>>= 0;
          c >>>= 0;
          d >>>= 0;
          var t = a + b | 0;
          a = b ^ b >>> 9;
          b = c + (c << 3) | 0;
          c = c << 21 | c >>> 11;
          d = d + 1 | 0;
          t = t + d | 0;
          c = c + t | 0;
          return (t >>> 0) / 4294967296;
        };
      }
    }
    exports.default = RandomGenerator;
    cc._RF.pop();
  }, {} ],
  ResultUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e77cdkqW2pI17mL0OXigB69", "ResultUI");
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
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ResultUI = class ResultUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.coinLabel = null;
      }
      onLoad() {
        this.coinLabel = this.node.getChildByName("Coin").getChildByName("CoinLabel").getComponent(cc.Label);
      }
      onEnable() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      onDisable() {
        GameManager_1.default.instance.inputManager.event.off(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      start() {
        this.coinLabel.string = `X ${GameManager_1.default.instance.coinCnt.value}`;
      }
      onInput(input) {
        input.type == InputManager_1.InputType.BUTTON_DOWN && "A" === input.btnCode && GameManager_1.default.instance.changeScene(GameManager_1.default.SCENE_LOBBY);
      }
    };
    ResultUI = __decorate([ ccclass ], ResultUI);
    exports.default = ResultUI;
    cc._RF.pop();
  }, {
    "../Manager/GameManager": "GameManager",
    "../Manager/InputManager": "InputManager"
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
        this.settingPopUp = this.node.getChildByName("SettingPopUp");
        this.playerFocus = this.node.getComponent(PlayerFocus_1.default);
        this.playerFocus.init(this.settingPopUp.children, cc.v2(0, 20).add(utils_1.ignoreZ(this.settingPopUp.position)), true);
      }
      onEnable() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
      }
      onDisable() {
        GameManager_1.default.instance.inputManager.event.on(InputManager_1.default.ON_LOCAL_INPUT, this.onInput, this);
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
    const PlayerFocus_1 = require("./PlayerFocus");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UpgradeUI = class UpgradeUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.buffs = null;
        this.buffCards = null;
      }
      onLoad() {
        this.playerFocus = this.node.getComponent(PlayerFocus_1.default);
      }
      onEnable() {
        this.playerFocus.event.on(PlayerFocus_1.default.ON_CONFIRM, this.onConfirm, this);
        GameManager_1.default.instance.event.on(GameManager_1.default.ON_UPGRADE, this.popUp, this);
      }
      onDisable() {
        this.playerFocus.event.off(PlayerFocus_1.default.ON_CONFIRM, this.onConfirm, this);
        GameManager_1.default.instance.event.off(GameManager_1.default.ON_UPGRADE, this.popUp, this);
      }
      start() {
        this.popDown();
      }
      popUp({buffAmount: buffAmount}) {
        GameManager_1.default.instance.gameSystem.event.once(GameSystem_1.GameSystem.ON_BUFF_APPLY, this.popDown, this);
        this.node.opacity = 255;
        this.buffCards = [].fill(null, 0, buffAmount);
        this.buffs = Object.keys(Buff_1.Buffs);
        utils_1.shuffle(this.buffs);
        this.buffs = this.buffs.slice(0, buffAmount);
        let promise = [];
        for (let i = 0; i < this.buffs.length; i++) promise.push(utils_1.loadResource("Art/BuffCard/" + this.buffs[i], cc.SpriteFrame).then(sprite => {
          this.buffCards[i] = this.node.getChildByName("CardContainer").getChildByName(`BuffCard${i}`);
          this.buffCards[i].getChildByName("Sprite").getComponent(cc.Sprite).spriteFrame = sprite;
          this.buffCards[i].getChildByName("Label").getComponent(cc.Label).string = Buff_1.BuffsName[this.buffs[i]];
          this.buffCards[i].getChildByName("Label").color = this.getColor(Buff_1.BuffsName[this.buffs[i]]);
          this.buffCards[i].getChildByName("Description").getComponent(cc.Label).string = Buff_1.BuffsDescription[this.buffs[i]];
        }));
        Promise.all(promise).then(() => this.playerFocus.init(this.buffCards, cc.v2(0, 50), true)).then(() => {
          for (let uid of GameManager_1.default.instance.playerManager.localUids) this.playerFocus.focusOnIndex(uid, 0);
        });
      }
      onConfirm({uid: uid, node: node}) {
        this.playerFocus.lock(uid);
        GameManager_1.default.instance.gameSystem.emitApplyBuff(uid, this.buffs[node.name.slice(-1)]);
      }
      getColor(buffName) {
        return buffName.includes("\u795e\u8aed") ? new cc.Color(180, 0, 255) : buffName.includes("\u589e\u5e45") ? new cc.Color(0, 140, 0) : buffName.includes("\u60e1\u9b54\u7684\u4f4e\u8a9e") ? new cc.Color(190, 0, 0) : cc.Color.BLACK;
      }
      popDown() {
        this.node.opacity = 0;
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
    "./PlayerFocus": "PlayerFocus"
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
        this.enemyTypes = [ "BumpingPig", "SmallSkeleton", "Rabbit", "Goblin", "EnemySkeleton", "GraveGuard" ];
        this.waveData = null;
        this.waveDataName = "testwave";
        this.enemyPrefabs = [];
        this.spawnRadius = 600;
        this.currentWave = null;
        this.spawnCenter = null;
        this.countDowns = [];
      }
      setWave(wave) {
        this.currentWave = this.waveData.json[wave];
      }
      clearWave() {
        this.currentWave = 0;
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
          void 0 === this.countDowns[key] && (this.countDowns[key] = 3);
          if (this.countDowns[key] <= 0) {
            for (let i = 0; i < this.currentWave[key]["spawnNum"]; i++) this.spawnEnemy(this.enemyPrefabs[key], this.randomSpawnPos());
            this.countDowns[key] = this.currentWave[key].spawnInterval;
          } else this.countDowns[key] -= dt;
        }
      }
      randomSpawnPos() {
        let rand = GameManager_1.default.instance.rand;
        let angle = 2 * rand.random() * Math.PI;
        let radius = this.spawnRadius + 200 * rand.random();
        let vec = cc.v2(Math.cos(angle) * radius, Math.sin(angle) * radius);
        return this.spawnCenter.add(vec);
      }
      spawnEnemy(enemyPrefab, pos) {
        let enemy = GameManager_1.default.instance.poolManager.createPrefab(enemyPrefab);
        enemy.position = utils_2.padZ(pos);
        enemy.active = true;
        enemy.parent = GameManager_1.default.instance.playerEnemyLayer;
        if (enemy.getComponent("BossController")) {
          enemy.getComponent("BossController").init();
          enemy.position = cc.v3(this.spawnCenter.x, this.spawnCenter.y, 0).sub(cc.v3(winSize.width / 2 + 50, 0, 0));
        } else enemy.getComponent("EnemyController").init();
      }
      onEnemyDie({enemyPosition: enemyPosition, killByUid: killByUid}) {
        this.dropRandomItem(enemyPosition);
      }
      dropRandomItem(position) {
        let rand = GameManager_1.default.instance.rand;
        const random = rand.random();
        let sum = 0;
        for (let i = 0; i < this.enemyDropItemsType.length; i++) {
          sum += this.enemyDropItemsRate[i];
          if (random < sum) {
            let item = GameManager_1.default.instance.poolManager.createPrefab(this.enemyDropItems[this.enemyDropItemsType[i]]);
            item.position = position.add(cc.v3(40 * rand.random() - 20, 40 * rand.random() - 20, 0));
            item.active = true;
            item.parent = GameManager_1.default.instance.itemLayer;
            break;
          }
        }
      }
    };
    WaveManager.ON_ENEMY_DIE = "onEnemyDie";
    WaveManager.ON_ENEMY_HIT = "onEnemyHit";
    WaveManager.ON_BOSS_FIGHT_START = "onBossFightStart";
    WaveManager = WaveManager_1 = __decorate([ ccclass ], WaveManager);
    exports.default = WaveManager;
    cc._RF.pop();
  }, {
    "../Helper/utils": "utils",
    "./GameManager": "GameManager"
  } ],
  WeaponAnimController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "539d4kLTLFHA5AxpwAPwfee", "WeaponAnimController");
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
    let WeaponAnimController = class WeaponAnimController extends AnimController_1.default {
      constructor() {
        super(...arguments);
        this.attackAnim = "attack";
        this.idleAnim = "idle";
      }
      initState() {
        this._state = {
          isAttacking: false,
          dontBreakAttackAnimCnt: 0
        };
      }
      onStateChange(oldState, newState) {
        if (oldState === newState) return;
        newState.isAttacking ? this.currentAnimState = this.anim.play(this.attackAnim) : false === newState.isAttacking && (this.currentAnimState.name == this.attackAnim ? this.anim.on("lastframe", () => this.currentAnimState = this.anim.play(this.idleAnim), this) : this.currentAnimState = this.anim.play(this.idleAnim));
      }
    };
    __decorate([ property() ], WeaponAnimController.prototype, "attackAnim", void 0);
    __decorate([ property() ], WeaponAnimController.prototype, "idleAnim", void 0);
    WeaponAnimController = __decorate([ ccclass ], WeaponAnimController);
    exports.default = WeaponAnimController;
    cc._RF.pop();
  }, {
    "./AnimController": "AnimController"
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
    const WeaponAnimController_1 = require("./Anim/WeaponAnimController");
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
        this.aimWeaponOwner = false;
        this.player = null;
        this.searchTarget = null;
        this.animCtrl = null;
        this.canAttack = false;
        this.shotCnt = 0;
        this.nextShotCountDown = 0;
        this.attackCountDown = 0;
        this.bounceDirIdx = 0;
      }
      onLoad() {
        this.node.getComponent(FaceTo_1.default).init(this.node);
        this.animCtrl = this.node.getComponent(WeaponAnimController_1.default);
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
          this.animCtrl && (this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
            isAttacking: true
          }));
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
        this.animCtrl && (this.animCtrl.state = Object.assign(Object.assign({}, this.animCtrl.state), {
          isAttacking: false
        }));
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
        this.aimWeaponOwner ? projectile.shootToTarget(this.player.node) : projectile.shootToDirection(utils_1.ignoreZ(target.position.sub(this.player.node.position)).normalize());
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
    __decorate([ property() ], WeaponController.prototype, "aimWeaponOwner", void 0);
    WeaponController = __decorate([ ccclass ], WeaponController);
    exports.default = WeaponController;
    cc._RF.pop();
  }, {
    "../Helper/Attributes": "Attributes",
    "../Helper/SearchEnemy": "SearchEnemy",
    "../Helper/utils": "utils",
    "../Manager/GameManager": "GameManager",
    "./Anim/WeaponAnimController": "WeaponAnimController",
    "./FaceTo": "FaceTo",
    "./PlayerController": "PlayerController",
    "./ProjectileController": "ProjectileController"
  } ],
  utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f136f63jVpKW5QsM7FgFSZ2", "utils");
    "use strict";
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
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.api = exports.CURRENT_ENV = exports.DEV_ENV = exports.PROD_ENV = exports.shuffle = exports.loadResource = exports.nodeDistanceSqr = exports.padZ = exports.ignoreZ = exports.eightDirections = exports.Direction = void 0;
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
    exports.PROD_ENV = {
      PUSHER_CONFIG: {
        broadcaster: "pusher",
        key: "app-key",
        cluster: "mt1",
        forceTLS: false,
        wsHost: "final.hsuan.app",
        wsPath: "/websockets",
        wsPort: null
      },
      API_CONFIG: {
        API_URL: "https://final.hsuan.app/api"
      }
    };
    exports.DEV_ENV = {
      PUSHER_CONFIG: {
        broadcaster: "pusher",
        key: "app-key",
        cluster: "mt1",
        forceTLS: false,
        wsHost: "localhost",
        wsPath: "",
        wsPort: 6001
      },
      API_CONFIG: {
        API_URL: "http://localhost:8000/api"
      }
    };
    exports.CURRENT_ENV = exports.PROD_ENV;
    function api(method, endpoint, jsonBody) {
      return __awaiter(this, void 0, void 0, function*() {
        return fetch(exports.CURRENT_ENV.API_CONFIG.API_URL + endpoint, {
          method: method,
          body: "GET" === method || "undefined" === typeof jsonBody ? null : JSON.stringify(jsonBody),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }).then(res => {
          401 === res.status && localStorage.removeItem("token");
          return res.json();
        });
      });
    }
    exports.api = api;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AnimController", "EnemyAnimController", "PlayerAnimController", "WeaponAnimController", "BossController", "CameraController", "DamagePlayerOnCollide", "DropController", "EnemyController", "FaceTo", "PlayerController", "ProjectileController", "WeaponController", "Attributes", "Buff", "ISearchTarget", "RandomGenerator", "SearchDrop", "SearchEnemy", "utils", "AudioManager", "GameManager", "GameSystem", "InputManager", "MapManager", "ParticleManager", "PlayerManager", "PoolManager", "WaveManager", "BumpingMonster", "BuffIconUI", "EnterGameUI", "ExpBarUI", "FixedUI", "GameEndUI", "LeaderBoardUI", "LobbyUI", "MainMenuUI", "PlayerFocus", "PlayerHPUI", "PlayerStatUI", "ResultUI", "SettingUI", "UpgradeUI" ]);