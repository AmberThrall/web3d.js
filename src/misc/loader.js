web3d.Loader = function () {
	
};

web3d.Loader.prototype = {
	constructor: web3d.Loader,

	load: function(url, complete, progress, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = "arraybuffer";
		xhr.ontimeout = function() {
			error(xhr.loaded,xhr.total);
		};
		xhr.onprogress = function() {
			progress(xhr.loaded, xhr.total);
		};
		xhr.onload = function() {
			if (this.status == 200)
				complete(this.response);
			else
				error(xhr.loaded, xhr.total);
		};
		xhr.send(null);
	}
};

web3d.TextureLoader = function() {
	this.loader = new web3d.Loader();
};

web3d.TextureLoader.prototype = {
	constructor: web3d.TextureLoader,
	loader: null,

	load: function(url, complete, progress, error) {
		this.loader.load(url, function(data) { 
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