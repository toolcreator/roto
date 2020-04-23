import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';

export class BandList {
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
}
