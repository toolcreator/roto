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
    this._start = start;
  }

  get end(): Date {
    return this._end;
  }
  set end(end: Date) {
    this._end = end;
  }
}
