import 'mocha'
import { expect, assert } from 'chai';
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
    new Band("Band Nope", "nope", [])
  ];

  let findBandLi: (bandName: string) => HTMLLIElement;

  const numBandsPerCategory: { [category: string]: number } = {
    "must-see": bands.filter(band => band.category == "nice").length,
    "nope": bands.filter(band => band.category == "nope").length
  };

  beforeEach(() => {
    jsdomGlobalFromFile('src/index.html');

    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    BandList._instance = null;

    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    findBandLi = BandList.instance.findBandElement;
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
    expect(bandListElem.children.length).to.equal(bandCategories.length);
    for (let c = 0; c < bandListElem.children.length; ++c) {
      const categoryUl = bandListElem.children[c];
      expect(categoryUl.tagName).to.equal("UL");
      expect(categoryUl.children.length).to.equal(2) // header and another ul

      const headerLi = categoryUl.children[0];
      expect(headerLi.tagName).to.equal("LI");
      expect(headerLi.innerHTML).to.equal(bandCategories[c].name);

      const bandsLi = categoryUl.children[1];
      expect(bandsLi.tagName).to.equal("LI");
      expect(bandsLi.children.length).to.equal(1); // ul for bands

      const bandsUl = bandsLi.children[0];
      expect(bandsUl.tagName).to.equal("UL");
      expect(bandsUl.children.length).to.equal(numBandsPerCategory[bandCategories[c].name]);

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
    // TODO
  });

  it('adds a band', () => {
    // TODO
  })

  it('removes a band', () => {
    // TODO
  });
});
