const { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } = require('fs');

const _fs = {
	f: {
		write: (file, data, options = {}) => {
			writeFileSync(file, data, options);
		},
		read: (path) => {
			return readFileSync(path);
		},
		copy: (src, dest) => {
			copyFileSync(src, dest);
		},
		rm: (path, options = {}) => {
			rmSync(path, options);
		},
	},
	dir: {
		exist: (directory) => existsSync(directory),
		read: (directory) => readdirSync(directory),
		md: (directory, options = { recursive: true }) => {
			mkdirSync(directory, options);
		},
		rd: (directory, options = { recursive: true, force: true }) => {
			rmSync(directory, options);
		},
	},
};

module.exports = _fs;
