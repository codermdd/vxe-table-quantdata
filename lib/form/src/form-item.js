"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ctor = _interopRequireDefault(require("xe-utils/ctor"));
var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));
var _tools = require("../../tools");
var _conf = _interopRequireDefault(require("../../conf"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function renderPrefixIcon(h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [h('i', {
    class: titlePrefix.icon || _conf.default.icon.FORM_PREFIX
  })]);
}
function renderSuffixIcon(h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [h('i', {
    class: titleSuffix.icon || _conf.default.icon.FORM_SUFFIX
  })]);
}
function renderTitle(h, _vm) {
  var title = _vm.title,
    titlePrefix = _vm.titlePrefix,
    titleSuffix = _vm.titleSuffix;
  var titles = [];
  if (titlePrefix) {
    titles.push(titlePrefix.content || titlePrefix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titlePrefix.content || titlePrefix.message),
        enterable: titlePrefix.enterable,
        theme: titlePrefix.theme
      }
    }, [renderPrefixIcon(h, titlePrefix)]) : renderPrefixIcon(h, titlePrefix));
  }
  titles.push(h('span', {
    class: 'vxe-form--item-title-label'
  }, _tools.UtilTools.getFuncText(title)));
  if (titleSuffix) {
    titles.push(titleSuffix.content || titleSuffix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titleSuffix.content || titleSuffix.message),
        enterable: titleSuffix.enterable,
        theme: titleSuffix.theme
      }
    }, [renderSuffixIcon(h, titleSuffix)]) : renderSuffixIcon(h, titleSuffix));
  }
  return titles;
}
var _default = {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    className: [String, Function],
    titleOverflow: {
      type: [Boolean, String],
      default: null
    },
    titlePrefix: Object,
    titleSuffix: Object,
    resetValue: {
      default: null
    },
    visible: {
      type: Boolean,
      default: null
    },
    visibleMethod: Function,
    folding: Boolean,
    collapseNode: Boolean,
    itemRender: Object
  },
  inject: {
    $vxeform: {
      default: null
    }
  },
  data: function data() {
    return {
      showError: false,
      showRule: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isRequired: function isRequired() {
      var $vxeform = this.$vxeform,
        field = this.field;
      if ($vxeform && $vxeform.rules) {
        var rules = $vxeform.rules[field];
        if (rules) {
          return rules.some(function (rule) {
            return rule.required;
          });
        }
      }
      return false;
    },
    errRule: function errRule() {
      var $vxeform = this.$vxeform,
        field = this.field;
      if ($vxeform) {
        return _ctor.default.find($vxeform.invalids, function (_ref) {
          var property = _ref.property;
          return field === property;
        });
      }
      return null;
    }
  },
  watch: {
    errRule: function errRule(value) {
      var _this = this;
      clearTimeout(this.showErrTimeout);
      this.showError = false;
      if (value) {
        this.showRule = value.rule;
        setTimeout(function () {
          _this.showError = true;
        }, 30);
      } else {
        this.showErrTimeout = setTimeout(function () {
          _this.showRule = null;
        }, 350);
      }
    }
  },
  render: function render(h) {
    var _e = this._e,
      $scopedSlots = this.$scopedSlots,
      $vxeform = this.$vxeform,
      title = this.title,
      folding = this.folding,
      visible = this.visible,
      visibleMethod = this.visibleMethod,
      field = this.field,
      className = this.className,
      collapseNode = this.collapseNode,
      itemRender = this.itemRender,
      isRequired = this.isRequired,
      showError = this.showError,
      showRule = this.showRule,
      titleOverflow = this.titleOverflow;
    var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;
    var span = this.span || $vxeform.span;
    var align = this.align || $vxeform.align;
    var titleAlign = this.titleAlign || $vxeform.titleAlign;
    var titleWidth = this.titleWidth || $vxeform.titleWidth;
    var collapseAll = $vxeform.collapseAll;
    var itemVisibleMethod = visibleMethod;
    var itemOverflow = _ctor.default.isUndefined(titleOverflow) || _ctor.default.isNull(titleOverflow) ? $vxeform.titleOverflow : titleOverflow;
    var showEllipsis = itemOverflow === 'ellipsis';
    var showTitle = itemOverflow === 'title';
    var showTooltip = itemOverflow === true || itemOverflow === 'tooltip';
    var hasEllipsis = showTitle || showTooltip || showEllipsis;
    var params = {
      data: $vxeform.data,
      property: field,
      item: this,
      $form: $vxeform
    };
    if (visible === false) {
      return _e();
    }
    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod;
    }
    var contentVNs = [];
    if (compConf && compConf.renderItemContent) {
      contentVNs = compConf.renderItemContent.call(this, h, itemRender, params);
    } else if (compConf && compConf.renderItem) {
      // 在 v4 中废弃 renderItem
      _tools.UtilTools.warn('vxe.error.delFunc', ['renderItem', 'renderItemContent']);
      contentVNs = compConf.renderItem.call(this, h, itemRender, params);
    } else if ($scopedSlots && $scopedSlots.default) {
      contentVNs = $scopedSlots.default.call(this, params, h);
    } else if (field) {
      contentVNs = ["".concat(_ctor.default.get($vxeform.data, field))];
    }
    var ons = showTooltip && $vxeform ? {
      mouseenter: function mouseenter(evnt) {
        $vxeform.triggerHeaderHelpEvent(evnt, params);
      },
      mouseleave: $vxeform.handleTargetLeaveEvent
    } : {};
    return h('div', {
      class: ['vxe-form--item', span ? "vxe-col--".concat(span, " is--span") : null, className, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod(params),
        'is--error': showError
      }]
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null, {
        'is--ellipsis': hasEllipsis
      }],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null,
      attrs: {
        title: showTitle ? _tools.UtilTools.getFuncText(title) : null
      },
      on: ons
    }, renderTitle(h, this)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, contentVNs.concat([collapseNode ? h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: this.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.FORM_FOLDING : _conf.default.icon.FORM_UNFOLDING]
    })]) : null, showRule && $vxeform.validOpts.showMessage ? h('div', {
      class: 'vxe-form--item-valid',
      style: showRule.maxWidth ? {
        width: "".concat(showRule.maxWidth, "px")
      } : null
    }, showRule.message) : null]))])]);
  },
  methods: {
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      var $form = this.$vxeform;
      $form.toggleCollapse();
      $form.$emit('toggle-collapse', {
        collapse: !$form.collapseAll,
        data: $form.data,
        $form: $form,
        $event: evnt
      }, evnt);
    }
  }
};
exports.default = _default;