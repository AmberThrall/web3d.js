web3d.BasicMaterial = function (color) {
	web3d.Material.call(this);

	var vertexShader = new web3d.Shader(0, "	\
			attribute vec3 aVertexPosition;		\
			attribute vec4 aVertexColor;		\
			uniform mat4 uPMatrix;				\
			uniform mat4 uVMatrix;				\
			uniform mat4 uMMatrix;				\
			uniform vec4 uColor;				\
			varying vec4 vColor;				\
			void main(void) {					\
				vColor = mix(aVertexColor,uColor,0.5);			\
				gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);	\
			}"
		);
	var fragmentShader = new web3d.Shader(1, "			\
		 	precision mediump float;					\
		 	varying vec4 vColor;						\
			void main(void) {							\
				gl_FragColor = vColor;					\
			}"
		);

	program = new web3d.Program(vertexShader, fragmentShader);
	program.mapAttribute(web3d.ProgramLocations.POSITION0, "aVertexPosition");
	program.mapAttribute(web3d.ProgramLocations.COLOR0, "aVertexColor");
	program.mapUniform(web3d.ProgramLocations.CUSTOM0, "uColor")
	program.mapUniform(web3d.ProgramLocations.PERSPECTIVE_MATRIX, "uPMatrix");
	program.mapUniform(web3d.ProgramLocations.VIEW_MATRIX, "uVMatrix");
	program.mapUniform(web3d.ProgramLocations.MODEL_MATRIX, "uMMatrix");

	this.setProgram(program);
	this.color = color;
};

web3d.BasicMaterial.prototype = Object.create(web3d.Material.prototype);
web3d.BasicMaterial.prototype.constructor = web3d.BasicMaterial;
web3d.BasicMaterial.prototype.bind = function() {
	this.program.bind();
	
	this.program.uniformColor(this.program.locations[web3d.ProgramLocations.CUSTOM0], this.color);
}