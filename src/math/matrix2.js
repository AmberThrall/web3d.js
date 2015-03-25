web3d.Matrix2 = function() {
	this.m = new Float32Array([
		1, 0,
		0, 1
	]);
};

web3d.Matrix2.prototype = {
	constructor: web3d.Matrix2,

	copy: function(b) {
		this.set(
			b.m[0],	b.m[2],
			b.m[1],	b.m[3]
		);
		return this;
	},

	set: function(n11, n12, n21, n22) {
		this.m[0] = n11;	this.m[2] = n12;
		this.m[1] = n21;	this.m[3] = n22;
		return this;
	},

	identity: function() {
		this.set(
			1, 0, 
			0, 1
		);
		return this;
	},

	mulScalar: function(s) {
		var m = this.m;

		this.set(
			m[0] * s, m[2] * s,
			m[1] * s, m[3] * s
		);
		return this;
	},

	mulMatrix: function(o) {
		var a = this.m[0],	b = this.m[2];
		var c = this.m[1],	d = this.m[3];

		var e = o.m[0],	f = o.m[2];
		var g = o.m[1],	h = o.m[3];

		this.set(
			a*e + c*f, b*e + d*f,
			a*g + c*h, b*g + d*h 
		);
		return this;
	},

	determinant: function() {
		var m = this.m;

		var a = m[0],	b = m[2];
		var c = m[1],	d = m[3];
		return a*d - b*c;
	},

	inverse: function() {
		var m = this.m;
		var a = m[0],	b = m[2];
		var c = m[1],	d = m[3];
		var det = a*d - b*c;

		if (!det) {
			return null;
		}

		det = 1.0 / det;
		this.m[0] = d * det;
		this.m[1] = -c * det;
		this.m[2] = -b * det;
		this.m[3] = a * det;
		return this;
	},

	transpose: function() {
		var m = this.m;

		this.set(
			this.m[0], this.m[1],
			this.m[2], this.m[3]
		);
		return this;
	},

	toString: function() {
		var str = "[[";
		str += this.m[0] + "," + this.m[2];
		str += "],\n[";
		str += this.m[1] + "," + this.m[3];
		str += "]]";
		return str;
	}
};