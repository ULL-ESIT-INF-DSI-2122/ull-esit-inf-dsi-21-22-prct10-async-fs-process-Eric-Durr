import WatchUserClass from './watchUser.class';

const usersWatcher: WatchUserClass = new WatchUserClass(process.argv[2]);

if (!usersWatcher.watcher) {
  console.log(`error al abrir el fichero ${process.argv[2]}`);
}
