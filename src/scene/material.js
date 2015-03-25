web3d.Material = function () {

};

web3d.Material.prototype = {
	constructor: web3d.Material,
	program: null,

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