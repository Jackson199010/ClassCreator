describe('Class creator test', function () {
    var Observer = require('../lib/observer');
    var ClassCreator = require('../lib/class-creator');

    var Dog = ClassCreator.create((function (Observer) {
        return {
            extends: [Observer],
            constructor: function (name) {
                /// invoke Observers constructor
                Observer.call(this);
                
                this.name = name;
            },
            methods: {
                bark: function () {
                	return this.name + ':bark';
                }
            }
        };
    })(Observer));

    var sparky = new Dog('sparky');

    it('should properly create method', function () {
    	var barked = sparky.bark();
    	expect(barked).toBe('sparky:bark');
    });

});