/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/* global window, document */
'use strict';

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.set-prototype-of.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _subscribeUiEvent = require("subscribe-ui-event");

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// constants
var STATUS_ORIGINAL = 0; // The default status, locating at the original position.

var STATUS_RELEASED = 1; // The released status, locating at somewhere on document but not default one.

var STATUS_FIXED = 2; // The sticky status, locating fixed to the top or the bottom of screen.

var TRANSFORM_PROP = 'transform'; // global variable for all instances

var doc;
var docBody;
var docEl;
var canEnableTransforms = true; // Use transform by default, so no Sticky on lower-end browser when no Modernizr

var M;
var scrollDelta = 0;
var win;
var winHeight = -1;

var Sticky = /*#__PURE__*/function (_Component) {
  _inherits(Sticky, _Component);

  var _super = _createSuper(Sticky);

  function Sticky(props, context) {
    var _this;

    _classCallCheck(this, Sticky);

    _this = _super.call(this, props, context);
    _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.handleScrollStart = _this.handleScrollStart.bind(_assertThisInitialized(_this));
    _this.delta = 0;
    _this.stickyTop = 0;
    _this.stickyBottom = 0;
    _this.frozen = false;
    _this.skipNextScrollEvent = false;
    _this.scrollTop = -1;
    _this.bottomBoundaryTarget;
    _this.topTarget;
    _this.subscribers;
    _this.state = {
      top: 0,
      // A top offset from viewport top where Sticky sticks to when scrolling up
      bottom: 0,
      // A bottom offset from viewport top where Sticky sticks to when scrolling down
      width: 0,
      // Sticky width
      height: 0,
      // Sticky height
      x: 0,
      // The original x of Sticky
      y: 0,
      // The original y of Sticky
      topBoundary: 0,
      // The top boundary on document
      bottomBoundary: Infinity,
      // The bottom boundary on document
      status: STATUS_ORIGINAL,
      // The Sticky status
      pos: 0,
      // Real y-axis offset for rendering position-fixed and position-relative
      activated: false // once browser info is available after mounted, it becomes true to avoid checksum error

    };
    return _this;
  }

  _createClass(Sticky, [{
    key: "getTargetHeight",
    value: function getTargetHeight(target) {
      return target && target.offsetHeight || 0;
    }
  }, {
    key: "getTopPosition",
    value: function getTopPosition(top) {
      // a top argument can be provided to override reading from the props
      top = top || this.props.top || 0;

      if (typeof top === 'string') {
        if (!this.topTarget) {
          this.topTarget = doc.querySelector(top);
        }

        top = this.getTargetHeight(this.topTarget);
      }

      return top;
    }
  }, {
    key: "getTargetBottom",
    value: function getTargetBottom(target) {
      if (!target) {
        return -1;
      }

      var rect = target.getBoundingClientRect();
      return this.scrollTop + rect.bottom;
    }
  }, {
    key: "getBottomBoundary",
    value: function getBottomBoundary(bottomBoundary) {
      // a bottomBoundary can be provided to avoid reading from the props
      var boundary = bottomBoundary || this.props.bottomBoundary; // TODO, bottomBoundary was an object, depricate it later.

      if (_typeof(boundary) === 'object') {
        boundary = boundary.value || boundary.target || 0;
      }

      if (typeof boundary === 'string') {
        if (!this.bottomBoundaryTarget) {
          this.bottomBoundaryTarget = doc.querySelector(boundary);
        }

        boundary = this.getTargetBottom(this.bottomBoundaryTarget);
      }

      return boundary && boundary > 0 ? boundary : Infinity;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        status: STATUS_ORIGINAL,
        pos: 0
      });
    }
  }, {
    key: "release",
    value: function release(pos) {
      this.setState({
        status: STATUS_RELEASED,
        pos: pos - this.state.y
      });
    }
  }, {
    key: "fix",
    value: function fix(pos) {
      this.setState({
        status: STATUS_FIXED,
        pos: pos
      });
    }
    /**
     * Update the initial position, width, and height. It should update whenever children change.
     * @param {Object} options optional top and bottomBoundary new values
     */

  }, {
    key: "updateInitialDimension",
    value: function updateInitialDimension(options) {
      options = options || {};

      if (!this.outerElement || !this.innerElement) {
        return;
      }

      var outerRect = this.outerElement.getBoundingClientRect();
      var innerRect = this.innerElement.getBoundingClientRect();
      var width = outerRect.width || outerRect.right - outerRect.left;
      var height = innerRect.height || innerRect.bottom - innerRect.top;
      ;
      var outerY = outerRect.top + this.scrollTop;
      this.setState({
        top: this.getTopPosition(options.top),
        bottom: Math.min(this.state.top + height, winHeight),
        width: width,
        height: height,
        x: outerRect.left,
        y: outerY,
        bottomBoundary: this.getBottomBoundary(options.bottomBoundary),
        topBoundary: outerY
      });
    }
  }, {
    key: "handleResize",
    value: function handleResize(e, ae) {
      if (this.props.shouldFreeze()) {
        return;
      }

      winHeight = ae.resize.height;
      this.updateInitialDimension();
      this.update();
    }
  }, {
    key: "handleScrollStart",
    value: function handleScrollStart(e, ae) {
      this.frozen = this.props.shouldFreeze();

      if (this.frozen) {
        return;
      }

      if (this.scrollTop === ae.scroll.top) {
        // Scroll position hasn't changed,
        // do nothing
        this.skipNextScrollEvent = true;
      } else {
        this.scrollTop = ae.scroll.top;
        this.updateInitialDimension();
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(e, ae) {
      // Scroll doesn't need to be handled
      if (this.skipNextScrollEvent) {
        this.skipNextScrollEvent = false;
        return;
      }

      scrollDelta = ae.scroll.delta;
      this.scrollTop = ae.scroll.top;
      this.update();
    }
    /**
     * Update Sticky position.
     */

  }, {
    key: "update",
    value: function update() {
      var disabled = !this.props.enabled || this.state.bottomBoundary - this.state.topBoundary <= this.state.height || this.state.width === 0 && this.state.height === 0;

      if (disabled) {
        if (this.state.status !== STATUS_ORIGINAL) {
          this.reset();
        }

        return;
      }

      var delta = scrollDelta; // "top" and "bottom" are the positions that this.state.top and this.state.bottom project
      // on document from viewport.

      var top = this.scrollTop + this.state.top;
      var bottom = this.scrollTop + this.state.bottom; // There are 2 principles to make sure Sticky won't get wrong so much:
      // 1. Reset Sticky to the original postion when "top" <= topBoundary
      // 2. Release Sticky to the bottom boundary when "bottom" >= bottomBoundary

      if (top <= this.state.topBoundary) {
        // #1
        this.reset();
      } else if (bottom >= this.state.bottomBoundary) {
        // #2
        this.stickyBottom = this.state.bottomBoundary;
        this.stickyTop = this.stickyBottom - this.state.height;
        this.release(this.stickyTop);
      } else {
        if (this.state.height > winHeight - this.state.top) {
          // In this case, Sticky is higher then viewport minus top offset
          switch (this.state.status) {
            case STATUS_ORIGINAL:
              this.release(this.state.y);
              this.stickyTop = this.state.y;
              this.stickyBottom = this.stickyTop + this.state.height;
            // Commentting out "break" is on purpose, because there is a chance to transit to FIXED
            // from ORIGINAL when calling window.scrollTo().
            // break;

            case STATUS_RELEASED:
              // If "top" and "bottom" are inbetween stickyTop and stickyBottom, then Sticky is in
              // RELEASE status. Otherwise, it changes to FIXED status, and its bottom sticks to
              // viewport bottom when scrolling down, or its top sticks to viewport top when scrolling up.
              this.stickyBottom = this.stickyTop + this.state.height;

              if (delta > 0 && bottom > this.stickyBottom) {
                this.fix(this.state.bottom - this.state.height);
              } else if (delta < 0 && top < this.stickyTop) {
                this.fix(this.state.top);
              }

              break;

            case STATUS_FIXED:
              var toRelease = true;
              var pos = this.state.pos;
              var height = this.state.height; // In regular cases, when Sticky is in FIXED status,
              // 1. it's top will stick to the screen top,
              // 2. it's bottom will stick to the screen bottom,
              // 3. if not the cases above, then it's height gets changed

              if (delta > 0 && pos === this.state.top) {
                // case 1, and scrolling down
                this.stickyTop = top - delta;
                this.stickyBottom = this.stickyTop + height;
              } else if (delta < 0 && pos === this.state.bottom - height) {
                // case 2, and scrolling up
                this.stickyBottom = bottom - delta;
                this.stickyTop = this.stickyBottom - height;
              } else if (pos !== this.state.bottom - height && pos !== this.state.top) {
                // case 3
                // This case only happens when Sticky's bottom sticks to the screen bottom and
                // its height gets changed. Sticky should be in RELEASE status and update its
                // sticky bottom by calculating how much height it changed.
                var deltaHeight = pos + height - this.state.bottom;
                this.stickyBottom = bottom - delta + deltaHeight;
                this.stickyTop = this.stickyBottom - height;
              } else {
                toRelease = false;
              }

              if (toRelease) {
                this.release(this.stickyTop);
              }

              break;
          }
        } else {
          // In this case, Sticky is shorter then viewport minus top offset
          // and will always fix to the top offset of viewport
          this.fix(this.state.top);
        }
      }

      this.delta = delta;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      if (prevState.status !== this.state.status && this.props.onStateChange) {
        this.props.onStateChange({
          status: this.state.status
        });
      }

      var arePropsChanged = !(0, _shallowequal.default)(this.props, prevProps);

      if (arePropsChanged) {
        // if the props for enabling are toggled, then trigger the update or reset depending on the current props
        if (prevProps.enabled !== this.props.enabled) {
          if (this.props.enabled) {
            this.setState({
              activated: true
            }, function () {
              _this2.updateInitialDimension();

              _this2.update();
            });
          } else {
            this.setState({
              activated: false
            }, function () {
              _this2.reset();
            });
          }
        } // if the top or bottomBoundary props were changed, then trigger the update
        else if (prevProps.top !== this.props.top || prevProps.bottomBoundary !== this.props.bottomBoundary) {
            this.updateInitialDimension();
            this.update();
          }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var subscribers = this.subscribers || [];

      for (var i = subscribers.length - 1; i >= 0; i--) {
        this.subscribers[i].unsubscribe();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      // Only initialize the globals if this is the first
      // time this component type has been mounted
      if (!win) {
        win = window;
        doc = document;
        docEl = doc.documentElement;
        docBody = doc.body;
        winHeight = win.innerHeight || docEl.clientHeight;
        M = window.Modernizr; // No Sticky on lower-end browser when no Modernizr

        if (M && M.prefixed) {
          canEnableTransforms = M.csstransforms3d;
          TRANSFORM_PROP = M.prefixed('transform');
        }
      } // when mount, the scrollTop is not necessary on the top


      this.scrollTop = docBody.scrollTop + docEl.scrollTop;

      if (this.props.enabled) {
        this.setState({
          activated: true
        });
        this.updateInitialDimension();
        this.update();
      } // bind the listeners regardless if initially enabled - allows the component to toggle sticky functionality


      this.subscribers = [(0, _subscribeUiEvent.subscribe)('scrollStart', this.handleScrollStart.bind(this), {
        useRAF: true
      }), (0, _subscribeUiEvent.subscribe)('scroll', this.handleScroll.bind(this), {
        useRAF: true,
        enableScrollInfo: true
      }), (0, _subscribeUiEvent.subscribe)('resize', this.handleResize.bind(this), {
        enableResizeInfo: true
      })];
    }
  }, {
    key: "translate",
    value: function translate(style, pos) {
      var enableTransforms = canEnableTransforms && this.props.enableTransforms;

      if (enableTransforms && this.state.activated) {
        style[TRANSFORM_PROP] = 'translate3d(0,' + Math.round(pos) + 'px,0)';
      } else {
        style.top = pos + 'px';
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !this.props.shouldFreeze() && !((0, _shallowequal.default)(this.props, nextProps) && (0, _shallowequal.default)(this.state, nextState));
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this3 = this;

      // TODO, "overflow: auto" prevents collapse, need a good way to get children height
      var innerStyle = {
        position: this.state.status === STATUS_FIXED ? 'fixed' : 'relative',
        top: this.state.status === STATUS_FIXED ? '0px' : '',
        zIndex: this.props.innerZ
      };
      var outerStyle = {}; // always use translate3d to enhance the performance

      this.translate(innerStyle, this.state.pos);

      if (this.state.status !== STATUS_ORIGINAL) {
        innerStyle.width = this.state.width + 'px';
        outerStyle.height = this.state.height + 'px';
      }

      var outerClasses = (0, _classnames.default)('sticky-outer-wrapper', this.props.className, (_classNames = {}, _defineProperty(_classNames, this.props.activeClass, this.state.status === STATUS_FIXED), _defineProperty(_classNames, this.props.releasedClass, this.state.status === STATUS_RELEASED), _classNames));
      var children = this.props.children;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(outer) {
          _this3.outerElement = outer;
        },
        className: outerClasses,
        style: outerStyle
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(inner) {
          _this3.innerElement = inner;
        },
        className: ['sticky-inner-wrapper', this.props.innerClass].join(' '),
        style: innerStyle
      }, typeof children === 'function' ? children({
        status: this.state.status
      }) : children));
    }
  }]);

  return Sticky;
}(_react.Component);

