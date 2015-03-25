web3d.Matrix3 = function() {
	this.m = new Float32Array([
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	]);
};

web3d.Matrix3.prototype = {
	constructor: web3d.Matrix3,

	copy: function(b) {
		this.set(
			b.m[0],	b.m[3], b.m[6],
			b.m[1],	b.m[4],	b.m[7],
			b.m[2], b.m[5],	b.m[8]
		);
		return this;
	},

	set: function(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
		this.m[0] = n11;	this.m[3] = n12;	this.m[6] = n13;
		this.m[1] = n21;	this.m[4] = n22;	this.m[7] = n23;
		this.m[2] = n31;	this.m[5] = n32;	this.m[8] = n33;
		return this;
	},

	identity: function() {
		this.set(
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		);
		return this;
	},

	mulScalar: function(s) {
		var m = this.m;

		this.set(
			m[0] * s, m[3] * s, m[6] * s,
			m[1] * s, m[4] * s, m[7] * s,
			m[2] * s, m[5] * s, m[8] * s
		);
		return this;
	},

	mulMatrix: function(o) {
		var size = 3;

		for (var r = 0; r < size; ++r)
		{
			for (var c = 0; c < size; ++c)
			{
				var sum = 0;
				for (var k = 0; k < size; ++k)
					sum += this.m[r*size+k] * o.m[k*size+c];
				this.m[r*size+c] = sum;
			}
		}
		return this;
	},

	determinant: function() {
		var m = this.m;

		var a = m[0], b = m[1], c = m[2],
			d = m[3], e = m[4], f = m[5],
			g = m[6], h = m[7], i = m[8];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
	},

	inverse: function() {
		var a00 = a[0], a01 = a[1], a02 = a[2],
			a10 = a[3], a11 = a[4], a12 = a[5],
			a20 = a[6], a21 = a[7], a22 = a[8],

			b01 = a22 * a11 - a12 * a21,
			b11 = -a22 * a10 + a12 * a20,
			b21 = a21 * a10 - a11 * a20,

			det = a00 * b01 + a01 * b11 + a02 * b21;

		if (!det)
			return null; 
		det = 1.0 / det;

		this.m[0] = b01 * det;
		this.m[1] = (-a22 * a01 + a02 * a21) * det;
		this.m[2] = (a12 * a01 - a02 * a11) * det;
		this.m[3] = b11 * det;
		this.m[4] = (a22 * a00 - a02 * a20) * det;
		this.m[5] = (-a12 * a00 + a02 * a10) * det;
		this.m[6] = b21 * det;
		this.m[7] = (-a21 * a00 + a01 * a20) * det;
		this.m[8] = (a11 * a00 - a01 * a10) * det;
		return this;
	},

	transpose: function() {
		var tmp, m = this.m;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return this;
	},

	toString: function() {
		var str = "[[";
		str += this.m[0] + "," + this.m[3] + "," + this.m[6];
		str += "],\n[";
		str += this.m[1] + "," + this.m[4] + "," + this.m[7];
		str += "],\n[";
		str += this.m[2] + "," + this.m[5] + "," + this.m[8];
		str += "]]";
		return str;
	}
};