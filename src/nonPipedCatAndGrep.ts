/**
 * # Ejercicio 2
 * Implemente un programa que devuelva el número de ocurrencias de una palabra
 * en un fichero de texto. Para acceder al contenido del fichero deberá expandir el
 * comando cat de Unix/Linux, además de expandir el comando grep con la salida
 * proporcionada por cat como entrada para obtener las líneas en las que se
 * encuentra la palabra buscada.
 */

import { spawn } from 'child_process';

const cat = spawn('cat', [process.argv[2]]);
const grep = spawn('grep', [process.argv[3]]);
cat.stdout.on('data', (data) => {
  console.log('enters grep writing');
  grep.stdin.write(data.toString(), (err) => {
    if (err) {
      console.error('ERROR while writing grep input');
      console.error(err.message);
      process.exit(1);
    }
    grep.stdin.end();
  });
  grep.stdout.on('data', (output) => {
    console.log(`The word ${process.argv[3]}`
      + ` appears ${output.toString().split(process.argv[3]).length - 1} times`
      + ` in ${process.argv[2]}`);
  });
});
