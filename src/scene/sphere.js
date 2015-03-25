web3d.Geometry.sphere = function(radius, rings, sectors) {
	geo = new web3d.Geometry();
	
	var R = 1.0 / (rings-1);
	var S = 1.0 / (sectors-1);
	var uvI = 0, vI = 0, nI = 0;

	// Generate the vertices, normals, and uvs
	geo.vertices.length = rings * sectors * 3;
	geo.normals.length = rings * sectors * 3;
	geo.uvs.length = rings * sectors * 2;
	for (var r = 0; r < rings; ++r) {
		for (var s = 0; s < sectors; ++s) {
			var x = Math.cos(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);
			var y = Math.sin(-(Math.PI/2) + Math.PI * r * R);
			var z = Math.sin(2*Math.PI * s * S) * Math.sin(Math.PI * r * R);

			geo.vertices[vI++] = x * radius;
			geo.vertices[vI++] = y * radius;
			geo.vertices[vI++] = z * radius;

			geo.normals[nI++] = x;
			geo.normals[nI++] = y;
			geo.normals[nI++] = z;

			geo.uvs[uvI++] = s*S;
			geo.uvs[uvI++] = r*R;
		}
	}

	// Generate the indices
	geo.indices.length = rings * sectors * 6;
	var iI = 0;
	for (var r = 0; r < rings-1; ++r) {
		for (var s = 0; s < sectors-1; ++s) {
			geo.indices[iI++] = r * sectors + s;
			geo.indices[iI++] = r * sectors + (s+1);
			geo.indices[iI++] = (r+1) * sectors + s;

			geo.indices[iI++] = r * sectors + (s+1);
			geo.indices[iI++] = (r+1) * sectors + s;
			geo.indices[iI++] = (r+1) * sectors + (s+1);
		}
	}

    geo.colors.length = rings * sectors * 4
	for (var i = 0; i < geo.colors.length; ++i)
		geo.colors[i] = 1;

	geo.update(web3d.RenderTypes.TRIANGLES);
	return geo;
}