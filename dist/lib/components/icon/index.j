'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var withIntall = require('smart-design/lib/utils/with-intall');
var vue = require('vue');
var create = require('smart-design/lib/utils/create');

const iconProps = {
    size: {
        type: Number
    },
    color: {
        type: String
    }
};

var script = vue.defineComponent(Object.assign({
    name: "SIcon",
    inheritAttrs: false,
}, { __name: 'icon', props: iconProps, setup(__props) {
        const { size, color } = __props;
        const bem = create.createNamespace('icon');
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

const SIcon = withIntall.withInstall(script);

exports.SIcon = SIcon;
exports.default = SIcon;
