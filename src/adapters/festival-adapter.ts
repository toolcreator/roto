import { Band } from '../model/band';
import { Gig } from '../model/gig';

export interface FestivalAdapter {
  getBands: () => Band[];
  getRunningOrder: () => Gig[];
}
