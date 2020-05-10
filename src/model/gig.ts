export class Gig {
  constructor(
    private _stage: string,
    private _start: Date,
    private _end: Date
  ) { /* empty */ }

  get stage(): string {
    return this._stage;
  }
  set stage(stage: string) {
    this._stage = stage;
  }

  get start(): Date {
    return this._start;
  }
  set start(start: Date) {
    if (!this.end || start <= this.end) {
      this._start = start;
    } else {
      throw new Error('start cannot be after end');
    }
  }

  get end(): Date {
    return this._end;
  }
  set end(end: Date) {
    if (!this.start || end >= this.start) {
      this._end = end;
    } else {
      throw new Error('end cannot be before start');
    }
  }
}
