web3d.Math = {
	clamp: function(x,a,b) {
		return (x < a) ? a : (( x > b) ? b : x);
	},	
	
	degToRad: function(x) {
		return x * (Math.PI / 180);
	},

	radToDeg: function(x) {
		return x * (180 / Math.PI);
	},
};