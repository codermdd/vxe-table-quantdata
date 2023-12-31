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
  name: 'VxeCheckbox',
  props: {
    value: [String, Number, Boolean],
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    checkedValue: {
      type: [String, Number, Boolean],
      default: true
    },
    uncheckedValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.checkbox.size || _conf.default.size;
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
    var _ref,
      _this = this;
    var $slots = this.$slots,
      $xegroup = this.$xegroup,
      isGroup = this.isGroup,
      isDisabled = this.isDisabled,
      title = this.title,
      vSize = this.vSize,
      indeterminate = this.indeterminate,
      value = this.value,
      label = this.label,
      content = this.content,
      checkedValue = this.checkedValue,
      uncheckedValue = this.uncheckedValue;
    var attrs = {};
    if (title) {
      attrs.title = title;
    }
    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-checkbox--input',
      attrs: {
        type: 'checkbox',
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup ? $xegroup.value && $xegroup.value.some(function (item) {
          return item === label;
        }) : value === checkedValue
      },
      on: {
        change: function change(evnt) {
          if (!isDisabled) {
            var checked = evnt.target.checked;
            var _value = checked ? checkedValue : uncheckedValue;
            var params = {
              checked: checked,
              value: _value,
              label: label,
              $event: evnt
            };
            if (isGroup) {
              $xegroup.handleChecked(params, evnt);
            } else {
              _this.$emit('input', _value);
              _this.$emit('change', params, evnt);
            }
          }
        }
      }
    }), h('span', {
      class: 'vxe-checkbox--icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, $slots.default || [_tools.UtilTools.getFuncText(content)])]);
  }
};
exports.default = _default2;