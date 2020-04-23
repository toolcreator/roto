import { Field } from 'sparkson';

export class BandCategory {
  constructor(
    @Field('name') private _name: string,
    @Field('color') private _color: string
  ) { /* empty */ }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
  }
}
