web3d.TexturedMaterial = function (texture) {
	web3d.Material.call(this);

	var vertexShader = new web3d.Shader(web3d.ShaderTypes.VERTEX, "	\
			attribute vec3 aVertexPosition;		\
			attribute vec2 aTextureCoord;		\
			uniform mat4 uPMatrix;				\
			uniform mat4 uVMatrix;				\
			uniform mat4 uMMatrix;				\
			uniform vec4 uColor;				\
			varying vec2 vTextureCoord;			\
			void main(void) {					\
				vTextureCoord = aTextureCoord;	\
				gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);	\
			}"
		);
	var fragmentShader = new web3d.Shader(web3d.ShaderTypes.FRAGMENT, "			\
		 	precision mediump float;					\
		 	uniform sampler2D uSampler;					\
		 	varying vec2 vTextureCoord;					\
			void main(void) {							\
				gl_FragColor = texture2D(uSampler, vTextureCoord);		\
			}"
		);

	program = new web3d.Program(vertexShader, fragmentShader);
	program.bind();
	program.mapAttribute(web3d.ProgramLocations.POSITION0, "aVertexPosition");
	program.mapAttribute(web3d.ProgramLocations.TEXCOORD0, "aTextureCoord");
	program.mapUniform(web3d.ProgramLocations.TEXTURE0, "vTextureCoord")
	program.mapUniform(web3d.ProgramLocations.PERSPECTIVE_MATRIX, "uPMatrix");
	program.mapUniform(web3d.ProgramLocations.VIEW_MATRIX, "uVMatrix");
	program.mapUniform(web3d.ProgramLocations.MODEL_MATRIX, "uMMatrix");
	program.unbind();

	this.setProgram(program);
	this.texture = texture;
};

web3d.TexturedMaterial.prototype = Object.create(web3d.Material.prototype);
web3d.TexturedMaterial.prototype.constructor = web3d.TexturedMaterial;
web3d.TexturedMaterial.prototype.bind = function() {
	this.program.bind();
	
	web3d.gl.activeTexture(web3d.gl.TEXTURE0);
	this.texture.bind();
	this.program.uniform1(this.program.locations[web3d.ProgramLocations.TEXTURE0], 0);
}

web3d.TexturedMaterial.prototype.unbind = function() {
	this.texture.unbind();
	this.program.unbind();
}