Sticky.displayName = 'Sticky';
Sticky.defaultProps = {
  shouldFreeze: function shouldFreeze() {
    return false;
  },
  enabled: true,
  top: 0,
  bottomBoundary: 0,
  enableTransforms: true,
  activeClass: 'active',
  releasedClass: 'released',
  onStateChange: null,
  innerClass: ''
};
/**
 * @param {Bool} enabled A switch to enable or disable Sticky.
 * @param {String/Number} top A top offset px for Sticky. Could be a selector representing a node
 *        whose height should serve as the top offset.
 * @param {String/Number} bottomBoundary A bottom boundary px on document where Sticky will stop.
 *        Could be a selector representing a node whose bottom should serve as the bottom boudary.
 */

Sticky.propTypes = {
  enabled: _propTypes.default.bool,
  top: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  bottomBoundary: _propTypes.default.oneOfType([_propTypes.default.object, // TODO, may remove
  _propTypes.default.string, _propTypes.default.number]),
  enableTransforms: _propTypes.default.bool,
  activeClass: _propTypes.default.string,
  releasedClass: _propTypes.default.string,
  innerClass: _propTypes.default.string,
  className: _propTypes.default.string,
  onStateChange: _propTypes.default.func,
  shouldFreeze: _propTypes.default.func,
  innerZ: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
Sticky.STATUS_ORIGINAL = STATUS_ORIGINAL;
Sticky.STATUS_RELEASED = STATUS_RELEASED;
Sticky.STATUS_FIXED = STATUS_FIXED;
module.exports = Sticky;