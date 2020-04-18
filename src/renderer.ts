import { DateNavigation } from './date-navigation/date-navigation';
import { RunningOrderOutput } from './ro-output/ro-output';
import { BandList } from './band-list/band-list';
import { Festival } from './model/festival';
import { BandCategory } from './model/band-category';
import { Band } from './model/band';
import { ipcRenderer } from 'electron';
import * as Menu from './menu/menu';
import * as ResizableLayout from './resizable-layout/resizeable-layout';
import { Gig } from './model/gig';

const festival = new Festival();

Menu.init();
ResizableLayout.init();

festival.addChangeSubscriber(DateNavigation.instance);
festival.addChangeSubscriber(RunningOrderOutput.instance);
festival.addChangeSubscriber(BandList.instance);

ipcRenderer.on('festival-changed', (event, f) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  festival.name = f._name;
  festival.startDate = new Date(f._startDate);
  festival.endDate = new Date(f._endDate);
  festival.bandCategories = [];
  f._bandCategories.forEach((bandCategory: any) => {
    festival.bandCategories.push(new BandCategory(bandCategory._name, bandCategory._color, festival));
  });
  festival.adapter = f._adapter;
  festival.bands = [];
  f._bands.forEach((band: any) => {
    const b = new Band(band._name, band._category, [], festival);
    band._gigs.foreach((gig: any) => {
      b.gigs.push(new Gig(gig._stage, new Date(gig._startDate), new Date(gig._endDate), b));
    });
    festival.bands.push(b);
  });
  /* eslint-enable @typescript-eslint/no-explicit-any */

  Menu.setSettingsButtonDisabled(false);
});
