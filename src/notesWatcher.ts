/**
 * # Ejercicio 3
 * A partir de la aplicación de procesamiento de notas desarrollada en la Práctica 9,
 * desarrolle una aplicación que reciba desde la línea de comandos el nombre de un
 * usuario de la aplicación de notas, así como la ruta donde se almacenan las notas
 * de dicho usuario. Puede gestionar el paso de parámetros desde la línea de comandos
 * haciendo uso de yargs. La aplicación a desarrollar deberá controlar los cambios
 * realizados sobre todo el directorio especificado al mismo tiempo que dicho usuario
 * interactúa con la aplicación de procesamiento de notas. Nótese que no hace falta
 * modificar absolutamente nada en la aplicación de procesamiento de notas. Es una
 * aplicación que se va a utilizar para provocar cambios en el sistema de ficheros.
 */

import WatchUserClass from './watchUser.class';

const usersWatcher: WatchUserClass = new WatchUserClass(process.argv[2]);

if (!usersWatcher.singleUserWatcher) {
  console.error(`ERROR: user ${process.argv[2]} was not found`);
}
