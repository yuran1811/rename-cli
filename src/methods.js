import rename from './utils/rename.js';

const methods = {
	number: {
		desc: 'Number',
		action: rename.number,
	},
	alphabet: {
		desc: 'Alphabet',
		action: rename.alphabet,
	},
	numberAndDate: {
		desc: 'Number - Date',
		action: rename.numberAndDate,
	},
	folderNameAndNumber: {
		desc: 'Folder name - Number',
		action: rename.folderNameAndNumber,
	},
	folderNameAndAlphabet: {
		desc: 'Folder name - Alphabet',
		action: rename.folderNameAndAlphabet,
	},
	folderNameAndDate: {
		desc: 'Folder name - Date',
		action: rename.folderNameAndDate,
	},
};

export default methods;
