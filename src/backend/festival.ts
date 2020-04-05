import { FestivalAdapters } from './adapters/festival-adapters';
import { Band } from './band';

export class Festival {
  constructor(
    public name: string,
    public startDate: Date,
    public endDate: Date,
    public bandCategories: string[],
    public adapter: FestivalAdapters,
    public bands: Band[]
  ) { /* empty */ }
}
