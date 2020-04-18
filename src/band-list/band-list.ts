import { FestivalChangeSubscriber } from '../model/festival';
import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';

export class BandList implements FestivalChangeSubscriber {
  private root: HTMLElement;

  private constructor() {
    this.root = document.getElementsByClassName('band-list')[0] as HTMLElement;
  }

  private static _instance: BandList;
  public static get instance(): BandList {
    if (!BandList._instance) {
      BandList._instance = new BandList();
    }
    return BandList._instance;
  }

  public onBandCategoriesChanged(bandCategories: BandCategory[]): void {
    // TODO
  }

  public onBandsChanged(bands: Band[]): void {
    // TODO
  }

  public onNameChanged(): void { /* empty */ }
  public onStartDateChanged(): void { /* empty */ }
  public onEndDateChanged(): void { /* empty */ }
  public onAdapterChanged(): void { /* empty */ }
}
