var fs = require('fs');
var files = [
	"src/web3d.js", 
	"src/math/math.js",
	"src/math/vector2.js",
	"src/math/vector3.js",
	"src/math/vector4.js",
	"src/math/matrix2.js",
	"src/math/matrix3.js",
	"src/math/matrix4.js",
	"src/graphics/color.js",
	"src/graphics/shader.js",
	"src/graphics/program.js",
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