import 'mocha'
import { expect, assert } from 'chai';
import { jsdomGlobalFromFile } from '../test-util';
import { DateNavigation } from './date-navigation';


describe('Date navigation bar', () => {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const START_DATE = new Date('2020-04-01');
  const END_DATE = new Date('2020-04-05');
  const NUM_DAYS = (END_DATE.getTime() - START_DATE.getTime()) / DAY_MS + 1;
  assert(START_DATE <= END_DATE, 'Fault in test: startDate must be earlier than endDate');

  let startDate: Date;
  let endDate: Date;
  let numDays: number;

  beforeEach(async () => {
    startDate = START_DATE;
    endDate = END_DATE;
    numDays = NUM_DAYS;

    jsdomGlobalFromFile('src/index.html');

    /* eslint-disable @typescript-eslint/ban-ts-ignore */
    // @ts-ignore
    DateNavigation._instance = null;
  });

  it('is unique', () => {
    const dateNavs = document.getElementsByClassName('date-nav');
    expect(dateNavs.length).to.equal(1);
  });

  function getDateNavElem(): HTMLElement {
    return document.getElementsByClassName('date-nav')[0] as HTMLElement;
  }

  it('contains a single unordered list', () => {
    const dateNav = getDateNavElem();
    const children = dateNav.children;
    expect(children.length).to.equal(1);
    const ul = children[0];
    expect(ul.tagName).to.equal('UL');
  });

  function getUListElem(): HTMLUListElement {
    return getDateNavElem().children[0] as HTMLUListElement;
  }

  it('does not show dates initially', () => {
    const ul = getUListElem();
    expect(ul.childElementCount).to.equal(0);
  });

  it('shows a button for each date', () => {
    DateNavigation.instance.setDates(startDate, endDate);
    const ul = getUListElem();
    expect(ul.children.length).to.equal(numDays);

    for (const child of ul.children) {
      expect(child.tagName).equal('LI');
      expect(child.children.length).to.equal(1);
      expect(child.children[0].tagName).to.equal('BUTTON');
    }
  });

  it('sets the current date to the first date', () => {
    const dateNav = DateNavigation.instance;
    dateNav.setSelectedDateChangedCallback(date => {
      expect(date.getTime()).to.equal(startDate.getTime());
    });
    dateNav.setDates(startDate, endDate);
  });

  it('does not change the current date if it is already in range', () => {
    const dateNav = DateNavigation.instance;
    dateNav.setDates(startDate, endDate);
    let cbCalled = false;
    dateNav.setSelectedDateChangedCallback(() => {
      cbCalled = true;
    });
    const dayBefore = new Date(startDate.getTime() - DAY_MS);
    dateNav.setDates(dayBefore, endDate);
    expect(cbCalled).to.equal(false);
  });

  it('does not accept an end date earlier than start date',() => {
    expect(() => DateNavigation.instance.setDates(endDate, startDate)).to.throw();
  })
  
  it('disables the current day button and enables the others', () => {
    DateNavigation.instance.setDates(startDate, endDate);
    const ul = getUListElem();
    for(let i = 0; i < ul.children.length; ++i) {
      const btn = ul.children[i].children[0] as HTMLButtonElement;
      if(i === 0) {
        expect(btn.disabled).to.equal(true);
      } else {
        expect(btn.disabled).to.equal(false);
      }
    }
  });

  it('disables a clicked button and enables the others', () => {
    DateNavigation.instance.setDates(startDate, endDate);
    const ul = getUListElem();
    const clickIdx = 1;
    (ul.children[clickIdx].children[0] as HTMLButtonElement).click();
    for(let i = 0; i < ul.children.length; ++i) {
      const btn = ul.children[i].children[0] as HTMLButtonElement;
      if(i === clickIdx) {
        expect(btn.disabled).to.equal(true);
      } else {
        expect(btn.disabled).to.equal(false);
      }
    }
  });
});
