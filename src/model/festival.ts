import { Band } from './band';
import { BandCategory } from './band-category';
import { FestivalAdapters } from '../adapters/festival-adapters';

export class Festival {
  constructor(
    private _name?: string,
    private _startDate?: Date,
    private _endDate?: Date,
    private _bandCategories?: BandCategory[],
    private _adapter?: FestivalAdapters,
    private _bands?: Band[]
  ) { /* empty */ }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(startDate: Date) {
    if (!this.endDate || startDate <= this.endDate) {
      this._startDate = startDate;
    } else {
      throw new Error('start date cannot be after end date');
    }
  }

  get endDate(): Date {
    return this._endDate;
  }
  set endDate(endDate: Date) {
    if (!this.startDate || endDate >= this.startDate) {
      this._endDate = endDate;
    } else {
      throw new Error('end date cannot be before start date');
    }
  }

  get bandCategories(): BandCategory[] {
    return this._bandCategories;
  }
  set bandCategories(bandCategories: BandCategory[]) {
    this._bandCategories = bandCategories;
  }

  get adapter(): FestivalAdapters {
    return this._adapter;
  }
  set adapter(adapter: FestivalAdapters) {
    this._adapter = adapter;
  }

  get bands(): Band[] {
    return this._bands;
  }
  set bands(bands: Band[]) {
    this._bands = bands;
  }
}
