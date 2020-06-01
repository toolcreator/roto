import 'mocha'
import { expect } from 'chai';
import { jsdomGlobalFromFile } from '../test-util';
import { BandList } from './band-list';
import { Band } from '../model/band';
import { BandCategory } from '../model/band-category';

describe('Band list', () => {
  const bandCategories = [
    new BandCategory("must-see", "green"),
    new BandCategory("nope", "white")
  ];

  const bands = [
    new Band("Nice Band", "must-see", []),
    new Band("Nope Band", "nope", []),
    new Band("Band Nope", "nope", []),
    new Band("Some Band", "", [])
  ];

  let findBandLi: (bandName: string) => HTMLLIElement;
  let findBandCategory: (bandName: string) => string;

  const numBandsPerCategory: { [category: string]: number } = {
    "must-see": bands.filter(band => band.category == "must-see").length,
    "nope": bands.filter(band => band.category == "nope").length,
    "": bands.filter(band => band.category == "").length
  };

  beforeEach(() => {
    jsdomGlobalFromFile('src/index.html');

    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    BandList._instance = null;

    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    findBandLi = BandList.instance.findBandElement;
    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    findBandCategory = BandList.instance.findBandCategory;
  });

  it('is unique', () => {
    const bandLists = document.getElementsByClassName('band-list-content');
    expect(bandLists.length).to.equal(1);
  });

  function getBandListElem(): HTMLElement {
    return document.getElementsByClassName('band-list-content')[0] as HTMLElement;
  }

  it('is empty initially', () => {
    const bandList = getBandListElem();
    expect(bandList.children.length).to.equal(0);
  });

  it('has an ul for each category containing a header li and a ul with an li for each band', () => {
    BandList.instance.setBandCategories(bandCategories);
    BandList.instance.setBands(bands);

    const bandListElem = getBandListElem();
    expect(bandListElem.children.length).to.equal(bandCategories.length + 1);

    for (let c = 0; c < bandListElem.children.length; ++c) {
      const categoryUl = bandListElem.children[c];
      expect(categoryUl.tagName).to.equal("UL");
      expect(categoryUl.children.length).to.equal(2) // header and another ul

      const headerLi = categoryUl.children[0];
      expect(headerLi.tagName).to.equal("LI");
      expect(headerLi.innerHTML).to.equal(c < bandCategories.length ? bandCategories[c].name : "?");

      const bandsLi = categoryUl.children[1];
      expect(bandsLi.tagName).to.equal("LI");
      expect(bandsLi.children.length).to.equal(1); // ul for bands

      const bandsUl = bandsLi.children[0];
      expect(bandsUl.tagName).to.equal("UL");
      const numBands = numBandsPerCategory[c < bandCategories.length ? bandCategories[c].name : ""];
      expect(bandsUl.children.length).to.equal(numBands);

      for (const bandLi of bandsUl.children) {
        expect(bandLi.tagName).to.equal("LI");
      }
    }
  });

  it('changes a bandname and calls back if it should', () => {
    const bandList = BandList.instance;
    bandList.setBandCategories(bandCategories);
    bandList.setBands(bands);

    const oldName = bands[0].name;
    const toChangeLi = findBandLi(oldName);
    expect(toChangeLi).to.not.equal(null);
    expect(toChangeLi.innerHTML).to.equal(oldName);

    const newName = "New Band";
    const newName2 = "Another New Band";

    let cbCalled = false;
    bandList.setOnBandNameChangedCallback(() => {
      cbCalled = true;
    });

    bandList.changeBandName(oldName, newName, true);
    expect(cbCalled).to.equal(true);
    cbCalled = false;
    expect(toChangeLi.innerHTML).to.equal(newName);

    bandList.changeBandName(newName, newName2, false);
    expect(cbCalled).to.equal(false);
    expect(toChangeLi.innerHTML).to.equal(newName2);
  });

  it('changes a band category and calls back if it should', () => {
    const bandList = BandList.instance;
    bandList.setBandCategories(bandCategories);
    bandList.setBands(bands);

    const bandName = bands[0].name;
    const oldCategory = findBandCategory(bandName);
    expect(oldCategory).to.not.equal("");

    let newCategory = "";
    for(const category of bandCategories) {
      if(oldCategory != category.name) {
        newCategory = category.name;
        break;
      }
    }
    expect(newCategory).to.not.equal("");

    let cbCalled = false;
    bandList.setOnBandCategoryChangedCallback(() => {
      cbCalled = true;
    });

    bandList.changeBandCategory(bandName, newCategory, true);
    expect(cbCalled).to.equal(true);
    cbCalled = false;
    expect(findBandCategory(bandName)).to.equal(newCategory);

    bandList.changeBandCategory(bandName, oldCategory, false);
    expect(cbCalled).to.equal(false);
    expect(findBandCategory(bandName)).to.equal(oldCategory);
  });

  it('adds a band and calls back if it should', () => {
    const bandList = BandList.instance;
    bandList.setBandCategories(bandCategories);

    const names = ["New Band", "Another New Band"];
    const categories = ["must-see", "nope"];
    expect(names.length).to.be.greaterThan(1);
    expect(categories.length).to.be.greaterThan(1);

    let cbCalled = false;
    bandList.setOnBandAddedCallback(() => {
      cbCalled = true;
    })

    expect(findBandLi(names[0])).to.equal(null);
    bandList.addBand(new Band(names[0], categories[0], []), true);
    expect(cbCalled).to.equal(true);
    cbCalled = false;
    const bandLi0 = findBandLi(names[0]);
    expect(bandLi0).to.not.equal(null);
    expect(bandLi0.innerHTML).to.equal(names[0]);
    expect(findBandCategory(names[0])).to.equal(categories[0]);

    expect(findBandLi(names[1])).to.equal(null);
    bandList.addBand(new Band(names[1], categories[1], []), false);
    expect(cbCalled).to.equal(false);
    const bandLi1 = findBandLi(names[1]);
    expect(findBandLi(names[0])).to.not.equal(null);
    expect(bandLi1).to.not.equal(null);
    expect(bandLi1.innerHTML).to.equal(names[1]);
    expect(findBandCategory(names[1])).to.equal(categories[1]);
  })

  it('removes a band and calls back if it should', () => {
    const bandList = BandList.instance;
    bandList.setBandCategories(bandCategories);
    bandList.setBands(bands);

    let cbCalled = false;
    bandList.setOnBandRemovedCallback(() => {
      cbCalled = true;
    });

    expect(bands.length).to.be.greaterThan(1);

    const name0 = bands[0].name;
    const name1 = bands[1].name;

    const bandLi0 = findBandLi(name0);
    expect(bandLi0).to.not.equal(null);
    expect(bandLi0.innerHTML).to.equal(name0);
    bandList.removeBand(name0, true);
    expect(cbCalled).to.equal(true);
    cbCalled = false;
    expect(findBandLi(name0)).to.equal(null);

    const bandLi1 = findBandLi(name1);
    expect(bandLi1).to.not.equal(null);
    expect(bandLi1.innerHTML).to.equal(name1);
    bandList.removeBand(name1, false);
    expect(cbCalled).to.equal(false);
    expect(findBandLi(name1)).to.equal(null);
  });

  it('shows bands alphabetically sorted', () => {
    const bandList = BandList.instance;
    bandList.setBandCategories(bandCategories);
    bandList.setBands(bands);

    const bandLi0 = findBandLi('Band Nope');
    const bandLi1 = findBandLi('Nope Band');
    const parentUl = bandLi0.parentElement as HTMLUListElement;

    expect(parentUl.children.length).to.equal(2);
    expect(parentUl.children[0]).to.equal(bandLi0);
    expect(parentUl.children[1]).to.equal(bandLi1);
  });
});
