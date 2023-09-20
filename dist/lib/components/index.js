'use strict';

var icon = require('./icon');



Object.keys(icon).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return icon[k]; }
	});
});
