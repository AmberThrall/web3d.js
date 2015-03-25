web3d.Loader = function () {
	
};

web3d.Loader.prototype = {
	constructor: web3d.Loader,

	load: function(url, complete, progress, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = "text";
		xhr.ontimeout = function(e) {
			error(e.loaded,e.total);
		};
		xhr.onprogress = function(e) {
			progress(e.loaded, e.total);
		};
		xhr.onload = function(e) {
			if (this.status == 200)
				complete(xhr);
			else
				error(e.loaded, e.total);
		};
		xhr.send(null);
	}
};

web3d.TextureLoader = function() {
	this.loader = new web3d.Loader();
};

web3d.TextureLoader.prototype = {
	constructor: web3d.TextureLoader,

	load: function(url, complete, progress, error) {
		this.loader.load(url, function(xhr) { 
			var image = new Image();
			image.onload = function() {
				var texture = new web3d.Texture(image);
				complete(texture);
			};
			image.onprogress = function() {
				progress(image.loaded, image.total);
			};
			image.src = url;
		},
		function(recv,total) {
			progress(recv,total);
		},
		function(xhr){
			error(recv,total);
		})
	}
}

web3d.ModelLoader = function() {
	this.loader = new web3d.Loader();
};

web3d.ModelLoader.prototype = {
	constructor: web3d.ModelLoader,

	load: function(url, complete, progress, error) {
		this.loader.load(url, function(xhr) { 
			var json = JSON.parse(xhr.responseText);
			var geo = new web3d.Geometry();
			geo.vertices = json.vertices;
			geo.colors = json.colors;
			geo.uvs = json.uvs;
			geo.normals = json.normals;
			geo.indices = json.indices;
			geo.update(web3d.RenderTypes.TRIANGLES);
			complete(geo);
		},
		function(recv,total) {
			progress(recv,total);
		},
		function(xhr){
			error(recv,total);
		})
	}
}
