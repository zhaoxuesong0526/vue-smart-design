import { withInstall } from 'smart-design/es/utils/with-intall';
import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';
import { createNamespace } from 'smart-design/es/utils/create';

const iconProps = {
    size: {
        type: Number
    },
    color: {
        type: String
    }
};

var script = defineComponent(Object.assign({
    name: "SIcon",
    inheritAttrs: false,
}, { __name: 'icon', props: iconProps, setup(__props) {
        const { size, color } = __props;
        const bem = createNamespace('icon');
        const style = computed(() => {
            if (!size && !color)
                return {};
            return Object.assign(Object.assign({}, (size ? { 'font-size': size + 'px' } : {})), (color ? { 'color': color } : {}));
        });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("i", mergeProps({
                class: unref(bem).b(),
                style: style.value
            }, _ctx.$attrs), [
                renderSlot(_ctx.$slots, "default")
            ], 16));
        };
    } }));

script.__file = "packages/components/icon/src/icon.vue";

const SIcon = withInstall(script);

export { SIcon, SIcon as default };
