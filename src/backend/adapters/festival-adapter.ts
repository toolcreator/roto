import { Band } from '../band';
import { Gig } from '../gig';

export interface FestivalAdapter {
  getBands: () => Band[];
  getRunningOrder: () => Gig[];
}
