export class DateNavigation {
  private static _instance: DateNavigation;
  public static get instance(): DateNavigation {
    if (!DateNavigation._instance) {
      DateNavigation._instance = new DateNavigation();
    }
    return DateNavigation._instance;
  }

  public setDates(startDate: Date, endDate: Date): void {
    this.fillDates(startDate, endDate);
  }

  public setSelectedDateChangedCallback(cb: (selectedDate: Date) => void): void {
    this.selectedDateChangedCallback = cb;
  }

  private root: HTMLElement;
  private dates = new Array<Date>();
  private buttons = new Array<HTMLButtonElement>();
  private selectedDateChangedCallback: (selectedDate: Date) => void = undefined;
  private _currentDate: Date;
  private get currentDate(): Date {
    return this._currentDate;
  }
  private set currentDate(currentDate: Date) {
    this._currentDate = currentDate;
    this.buildNav();
    if(this.selectedDateChangedCallback) {
      this.selectedDateChangedCallback(this._currentDate);
    }
  }

  private constructor() {
    this.root = document.getElementsByClassName('date-nav')[0] as HTMLElement;
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

  // https://stackoverflow.com/a/12550320
  private pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
