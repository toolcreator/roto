export class BandCategory {
  constructor(
    private _name: string,
    private _color: string,
    private _rank: number,
    private _clash: boolean
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

  get clash(): boolean {
    return this._clash;
  }
  set clash(clash: boolean) {
    this._clash = clash;
  }
}
