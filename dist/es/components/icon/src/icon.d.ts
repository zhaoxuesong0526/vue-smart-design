import type { ExtractPropTypes } from "vue";
export declare const iconProps: {
    readonly size: {
        readonly type: NumberConstructor;
    };
    readonly color: {
        readonly type: StringConstructor;
    };
};
export type IconProps = ExtractPropTypes<typeof iconProps>;
