web3d.Texture = function (image) {
	this.texture = web3d.gl.createTexture();
	this.set(image);
};

web3d.Texture.prototype = {
	constructor: web3d.Texture,
	
	set: function(image) {
		this.bind();
		web3d.gl.texImage2D(web3d.gl.TEXTURE_2D, 0, web3d.gl.RGBA, web3d.gl.RGBA, web3d.gl.UNSIGNED_BYTE, image);
		web3d.gl.texParameteri(web3d.gl.TEXTURE_2D, web3d.gl.TEXTURE_MAG_FILTER, web3d.gl.LINEAR);
		web3d.gl.texParameteri(web3d.gl.TEXTURE_2D, web3d.gl.TEXTURE_MIN_FILTER, web3d.gl.LINEAR_MIPMAP_NEAREST);
		web3d.gl.generateMipmap(web3d.gl.TEXTURE_2D);
		this.unbind();
		return this;
	},

	bind: function() {
		web3d.gl.bindTexture(web3d.gl.TEXTURE_2D, this.texture);
		web3d.glCheck("Failed to bind texture.");
	},

	unbind: function() {
		web3d.gl.bindTexture(web3d.gl.TEXTURE_2D, null);
		web3d.glCheck("Failed to unbind texture.");
	}
};