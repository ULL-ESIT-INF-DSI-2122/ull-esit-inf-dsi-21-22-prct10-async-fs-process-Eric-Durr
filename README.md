# PRACTICA 10 - Sistema de ficheros y creación de procesos en Node.js
>Informe para la asignatura de Desarrollo de Sistemas Informáticos
>
>>**Eric Dürr Sierra** - **eric.durr.20@ull.edu.es**
>>
>> **Última modificación**: 1/05/2022
> 
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr)

***CI STATUS***

[![Deploy report](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/deploy.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/deploy.yml)
[![Sonar-Cloud Analysis](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/sonarcloud.yml)
[![Test and coverage](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/runtests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-Eric-Durr/actions/workflows/runtests.yml)

***

## [Enlace a la documentación generada con TypeDoc](http://dsi-p10-code-docs.surge.sh/modules.html)

## Indice

- [PRACTICA 10 - Sistema de ficheros y creación de procesos en Node.js](#practica-10---sistema-de-ficheros-y-creación-de-procesos-en-nodejs)
  - [Enlace a la documentación generada con TypeDoc](#enlace-a-la-documentación-generada-con-typedoc)
  - [Indice](#indice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Actividades previas](#actividades-previas)
  - [Ejercicio 1 - Traza de código asíncrono](#ejercicio-1---traza-de-código-asíncrono)
    - [Traza](#traza)
  - [Ejercicio 2 - Ocurrencias](#ejercicio-2---ocurrencias)
  - [Ejercicio 3 - Watch de notas](#ejercicio-3---watch-de-notas)
  - [Ejercicio 4 - Wrapper](#ejercicio-4---wrapper)
  - [Referencias](#referencias)
  - [Estructura del directorio](#estructura-del-directorio)
  - [Comandos npm del repositorio](#comandos-npm-del-repositorio)

***

## Introducción

El siguiente documento pretende servir de registro y justificación
para las soluciones desarrolladas para los ejercicios de la práctica,
además de explicar algunas de las cuestiones planteadas a lo largo del
guión.

***

## Objetivos

El objetivo de la décima práctica es hacer uso de la API asíncrona de NodeJS
para la manipulación del sistema de ficheros y para la creación de procesos
en NodeJS.

Para el final de la práctica se espera que el proyecto cuente con:

- Soluciones a los cuatro ejercicios del guión.
- Todas las preguntas resueltas.
- Documentación autogenerada.
- Tests para las clases desarrolladas
- Configuraciones para las herramientas de calidad y cobertura de código
- Ficheros de automatización de procesos de integración continua para Github Actions 

***

## Actividades previas

Entre las actividades previas se encuentra la aceptación de la asignación de la tarea en Github Classroom,
la configuración del repositorio y la práctica de los módulos de la API de NodeJS.

***

## Ejercicio 1 - Traza de código asíncrono

En primer lugar, la función comprueba que se han añadido la cantidad de argumentos esperados, una vez se pasa esa
condición se hace uso de la función `access` del módulo de NodeJS para el sistema de ficheros (`fs`) cuyo cometido
es comprobar si el proceso principal es capaz de abrir un fichero, en caso de error se notifica al usuario de que el
documento indicado no existe. 

Si no se produce ningún error se ejecuta el método `watch()` del mismo módulo para vigilar la interacción que se
produzca con el fichero indicado de forma asíncrona. De esta manera, cada vez que se lance un evento de tipo 'change',
es decir que se modifique este fichero, se notifica imprimiendo por pantalla información al respecto.

Por otro lado, el objeto `constants` que se importa contiene, a grandes rasgos, constantes de configuración para
seleccionar el modo de apertura del fichero en el método access. En este caso se extrae del enum `constants.F_OK` para
indicar que el fichero es visible para el proceso que lo llama sin tener que asignar permisos **rwx**.

### Traza

**Caso de no indicar fichero**

ITERACIÓN 0: Todas las estructuras vacías

```txt
         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 1: Ejecución del `console.log('Please, specify a file')`

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('Please, spec..') │ └──────────────┘
└───────────────────────────────┘ 

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 2: Se vacía de nuevo la pila de llamadas tras ejecutar el `console.log()`

```txt
         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

**Caso de un fichero no existente**

ITERACIÓN 0: Todas las estructuras vacías

```txt
         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 1: Se almacena en la API de eventos la llamada a access

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ access(...)  │
                                  └──────────────┘

         COLA DE MANEJADORES
┌─────────────┐
│ (err) => {} │
└─────────────┘
```

ITERACIÓN 2: Ejecución del `console.log('File ejemplo.txt does not exist')`

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('File, ...')      │ └──────────────┘
└───────────────────────────────┘ 

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 3: Se vacía de nuevo la pila de llamadas tras ejecutar el `console.log()`

```txt
         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

**Caso de modificar dos veces un fichero existente**


ITERACIÓN 0: Todas las estructuras vacías

```txt
         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 1: Se almacena en la API de eventos la llamada a access

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ access(...)  │
                                  └──────────────┘

         COLA DE MANEJADORES
┌─────────────┐
│ (err) => {} │
└─────────────┘
```

ITERACIÓN 2: Ejecución del `console.log('Starting to watch file ejemplo.txt')`

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('Starting to...') │ └──────────────┘
└───────────────────────────────┘ 

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 3: Asignación a watcher de la llamada del método `watch()`;

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 4: Registro del manejo del evento 'change';

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  │ on('change') │
                                  └──────────────┘

         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 5: registro de un evento de cambio en el archivo

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  │ on('change') │
                                  └──────────────┘
                                      ↓ 'change'
         COLA DE MANEJADORES
┌─────────────────────┐
│ change 1 : () => {} │
└─────────────────────┘
```

ITERACIÓN 6: inserción de `console.log('File ejemplo.txt is no longer watched');`

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('File ejempl...') │ │ watch(...)   │
└───────────────────────────────┘ └──────────────┘
                                  

         COLA DE MANEJADORES
┌─────────────────────┐
│ change 1 : () => {} │
└─────────────────────┘
```

ITERACIÓN 7: segundo registro de un evento de cambio en el archivo

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('File ejempl...') │ │ watch(...)   │
└───────────────────────────────┘ │ on('change') │
                                  └──────────────┘
                                      ↓ 'change'
         COLA DE MANEJADORES
┌─────────────────────────────────────────────┐
│ change 1 : () => {} |←| change 2 : () => {} │
└─────────────────────────────────────────────┘
```

ITERACIÓN 8: liberación de la pila de llamadas

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  └──────────────┘
                                      
         COLA DE MANEJADORES
┌─────────────────────────────────────────────┐
│ change 1 : () => {} |←| change 2 : () => {} │
└─────────────────────────────────────────────┘
```

ITERACIÓN 9: El bucle de eventos activa el primer manejador registrado en la cola para
ejecutar el `console.log('File ejemplo.txt has been modified somehow')` 

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('File ejempl...') │ │ watch(...)   │
└───────────────────────────────┘ └──────────────┘
                                  
  ↑ change 1 : () => {}              
         COLA DE MANEJADORES
┌─────────────────────┐
│ change 2 : () => {} │
└─────────────────────┘
```


ITERACIÓN 10: Se ejecuta la sentencia de la iteración anterior liberando la pila

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  └──────────────┘
                 
         COLA DE MANEJADORES
┌─────────────────────┐
│ change 2 : () => {} │
└─────────────────────┘
```

ITERACIÓN 11: El bucle de eventos activa el segundo manejador registrado en la cola para
ejecutar el `console.log('File ejemplo.txt has been modified somehow')`

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
│ console.log('File ejempl...') │ │ watch(...)   │
└───────────────────────────────┘ └──────────────┘
                                  
  ↑ change 2 : () => {}              
         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 12: Se ejecuta la sentencia de la iteración anterior liberando la pila

```txt

         PILA DE LLAMADAS          API DE EVENTOS
┌───────────────────────────────┐ ┌──────────────┐
└───────────────────────────────┘ │ watch(...)   │
                                  └──────────────┘
                 
         COLA DE MANEJADORES
┌──┐
│  │
└──┘
```

ITERACIÓN 13: Se cierra el programa liberando todas las estructuras, fin de la ejecución.

NOTA: Aunque sea muy dificil de provocar por la velocidad a la que se ejecutan las sentencias se expone una situación
en que los cambios en el fichero se producen durante la llamada de `console.log('File ejemplo.txt is no longer watched')`
 de cara a producir una traza en la que se visualice bien la interacción del bucle de eventos a la hora de gestionar la
asignación de sentencias a ejecutar.

***

## Ejercicio 2 - Ocurrencias

Para este ejercicio se desarrollan dos programas distintos, uno para mostrar un ejemplo de ejecución con uso de tuberías
y otro íntegramente basado en el uso de registro de eventos. Para este caso, ya que son programas bastante cortos, no se
desarrollan clases donde registrar y controlar las acciones.

La versión más corta y sencilla del programa es la que hace uso de tuberías, ya que basta con registrar en variables
la ejecución de los subprocesos **cat** y **grep** mediante la función `spawn()` del módulo `child_process` y desviar la
salida estandar (propiedad `stdout`) del subproceso **cat** a la entrada estandar (propiedad `stdin`) del subproceso 
**grep**. 

```TypeScript
const cat = spawn('cat', [process.argv[2]]);
const grep = spawn('grep', [process.argv[3]]);
cat.stdout.pipe(grep.stdin);
```

Tras esto último se registra el evento 'data' de la salida estandar del subproceso **grep**
 para componer un array de palabras a partir de los datos del Buffer obtenido en la callback y, mediante programación
funcional contar el número de ocurrencias de la palabra indicada por línea de comandos.

```TypeScript
grep.stdout.on('data', (data) => {
  console.log(`The word ${process.argv[3]}`
    + ` appears ${data.toString().split(process.argv[3]).length - 1} times`
    + ` in ${process.argv[2]}`);
});
```
Por otro lado, si se pretende evitar el uso de las tuberías es necesario manejar la escritura de la entrada estandar del
subproceso **grep** de "forma manual". En lugar de redirigir con una tubería la salida del subproceso **cat** es
necesario registrar cuando esta emite información, en otras palabras cuando emite un evento 'data'

```TypeScript
cat.stdout.on('data', (data) => {
  ...
});
```

Es entonces cuando los datos del Buffer deben ser escritos en la entrada estandar del subproceso **grep** por medio del
método `write()` que la propiedad `stdin` posee. La callback de este método será la que maneje los errores producidos
durante la escritura y, cuando ningún error se emita, lanzar una señal de evento de tipo 'end' por medio del método
`end()` de la propiedad `stdin` y así permitir continuar la ejecución del subproceso.

El registro de la salida del subproceso **grep** es igual a la otra versión del programa, ya que es la única forma de
capturar la salida para formatearla y emitir el número de ocurrencias. 

***

## Ejercicio 3 - Watch de notas

Para este ejericio el programa principal sólo se encarga de manejar que la ejecución del watcher es satisfactoria,
quedando bastante reducido al utilizar una clase que gestiona esta acción.

```ts
import WatchUserClass from './watchUser.class';

const usersWatcher: WatchUserClass = new WatchUserClass(process.argv[2]);

if (!usersWatcher.singleUserWatcher) {
  console.error(`ERROR: user ${process.argv[2]} was not found`);
}
```

La clase se diseña para, a partir de un nombre de usuario, obtener la lista de ficheros del usuario y construir un
accesor para vigilar la interacción dentro del directorio del usuario. El método devuelve `true` o `false` en función de
si se consigue abrir la ruta del usuario, es decir, si existe el usuario.

Una vez se activa el watcher se notifica por medio de un `console.log()` y se manejan los eventos 'rename' y 'change'.
Cuando se lanza un evento 'change' implica que un archivo ha sido editado, el nombre del archivo se vuelca en la
variable `filename`, lo cual se usa para notificar exactamente el documento editado a la hora de notificar esta
interacción.

Cuando se lanza un evento de tipo 'rename' es indicativo de que el fichero se ha renombrado, eliminado o añadido. En
este caso se acude al método privado auxiliar `manageRename()` dentro del cual se detecta si se ha añadido o eliminado
un fichero comparando las longitudes de dos listas de ficheros. Si la lista actual es mayor que la propiedad de la clase
quiere decir que se ha añadido un fichero, si es menor implica que se ha eliminado un fichero. En cualquier caso, tras 
notificar de lo ocurrido se actualiza la lista del objeto.

Si se quisiera mostrar el contenido de un fichero añadido, dentro del condicional que registra el crecimiento de la
lista, se debe mostrar la salida de la instrucción `fs.readFileSync(`./database/${this.user}/${filename}`).toString()`
por pantalla.

```ts
  manageRename(filename: string) {
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
```

Otra de las cuestiones es vigilar un directorio y los cambios para sus subdirectorios, para lo cual es necesario añadir
un parámtero de opción a la ejecución de la función `watch()`. Se añade el objeto `{ recursive: true }` para activar la
vigilancia en los subdirectorios, cosa que lamentablemente no es posible actualmente en entornos linux, ya que emite el
error `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM('watch recursively')`.

***

## Ejercicio 4 - Wrapper

Este ejercicio hace uso de dos clases diseñadas para envolver la gestión de algunos de los comandos mientras que otros
son ejecutados directamente por su simplicidad. Se ha optado por este desarrollo al querer evitar construir clases y
añadir complejidad a interfaces que mediante métodos encadenados se pueden controlar perfectamente.

La primera clase desarrollada se plantea para abstraer la comprobación de la naturaleza de una ruta, es decir si es un
directorio, un archivo o ninguno de ellos. La clase CheckRoute posee una propiedad `route` que contiene la dirección
terminal que se quiere comprobar y el atributo `type` contiene la información del tipo. Este último es asignado en el
contructor y en la reassignación del valor de `route` al ejecutar el método `setType()`, por defecto el tipo contiene
'none'.

Para establecer el tipo setType() primero comprueba que la ruta represente un punto existente en el sistema de ficheros,
en caso negativo se asigna 'none', en otro caso se comprueba si es un fichero por medio de la sentencia
`lstatSync(this._route).isDirectory()` o un directorio haciendo uso de `lstatSync(this._route).isFile()`.

La siguiente clase desarrollada tiene como objetivo simplificar la creación de directorios y la eliminación de ficheros
o directorios. MkAndRm separa en dos propiedades la ruta indicada como parámetro para extraer el nómbre del final de la
ruta y usarlo al notificar de las acciones tomadas.

El método `build()` construye a partir del atributo `directoryPath` un directorio haciendo uso de la función `mkdir` del
módulo `fs` y capturando el error, si es emitido, para notificarlo al usuario por consola.

El método `destroy()` también hace uso de la ruta pero comprueba por medio de la clase CeckRoute antes explicada para
proceder distinto si se trata de un directorio o un fichero. En el caso de que sea un directorio se invoca la función 
`rmdir()` del sistema de ficheros procediendo de manera similar al método `build()` a la hora de notificar al usuario 
del progreso del programa. En caso de que se trate de un fichero se procede exactamente igual pero haciendo uso de la
función `rm()`.

Las opciones de ejecución de ls y cat simplemente se ejecutan y se captura el evento 'data' de su propiedad `stdout`
para mostrar el contenido del Buffer por consola.

Para la copia de ficheros o directorios se maneja el tipo de archivo de la ruta origen para que en caso de no contener 
ni un fichero ni un directorio el programa así lo notifique y, para en otro caso proceder de la forma adecuada con el
comando `cp`. Cuando es un directorio se hace uso de `spawn()` para ejecutar cp con el argumento '-r' a parte de las dos
rutas y capturando el evento 'data' para mostrar la salida estandar de estos procesos por la salida estandar del proceso
principal.

En caso de que se introduzca una opción no contemplada el usuario recibirá un mensaje que le haga conocer este efecto.

***

## Referencias

[Guión de la práctica](https://ull-esit-inf-dsi-2122.github.io/prct10-async-fs-process/)

[NodeJS API - child_process: subprocess stdin](https://nodejs.org/api/child_process.html#subprocessstdin)

## Estructura del directorio

***

```txt
P10/
|____.github/         (Github actions workflow files)
| |____workflows/
| | |____deploy.yml
| | |____runtests.yml
| | |____sonarcloud.yml
|____dist/            (Transpiled JavaScript code)
|____doc/             (Autogenerated TypeDoc documentation files)
|____docs/            (Assingment report folder)
| |_____config.yml
| |____README.md
|____src/             (Source files for TypeScript code)
|____test/            (Test workbench folder)
|____package.json
|____.gitignore
|____.mocharc.json
|____.eslintrc.json
|____typedoc.json
|____sonar-project.properties
|____tsconfig.json

```

## Comandos npm del repositorio

- **npm test**  `ejecuta los test unitarios`
- **npm run task-1 [file]** `ejecuta el código del ejercicio 1`
- **npm run task-2-piped [file]** `ejecuta la versión con tuberías del ejercicio 2`
- **npm run task-2-no-pipe [file]** `ejecuta la versión sin tuberías del ejercicio 2`
- **npm run task-3 [user]** `ejecuta el watcher para las notas del usuario indicado`
- **npm run task-4 [option] [arg]** `ejecuta la acción del ejercicio 4 especificada`
  - test-path [path] `examinar si una ruta contiene un fichero o un directorio`
  - mkdir [path/to/dirname] `crear un directorio en la ruta indicada con el nombre al final`
  - ls [path] `listar los ficheros de la ruta indicada`
  - cat [path/to/filename] `listar el contenido del fichero indicado`
  - auto-rm [path/to/filename or path/to/dirname] `eliminar el fichero o directorio indicado`
  - auto-cp [path/to/filename or path/to/dirname] [path/to/dirname] `copiar el fichero o directorio en la ruta indicada`
- **npm run test:watch** `inicia la ejecución de los test unitarios de manera ininterrumpida`
- **npm run test:coverage** `inicia la ejecución de los test junto con la cobertura de código`
- **npm run get:coverage** `transforma el informe de la cobertura de código en formato lcov`
- **npm run build** `ejecuta los test y traduce el código TypeScript a JavaScript`
- **npm run docs** `Genera la documentación de código con TypeDoc del código fuente`
