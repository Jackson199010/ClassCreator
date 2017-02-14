var ClassCreator = require('./class-creator');

var Observer = ClassCreator((function () {
    return {
        extends: [],
        constructor: function () {
            Object.defineProperty(this, '_list', {value: {}})
        },
        methods: {
            on: function (type, callback) {
                if (!this._list[type]) {
                    this._list[type] = [];
                }

                this._list[type].push(callback);
            },
            fire: function (type, params) {
                if (this._list[type] && this._list[type].length) {
                    this._list[type].forEach(function (item) {
                        item(params);
                    });
                }
            }
        }
    };
})());

module.exports = Observer;