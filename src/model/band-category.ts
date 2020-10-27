export class BandCategory {
  constructor(
    private _name: string,
    private _color: string,
    private _rank: number
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

  get rank(): number {
    return this._rank;
  }

  set rank(rank: number) {
    this._rank = rank;
  }
}
