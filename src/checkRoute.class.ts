import { existsSync, lstatSync } from 'fs';

export default class CheckRoute {
  private _type: 'directory' | 'file' | 'none';

  private _route: string;

  constructor(route: string) {
    this._route = route;
    this._type = 'none';
    this.setType();
  }

  get route(): string { return this._route; }

  set route(value: string) {
    this._route = value;
    this.setType();
  }

  get type(): 'directory' | 'file' | 'none' { return this._type; }

  public setType(): void {
    if (!existsSync(this._route)) {
      this._type = 'none';
    } else if (lstatSync(this._route).isDirectory()) {
      this._type = 'directory';
    } else if (lstatSync(this._route).isFile()) {
      this._type = 'file';
    }
  }
}
