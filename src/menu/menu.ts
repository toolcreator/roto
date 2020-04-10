import { Festival } from '../model/festival';
import { remote } from 'electron';
import { parse } from 'sparkson';
import * as fs from 'fs';
import * as path from 'path';

export class Menu {
  private constructor(private readonly festival: Festival) {
    document.getElementById('createFestivalButton').addEventListener('click', this.createFestival, false);
    document.getElementById('openFestivalButton').addEventListener('click', this.openFestival, false);
    document.getElementById('printRunningOrderButton').addEventListener('click', this.printRunningOrder, false);
  }

  private static instance: Menu;

  public static init(festival: Festival): void {
    if (!Menu.instance) {
      Menu.instance = new Menu(festival);
    }
  }

  private createFestival(): void {
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

  private openFestival(): void {
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
      let newFestival: Festival;
      try {
        // festival = parse(Festival, JSON.parse(fileContent)); // TODO "No mapper defined for types Festival and object"
        newFestival = JSON.parse(fileContent);
      } catch (err) {
        remote.dialog.showErrorBox('Could not parse festival file', (err as Error).message);
        return;
      }

      this.festival.name = newFestival.name;
      this.festival.startDate = newFestival.startDate;
      this.festival.endDate = newFestival.endDate;
      this.festival.bandCategories = newFestival.bandCategories;
      this.festival.adapter = newFestival.adapter;
      this.festival.bands = newFestival.bands;
      this.festival.repairTree();
    }
  }

  private printRunningOrder(): void {
    alert('print');
  }
}
