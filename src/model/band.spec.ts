import 'mocha'
import { expect } from 'chai';
import { Band } from './band';
import { Gig } from './gig';

describe('Band', () => {
  const NAME = 'Some Band';
  const CATEGORY = 'must-see';
  const GIGS = [
    new Gig('Main Stage', new Date(2020, 4, 2, 20), new Date(2020, 4, 2, 21, 30))
  ];
  let band: Band;

  beforeEach(() => {
    band = new Band(NAME, CATEGORY, GIGS);
  });

  it('gets its name', () => {
    expect(band.name).to.equal(NAME);
  });

  it('sets its name', () => {
    const NEW_NAME = 'Some Other Band';
    expect(NEW_NAME).to.not.equal(NAME);
    band.name = NEW_NAME;
    expect(band.name).to.equal(NEW_NAME);
  });

  it('gets its category', () => {
    expect(band.category).to.equal(CATEGORY);
  });

  it('sets its category', () => {
    const NEW_CATEGORY = 'nope';
    expect(NEW_CATEGORY).to.not.equal(CATEGORY);
    band.category = NEW_CATEGORY;
    expect(band.category).to.equal(NEW_CATEGORY);
  })

  it('gets its gigs', () => {
    expect(band.gigs).to.equal(GIGS);
  });

  it('sets its gigs', () => {
    const NEW_GIGS = [new Gig('Tent State', new Date(2020, 4, 2, 22), new Date(2020, 4, 2, 23, 30))];
    expect(NEW_GIGS).to.not.equal(GIGS);
    band.gigs = NEW_GIGS;
    expect(band.gigs).to.equal(NEW_GIGS);
  });
})
