var ClassCreator = function (implObj) {
	var proto = {},
		  constructor;

	/// simple check
	if (!Array.isArray(implObj.extends)) {
		implObj.extends = implObj.extends ? [implObj.extends] : [];
	}

	function extend(parent, child) {
		var F = function () {};
		F.prototype = parent.prototype;
		child.prototype = new F();
		child.prototype.constructor = child;
	}

	constructor = function () {
		var args = arguments;
	/*
		/// invoke constructor of the parents
		implObj.extends.forEach(function (item) {
			item.apply(this, args);
		}.bind(this));
		*/
		/// invoke current constructor
		implObj.constructor.apply(this, args);
	};

	///inherit from the parents prototypes
	implObj.extends.forEach(function (item) {
		extend(item, constructor);
	});

	/// set methods to the prototype
	for (var k in implObj.methods) {
		constructor.prototype[k] = implObj.methods[k];
	}

	return constructor;
};


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

var Dog = ClassCreator((function (Observer) {
	return {
		extends: [Observer],
		constructor: function (name) {
			/// invoke Observers constructor
			Observer.call(this);
			
			this.name = name;
		},
		methods: {
			bark: function () {
				console.log('bark');
				var self = this;
				setTimeout(function () {
					self.fire("barked", {name: self.name});
				}, 2000);

			}
		}
	};
})(Observer));

var sparky = new Dog("Sparky");
sparky.bark();

sparky.on('barked', function (params) {
	console.log(params.name + ' barked assyncroniously');
});
