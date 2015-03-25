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