#! /usr/bin/env node
import { Command } from 'commander';
import pkg from 'inquirer';
import path from 'path';
import methods from './methods.js';

const program = new Command();
const { prompt } = pkg;

const dir = process.cwd();

program
	.option('-b', `Create backup file`)
	.option('-p <path>', `Folder Path`)
	.option('-y', `Default Rename Method`);
program.parse();

const cmdOpts = program.opts();

const opts = {};

let useBackup = cmdOpts.b || undefined;
let folderPath = cmdOpts.p || dir;
let isFinish = cmdOpts.y || 0;
let method = isFinish ? 'number' : '';

(async () => {
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

	if (useBackup === undefined)
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

	console.log(`Successfully!`);
})();
