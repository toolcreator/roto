import { FestivalChangeSubscriber } from '../model/festival';
import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';

export class RunningOrderOutput implements FestivalChangeSubscriber {
  private root: HTMLElement;

  private constructor() {
    this.root = document.getElementsByClassName('ro-output')[0] as HTMLElement;
  }

  private static _instance: RunningOrderOutput;
  public static get instance(): RunningOrderOutput {
    if (!RunningOrderOutput._instance) {
      RunningOrderOutput._instance = new RunningOrderOutput();
    }
    return RunningOrderOutput._instance;
  }

  public onBandCategoriesChanged(bandCategories: BandCategory[]): void {
    // TODO
  }

  public onBandsChanged(bands: Band[]): void {
    // TODO
  }

  public onNameChanged(): void { /* empty */ }
  public onStartDateChanged(): void { /* empty */ }
  public onEndDateChanged(): void { /* empty */ }
  public onAdapterChanged(): void { /* empty */ }
}
