const path = require("path");
const fs = require("fs");

const listDir = (dir, fileList = []) => {
	let files = fs.readdirSync(dir);

	files.forEach(file => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			fileList = listDir(path.join(dir, file), fileList);
		} else {
			if (/\.js$/.test(file)) {
				let name = file.split(".")[0].replace(/\s/g, "js") + ".jsx";
				let src = path.join(dir, file);
				let newSrc = path.join(dir, name);
				fileList.push({
					oldSrc: src,
					newSrc: newSrc
				});
			}
		}
	});

	return fileList;
};

let foundFiles = listDir("./");
foundFiles.forEach(f => {
	fs.renameSync(f.oldSrc, f.newSrc);
});
