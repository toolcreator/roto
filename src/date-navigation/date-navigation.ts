import { FestivalChangeSubscriber } from '../model/festival';

export class DateNavigation implements FestivalChangeSubscriber {
  private dates: Date[];
  private currentDate: Date;
  private root: HTMLElement;

  private constructor() {
    this.root = document.getElementsByClassName('date-nav')[0] as HTMLElement;
  }

  private static _instance: DateNavigation;
  public static get instance(): DateNavigation {
    if (!DateNavigation._instance) {
      DateNavigation._instance = new DateNavigation();
    }
    return DateNavigation._instance;
  }

  public onStartDateChanged(startDate: Date): void {
    // TODO
  }

  public onEndDateChanged(endDate: Date): void {
    // TODO
  }

  public onNameChanged(): void { /* empty */ }
  public onBandCategoriesChanged(): void { /* empty */ }
  public onAdapterChanged(): void { /* empty */ }
  public onBandsChanged(): void { /* empty */ }
}
