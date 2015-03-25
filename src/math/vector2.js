web3d.Vector2 = function(x, y) {
	this.set(x, y);
}

web3d.Vector2.prototype = {
	constructor: web3d.Vector2,
	x: 0, y: 0,

	copy: function(b) {
		this.x = b.x;
		this.y = b.y;
		return this;
	},

	set: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	},

	addVector: function(b) {
		this.x += b.x;
		this.y += b.y;
		return this;
	},

	addScalar: function(b) {
		this.x += b;
		this.y += b;
	},

	subVector: function(b) {
		this.x -= b.x;
		this.y -= b.y;
		return this;
	},

	subScalar: function(b) {
		this.x -= b;
		this.y -= b;
		return this;
	},

	mulVector: function(b) {
		this.x *= b.x;
		this.y *= b.y;
		return this;
	},

	mulScalar: function(b) {
		this.x *= b;
		this.y *= b;
		return this;
	},

	divVector: function(b) {
		this.x /= b.x;
		this.y /= b.y;
		return this;
	},

	divScalar: function(b) {
		this.x /= b;
		this.y /= b;
		return this;
	},

	dot: function(b) {
		return this.x * b.x + this.y * b.y;
	},

	length: function() {
		return Math.sqrt(this.lengthSquared());
	},

	lengthSquared: function() {
		return this.x * this.x + this.y * this.y;
	},

	normalize: function() {
		return (this.divScalar(this.length()));
	},

	distance: function(b) {
		return Math.sqrt(this.distanceSquared(b));
	},

	distanceSquared: function(b) {
		var dx = this.x - b.x;
		var dy = this.y - b.y;
		return dx * dx + dy * dy;
	},

	midpoint: function(b) {
		return web3d.Vector2((this.x + b.x) / 2, (this.y + b.y) / 2);
	},

	toString: function() {
		var str = "[";
		str += this.x + "," + this.y;
		str += "]";
		return str;
	}
}