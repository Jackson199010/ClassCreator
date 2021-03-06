var ClassCreator = {};

ClassCreator.extend = function extend(parent, child) {
    var F = function () {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
};

ClassCreator.create = function (implObj) {
    var proto = {},
        constructor;

    /// simple check
    if (!Array.isArray(implObj.extends)) {
        implObj.extends = implObj.extends ? [implObj.extends] : [];
    }

    constructor = function () {
        var args = arguments;
        /// invoke current constructor
        implObj.constructor.apply(this, args);
    };

    ///inherit from the parents prototypes
    implObj.extends.forEach(function (item) {
        ClassCreator.extend(item, constructor);
    });

    /// set methods to the prototype
    for (var k in implObj.methods) {
        constructor.prototype[k] = implObj.methods[k];
    }

    return constructor;
};

module.exports = ClassCreator;


/*

var sparky = new Dog("Sparky");
sparky.bark();
sparky.on('barked', function (params) {
    console.log(params.name + ' barked assyncroniously');
});
*/