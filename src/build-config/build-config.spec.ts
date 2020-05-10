import 'mocha'
import { expect } from 'chai';
import { BUILD_CONFIG } from './build-config';

describe('Build config', () => {
  it('does not enable debug flag', () => {
    expect(BUILD_CONFIG.debug).to.equal(false);
  });
});
