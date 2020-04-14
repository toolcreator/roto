import { DateNavigation } from './date-navigation/date-navigation';
import { RunningOrderOutput } from './ro-output/ro-output';
import { BandList } from './band-list/band-list';
import { Festival } from './model/festival';
import { ipcRenderer } from 'electron';
import * as Menu from './menu/menu';
import * as ResizableLayout from './resizable-layout/resizeable-layout';

const festival = new Festival();

Menu.init();
ResizableLayout.init();

festival.addChangeSubscriber(DateNavigation.instance);
festival.addChangeSubscriber(RunningOrderOutput.instance);
festival.addChangeSubscriber(BandList.instance);

ipcRenderer.on('festival-changed', (event, f) => {
  festival.name = f._name;
  festival.startDate = f._startDate;
  festival.endDate = f._endDate;
  festival.bandCategories = f._bandCategories;
  festival.adapter = f._adapter;
  festival.bands = f._bands;
  festival.repairTree();

  if(Menu.isSettingsButtonDisabled()) {
    Menu.setSettingsButtonDisabled(false);
  }
});
