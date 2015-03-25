var web3d = {
	VERSION_MAJOR: '0',
	VERSION_MINOR: '1',
	VERSION_PATCH: '0',	
	gl: null,
	canvas: null,
	init: null,
	render: null,

	version: function() {
		return this.VERSION_MAJOR + "." + this.VERSION_MINOR + "." + this.VERSION_PATCH;
	},

	clearColor: function(color) {
		this.gl.clearColor(color.r, color.g, color.b, color.a);
		this.glCheck("Failed to set clear color.");
	},

	initialize: function(canvas, init, render) {
		this.canvas = canvas;
		this.init = init;
		this.render = render;

		this.log("Obtaining WebGL context.");
		try {
			this.gl = this.canvas.getContext("webgl") || this.canvas.getContext("experimental-webgl");
		} catch (e) {}
		if (!this.gl) {
			this.error("Unable to initialize WebGL. Your browser may not support it.");
			this.gl = null;
		}	
		
		this.log("OpenGL Renderer: ", this.gl.getParameter(this.gl.RENDERER));
		this.log("OpenGL Version: ", this.gl.getParameter(this.gl.VERSION));

		this.log("Initializing the game.");
		this.clearColor(new web3d.Color(0,0,0,1));
		this.gl.enable(web3d.gl.DEPTH_TEST);
		this.init();

		this.log("Entering main game loop.");
		this.mainLoop();
		return true;
	},

	mainLoop: function() {
		web3d.gl.viewport(0, 0, web3d.canvas.width, web3d.gl.canvas.height);
		web3d.gl.clear(web3d.gl.COLOR_BUFFER_BIT | web3d.gl.DEPTH_BUFFER_BIT);
		web3d.render();

		requestAnimationFrame(web3d.mainLoop);
	},

	log: function() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var seconds = time.getSeconds();

		var timestamp = "";
		if (hours < 10)
			timestamp += "0";
		timestamp += hours + ":";
		if (minutes < 10)
			timestamp += "0";
		timestamp += minutes + ":";
		if (seconds < 10)
			timestamp += "0";
		timestamp += seconds;

		var msg = "";
		for (var i = 0; i < arguments.length; ++i)
			msg += arguments[i];

		console.log("[" + timestamp + "] " + msg);
	},

	error: function() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var seconds = time.getSeconds();

		var timestamp = "";
		if (hours < 10)
			timestamp += "0";
		timestamp += hours + ":";
		if (minutes < 10)
			timestamp += "0";
		timestamp += minutes + ":";
		if (seconds < 10)
			timestamp += "0";
		timestamp += seconds;

		var msg = "";
		for (var i = 0; i < arguments.length; ++i)
			msg += arguments[i];

		console.error("[" + timestamp + "] " + msg);
	},

	glCheck: function(msg) {
		var err = this.gl.getError();
		if (err != this.gl.NO_ERROR) {
			this.error(msg);
		}
	}
};