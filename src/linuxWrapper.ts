/**
 * # Ejercicio 4
 * Desarrolle una aplicación que permita hacer de wrapper de los distintos
 * comandos empleados en Linux para el manejo de ficheros y directorios.
 * En concreto, la aplicación deberá permitir:
 *
 *     - Dada una ruta concreta, mostrar si es un directorio o un fichero.
 *     - Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.
 *     - Listar los ficheros dentro de un directorio.
 *     - Mostrar el contenido de un fichero (similar a ejecutar el comando cat).
 *     - Borrar ficheros y directorios.
 *     - Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso,
 *       la aplicación recibirá una ruta origen y una ruta destino.
 *       En caso de que la ruta origen represente un directorio,
 *       se debe copiar dicho directorio y todo su contenido a la ruta destino.
 */

import { spawn } from 'child_process';
import CheckRoute from './checkRoute.class';
import NewDirectory from './newDirectory.class';

switch (process.argv[2]) {
  case 'test-path':
    if (new CheckRoute(process.argv[3]).type === 'none') {
      console.log('The path doesn\'t contain a file nor a directory');
    } else {
      console.log(`The path shows a ${new CheckRoute(process.argv[3]).type}`);
    }
    break;
  case 'mkdir':
    new NewDirectory(process.argv[3]).build();
    break;
  case 'ls':
    spawn('ls', ['-lah', process.argv[3]]).stdout.on('data', (data) => {
      console.log(data.toString());
    });
    break;
  case 'cat':
    spawn('cat', [process.argv[3]]).stdout.on('data', (data) => {
      console.log(data.toString());
    });
    break;
  default:
    break;
}
