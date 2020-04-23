import { Band } from './band';
import { BandCategory } from './band-category';
import { FestivalAdapters } from '../adapters/festival-adapters';
import { Field, ArrayField, DateClass } from 'sparkson';

export class Festival {
  constructor(
    @Field('name') private _name?: string,
    @Field('startDate') private _startDate?: DateClass,
    @Field('endDate') private _endDate?: DateClass,
    @ArrayField('bandCategories', BandCategory) private _bandCategories?: BandCategory[],
    @Field('adapter') private _adapter?: FestivalAdapters,
    @ArrayField('bands', Band) private _bands?: Band[]
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
