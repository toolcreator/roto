import { FestivalAdapters } from './adapters/festival-adapters';

class Festival {
  name: string;
  startDate: Date;
  endDate: Date;
  bandCategories: string[];
  adapter: FestivalAdapters;
  data: {
    lastUpdated: Date;
    bands: Band[];
  };
}
