var web3d = {
	VERSION_MAJOR: '0',
	VERSION_MINOR: '1',
	VERSION_PATCH: '0',	
	gl: null,
	canvas: null,
	init: null,
	update: null,

	version: function() {
		return this.VERSION_MAJOR + "." + this.VERSION_MINOR + "." + this.VERSION_PATCH;
	},

	clearColor: function(color) {
		this.gl.clearColor(color.r, color.g, color.b, color.a);
		this.glCheck("Failed to set clear color.");
	},

	initialize: function(canvas, init, update) {
		this.canvas = canvas;
		this.init = init;
		this.update = update;

		this.log("Obtaining WebGL context.");
		try {
			this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
		} catch (e) {}
		if (!this.gl) {
			this.error("Unable to initialize WebGL. Your browser may not support it.");
			this.gl = null;
		}	
		//gl.getParameter
		this.log("OpenGL Renderer: ", this.gl.getParameter(this.gl.RENDERER));
		this.log("OpenGL Version: ", this.gl.getParameter(this.gl.VERSION));

		this.log("Initializing the game.");
		this.clearColor(new web3d.Color(0,0,0,1));
		this.gl.enable(web3d.gl.DEPTH_TEST);
		this.init();

		this.log("Entering main game loop.");
		this.mainLoop();
		return true;
	},

	mainLoop: function() {
		try {
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
			this.update();
		} catch(e) {}

		requestAnimationFrame(web3d.mainLoop);
	},

	log: function() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var seconds = time.getSeconds();

		var timestamp = "";
		if (hours < 10)
			timestamp += "0";
		timestamp += hours + ":";
		if (minutes < 10)
			timestamp += "0";
		timestamp += minutes + ":";
		if (seconds < 10)
			timestamp += "0";
		timestamp += seconds;

		var msg = "";
		for (var i = 0; i < arguments.length; ++i)
			msg += arguments[i];

		console.log("[" + timestamp + "] " + msg);
	},

	error: function() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var seconds = time.getSeconds();

		var timestamp = "";
		if (hours < 10)
			timestamp += "0";
		timestamp += hours + ":";
		if (minutes < 10)
			timestamp += "0";
		timestamp += minutes + ":";
		if (seconds < 10)
			timestamp += "0";
		timestamp += seconds;

		var msg = "";
		for (var i = 0; i < arguments.length; ++i)
			msg += arguments[i];

		console.error("[" + timestamp + "] " + msg);
	},

	glCheck: function(msg) {
		var err = this.gl.getError();
		if (err != this.gl.NO_ERROR) {
			this.error(msg);
		}
	}
};
web3d.Math = {
	clamp: function(x,a,b) {
		return (x < a) ? a : (( x > b) ? b : x);
	},	
	
	degToRad: function(x) {
		return x * (Math.PI / 180);
	},

	radToDeg: function(x) {
		return x * (180 / Math.PI);
	},
};
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
web3d.Shader = function(type, source) {
	if (type == 0)
		this.shader = web3d.gl.createShader(web3d.gl.VERTEX_SHADER);
	else
		this.shader = web3d.gl.createShader(web3d.gl.FRAGMENT_SHADER);
	web3d.glCheck("Failed to create shader.");
	this.set(source);
	this.compile();
};

web3d.Shader.prototype = {
	constructor: web3d.Shader,

	shader: null, 
	set: function(source) {
		web3d.gl.shaderSource(this.shader, source);
		web3d.glCheck("Failed to set shader's source.");
	},

	compile: function() {
		web3d.gl.compileShader(this.shader);
		web3d.glCheck("Failed to compile shader.");

		if (!web3d.gl.getShaderParameter(this.shader, web3d.gl.COMPILE_STATUS)) {
			web3d.error(web3d.gl.getShaderInfoLog(this.shader));
			return null;
		}
	}
}
web3d.ProgramLocations = {
	POSITION0: 0,
	POSITION1: 1,
	POSITION2: 2,
	POSITION3: 3,
	POSITION4: 4,

	NORMAL0: 5,
	NORMAL1: 6,
	NORMAL2: 7,
	NORMAL3: 8,
	NORMAL4: 9,

	TEXCOORD0: 10,
	TEXCOORD1: 11,
	TEXCOORD2: 12,
	TEXCOORD3: 13,
	TEXCOORD4: 14,

	COLOR0: 20,
	COLOR1: 21,
	COLOR2: 22,
	COLOR3: 23,
	COLOR4: 24,

	PROJECTION_MATRIX: 25,
	MODEL_VIEW_MATRIX: 26,

	TEXTURE0: 27,
	TEXTURE1: 28,
	TEXTURE2: 29,
	TEXTURE3: 30,
	TEXTURE4: 31,
	TEXTURE5: 32,
	TEXTURE6: 33,
	TEXTURE7: 34,
	TEXTURE8: 35,
	TEXTURE9: 36
}

