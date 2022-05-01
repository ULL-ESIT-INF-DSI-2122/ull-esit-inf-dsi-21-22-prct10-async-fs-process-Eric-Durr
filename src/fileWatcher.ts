/**
 * Considere el siguiente ejemplo de código fuente TypeScript que hace uso
 * del módulo fs de Node.js:
 */

import { access, constants, watch } from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}

/**
 * En primer lugar, ejecute el programa para tratar de comprender qué hace.
 *
 * A continuación, realice una traza de ejecución mostrando, paso a paso, el contenido de
 * la pila de llamadas, el registro de eventos de la API y la cola de manejadores, además
 * de lo que se muestra por la consola. Para ello, simule que se llevan a cabo, como mínimo,
 * dos modificaciones del fichero helloworld.txt a lo largo de la ejecución. ¿Qué hace la
 * función access? ¿Para qué sirve el objeto constants?
 *
 * Para llevar a cabo este ejercicio, se recomienda repasar el comportamiento del bucle de
 * eventos de Node.js haciendo uso, por ejemplo, del siguiente recurso.
 */
