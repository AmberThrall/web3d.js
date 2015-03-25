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
	geo.update(web3d.RenderTypes.TRIANGLES);
	return geo;
}