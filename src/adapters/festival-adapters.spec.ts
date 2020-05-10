import 'mocha'
import { expect } from 'chai';
import { FESTIVAL_ADAPTER_NAMES, FESTIVAL_ADAPTERS } from './festival-adapters';

describe('Festival adapters', () => {
  it('contains all currently available adapters', () => {
    expect(FESTIVAL_ADAPTERS.get(FESTIVAL_ADAPTER_NAMES.get('none'))).to.equal(null);
  })
});
