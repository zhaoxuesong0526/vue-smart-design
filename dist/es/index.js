import { SIcon } from 'smart-design/es/components/index';
export * from 'smart-design/es/components';

const components = [
    SIcon
];
const install = (app) => {
    components.forEach(component => app.use(component));
};
var index = {
    install,
};

export { index as default };
