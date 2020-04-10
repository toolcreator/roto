import { ResizableFlexbox } from './resizable-flexbox/resizeable-flexbox';
import { Menu } from './menu/menu';
import { DateNavigation } from './date-navigation/date-navigation';
import { RunningOrderOutput } from './ro-output/ro-output';
import { BandList } from './band-list/band-list';
import { Festival } from './model/festival';

let festival: Festival;

Menu.init(festival);
ResizableFlexbox.init();

festival.addChangeSubscriber(DateNavigation.instance);
festival.addChangeSubscriber(RunningOrderOutput.instance);
festival.addChangeSubscriber(BandList.instance);
