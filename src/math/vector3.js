web3d.Vector3 = function(x, y, z) {
	this.set(x, y, z);
}

web3d.Vector3.prototype = {
	constructor: web3d.Vector3,
	x: 0, y: 0, z: 0,

	copy: function(b) {
		this.x = b.x;
		this.y = b.y;
		this.z = b.z;
		return this;
	},

	set: function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	},

	addVector: function(b) {
		this.x += b.x;
		this.y += b.y;
		this.z += b.z;
		return this;
	},

	addScalar: function(b) {
		this.x += b;
		this.y += b;
		this.z += b;
		return this;
	},

	subVector: function(b) {
		this.x -= b.x;
		this.y -= b.y;
		this.z -= b.z;
		return this;
	},

	subScalar: function(b) {
		this.x -= b;
		this.y -= b;
		this.z -= b;
		return this;
	},

	mulVector: function(b) {
		this.x *= b.x;
		this.y *= b.y;
		this.z *= b.z;
		return this;
	},

	mulScalar: function(b) {
		this.x *= b;
		this.y *= b;
		this.z *= b;
		return this;
	},

	divVector: function(b) {
		this.x /= b.x;
		this.y /= b.y;
		this.z /= b.z;
		return this;
	},

	divScalar: function(b) {
		this.x /= b;
		this.y /= b;
		this.z /= b;
		return this;
	},

	dot: function(b) {
		return this.x * b.x + this.y * b.y + this.z * b.z;
	},

	cross: function(a, b) {
		this.x = a.y * b.z - a.z * b.y;
		this.y = a.z * b.x - a.x * b.z;
		this.z = a.x * b.y - a.y * b.x;
		return this;
	},

	length: function() {
		return Math.sqrt(this.lengthSquared());
	},

	lengthSquared: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
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
		return dx * dx + dy * dy + dz * dz;
	},

	midpoint: function(b) {
		return web3d.Vector3((this.x + b.x) / 2, (this.y + b.y) / 2, (this.z + b.z) / 2);
	},

	toString: function() {
		var str = "[";
		str += this.x + "," + this.y + "," + this.z;
		str += "]";
		return str;
	},

	applyMatrix3: function(m) {
		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.m;
		this.x = e[0] * x + e[3] * y + e[6] * z;
		this.y = e[1] * x + e[4] * y + e[7] * z;
		this.z = e[2] * x + e[5] * y + e[8] * z;
		return this;
	},

	applyMatrix4: function(m) {
		var x = this.x;
		var y = this.y;
		var z = this.z;

		var e = m.m;
		this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
		this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
		this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
		return this;
	}
}