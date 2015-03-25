web3d.Vector4 = function(x, y, z, w) {
	this.set(x, y, z, w);
}

web3d.Vector4.prototype = {
	constructor: web3d.Vector4,
	x: 0, y: 0, z: 0, w: 0,

	copy: function(b) {
		this.x = b.x;
		this.y = b.y;
		this.z = b.z;
		this.w = b.w;
		return this;
	},

	set: function(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	},

	addVector: function(b) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		this.w += b.w;
		return this;
	},

	addScalar: function(b) {
		this.x += b;
		this.y += b;
		this.z += b;
		this.w += b;
		return this;
	},

	subVector: function(b) {
		this.x -= b.x;
		this.y -= b.y;
		this.z -= b.z;
		this.w -= b.w;
		return this;
	},

	subScalar: function(b) {
		this.x -= b;
		this.y -= b;
		this.z -= b;
		this.w -= b;
		return this;
	},

	mulVector: function(b) {
		this.x *= b.x;
		this.y *= b.y;
		this.z *= b.z;
		this.w *= b.w;
		return this;
	},

	mulScalar: function(b) {
		this.x *= b;
		this.y *= b;
		this.z *= b;
		this.w *= b;
		return this;
	},

	divVector: function(b) {
		this.x /= b.x;
		this.y /= b.y;
		this.z /= b.z;
		this.w /= b.w;
		return this;
	},

	divScalar: function(b) {
		this.x /= b;
		this.y /= b;
		this.z /= b;
		this.w /= b;
		return this;
	},

	dot: function(b) {
		return this.x * b.x + this.y * b.y + this.z * b.z + this.w * b.w;
	},

	length: function() {
		return Math.sqrt(this.lengthSquared());
	},

	lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
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
		var dz = this.z - b.z;
		var dw = this.w - b.w;
		return dx * dx + dy * dy + dz * dz + dw * dw;
	},

	midpoint: function(b) {
		return web3d.Vector4((this.x + b.x) / 2, (this.y + b.y) / 2, (this.z + b.z) / 2, (this.w + b.w) / 2);
	},

	toString: function() {
		var str = "[";
		str += this.x + "," + this.y + "," + this.z + "," + this.w;
		str += "]";
		return str;
	},

	applyMatrix4: function(m) {
		var x = this.x;
		var y = this.y;
		var z = this.z;
		var w = this.w;

		var e = m.m;
		this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
		this.z = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
		return this;
	}
}