import 'mocha'
import { expect } from 'chai';
import { WOA2021Adapter } from './woa-2021-adapter';

describe('WOA 2021 Adapter', () => {
    let adapter: WOA2021Adapter;

    beforeEach(() => {
        adapter = new WOA2021Adapter();
    });

    it('retrieves nonempty list of band names', async () => {
        const bands = await adapter.getBands();
        expect(bands.length).to.not.equal(0);
    });

    it.skip('retrieves a list of Gig objects as running order', async () => {
        // TODO
    });

});