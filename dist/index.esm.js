import { defineComponent, computed, openBlock, createElementBlock, mergeProps, unref, renderSlot } from 'vue';

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

const components = [
    SIcon
];
const install = (app) => {
    components.forEach(component => app.use(component));
};
var index = {
    install,
};

export { SIcon, index as default };
