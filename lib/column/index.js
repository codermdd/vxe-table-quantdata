"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Column = void 0;
var _column = _interopRequireDefault(require("./src/column"));
var _group = _interopRequireDefault(require("./src/group"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_column.default.install = function (Vue) {
  Vue.component(_column.default.name, _column.default);
  Vue.component('VxeTableColumn', _column.default);
  Vue.component(_group.default.name, _group.default);
  Vue.component('VxeTableColgroup', _group.default);
};
var Column = _column.default;
exports.Column = Column;
var _default = _column.default;
exports.default = _default;