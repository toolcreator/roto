import { Band } from './band';
import { BandCategory } from './band-category';
import { FestivalAdapters } from '../adapters/festival-adapters';
import { Field, ArrayField, DateClass } from 'sparkson';

export interface FestivalChangeSubscriber {
  onNameChanged(name: string): void;
  onStartDateChanged(startDate: Date): void;
  onEndDateChanged(endDate: Date): void;
  onBandCategoriesChanged(bandCategories: BandCategory[]): void;
  onAdapterChanged(adapter: FestivalAdapters): void;
  onBandsChanged(bands: Band[]): void;
}

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
    this.notifySubscribersOfNameChange();
  }

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(startDate: Date) {
    this._startDate = startDate;
    this.notifySubscribersOfStartDateChange();
  }

  get endDate(): Date {
    return this._endDate;
  }
  set endDate(endDate: Date) {
    this._endDate = endDate;
    this.notifySubscribersOfEndDateChange();
  }

  get bandCategories(): BandCategory[] {
    return this._bandCategories;
  }
  set bandCategories(bandCategories: BandCategory[]) {
    this._bandCategories = bandCategories;
    this.notifySubscribersOfBandCategoriesChange();
  }

  get adapter(): FestivalAdapters {
    return this._adapter;
  }
  set adapter(adapter: FestivalAdapters) {
    this._adapter = adapter;
    this.notifySubscribersOfAdapterChange();
  }

  get bands(): Band[] {
    return this._bands;
  }
  set bands(bands: Band[]) {
    this._bands = bands;
    this.notifySubscribersOfBandsChange();
  }

  private changeSubscribers = new Array<FestivalChangeSubscriber>();

  public addChangeSubscriber(listener: FestivalChangeSubscriber): void {
    this.changeSubscribers.push(listener);
  }

  public removeChangeSubscriber(listener: FestivalChangeSubscriber): void {
    this.changeSubscribers.forEach((l, index) => { if (l == listener) { this.changeSubscribers.splice(index, 1); } });
  }

  private notifySubscribersOfNameChange(): void { this.changeSubscribers.forEach(listener => listener.onNameChanged(this.name)); }
  private notifySubscribersOfStartDateChange(): void { this.changeSubscribers.forEach(listener => listener.onStartDateChanged(this.startDate)); }
  private notifySubscribersOfEndDateChange(): void { this.changeSubscribers.forEach(listener => listener.onEndDateChanged(this.endDate)); }
  public notifySubscribersOfBandCategoriesChange(): void { this.changeSubscribers.forEach(listener => listener.onBandCategoriesChanged(this.bandCategories)); }
  private notifySubscribersOfAdapterChange(): void { this.changeSubscribers.forEach(listener => listener.onAdapterChanged(this.adapter)); }
  public notifySubscribersOfBandsChange(): void { this.changeSubscribers.forEach(listener => listener.onBandsChanged(this.bands)); }

  public repairTree(): void {
    this.bandCategories.forEach(bandCategory => {
      bandCategory.parent = this;
    });
    this.bands.forEach(band => {
      band.parent = this;
      band.gigs.forEach(gig => {
        gig.parent = band;
      });
    });
  }
}
