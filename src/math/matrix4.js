web3d.Matrix4 = function() {
	this.m = new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	]);
};

web3d.Matrix4.prototype = {
	constructor: web3d.Matrix4,

	copy: function(b) {
		this.set(
			b.m[0],	b.m[4], b.m[8], b.m[12],
			b.m[1],	b.m[5],	b.m[9], b.m[13],
			b.m[2], b.m[6],	b.m[10], b.m[14],
			b.m[3], b.m[7],	b.m[11], b.m[15]
		);
		return this;
	},

	set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
		this.m[0] = n11;	this.m[4] = n12;	this.m[8] = n13;	this.m[12] = n14;
		this.m[1] = n21;	this.m[5] = n22;	this.m[9] = n23;	this.m[13] = n24;
		this.m[2] = n31;	this.m[6] = n32;	this.m[10] = n33;	this.m[14] = n34;
		this.m[3] = n41;	this.m[7] = n42;	this.m[11] = n43;	this.m[15] = n44;
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
			m[0] * s, m[4] * s, m[8] * s, m[12] * s,
			m[1] * s, m[5] * s, m[9] * s, m[13] * s,
			m[2] * s, m[6] * s, m[10] * s, m[14] * s,
			m[3] * s, m[7] * s, m[11] * s, m[15] * s
		);
		return this;
	},

	mulMatrix: function(o) {
		var size = 4;

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
		/// Edited from three.js
		var m = this.m;

		var n11 = m[ 0 ], n12 = m[ 4 ], n13 = m[ 8 ], n14 = m[ 12 ];
		var n21 = m[ 1 ], n22 = m[ 5 ], n23 = m[ 9 ], n24 = m[ 13 ];
		var n31 = m[ 2 ], n32 = m[ 6 ], n33 = m[ 10 ], n34 = m[ 14 ];
		var n41 = m[ 3 ], n42 = m[ 7 ], n43 = m[ 11 ], n44 = m[ 15 ];

		return (
			n41 * (
				+ n14 * n23 * n32
				 - n13 * n24 * n32
				 - n14 * n22 * n33
				 + n12 * n24 * n33
				 + n13 * n22 * n34
				 - n12 * n23 * n34
			) +
			n42 * (
				+ n11 * n23 * n34
				 - n11 * n24 * n33
				 + n14 * n21 * n33
				 - n13 * n21 * n34
				 + n13 * n24 * n31
				 - n14 * n23 * n31
			) +
			n43 * (
				+ n11 * n24 * n32
				 - n11 * n22 * n34
				 - n14 * n21 * n32
				 + n12 * n21 * n34
				 + n14 * n22 * n31
				 - n12 * n24 * n31
			) +
			n44 * (
				- n13 * n22 * n31
				 - n11 * n23 * n32
				 + n11 * n22 * n33
				 + n13 * n21 * n32
				 - n12 * n21 * n33
				 + n12 * n23 * n31
			)
		);
	},

	inverse: function() {
		var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
	        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
	        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
	        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

	        b00 = a00 * a11 - a01 * a10,
	        b01 = a00 * a12 - a02 * a10,
	        b02 = a00 * a13 - a03 * a10,
	        b03 = a01 * a12 - a02 * a11,
	        b04 = a01 * a13 - a03 * a11,
	        b05 = a02 * a13 - a03 * a12,
	        b06 = a20 * a31 - a21 * a30,
	        b07 = a20 * a32 - a22 * a30,
	        b08 = a20 * a33 - a23 * a30,
	        b09 = a21 * a32 - a22 * a31,
	        b10 = a21 * a33 - a23 * a31,
	        b11 = a22 * a33 - a23 * a32,

	        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	    if (!det)
	        return null; 
	    det = 1.0 / det;

	    this.m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	    this.m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	    this.m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	    this.m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	    this.m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	    this.m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	    this.m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	    this.m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	    this.m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	    this.m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	    this.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	    this.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	    this.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	    this.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	    this.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	    this.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

		return this;
	},

	transpose: function() {
		var tmp, m = this.m;

		tmp = m[ 1 ]; m[ 1 ] = m[ 4 ]; m[ 4 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 8 ]; m[ 8 ] = tmp;
		tmp = m[ 6 ]; m[ 6 ] = m[ 9 ]; m[ 9 ] = tmp;

		tmp = m[ 3 ]; m[ 3 ] = m[ 12 ]; m[ 12 ] = tmp;
		tmp = m[ 7 ]; m[ 7 ] = m[ 13 ]; m[ 13 ] = tmp;
		tmp = m[ 11 ]; m[ 11 ] = m[ 14 ]; m[ 14 ] = tmp;

		return this;
	},

	toString: function() {
		var str = "[[";
		str += this.m[0] + "," + this.m[4] + "," + this.m[8] + "," + this.m[12];
		str += "],\n[";
		str += this.m[1] + "," + this.m[5] + "," + this.m[9] + "," + this.m[13];
		str += "],\n[";
		str += this.m[2] + "," + this.m[6] + "," + this.m[10] + "," + this.m[14];
		str += "],\n[";
		str += this.m[3] + "," + this.m[7] + "," + this.m[11] + "," + this.m[15];
		str += "]]";
		return str;
	},

	makeTranslation: function(vec3) {
		this.set(
			1,			0,			0,			vec3.x,
			0,			1,			0,			vec3.y,
			0,			0,			1,			vec3.z,
			0,			0,			0,			1
		);
		return this;
	},

	makeScale: function(vec3) {
		var theta = web3d.Math.deg2Rad(angle);

		this.set(
			vec3.x,		0,			0,			0,
			0,			vec3.y,		0,			0,
			0,			0,			vec3.z,		0,
			0, 			0, 			0,			1
		);
		return this;
	},

	makeRotationX: function(angle) {
		var theta = web3d.Math.deg2Rad(angle);

		this.set(
			1,			0,			0,			0,
			0,Math.cos(theta),-Math.sin(theta),	0,
			0,Math.sin(theta), Math.cos(theta),	0,
			0, 			0,			0, 			1
		);
		return this;
	},

	makeRotationY: function(angle) {
		var theta = web3d.Math.deg2Rad(angle);

		this.set(
			Math.cos(theta),	0, Math.sin(theta),			0,
			0,			1,			0,			0,
			-Math.sin(theta),	0, Math.cos(theta),			0,
			0, 			0, 			0,			1
		);
		return this;
	},

	makeRotationZ: function(angle) {
		var theta = web3d.Math.deg2Rad(angle);

		this.set(
			Math.cos(theta),-Math.sin(theta),	0,			0,
			Math.sin(theta),Math.cos(theta),	0,			0,
			0,			0,			1,			0,
			0, 			0, 			0,			1
		);
		return this;
	},

	makeRotation: function(axis, angle) {
		var th = web3d.Math.deg2Rad(angle);
		var c = Math.cos( th );
		var s = Math.sin( th );
		var t = 1 - c;
		var x = axis.x, y = axis.y, z = axis.z;
		var tx = t * x, ty = t * y;

		this.set(
			tx * x + c, tx * y - s * z, tx * z + s * y, 0,
			tx * y + s * z, ty * y + c, ty * z - s * x, 0,
			tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
			0, 0, 0, 1
		);
		return this;
	},

	makeFrustum: function(left, right, bottom, top, near, far) {
		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		this.m[ 0 ] = x;	this.m[ 4 ] = 0;	this.m[ 8 ] = a;	this.m[ 12 ] = 0;
		this.m[ 1 ] = 0;	this.m[ 5 ] = y;	this.m[ 9 ] = b;	this.m[ 13 ] = 0;
		this.m[ 2 ] = 0;	this.m[ 6 ] = 0;	this.m[ 10 ] = c;	this.m[ 14 ] = d;
		this.m[ 3 ] = 0;	this.m[ 7 ] = 0;	this.m[ 11 ] = -1;	this.m[ 15 ] = 0;
		return this;
	},

	makePerspective: function(fov, aspect, near, far) {
		var ymax = near * Math.tan(web3d.Math.deg2Rad(fov * 0.5));
		var ymin = -ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		return this.makeFrustum(xmin, xmax, ymin, ymax, near, far);
	},

	makeLookAt: function() {
		var x = new web3d.Vector3();
		var y = new web3d.Vector3();
		var z = new web3d.Vector3();

		return function(eye, target, up) {
			var m = this.m;
			z.subVector(eye, target).normalize();

			if (z.length() == 0)
				z.z = 1;

			x.cross(up, z).normalize();
			if (x.length == 0) {
				z.x += 0.0001;
				x.cross(up,z).normalize();
			}

			y.cross(z,x);
			this.m[0] = x.x; this.m[4] = y.x; this.m[8] = z.x;
			this.m[1] = x.y; this.m[5] = y.y; this.m[9] = z.y;
			this.m[2] = x.z; this.m[6] = y.z; this.m[10] = z.z;
			return this;
		};
	}()
};