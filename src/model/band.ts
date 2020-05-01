import { Gig } from './gig';

export class Band {
  constructor(
    private _name: string,
    private _category: string,
    private _gigs: Gig[]
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
