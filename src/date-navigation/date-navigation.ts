import { FestivalChangeSubscriber } from '../model/festival';

export class DateNavigation implements FestivalChangeSubscriber {
  private root: HTMLElement;
  private dates = new Array<Date>();
  private buttons = new Array<HTMLButtonElement>();
  private _currentDate: Date;
  private get currentDate(): Date {
    return this._currentDate;
  }
  private set currentDate(currentDate: Date) {
    this._currentDate = currentDate;
    this.onCurrentDateChanged();
  }
  private get startDate(): Date {
    if (this.dates.length > 0) {
      return this.dates[0];
    }
    return undefined;
  }
  private get endDate(): Date {
    if (this.dates.length > 0) {
      return this.dates[this.dates.length - 1];
    }
    return undefined;
  }

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

  private buildNav(): void {
    const ul = this.root.querySelector('ul') as HTMLUListElement;
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    this.buttons = [];
    this.dates.forEach(day => {
      const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      const li = document.createElement('li');

      const btn = document.createElement('button');
      btn.type = 'button';
      const dateStr = this.pad(day.getDate()) + '.' + this.pad(day.getMonth() + 1);
      const isCurrentDay = day.getTime() == this.currentDate.getTime();
      btn.innerHTML = isCurrentDay ? WEEKDAYS[day.getDay()] + ', ' + dateStr : dateStr;
      btn.disabled = isCurrentDay;
      btn.addEventListener('click', () => {
        this.buttons.forEach(b => b.disabled = false);
        btn.disabled = true;
        this.currentDate = day;
      }, false);
      this.buttons.push(btn);

      li.appendChild(btn);
      ul.appendChild(li);
    });
  }

  private fillDates(startDate: Date, endDate: Date): void {
    this.dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      this.dates.push(new Date(d));
    }
    if (!this.dates.includes(this.currentDate)) {
      this.currentDate = startDate;
    }
    this.buildNav();
  }

  private onCurrentDateChanged(): void {
    this.buildNav();
    // TODO
  }

  public onStartDateChanged(startDate: Date): void {
    this.dates.unshift(startDate);
    this.fillDates(startDate, this.endDate);
  }

  public onEndDateChanged(endDate: Date): void {
    this.dates.push(endDate);
    this.fillDates(this.startDate, endDate);
  }

  public onNameChanged(): void { /* empty */ }
  public onBandCategoriesChanged(): void { /* empty */ }
  public onAdapterChanged(): void { /* empty */ }
  public onBandsChanged(): void { /* empty */ }

  // https://stackoverflow.com/a/12550320
  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
