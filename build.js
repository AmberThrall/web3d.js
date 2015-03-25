var fs = require('fs');
var files = [
	"deps/gl-matrix-min.js",
	"src/web3d.js", 
	"src/math/math.js",
	"src/graphics/color.js",
	"src/graphics/shader.js",
	"src/graphics/program.js",
	"src/graphics/geometry.js",
	"src/scene/camera.js",
	"src/scene/cube.js",
	"src/scene/material.js",
	"src/scene/basicMaterial.js"
];

var source = "";
files.forEach(function(element, index, array) {
	source += fs.readFileSync(element, "utf8") + "\n";
});

if (!fs.existsSync("build")) {
	fs.mkdirSync("build");
}

fs.writeFileSync("build/web3d.js", source, "utf8");
console.log("Done");