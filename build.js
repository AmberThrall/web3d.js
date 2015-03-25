var fs = require('fs');
var files = [
	"deps/gl-matrix-min.js",
	"src/web3d.js", 
	"src/misc/math.js",
	"src/misc/loader.js",
	"src/graphics/color.js",
	"src/graphics/shader.js",
	"src/graphics/program.js",
	"src/graphics/material.js",
	"src/graphics/geometry.js",
	"src/graphics/texture.js",
	"src/scene/camera.js",
	"src/scene/cube.js",
	"src/scene/basicMaterial.js",
	"src/scene/texturedMaterial.js"
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