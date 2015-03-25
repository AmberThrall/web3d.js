web3d.Color = function (color) {
	if (arguments.length == 3)
		this.setRGBA(arguments[0], arguments[1], arguments[2], 1);
	else if (arguments.length == 4)
		this.setRGBA(arguments[0], arguments[1], arguments[2], arguments[3]);
	else
		return this.set(color);
};

web3d.Color.prototype = {
	constructor: web3d.Color,

	r: 1, g: 1, b: 1, a: 1,

	set: function(value) {
		if (value instanceof web3d.Color)
			this.setRGBA(value.r, value.g, value.b, value.a);
		else if (typeof value == 'number')
			this.setHex(value);
		return this;
	},

	setRGBA: function(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
		return this;
	},

	setHex: function(hex) {
		hex = Math.floor(hex);
		this.r = (hex >> 24 & 255) / 255;
		this.g = (hex >> 16 & 255) / 255;
		this.b = (hex >> 8 & 255) / 255;
		this.a = (hex & 255) / 255;
		return this;
	}
};