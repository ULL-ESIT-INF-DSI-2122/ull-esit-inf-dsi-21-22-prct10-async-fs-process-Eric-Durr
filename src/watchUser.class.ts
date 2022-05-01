import fs, { existsSync, watch } from 'fs';
/**
 * # Watch User Class | Primary parent class
 * This class watches changes on a certain user notes and notify them
 *
 * ## Features
 *
 * - user | name of the user to watch notes
 *
 * ## Methods
 * - user(void) | returns String with user name
 * - singleUserWatcher(void) | returns boolean of execution, runs directory singleUserWatcher events
 */

export default class WatchUserClass {
  private readonly _user: string;

  private _filesList: string[];

  constructor(user: string) {
    this._user = user;
    this._filesList = fs.readdirSync(`./database/${this.user}`);
  }

  get user(): string { return this._user; }

  get filesList(): string[] { return this._filesList; }

  private updateList(): void { this._filesList = fs.readdirSync(`./database/${this.user}`); }

  get singleUserWatcher(): boolean {
    if (existsSync(`./database/${this.user}`)) {
      console.log(`Watching notes changes for ${this.user}`);
      watch(`./database/${this.user}`, (eventType, filename) => {
        if (eventType === 'rename') {
          console.log(`\nRename on ${this.user} notes was detected`);
          this.manageRename(filename);
        }
        if (eventType === 'change') {
          console.log(`\nChange on ${this.user} notes was detected`);
          console.log(`Note ${filename} was edited for ${this.user}`);
        }
      });
      return true;
    }
    return false;
  }

  get fullDirectoryWatcher(): boolean {
    if (existsSync(`./database/${this.user}`)) {
      console.log('Watching notes changes for complete directory');
      watch(
        './database',
        // launches error ERR_FEATURE_UNAVAILABLE_ON_PLATFORM('watch recursively')
        // { recursive: true },
        (eventType, filename) => {
          if (eventType === 'rename') {
            console.log('\nRename on notes directory was detected');
            this.manageRename(filename.toString());
          }
          if (eventType === 'change') {
            console.log('\nChange on notes directory was detected');
            console.log(`Note ${filename} was edited for ${this.user}`);
          }
        },
      );
      return true;
    }
    return false;
  }

  private manageRename(filename: string) {
    const currFileNames: string[] = fs.readdirSync(`./database/${this.user}`);

    if (currFileNames.length > this.filesList.length) {
      console.log(`A new note was created for ${this.user}, new note is ${filename}`);
      // console.log('The file contains:');
      // console.log(fs
      //   .readFileSync(`./database/${this.user}/${filename}`)
      //   .toString());
    }
    if (currFileNames.length < this.filesList.length) {
      console.log(`Note ${filename} was deleted for ${this.user}`);
    }
    this.updateList();
  }
}
