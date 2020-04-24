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
    this._startDate = startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }
  set endDate(endDate: Date) {
    this._endDate = endDate;
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
