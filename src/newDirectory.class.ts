import { mkdir, rmdir } from 'fs';
import { spawn } from 'child_process';

export default class NewDirectory {
  private _directoryPath: string;

  private _directoryName: string;

  private _buildStatusMsg: string;

  private _destroyStatusMsg: string;

  constructor(directoryPath: string) {
    this._directoryPath = directoryPath;
    this._directoryName = directoryPath
      .split('/')[directoryPath.split('/').length - 1];
    this._buildStatusMsg = '';
    this._destroyStatusMsg = '';
  }

  get directoryPath(): string { return this._directoryPath; }

  get directoryName(): string { return this._directoryName; }

  get buildStatusMsg(): string { return this._buildStatusMsg; }

  set buildStatusMsg(value: string) { this._buildStatusMsg = value; }

  get destroyStatusMsg(): string { return this._destroyStatusMsg; }

  set destroyStatusMsg(value: string) { this._destroyStatusMsg = value; }

  public build(): void {
    mkdir(this.directoryPath, async (error) => {
      if (error) {
        console.error(error.message);
      }
    });
  }

  public destroy(): void {
    rmdir(this.directoryPath, async (error) => {
      if (error) {
        console.error(error.message);
      }
    });
  }
}
