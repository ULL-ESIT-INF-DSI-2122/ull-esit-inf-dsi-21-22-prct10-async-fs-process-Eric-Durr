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
 * - watcher(void) | returns boolean of execution, runs directory watcher events
 */

export default class WatchUserClass {
  private _user: string;

  constructor(user: string) {
    this._user = user;
  }

  get user(): string { return this._user; }

  get watcher(): boolean {
    if (existsSync(`./database/${this.user}`)) {
      console.log(`Watching notes changes for ${this.user}`);
      let prevFileNames: string[] = fs.readdirSync(`./database/${this.user}`);
      watch(`./database/${this.user}`, (eventType, filename) => {
        console.log(`\nChange on ${this.user} notes was detected`);
        if (eventType === 'rename') {
          const currFileNames: string[] = fs.readdirSync(`./database/${this.user}`);
          if (currFileNames.length > prevFileNames.length) {
            console.log(`A new note was created for ${this.user}, new note is ${filename}`);
          }
          if (currFileNames.length < prevFileNames.length) {
            console.log(`Note ${filename} was deleted for ${this.user}`);
          }
          if (currFileNames.length === prevFileNames.length) {
            console.log(`Note was renamed as ${filename} for ${this.user}`);
          }
          prevFileNames = fs.readdirSync(`./database/${this.user}`);
        }
        if (eventType === 'change') {
          console.log(`Note ${filename} was edited for ${this.user}`);
        }
      });
      return true;
    }
    return false;
  }
}
