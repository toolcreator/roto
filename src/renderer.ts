import { Festival } from './model/festival';
import { BandCategory } from './model/band-category';
import { Band } from './model/band';
import { Gig } from './model/gig';
import { DateNavigation } from './date-navigation/date-navigation';
import { BandList } from './band-list/band-list';
import { ipcRenderer, powerSaveBlocker, remote } from 'electron';
import * as Menu from './menu/menu';
import * as ResizableLayout from './resizable-layout/resizeable-layout';
import * as fs from 'fs';
import { FestivalAdapters, FESTIVAL_ADAPTERS } from './adapters/festival-adapters';

const festival = new Festival();
let currentFileName = "";

Menu.init();
ResizableLayout.init();

const bandList = BandList.instance;
bandList.setOnBandAddedCallback((bandName: string, bandCategory: string) => {
  festival.bands.push(new Band(bandName, bandCategory, []));
  // TODO tell everyone interested as at the end of onFestivalChanged
  save();
});
bandList.setOnBandCategoryChangedCallback((bandName: string, newCategory: string) => {
  festival.bands.find(band => band.name == bandName).category = newCategory;
  // TODO tell everyone interested as at the end of onFestivalChanged
  save();
});
bandList.setOnBandNameChangedCallback((oldName: string, newName: string) => {
  festival.bands.find(band => band.name == oldName).name = newName;
  // TODO tell everyone interested as at the end of onFestivalChanged
  save();
});
bandList.setOnBandRemovedCallback((bandName: string) => {
  festival.bands.forEach((item, index, array) => {
    if (item.name == bandName) {
      array.splice(index, 1);
    }
  });
  // TODO tell everyone interested as at the end of onFestivalChanged
  save();
});

const dateNav = DateNavigation.instance;
dateNav.setSelectedDateChangedCallback(selectedDate => {
  // TODO tell running order output the date changed
});

ipcRenderer.on('festival-changed', (event, [f, fnm]) => {
  currentFileName = fnm;
  onFestivalChanged(f);
});

async function onFestivalChanged(f: any): Promise<void> {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  festival.name = f._name;
  festival.startDate = new Date(f._startDate);
  festival.endDate = new Date(f._endDate);
  festival.bandCategories = [];
  f._bandCategories.forEach((bandCategory: any) => {
    festival.bandCategories.push(new BandCategory(bandCategory._name, bandCategory._color));
  });
  festival.adapter = f._adapter;
  festival.bands = [];

  if (f._bands.length > 0) {
    f._bands.forEach((band: any) => {
      const b = new Band(band._name, band._category, []);
      if (band._gigs.length > 0) {
        band._gigs.foreach((gig: any) => {
          b.gigs.push(new Gig(gig._stage, new Date(gig._startDate), new Date(gig._endDate)));
        });
      }
      festival.bands.push(b);
    });
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (festival.adapter != FestivalAdapters.NONE) {
    const adapter = FESTIVAL_ADAPTERS.get(festival.adapter);
    const remoteBands = await adapter.getBands();
    festival.bands = festival.bands.filter(band => remoteBands.includes(band.name));
    for (const remoteBand of remoteBands) {
      if (!festival.bands.some(band => band.name == remoteBand)) {
        festival.bands.push(new Band(remoteBand, '', []));
      }
    }
  }

  bandList.setBandCategories(festival.bandCategories);
  bandList.setBands(festival.bands);
  try {
    dateNav.setDates(festival.startDate, festival.endDate);
  } catch (err) {
    remote.dialog.showMessageBox(remote.getCurrentWindow(), {
      "title": (err as Error).name,
      "message": (err as Error).message,
      "type": "error"
    });
    return;
  }

  Menu.setSettingsButtonDisabled(false);

  save();
}

function save(): void {
  if (currentFileName == "") {
    return;
  }

  fs.writeFileSync(currentFileName, JSON.stringify(festival));
}
