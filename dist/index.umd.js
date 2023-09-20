(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SmartDesign = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  const withInstall = (comp) => {
      comp.install = function (app) {
          app.component(comp.name, comp);
      };
      return comp;
  };

  const iconProps = {
      size: {
          type: Number
      },
      color: {
          type: String
      }
  };

  function _bem(prefixName, blockSuffix, element, modifier) {
      if (blockSuffix) {
          prefixName += `-${blockSuffix}`;
      }
      if (element) {
          prefixName += `__${element}`;
      }
      if (modifier) {
          prefixName += `--${modifier}`;
      }
      return prefixName;
  }
  function createBEM(prefixName) {
      const b = (blockSuffix = "") => _bem(prefixName, blockSuffix, "", "");
      const e = (element = "") => element ? _bem(prefixName, "", element, "") : "";
      const m = (modifier = "") => modifier ? _bem(prefixName, "", "", modifier) : "";
      const be = (blockSuffix = "", element = "") => blockSuffix && element ? _bem(prefixName, blockSuffix, element, "") : "";
      const bm = (blockSuffix = "", modifier = "") => blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";
      const em = (element = "", modifier = "") => element && modifier ? _bem(prefixName, "", element, modifier) : "";
      const bem = (blockSuffix = "", element = "", modifier = "") => blockSuffix && element && modifier
          ? _bem(prefixName, blockSuffix, element, modifier)
          : "";
      const is = (name, state) => (state ? `is-${name}` : "");
      return {
          b,
          e,
          m,
          be,
          bm,
          em,
          bem,
          is
      };
  }
  function createNamespace(name) {
      const prefixName = `s-${name}`;
      return createBEM(prefixName);
  }

  var script = vue.defineComponent(Object.assign({
      name: "SIcon",
      inheritAttrs: false,
  }, { __name: 'icon', props: iconProps, setup(__props) {
          const { size, color } = __props;
          const bem = createNamespace('icon');
          const style = vue.computed(() => {
              if (!size && !color)
                  return {};
              return Object.assign(Object.assign({}, (size ? { 'font-size': size + 'px' } : {})), (color ? { 'color': color } : {}));
          });
          return (_ctx, _cache) => {
              return (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
                  class: vue.unref(bem).b(),
                  style: style.value
              }, _ctx.$attrs), [
                  vue.renderSlot(_ctx.$slots, "default")
              ], 16));
          };
      } }));

  script.__file = "packages/components/icon/src/icon.vue";

  const SIcon = withInstall(script);

  const components = [
      SIcon
  ];
  const install = (app) => {
      components.forEach(component => app.use(component));
  };
  var index = {
      install,
  };

  exports.SIcon = SIcon;
  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
