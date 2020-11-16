import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';
import { Gig } from '../model/gig';

export interface OnStagesChangedCallback { (states: string[]): void }

export class RunningOrderOutput {
  private static _instance: RunningOrderOutput;
  public static get instance(): RunningOrderOutput {
    if (!RunningOrderOutput._instance) {
      RunningOrderOutput._instance = new RunningOrderOutput();
    }
    return RunningOrderOutput._instance;
  }

  public setBands(bands: Band[]): void {
    this.bands = bands;
    this.buildRunningOrder();
  }

  public setStages(stages: string[], callback = false): void {
    this.stages = stages;
    this.buildRunningOrder();

    if (callback && this.onStagesChangedCallback) {
      this.onStagesChangedCallback(stages);
    }
  }

  public setBandCategories(bandCategories: BandCategory[]): void {
    this.bandCategories = bandCategories;
    this.buildRunningOrder();
  }

  public setDay(day: Date): void {
    this.day = day;
    this.buildRunningOrder();
  }

  public setStagesChangedCallback(cb: OnStagesChangedCallback): void {
    this.onStagesChangedCallback = cb;
  }

  private root: HTMLElement;
  private bands = new Array<Band>();
  private stages = new Array<string>();
  private bandCategories = new Array<BandCategory>();
  private day: Date;
  private onStagesChangedCallback: OnStagesChangedCallback;

  private constructor() {
    this.root = document.getElementsByClassName('ro-output-content')[0] as HTMLElement;
  }

  private buildRunningOrder(day = this.day): string {
    // create table
    const table = document.createElement('table');

    // add header row
    const headerRow = document.createElement('tr');
    const timeTh = document.createElement('th');
    timeTh.textContent = 'time';
    headerRow.appendChild(timeTh);
    for (const stage of this.stages) {
      const stageTh = document.createElement('th');
      stageTh.textContent = stage;
      headerRow.appendChild(stageTh);
    }
    table.appendChild(headerRow);

    if (this.bands.length > 0) {
      // create lookup table for band categories
      const bandCategories: { [name: string]: BandCategory } = {};
      for (const category of this.bandCategories) {
        bandCategories[category.name] = category;
      }

      // filter out todays gigs
      const todaysGigs: { gig: Gig, band: Band, category: BandCategory, clashes: boolean }[] = [];
      for (const band of this.bands) {
        for (const gig of band.gigs) {
          if (gig.start.getFullYear() == day.getFullYear() &&
            gig.start.getMonth() == day.getMonth() &&
            gig.start.getDay() == day.getDay()) {
            todaysGigs.push({ gig: gig, band: band, category: bandCategories[band.category], clashes: false });
          }
        }
      }

      if (todaysGigs.length > 0) {
        // sort gigs by start time
        todaysGigs.sort((a, b) => {
          const aStart = a.gig.start.getTime();
          const bStart = b.gig.start.getTime();
          return (aStart < bStart ? -1 : (aStart > bStart ? 1 : 0));
        });

        // if order of stages not defined yet, find stages
        if (this.stages.length == 0) {
          for (const gig of todaysGigs) {
            const stageName = gig.gig.stage;
            if (!this.stages.includes(stageName)) {
              this.stages.push(stageName);
            }
          }
        }

        // check for clashes
        for (let i = 0; i < todaysGigs.length; i++) {
          const gig0 = todaysGigs[i];
          if (gig0.category && gig0.category.clash) {
            for (let k = i + 1; k < todaysGigs.length; k++) {
              const gig1 = todaysGigs[k];

              if (gig0.category == gig1.category) {
                const start0 = gig0.gig.start.getTime();
                const end0 = gig0.gig.end.getTime();
                const start1 = gig1.gig.start.getTime();
                const end1 = gig1.gig.start.getTime();

                const clashes = start0 <= end1 && start1 <= end0;
                gig0.clashes = clashes;
                gig1.clashes = clashes;
              }

              if (gig0.gig.end < gig1.gig.start) {
                break;
              }
            }
          }
        }

        const startTime = todaysGigs[0].gig.start.getTime();
        const endTime = todaysGigs[todaysGigs.length - 1].gig.end.getTime();

        const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
        for (let curTime = startTime; curTime <= endTime; curTime += FIVE_MINUTES_IN_MS) {
          // create row
          const row = document.createElement('tr');

          // create time cell
          const timeCell = document.createElement('td');
          const curDate = new Date(curTime);
          timeCell.textContent = curDate.getHours().toString().padStart(2, '0') + ':' + curDate.getMinutes().toString().padStart(2, '0');
          row.appendChild(timeCell);

          // TODO

          // add row to table
          table.appendChild(row);
        }
      }
    }

    // remove old table and add new
    this.root.removeChild(this.root.firstChild);
    this.root.appendChild(table);

    // serialize table
    let tableHtml = '<' + table.nodeName.toLowerCase();
    for (const attribute of table.attributes) {
      tableHtml += ' ' + attribute.name + '=\'' + attribute.value + '\'';
    }
    tableHtml += '>' + table.innerHTML + '</' + table.nodeName.toLowerCase() + '>';

    return tableHtml;
  }
}
