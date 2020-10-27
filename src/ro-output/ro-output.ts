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
  private day: Date;
  private onStagesChangedCallback: OnStagesChangedCallback;

  private constructor() {
    this.root = document.getElementsByClassName('ro-output-content')[0] as HTMLElement;
  }

  private buildRunningOrder(): void {
    if (!this.day || this.bands.length == 0) {
      this.root.innerHTML = "<p>There is no running order data yet...</p>";
      return;
    }

    const todaysGigs: { bandName: string, gig: Gig }[] = [];
    for (const band of this.bands) {
      for (const gig of band.gigs) {
        if (gig.start.getFullYear() == this.day.getFullYear() &&
            gig.start.getMonth() == this.day.getMonth() &&
            gig.start.getDay() == this.day.getDay()) {
          todaysGigs.push({ bandName: band.name, gig: gig });
        }
      }
    }

    todaysGigs.sort((a, b) => {
      const aStart = a.gig.start.getTime();
      const bStart = b.gig.start.getTime();
      return (aStart < bStart ? -1 : (aStart > bStart ? 1 : 0));
    })

    if(this.stages.length == 0) {
      for(const gig of todaysGigs)  {
        const stageName = gig.gig.stage;
        if(!this.stages.includes(stageName)) {
          this.stages.push(stageName);
        }
      }
    }

    // TODO
  }
}
