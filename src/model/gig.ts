import { Field, DateClass } from "sparkson";

export class Gig {
  constructor(
    @Field('stage') private _stage: string,
    @Field('start') private _start: DateClass,
    @Field('end') private _end: DateClass
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
