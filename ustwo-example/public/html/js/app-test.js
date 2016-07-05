'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _env = require('app/adaptors/server/env');

var _env2 = _interopRequireDefault(_env);

var _app = require('app/components/app');

var _app2 = _interopRequireDefault(_app);

var _flux = require('app/flux');

var _flux2 = _interopRequireDefault(_flux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.env = _env2.default;

_react2.default.initializeTouchEvents(true);

_flux2.default.init();

_reactDom2.default.render(_react2.default.createElement(_app2.default, { state: state }), document.body);
