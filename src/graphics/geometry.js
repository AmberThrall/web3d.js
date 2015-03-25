web3d.RenderTypes = {
	TRIANGLES: 0,
	TRIANGLE_STRIP: 1,
	TRIANGLE_FAN: 2
};

web3d.Geometry = function () {
	this.verticesBuffer = web3d.gl.createBuffer();
	this.colorsBuffer = web3d.gl.createBuffer();
	this.uvBuffer = web3d.gl.createBuffer();

	this.material = new web3d.BasicMaterial(new web3d.Color(1,1,1,1));
	this.position = [0,0,0];
	this.rotation = [0,0,0];
	this.scale = [1,1,1];
};

web3d.Geometry.prototype = {
	constructor: web3d.Geometry,

	material: null,
	vertices: [],
	colors: [],
	uvs: [],
	normals: [],
	indices: [],
	renderType: 0,
	position: null,
	rotation: null,
	scale: null,

	update: function(renderType) {
		if (this.vertices.length > 0) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.verticesBuffer);
			web3d.gl.bufferData(web3d.gl.ARRAY_BUFFER, new Float32Array(this.vertices), web3d.gl.STATIC_DRAW);
		}
		if (this.colors.length > 0) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.colorsBuffer);
			web3d.gl.bufferData(web3d.gl.ARRAY_BUFFER, new Float32Array(this.colors), web3d.gl.STATIC_DRAW);
		}
		if (this.uvs.length > 0) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.uvBuffer);
			web3d.gl.bufferData(web3d.gl.ARRAY_BUFFER, new Float32Array(this.uvs), web3d.gl.STATIC_DRAW);
		}

		this.renderType = renderType;
	},

	render: function(camera) {
		// Bind camera matrices and model matrix to program
		var modelMat = mat4.create();
		mat4.identity(modelMat);
		mat4.translate(modelMat, modelMat, [0,0,0]);
		mat4.rotate(modelMat, modelMat, web3d.Math.degToRad(this.rotation[0]), [1,0,0]);
		mat4.rotate(modelMat, modelMat, web3d.Math.degToRad(this.rotation[1]), [0,1,0]);
		mat4.rotate(modelMat, modelMat, web3d.Math.degToRad(this.rotation[2]), [0,0,1]);
		mat4.scale(modelMat, modelMat, this.scale);

		this.material.bind();
		program.uniformMatrix4(this.material.program.locations[web3d.ProgramLocations.VIEW_MATRIX], false, camera.getViewMatrix());
		program.uniformMatrix4(this.material.program.locations[web3d.ProgramLocations.PERSPECTIVE_MATRIX], false, camera.getPerspectiveMatrix());
		program.uniformMatrix4(this.material.program.locations[web3d.ProgramLocations.MODEL_MATRIX], false, modelMat);

		// Update vertex attributes.
		var pos0 = program.locations[web3d.ProgramLocations.POSITION0];
		if (this.vertices.length > 0 && pos0 != null) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.verticesBuffer);
			web3d.gl.vertexAttribPointer(pos0, 3, web3d.gl.FLOAT, false, 0, 0);
			web3d.gl.enableVertexAttribArray(pos0);
			web3d.glCheck("Failed to set geometry's position attribute.");
		}
		var color0 = program.locations[web3d.ProgramLocations.COLOR0];
		if (this.colors.length > 0 && color0 != null) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.colorsBuffer);
			web3d.gl.vertexAttribPointer(color0, 4, web3d.gl.FLOAT, false, 0, 0);
			web3d.gl.enableVertexAttribArray(color0);
			web3d.glCheck("Failed to set geometry's color attribute.");
		}
		var uv0 = program.locations[web3d.ProgramLocations.TEXCOORD0];
		if (this.uvs.length > 0 && uv0 != null) {
			web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, this.uvBuffer);
			web3d.gl.vertexAttribPointer(uv0, 2, web3d.gl.FLOAT, false, 0, 0);
			web3d.gl.enableVertexAttribArray(uv0);
			web3d.glCheck("Failed to set geometry's texcoord attribute.");
		}

		// Lookup rendertype:
		//TODO: Remaining
		var type = web3d.gl.TRIANGLES;
		switch (this.renderType) {
			case web3d.RenderTypes.TRIANGLES:
				type = web3d.gl.TRIANGLES;
				break;
			case web3d.RenderTypes.TRIANGLE_STRIP:
				type = web3d.gl.TRIANGLE_STRIP;
				break;
			case web3d.RenderTypes.TRIANGLE_FAN:
				type = web3d.gl.TRIANGLE_FAN;
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

		// Unbind the program and buffers, we're done with them.
		web3d.gl.bindBuffer(web3d.gl.ARRAY_BUFFER, null);
		this.material.unbind();
	}
};