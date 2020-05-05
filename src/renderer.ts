import { Festival } from './model/festival';
import { BandCategory } from './model/band-category';
import { Band } from './model/band';
import { Gig } from './model/gig';
import { DateNavigation } from './date-navigation/date-navigation';
import { BandList } from './band-list/band-list';
import { ipcRenderer, remote } from 'electron';
import * as Menu from './menu/menu';
import * as ResizableLayout from './resizable-layout/resizeable-layout';

const festival = new Festival();

Menu.init();
ResizableLayout.init();

const bandList = BandList.instance;
// TODO

const dateNav = DateNavigation.instance;
dateNav.setSelectedDateChangedCallback(selectedDate => {
  // TODO
});

ipcRenderer.on('festival-changed', (event, f) => {
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
});
