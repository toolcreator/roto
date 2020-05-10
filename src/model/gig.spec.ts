import 'mocha'
import { expect } from 'chai';
import { Gig } from './gig';

describe('Gig', () => {
  const STAGE = 'Some State';
  const START = new Date(2020, 4, 2, 20);
  const END = new Date(2020, 4, 2, 21, 30);
  let gig: Gig;

  beforeEach(() => {
    gig = new Gig(STAGE, START, END);
  });

  it('gets its state', () => {
    expect(gig.stage).to.equal(STAGE);
  });

  it('sets its stage', () => {
    const NEW_STAGE = 'New Stage';
    expect(NEW_STAGE).to.not.equal(STAGE);
    gig.stage = NEW_STAGE;
    expect(gig.stage).to.equal(NEW_STAGE);
  });

  it('gets its start', () => {
    expect(gig.start).to.equal(START);
  });

  it('sets its start', () => {
    const NEW_START = new Date(2020, 4, 2, 20, 30);
    expect(NEW_START).to.not.equal(START);
    gig.start = NEW_START;
    expect(gig.start).to.equal(NEW_START);
  });

  it('does not set its start if it is after end', () => {
    const NEW_START = new Date(2020, 4, 6);
    expect(NEW_START).to.be.above(END);
    expect(() => { gig.start = NEW_START; }).to.throw();
  })

  it('gets its end', () => {
    expect(gig.end).to.equal(END);
  });

  it('sets its end', () => {
    const NEW_END = new Date(2020, 4, 2, 23);
    expect(NEW_END).to.not.equal(END);
    gig.end = NEW_END;
    expect(gig.end).to.equal(NEW_END);
  });

  it('does not set its end if it is before start', () => {
    const NEW_END = new Date(2020, 4, 1);
    expect(NEW_END).to.be.below(START);
    expect(() => { gig.end = NEW_END; }).to.throw();
  });
})
