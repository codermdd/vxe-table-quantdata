"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tools = require("../../tools");
var _conf = _interopRequireDefault(require("../../conf"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _default2 = {
  name: 'VxeRadioButton',
  props: {
    label: [String, Number],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.radio.size || _conf.default.size;
      }
    }
  },
  inject: {
    $xegroup: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isGroup: function isGroup() {
      return this.$xegroup;
    },
    isDisabled: function isDisabled() {
      return this.disabled || this.isGroup && this.$xegroup.disabled;
    }
  },
  render: function render(h) {
    var _ref;
    var $slots = this.$slots,
      $xegroup = this.$xegroup,
      isGroup = this.isGroup,
      isDisabled = this.isDisabled,
      title = this.title,
      vSize = this.vSize,
      label = this.label,
      content = this.content;
    var attrs = {};
    if (title) {
      attrs.title = title;
    }
    return h('label', {
      class: ['vxe-radio', 'vxe-radio-button', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-radio--input',
      attrs: {
        type: 'radio',
        name: isGroup ? $xegroup.name : null,
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup && $xegroup.value === label
      },
      on: {
        change: function change(evnt) {
          if (!isDisabled) {
            if (isGroup) {
              $xegroup.handleChecked({
                label: label,
                $event: evnt
              });
            }
          }
        }
      }
    }), h('span', {
      class: 'vxe-radio--label'
    }, $slots.default || [_tools.UtilTools.getFuncText(content)])]);
  }
};
exports.default = _default2;