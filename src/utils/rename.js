import fs from 'fs';
import path from 'path';
import NAME_CONST from '../constants/name.js';
import alphabetOrder from './alphabetOrder.js';

const processing = {
  backup: {
    file(dir, data) {
      const backupFilePath = path.resolve(dir, NAME_CONST.undoRenameFile);

      const existBackupFile = fs.existsSync(backupFilePath);
      const rawContent = existBackupFile
        ? fs.readFileSync(backupFilePath, {
            encoding: 'utf-8',
          })
        : '';
      const content = rawContent ? JSON.parse(rawContent) : [];

      const backupData = [
        ...content,
        {
          order: content ? content.length + 1 : 1,
          date: Date.now(),
          change: { ...data },
        },
      ];

      fs.writeFileSync(backupFilePath, JSON.stringify(backupData));
    },

    folder(dir, data) {
      const backupFilePath = path.resolve(dir, NAME_CONST.undoRenameFolder);

      const existBackupFile = fs.existsSync(backupFilePath);
      const rawContent = existBackupFile
        ? fs.readFileSync(backupFilePath, {
            encoding: 'utf-8',
          })
        : '';
      const content = rawContent ? JSON.parse(rawContent) : [];

      const backupData = [
        ...content,
        {
          order: content ? content.length + 1 : 1,
          date: Date.now(),
          change: { ...data },
        },
      ];

      fs.writeFileSync(backupFilePath, JSON.stringify(backupData));
    },

    action(dir, opts, data, useBackup) {
      if (!useBackup) return;

      opts.file && this.file(dir, data.file);
      opts.folder && this.folder(dir, data.folder);
    },
  },

  file(dir, getFileName) {
    const undoRenameData = {};
    const items = fs.readdirSync(dir);

    items.forEach((_) => {
      const itemPath = path.resolve(dir, _);
      const stats = fs.statSync(itemPath);

      if (!stats.isFile() || Object.values(NAME_CONST).includes(path.basename(_))) return;

      const fileName = getFileName(_);

      undoRenameData[_] = fileName;

      fs.renameSync(itemPath, path.resolve(dir, fileName));
    });

    return undoRenameData;
  },

  folder(dir, getFolderName) {
    const undoRenameFolderData = {};
    const items = fs.readdirSync(dir);

    items.forEach((_) => {
      const itemPath = path.resolve(dir, _);
      const stats = fs.statSync(itemPath);

      if (!stats.isDirectory() || Object.values(NAME_CONST).includes(path.basename(_))) return;

      const folderName = getFolderName(_);

      undoRenameFolderData[_] = folderName;

      fs.renameSync(itemPath, path.resolve(dir, folderName));
    });

    return undoRenameFolderData;
  },

  rebaseAll(dir, opts) {
    let fileIdx = 0;
    let folderIdx = 0;

    const getFileName = (_) => `yuran-renamecli-temp-rebase-file_${++fileIdx}${path.extname(_)}`;
    const getFolderName = (_) => `yuran-renamecli-temp-rebase-folder_${++folderIdx}`;

    opts?.file && processing.file(dir, getFileName);
    opts?.folder && processing.folder(dir, getFolderName);
  },
};

class Rename {
  number(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);

    let fileIdx = 0;
    let folderIdx = 0;

    const getFileName = (_) => `${++fileIdx}${path.extname(_)}`;
    const getFolderName = (_) => `${++folderIdx}`;

    const data = {};

    opts?.file && (data.file = processing.file(dir, getFileName));
    opts?.folder && (data.folder = processing.folder(dir, getFolderName));

    processing.backup.action(dir, opts, data, useBackup);
  }

  alphabet(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);

    let fileIdx = 0;
    let folderIdx = 0;

    const getFileName = (_) => `${alphabetOrder(++fileIdx)}${path.extname(_)}`;
    const getFolderName = (_) => `${alphabetOrder(++folderIdx)}`;

    const data = {};

    opts?.file && (data.file = processing.file(dir, getFileName));
    opts?.folder && (data.folder = processing.folder(dir, getFolderName));

    processing.backup.action(dir, opts, data, useBackup);
  }

  numberAndDate(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);
  }

  folderNameAndNumber(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);

    let fileIdx = 0;
    let folderIdx = 0;

    const folderName = path.basename(dir);
    const getFileName = (_) => `${folderName} - ${++fileIdx}${path.extname(_)}`;
    const getFolderName = (_) => `${folderName} - ${++folderIdx}`;

    const data = {};

    opts?.file && (data.file = processing.file(dir, getFileName));
    opts?.folder && (data.folder = processing.folder(dir, getFolderName));

    processing.backup.action(dir, opts, data, useBackup);
  }

  folderNameAndAlphabet(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);

    let fileIdx = 0;
    let folderIdx = 0;

    const folderName = path.basename(dir);
    const getFileName = (_) => `${folderName} - ${alphabetOrder(++fileIdx)}${path.extname(_)}`;
    const getFolderName = (_) => `${folderName} - ${alphabetOrder(++folderIdx)}`;

    const data = {};

    opts?.file && (data.file = processing.file(dir, getFileName));
    opts?.folder && (data.folder = processing.folder(dir, getFolderName));

    processing.backup.action(dir, opts, data, useBackup);
  }

  folderNameAndDate(dir, opts, useBackup) {
    processing.rebaseAll(dir, opts);
  }
}

export default new Rename();
