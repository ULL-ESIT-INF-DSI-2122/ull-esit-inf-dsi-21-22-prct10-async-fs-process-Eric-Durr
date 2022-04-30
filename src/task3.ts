import WatchUserClass from './watchUser.class';

const usersWatcher: WatchUserClass = new WatchUserClass(process.argv[2]);

if (!usersWatcher.singleUserWatcher) {
  console.error(`ERROR: user ${process.argv[2]} was not found`);
}
