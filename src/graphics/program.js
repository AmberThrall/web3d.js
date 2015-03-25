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
	VIEW_MATRIX: 26,
	MODEL_MATRIX: 37,

	TEXTURE0: 27,
	TEXTURE1: 28,
	TEXTURE2: 29,
	TEXTURE3: 30,
	TEXTURE4: 31,
	TEXTURE5: 32,
	TEXTURE6: 33,
	TEXTURE7: 34,
	TEXTURE8: 35,
	TEXTURE9: 36,

	CUSTOM0: 38,
	CUSTOM1: 39,
	CUSTOM2: 40,
	CUSTOM3: 41,
	CUSTOM4: 42,
	CUSTOM5: 43,
	CUSTOM6: 44,
	CUSTOM7: 45,
	CUSTOM8: 46,
	CUSTOM9: 47
}

web3d.Program = function(vertex, fragment) {
	this.program = web3d.gl.createProgram();
	web3d.glCheck("Failed to create program.");
	this.attach(vertex);
	this.attach(fragment);
	this.link();
	this.validate();

	this.locations = [];
	this.locations.length = 48;
	for (var i = 0; i < this.locations.length; ++i)
		this.locations[i] = null;
};

web3d.Program.prototype = {
	constructor: web3d.Program,

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

	uniformColor: function(location, color) {
		this.uniform4(location, color.r, color.g, color.b, color.a);
	},

	uniformMatrix4: function(location, transpose, matrix) {
		web3d.gl.uniformMatrix4fv(location, false, matrix);
		web3d.glCheck("glUniformMatrix4fv failed.");
	}
}