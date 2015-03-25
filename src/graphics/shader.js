web3d.ShaderTypes = {
	VERTEX: 0,
	FRAGMENT: 1
}

web3d.Shader = function(type, source) {
	if (type == web3d.ShaderTypes.VERTEX)
		this.shader = web3d.gl.createShader(web3d.gl.VERTEX_SHADER);
	else if (type == web3d.ShaderTypes.FRAGMENT)
		this.shader = web3d.gl.createShader(web3d.gl.FRAGMENT_SHADER);
	else
		web3d.error("Unknown shader type.");
	web3d.glCheck("Failed to create shader.");
	this.set(source);
	this.compile();
};

web3d.Shader.prototype = {
	constructor: web3d.Shader,

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