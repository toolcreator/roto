import { remote, ipcRenderer, BrowserWindow } from 'electron';
import { BUILD_CONFIG } from '../build-config/build-config';
import * as fs from 'fs';
import * as path from 'path';

let curFestival: any; // eslint-disable-line @typescript-eslint/no-explicit-any

function createFestivalSettingsDialog(): BrowserWindow {
  const dialogWindow = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: false,//true,
    width: 300,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });
  dialogWindow.loadFile(path.join(__dirname, '../../src/festival-settings-dialog/festival-settings-dialog.html'));
  if (BUILD_CONFIG.debug) {
    dialogWindow.webContents.openDevTools();
  }
  return dialogWindow;
}

function createFestival(): void {
  const dialogWindow = createFestivalSettingsDialog();
  dialogWindow.title = 'Create festival';
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
      curFestival = JSON.parse(fileContent);
      remote.getCurrentWebContents().send('festival-changed', [curFestival, fileName]);
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
  const dialogWindow = createFestivalSettingsDialog();
  dialogWindow.title = 'Change Festival Settings';
  dialogWindow.webContents.on('dom-ready', () => {
    dialogWindow.webContents.send('set-name', curFestival._name);
    dialogWindow.webContents.send('set-start-date', curFestival._startDate.substr(0, 10));
    dialogWindow.webContents.send('set-end-date', curFestival._endDate.substr(0, 10));
    dialogWindow.webContents.send('set-adapter', curFestival._adapter);
    for (const category of curFestival._bandCategories) {
      category.name = category._name;
      category.color = category._color;
      category.rank = category._rank;
      category.clash = category._clash;
      dialogWindow.webContents.send('add-category', category);
    }
});
}

let settingsButton: HTMLButtonElement;

export function init(): void {
  document.getElementById('createFestivalButton').addEventListener('click', createFestival, false);
  document.getElementById('openFestivalButton').addEventListener('click', openFestival, false);
  document.getElementById('printRunningOrderButton').addEventListener('click', printRunningOrder, false);
  settingsButton = document.getElementById('settingsButton') as HTMLButtonElement;
  settingsButton.addEventListener('click', openSettings, false);
  settingsButton.disabled = true;

  ipcRenderer.on('festival-configured', (event, [festival, fileName]) => {
    curFestival._name = festival._name;
    curFestival._startDate = festival._startDate.toJSON();
    curFestival._endDate = festival._endDate.toJSON();
    curFestival._bandCategories = festival._bandCategories;
    curFestival._adapter = festival._adapter;
    remote.getCurrentWebContents().send('festival-changed', [curFestival, fileName]);
  });
}

export function setSettingsButtonDisabled(disabled: boolean): void {
  settingsButton.disabled = disabled;
}

export function isSettingsButtonDisabled(): boolean {
  return settingsButton.disabled;
}
