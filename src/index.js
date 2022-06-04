#! /usr/bin/env node
const { prompt } = require('inquirer');
const { program } = require('commander');
const path = require('path');
const methods = require('./methods');

const dir = process.cwd();
const opts = {};

program
	.option('-y', `Default rename method`)
	.option('-b, --backup', `No anything else`)
	.option('-p, --path <path>', `Folder path`)
	.showHelpAfterError('( Add --help for additional information )')
	.parse();

const cmdOpts = program.opts();

let useBackup = cmdOpts.backup || null;
let folderPath = cmdOpts.path || null;
let isFinish = cmdOpts.y || 0;
let method = isFinish ? 'number' : '';

(async () => {
	if (folderPath === null)
		folderPath = (
			await prompt({
				name: 'folderPath',
				type: 'input',
				message: 'Rename in folder: ',
				default: path.resolve(dir),
			})
		).folderPath;

	const { optList } = await prompt({
		name: 'optList',
		type: 'checkbox',
		message: 'Rename which ?',
		choices: ['file', 'folder'],
	});

	if (!optList.length) {
		console.log('Nothing change !');
		return;
	}

	if (!method)
		method = (
			await prompt({
				name: 'method',
				type: 'list',
				loop: true,
				message: 'Choose one of these options: ',
				choices: Object.values(methods).map((_) => _.desc),
			})
		).method;

	if (useBackup === null)
		useBackup = (
			await prompt({
				name: 'useBackup',
				type: 'confirm',
				message: 'Create Backup files ?',
				default: false,
			})
		).useBackup;

	optList.forEach((_) => (opts[_] = 1));

	Object.values(methods).forEach((_) => {
		if (_.desc === method) {
			_.action(folderPath, opts, useBackup);
			return;
		}
	});

	console.log(`\nAll things done!`);
})();
