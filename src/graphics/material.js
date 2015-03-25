web3d.Material = function () {
	this.program = null;
};

web3d.Material.prototype = {
	constructor: web3d.Material,

	setProgram: function(program) {
		this.program = program;
	},

	bind: function() {
		this.program.bind();
	},

	unbind: function() {
		this.program.unbind();
	}
};