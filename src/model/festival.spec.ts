import 'mocha'
import { expect } from 'chai';
import { Festival } from './festival';
import { BandCategory } from './band-category';
import { FestivalAdapters } from '../adapters/festival-adapters';
import { Band } from './band';

describe('Festival', () => {
  const NAME = 'Some Festival';
  const START_DATE = new Date(2020, 4, 1);
  const END_DATE = new Date(2020, 4, 5);
  const BAND_CATEGORIES = [
    new BandCategory('must-see', 'green', 1, true),
    new BandCategory('nope', 'white', 2, false)
  ];
  const ADAPTER = FestivalAdapters.NONE;
  const BANDS = [
    new Band('Some Band', 'must-see', []),
    new Band('Another Band', 'nope', [])
  ];
  let festival: Festival;

  beforeEach(() => {
    festival = new Festival(NAME, START_DATE, END_DATE, BAND_CATEGORIES, ADAPTER, [], BANDS);
  });

  it('gets its name', () => {
    expect(festival.name).to.equal(NAME);
  });

  it('sets its name', () => {
    const NEW_NAME = 'New Name';
    expect(NEW_NAME).to.not.equal(NAME);
    festival.name = NEW_NAME;
    expect(festival.name).to.equal(NEW_NAME);
  });

  it('gets its start date', () => {
    expect(festival.startDate).to.equal(START_DATE);
  });

  it('sets its start date', () => {
    const NEW_START_DATE = new Date(2020, 4, 2);
    expect(NEW_START_DATE).to.not.equal(START_DATE);
    festival.startDate = NEW_START_DATE;
    expect(festival.startDate).to.equal(NEW_START_DATE);
  });

  it('does not set its start date if it is after its end date', () => {
    const NEW_START_DATE = new Date(2020, 4, 6);
    expect(NEW_START_DATE).to.be.above(END_DATE);
    expect(() => { festival.startDate = NEW_START_DATE; }).to.throw();
  })

  it('gets its end date', () => {
    expect(festival.endDate).to.equal(END_DATE);
  });

  it('sets its end date', () => {
    const NEW_END_DATE = new Date(2020, 4, 4);
    expect(NEW_END_DATE).to.not.equal(END_DATE);
    festival.endDate = NEW_END_DATE;
    expect(festival.endDate).to.equal(NEW_END_DATE);
  });

  it('does not set its end date if it is before its start date', () => {
    const NEW_END_DATE = new Date(2020, 3, 20);
    expect(NEW_END_DATE).to.be.below(START_DATE);
    expect(() => { festival.endDate = NEW_END_DATE; }).to.throw();
  });

  it('gets its categories', () => {
    expect(festival.bandCategories).to.equal(BAND_CATEGORIES);
  })

  it('sets its categories', () => {
    const NEW_CATEGORIES = [
      new BandCategory('category', 'blue', 10, false)
    ];
    expect(NEW_CATEGORIES).to.not.equal(BAND_CATEGORIES);
    festival.bandCategories = NEW_CATEGORIES;
    expect(festival.bandCategories).to.equal(NEW_CATEGORIES);
  });

  it('gets its adapter', () => {
    expect(festival.adapter).to.equal(ADAPTER);
  });

  it.skip('sets its adapter', () => {
    const NEW_ADAPTER = FestivalAdapters.WOA2021;
    expect(NEW_ADAPTER).to.not.equal(ADAPTER);
    festival.adapter = NEW_ADAPTER;
    expect(festival.adapter).to.equal(NEW_ADAPTER);
  });

  it('gets its bands', () => {
    expect(festival.bands).to.equal(BANDS);
  });

  it('sets its bands', () => {
    const NEW_BANDS = [
      new Band('New Band', 'maybe', [])
    ];
    expect(NEW_BANDS).to.not.equal(BANDS);
    festival.bands = NEW_BANDS;
    expect(festival.bands).to.equal(NEW_BANDS);
  });
});
