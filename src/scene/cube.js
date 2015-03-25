web3d.Geometry.cube = function(x, y, z) {
	geo = new web3d.Geometry();
	geo.vertices = [
	    -x, -y, -z,
	     x, -y, -z, 
	     x,  y, -z, 
	     x,  y, -z,
	    -x,  y, -z,
	    -x, -y, -z,

	    -x, -y,  z,
	     x, -y,  z,
	     x,  y,  z,
	     x,  y,  z,
	    -x,  y,  z,
	    -x, -y,  z,

	    -x,  y,  z,
	    -x,  y, -z, 
	    -x, -y, -z,
	    -x, -y, -z,
	    -x, -y,  z,
	    -x,  y,  z,

	     x,  y,  z,
	     x,  y, -z,
	     x, -y, -z,
	     x, -y, -z,
	     x, -y,  z,
	     x,  y,  z,

	    -x, -y, -z,
	     x, -y, -z,
	     x, -y,  z,
	     x, -y,  z, 
	    -x, -y,  z,
	    -x, -y, -z,

	    -x,  y, -z,
	     x,  y, -z, 
	     x,  y,  z,
	     x,  y,  z,
	    -x,  y,  z,
	    -x,  y, -z
    ];

    geo.colors.length = (geo.vertices.length/3)*4
	for (var i = 0; i < geo.colors.length; ++i)
		geo.colors[i] = 1;
	geo.update(web3d.RenderTypes.TRIANGLES);
	return geo;
}