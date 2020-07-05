import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';
import { remote } from 'electron';

export interface OnBandNameChangedCallback { (oldName: string, newName: string): void }
export interface OnBandCategoryChangedCallback { (bandName: string, newCategory: string): void }
export interface OnBandAddedCallback { (bandName: string, bandCategory: string): void }
export interface OnBandRemovedCallback { (bandName: string): void }

export class BandList {
  private static _instance: BandList;
  public static get instance(): BandList {
    if (!BandList._instance) {
      BandList._instance = new BandList();
    }
    return BandList._instance;
  }

  public setBands(bands: Band[]): void {
    this.bands = bands;
    this.buildList();
  }

  public setBandCategories(bandCategories: BandCategory[]): void {
    this.bandCategories = [];
    for (const bandCategory of bandCategories) {
      this.bandCategories.push(bandCategory);
    }
    this.bandCategories.push(new BandCategory('', 'inherit'));
    this.buildList();
  }

  public changeBandName(oldName: string, newName: string, callback = false): void {
    const band = this.bands.find(band => band.name == oldName);
    if (band) {
      band.name = newName;
    }

    const bandLi = this.findBandElement(oldName);
    if (bandLi) {
      bandLi.innerHTML = newName;
    }

    if (callback && this.onBandNameChangedCb) {
      this.onBandNameChangedCb(oldName, newName);
    }
  }

  public changeBandCategory(bandName: string, newCategory: string, callback = false): void {
    const band = this.bands.find(band => band.name == bandName);
    if (band) {
      band.category = newCategory;
    }

    this.buildList();

    if (callback && this.onBandCategoryChangedCb) {
      this.onBandCategoryChangedCb(bandName, newCategory);
    }
  }

  public addBand(band: Band, callback = false): void {
    if (!this.bands.some(b => b == band)) {
      this.bands.push(band);
    }

    this.buildList();

    if (callback && this.onBandAddedCb) {
      this.onBandAddedCb(band.name, band.category);
    }
  }

  public removeBand(bandName: string, callback = false): void {
    const band = this.bands.find(band => band.name == bandName);
    if (band) {
      const idx = this.bands.indexOf(band);
      if (idx > -1) {
        this.bands.splice(idx, 1);
      }
    }

    const bandLi = this.findBandElement(band.name);
    if (bandLi) {
      bandLi.parentElement.removeChild(bandLi);
    }

    if (callback && this.onBandRemovedCb) {
      this.onBandRemovedCb(bandName);
    }
  }

  public setOnBandNameChangedCallback(cb: OnBandNameChangedCallback): void {
    this.onBandNameChangedCb = cb;
  }

  public setOnBandCategoryChangedCallback(cb: OnBandCategoryChangedCallback): void {
    this.onBandCategoryChangedCb = cb;
  }

  public setOnBandAddedCallback(cb: OnBandAddedCallback): void {
    this.onBandAddedCb = cb;
  }

  public setOnBandRemovedCallback(cb: OnBandRemovedCallback): void {
    this.onBandRemovedCb = cb;
  }

  private root: HTMLElement;
  private bandCategories = new Array<BandCategory>();
  private bands = new Array<Band>();
  private onBandNameChangedCb: OnBandNameChangedCallback;
  private onBandCategoryChangedCb: OnBandCategoryChangedCallback;
  private onBandAddedCb: OnBandAddedCallback;
  private onBandRemovedCb: OnBandRemovedCallback;

  private constructor() {
    this.root = document.getElementsByClassName('band-list-content')[0] as HTMLElement;
  }

  private buildList(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild);
    }

    for (const category of this.bandCategories) {
      const categoryUl = document.createElement('ul');
      const categoryNameLi = document.createElement('li');
      categoryNameLi.innerHTML = category.name != '' ? category.name : '?';
      categoryNameLi.classList.add('band-list-category');
      categoryUl.appendChild(categoryNameLi);
      const bandListLi = document.createElement('li');
      const bandListUl = document.createElement('ul');
      this.bands.sort((a, b) => {
        if(a.name === b.name) {
          return 0;
        } else if(a.name < b.name) {
          return -1;
        } else {
          return 1;
        }
      });
      for (const band of this.bands) {
        if (band.category == category.name) {
          const bandLi = document.createElement('li');
          bandLi.innerHTML = band.name;
          bandLi.classList.add('band-list-band');

          bandLi.addEventListener('contextmenu', event => {
            event.preventDefault();
            const ctxMenu = new remote.Menu();
            for(const category of this.bandCategories) {
              if(category.name != band.category) {
                ctxMenu.append(new remote.MenuItem({
                  'label': category.name != '' ? category.name : '?',
                  'click': () => this.changeBandCategory(band.name, category.name, true)
                }));
              }
            }
            ctxMenu.popup();
          }, false);

          bandListUl.appendChild(bandLi);
        }
      }
      bandListLi.appendChild(bandListUl);
      categoryUl.appendChild(bandListLi);
      this.root.appendChild(categoryUl);
    }
  }

  private findBandElement = (bandName: string): HTMLLIElement => {
    for (const categoryUl of this.root.children) {
      const bandsUl = categoryUl.children[1].children[0];
      for (const bandLi of bandsUl.children) {
        if (bandLi.innerHTML.includes(bandName)) {
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
    } catch (err) {
      return '';
    }
  }
}
