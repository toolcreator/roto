import { BandCategory } from '../model/band-category';
import { Band } from '../model/band';

export class RunningOrderOutput {
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
}
