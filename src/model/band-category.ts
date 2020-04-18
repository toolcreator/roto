import { Field } from 'sparkson';
import { Festival } from './festival';

export class BandCategory {
  constructor(
    @Field('name') private _name: string,
    @Field('color') private _color: string,
    public parent: Festival
  ) { /* empty */ }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this.parent.notifySubscribersOfBandCategoriesChange();
  }

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color;
    this.parent.notifySubscribersOfBandCategoriesChange();
  }
}
