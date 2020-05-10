import 'mocha'
import { expect } from 'chai';
import { BandCategory } from './band-category';

describe('Band category', () => {
  const NAME = 'must-see';
  const COLOR = 'green';
  let bandCategory: BandCategory;

  beforeEach(() => {
    bandCategory = new BandCategory(NAME, COLOR);
  });

  it('gets its name', () => {
    expect(bandCategory.name).to.equal(NAME);
  });

  it('sets its name', () => {
    const NEW_NAME = 'nope';
    expect(NEW_NAME).to.not.equal(NAME);
    bandCategory.name = NEW_NAME;
    expect(bandCategory.name).to.equal(NEW_NAME);
  });

  it('gets its color', () => {
    expect(bandCategory.color).to.equal(COLOR);
  });

  it('sets its color', () => {
    const NEW_COLOR = 'red';
    expect(NEW_COLOR).to.not.equal(COLOR);
    bandCategory.color = NEW_COLOR;
    expect(bandCategory.color).to.equal(NEW_COLOR);
  });
});
