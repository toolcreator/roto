import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';

export interface onBandNameChangedCallback { (oldName: string, newName: string): void };
export interface onBandCategoryChangedCallback { (bandName: string, newCategory: string): void };
export interface onBandAddedCallback { (bandName: string, bandCategory: string): void };
export interface onBandRemovedCallback { (bandName: string): void };

export class BandList {
  private static _instance: BandList;
  public static get instance(): BandList {
    if (!BandList._instance) {
      BandList._instance = new BandList();
    }
    return BandList._instance;
  }

  public setBands(bands: Band[]): void {
    while(this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }

    for(const category of this.bandCategories) {
      const categoryUl = document.createElement("ul");
      const categoryNameLi = document.createElement("li");
      categoryNameLi.innerHTML = category.name != "" ? category.name : "?";
      categoryUl.appendChild(categoryNameLi);
      const bandListLi = document.createElement("li");
      const bandListUl = document.createElement("ul");
      for(const band of bands) {
        if(band.category == category.name) {
          const bandLi = document.createElement("li");
          bandLi.innerHTML = band.name;
          bandListUl.appendChild(bandLi);
        }
      }
      bandListLi.appendChild(bandListUl);
      categoryUl.appendChild(bandListLi);
      this.root.appendChild(categoryUl);
    }
  }

  public setBandCategories(bandCategories: BandCategory[]): void {
    this.bandCategories = [];
    for(const bandCategory of bandCategories) {
      this.bandCategories.push(bandCategory);
    }
    this.bandCategories.push(new BandCategory("", "inherit"));
    // TODO
  }

  public changeBandName(oldName: string, newName: string, callback = true): void {
    // TODO
    if(callback && this.onBandNameChangedCb) {
      this.onBandNameChangedCb(oldName, newName);
    }
  }

  public changeBandCategory(bandName: string, newCategory: string, callback = true): void {
    // TODO
    if(callback && this.onBandCategoryChangedCb) {
      this.onBandCategoryChangedCb(bandName, newCategory);
    }
  }

  public addBand(band: Band, callback = true): void {
    // TODO
    if(callback && this.onBandAddedCb) {
      this.onBandAddedCb(band.name, band.category);
    }
  }

  public removeBand(bandName: string, callback = true): void {
    // TODO
    if(callback && this.onBandRemovedCb) {
      this.onBandRemovedCb(bandName);
    }
  }

  public setOnBandNameChangedCallback(cb: onBandNameChangedCallback): void {
    this.onBandNameChangedCb = cb;
  }

  public setOnBandCategoryChangedCallback(cb: onBandCategoryChangedCallback): void {
    this.onBandCategoryChangedCb = cb;
  }

  public setOnBandAddedCallback(cb: onBandAddedCallback): void {
    this.onBandAddedCb = cb;
  }

  public setOnBandRemovedCallback(cb: onBandRemovedCallback): void {
    this.onBandRemovedCb = cb;
  }

  private root: HTMLElement;
  private bandCategories: BandCategory[] = new Array<BandCategory>();
  private onBandNameChangedCb: onBandNameChangedCallback;
  private onBandCategoryChangedCb: onBandCategoryChangedCallback;
  private onBandAddedCb: onBandAddedCallback;
  private onBandRemovedCb: onBandRemovedCallback;

  private constructor() {
    this.root = document.getElementsByClassName('band-list-content')[0] as HTMLElement;
  }

  private findBandElement = (bandName: string): HTMLLIElement => {
    for(const categoryUl of this.root.children) {
      const bandsUl = categoryUl.children[1].children[0];
      for(const bandLi of bandsUl.children) {
        if(bandLi.innerHTML == bandName) {
          return bandLi as HTMLLIElement;
        }
      }
    }
    return null;
  };

  private findBandCategory = (bandName: string): string => {
    try {
    const bandElement = this.findBandElement(bandName);
    const categoryLi = bandElement.parentElement.parentElement.previousSibling as HTMLElement;
    return categoryLi.innerHTML;
    } catch(err) {
      return "";
    }
  }
}