web3d.Program = function(vertex, fragment) {
	this.program = web3d.gl.createProgram();
	web3d.glCheck("Failed to create program.");
	this.attach(vertex);
	this.attach(fragment);
	this.link();
	this.validate();

	for (var i = 0; i <= 36; ++i)
		this.locations[i] = null;
};

web3d.Program.prototype = {
	constructor: web3d.Program,

	program: null, 
	locations: [],
	bind: function() {
		web3d.gl.useProgram(this.program);
		web3d.glCheck("Failed to bind program.");
	},

	unbind: function() {
		web3d.gl.useProgram(null);
		web3d.glCheck("Failed to unbind program.");
	},

	attach: function(shader) {
		web3d.gl.attachShader(this.program, shader.shader);
		web3d.glCheck("Failed to attach shader.");
	},

	detach: function(shader) {
		web3d.gl.detachShader(this.program, shader.shader);
		web3d.glCheck("Failed to detach shader.");
	},

	link: function() {
		web3d.gl.linkProgram(this.program);
		web3d.glCheck("Failed to link program.");
	},
	
	validate: function() {
		web3d.gl.validateProgram(this.program);
		web3d.glCheck("Failed to validate program.");
	},

	mapAttribute: function(id, name) {
		this.locations[id] = web3d.gl.getAttribLocation(this.program, name);
		web3d.glCheck("Failed to get attribute location.");
	},

	mapUniform: function(id, name) {
		this.locations[id] = this.getUniformLocation(name);
		web3d.glCheck("Failed to get uniform location.");
	},

	getUniformLocation: function(name) {
		var loc = web3d.gl.getUniformLocation(this.program, name);
		web3d.glCheck("Failed to get uniform location.");
		return loc;
	},

	uniform1: function(location, value0) {
		web3d.gl.uniform1f(location, value0);
		web3d.glCheck("glUniform1f failed.");
	},

	uniform2: function(location, value0, value1) {
		web3d.gl.uniform2f(location, value0, value1);
		web3d.glCheck("glUniform2f failed.");
	},

	uniform3: function(location, value0, value1, value2) {
		web3d.gl.uniform3f(location, value0, value1, value2);
		web3d.glCheck("glUniform3f failed.");
	},

	uniform4: function(location, value0, value1, value2, value3) {
		web3d.gl.uniform4f(location, value0, value1, value2, value3);
		web3d.glCheck("glUniform4f failed.");
	},

	uniformMatrix4: function(location, transpose, matrix) {
		web3d.gl.uniformMatrix4fv(location, transpose, matrix.m);
		web3d.glCheck("glUniformMatrix4fv failed.");
	}
}
web3d.RenderTypes = {
	TRIANGLES: 0,
	TRIANGLE_STRIP: 1
};

web3d.Geometry = function () {
	this.verticesBuffer = web3d.gl.createBuffer();
};

web3d.Geometry.prototype = {
	constructor: web3d.Geometry,

	vertices: [],
	colors: [],
	uvs: [],
	normals: [],
	indices: [],
	renderType: 0,

	update: function(renderType) {
		if (this.vertices.length > 0) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.verticesBuffer);
			web3d.gl.bufferData(web3d.gl.ARRAY_BUFFER, new Float32Array(this.vertices), web3d.gl.STATIC_DRAW);
		}

		this.renderType = renderType;
	},

	render: function(program) {
		// Update vertex attributes.
		var pos0 = program.locations[web3d.ProgramLocations.POSITION0];
		if (this.vertices.length > 0 && pos0 != null) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.verticesBuffer);
			web3d.gl.vertexAttribPointer(pos0, 3, web3d.gl.FLOAT, false, 0, 0);
			web3d.gl.enableVertexAttribArray(pos0);
			web3d.glCheck("Failed to set geometry's position attribute.");
		}

		//TODO: Remaining

		// Lookup rendertype:
		var type = web3d.gl.TRIANGLES;
		switch (this.renderType) {
			case web3d.RenderTypes.TRIANGLES:
				type = web3d.gl.TRIANGLES;
				break;
			case web3d.RenderTypes.TRIANGLE_STRIP:
				type = web3d.gl.TRIANGLE_STRIP;
				break;
			default:
				web3d.log("Unknown render type: '" + this.renderType + "'.");
				break;
		}

		// Render
		if (this.indices.length > 0) {

		}
		else {
			web3d.gl.drawArrays(type, 0, this.vertices.length / 3);
			web3d.glCheck("Failed to draw geometry's arrays.");
		}
	}
};
