import { ResizableLayout } from './resizable-layout/resizeable-layout';
import { Menu } from './menu/menu';
import { DateNavigation } from './date-navigation/date-navigation';
import { RunningOrderOutput } from './ro-output/ro-output';
import { BandList } from './band-list/band-list';
import { Festival } from './model/festival';

const festival = new Festival();

Menu.init(festival);
ResizableLayout.init();

festival.addChangeSubscriber(DateNavigation.instance);
festival.addChangeSubscriber(RunningOrderOutput.instance);
festival.addChangeSubscriber(BandList.instance);
