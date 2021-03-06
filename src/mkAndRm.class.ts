import { mkdir, rmdir, rm } from 'fs';
import CheckRoute from './checkRoute.class';

/**
 * # mk and rm | Primary parent class
 * This class watches changes on a certain user notes and notify them
 *
 * ## Features
 *
 * - directoryPath | string with the full path
 * - name | name of the file or directory endpoint
 *
 * ## Methods
 * - directoryPath(void) | returns String with complete path
 * - name(void) | returns String with endpoint name
 * - build(void) | creates a new directory in the path
 * - destroy(void) | deletes a file or directory in the path
 */

export default class MkAndRm {
  private _directoryPath: string;

  private _name: string;

  private _buildStatusMsg: string;

  private _destroyStatusMsg: string;

  constructor(directoryPath: string) {
    this._directoryPath = directoryPath;
    this._name = directoryPath
      .split('/')[directoryPath.split('/').length - 1];
    this._buildStatusMsg = '';
    this._destroyStatusMsg = '';
  }

  get directoryPath(): string { return this._directoryPath; }

  get name(): string { return this._name; }

  get buildStatusMsg(): string { return this._buildStatusMsg; }

  get destroyStatusMsg(): string { return this._destroyStatusMsg; }

  public build(): void {
    mkdir(this.directoryPath, async (error) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log(`New directory ${this.name} created`);
      }
    });
  }

  public destroy(): void {
    if (new CheckRoute(this.directoryPath).type === 'directory') {
      rmdir(this.directoryPath, async (error) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log(`Directory ${this.name} successfully deleted`);
        }
      });
    }
    if (new CheckRoute(this.directoryPath).type === 'file') {
      rm(this.directoryPath, async (error) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log(`File ${this.name} successfully deleted`);
        }
      });
    }
  }
}
