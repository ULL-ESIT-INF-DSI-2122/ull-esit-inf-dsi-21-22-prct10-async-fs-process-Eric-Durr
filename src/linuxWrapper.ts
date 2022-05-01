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

import CheckRoute from './checkRoute.class';

const directoryRoute: CheckRoute = new CheckRoute('./database');
directoryRoute.setType();
