import { remote } from 'electron';
import * as path from 'path';

function createFestival(): void {
  const createDialog = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width: 220,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  createDialog.loadFile(path.join(__dirname, '../../src/create-dialog/create-dialog.html'));
  // createDialog.webContents.openDevTools();
}

function openFestival(): void {
  alert('open');
}

function printRunningOrder(): void {
  alert('print');
}

document.getElementById('createFestivalButton').addEventListener('click', createFestival, false);
document.getElementById('openFestivalButton').addEventListener('click', openFestival, false);
document.getElementById('printRunningOrderButton').addEventListener('click', printRunningOrder, false);
