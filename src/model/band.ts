import { Gig } from './gig';
import { Field, ArrayField } from 'sparkson';

export class Band {
  constructor(
    @Field('name') private _name: string,
    @Field('category') private _category: string,
    @ArrayField('gigs', Gig) private _gigs: Gig[]
  ) { /* empty */ }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

  get category(): string {
    return this._category;
  }
  set category(category: string) {
    this._category = category;
  }

  get gigs(): Gig[] {
    return this._gigs;
  }
  set gigs(gigs: Gig[]) {
    this._gigs = gigs;
  }
}
