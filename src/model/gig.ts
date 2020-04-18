import { Field, DateClass } from "sparkson";
import { Band } from "./band";

export class Gig {
  constructor(
    @Field('stage') private _stage: string,
    @Field('start') private _start: DateClass,
    @Field('end') private _end: DateClass,
    public parent: Band
  ) { /* empty */ }

  get stage(): string {
    return this._stage;
  }
  set stage(stage: string) {
    this._stage = stage;
    this.parent.parent.notifySubscribersOfBandsChange();
  }

  get start(): Date {
    return this._start;
  }
  set start(start: Date) {
    this._start = start;
    this.parent.parent.notifySubscribersOfBandsChange();
  }

  get end(): Date {
    return this._end;
  }
  set end(end: Date) {
    this._end = end;
    this.parent.parent.notifySubscribersOfBandsChange();
  }
}
