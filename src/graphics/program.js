web3d.Program = function(vertex, fragment) {
	this.program = web3d.gl.createProgram();
	web3d.glCheck("Failed to create program.");
	this.attach(vertex);
	this.attach(fragment);
	this.link();
	this.validate();
};

web3d.Program.prototype = {
	constructor: web3d.Program,

	program: null, 
	bind: function() {
		web3d.gl.useProgram(this.program);
		web3d.glCheck("Failed to bind program.");
	},

	unbind: function() {
		web3d.gl.useProgram(0);
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
	}
}