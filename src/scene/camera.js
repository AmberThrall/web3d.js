web3d.Camera = function () {
	this.lookAt([0,0,0], [0,0,0], [0,1,0]);
	this.perspective(45, 1, 0.1, 1000);
};

web3d.Camera.prototype = {
	constructor: web3d.Camera,

	copy: function(b) {
		this.eye = b.eye;
		this.at = b.at;
		this.up = b.up;
		this.fov = b.fov;
		this.aspect = b.aspect;
		this.near = b.near;
		this.far = b.far;
	},

	lookAt: function(eye, at, up) {
		this.eye = eye;
		this.at = at;
		this.up = up;
	},

	perspective: function(fov, aspect, near, far) {
		this.fov = fov;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
	},

	getPerspectiveMatrix: function() {
		var persp = mat4.create();
		mat4.perspective(persp, this.fov, this.aspect, this.near, this.far);
		return persp;
	},

	getViewMatrix: function() {
		var look = mat4.create();
		mat4.lookAt(look, this.eye, this.at, this.up);
		return look;
	}
};