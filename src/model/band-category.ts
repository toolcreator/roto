export class BandCategory {
  constructor(
    private _name: string,
    private _color: string
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
