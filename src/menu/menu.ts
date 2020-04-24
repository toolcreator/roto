import { Festival } from '../model/festival';
import { remote, ipcRenderer } from 'electron';
import * as fs from 'fs';
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
  const fileName = remote.dialog.showOpenDialogSync(remote.getCurrentWindow(), {
    title: 'Open Festival',
    filters: [{
      name: 'JSON',
      extensions: ['json']
    }],
    properties: ['openFile']
  })[0];
  if (fileName != undefined) {
    let fileContent: string;
    try {
      fileContent = fs.readFileSync(fileName, 'utf8');
    } catch (err) {
      remote.dialog.showErrorBox('Could not open file.', (err as Error).message);
      return;
    }
    try {
      const festival = JSON.parse(fileContent);
      remote.getCurrentWebContents().send('festival-changed', festival);
    } catch (err) {
      remote.dialog.showErrorBox('Could not parse festival file', (err as Error).message);
      return;
    }
  }
}

function printRunningOrder(): void {
  alert('print');
}

function openSettings(): void {
  alert('settings');
}

let settingsButton: HTMLButtonElement;

export function init(): void {
  document.getElementById('createFestivalButton').addEventListener('click', createFestival, false);
  document.getElementById('openFestivalButton').addEventListener('click', openFestival, false);
  document.getElementById('printRunningOrderButton').addEventListener('click', printRunningOrder, false);
  settingsButton = document.getElementById('settingsButton') as HTMLButtonElement;
  settingsButton.addEventListener('click', openSettings, false);
  settingsButton.disabled = true;

  ipcRenderer.on('festival-created', (event, festival) => {
    remote.getCurrentWebContents().send('festival-changed', festival);
  });
}

export function setSettingsButtonDisabled(disabled: boolean): void {
  settingsButton.disabled = disabled;
}

export function isSettingsButtonDisabled(): boolean {
  return settingsButton.disabled;
}
