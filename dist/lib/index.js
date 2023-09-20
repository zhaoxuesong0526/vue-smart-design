'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('smart-design/lib/components/index');
var components$1 = require('smart-design/lib/components');

const components = [
    index$1.SIcon
];
const install = (app) => {
    components.forEach(component => app.use(component));
};
var index = {
    install,
};

exports.default = index;
Object.keys(components$1).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return components$1[k]; }
  });
});
