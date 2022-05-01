# PRACTICA 10 - Sistema de ficheros y creación de procesos en Node.js
>Informe para la asignatura de Desarrollo de Sistemas Informáticos
>
>>**Eric Dürr Sierra** - **eric.durr.20@ull.edu.es**
>>
>> **Última modificación**: 25/04/2022
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

- [PRACTICA 9 - Aplicación de procesamiento de notas de texto](#practica-9---aplicación-de-procesamiento-de-notas-de-texto)
  - [Enlace a la documentación generada con TypeDoc](#enlace-a-la-documentación-generada-con-typedoc)
  - [Indice](#indice)
  - [Introducción](#introducción)
  - [Objetivos](#objetivos)
  - [Actividades previas](#actividades-previas)
  - [Clases del programa](#clases-del-programa)
    - [Clase Note](#clase-note)
    - [Clase User](#clase-user)
  - [Programa principal](#programa-principal)
    - [Opción de creación de usuario](#opción-de-creación-de-usuario)
    - [Opción de creación de usuario](#opción-de-creación-de-usuario-1)
    - [Opción de adición de nota](#opción-de-adición-de-nota)
    - [Opción de edición de una nota](#opción-de-edición-de-una-nota)
    - [Opción de lectura de títulos](#opción-de-lectura-de-títulos)
    - [Opción de lectura de una nota](#opción-de-lectura-de-una-nota)
    - [Opción de eliminación de una nota](#opción-de-eliminación-de-una-nota)
  - [Para la ejecución](#para-la-ejecución)
  - [Referencias](#referencias)
  - [Estructura del directorio](#estructura-del-directorio)
  - [Comandos para la aplicación de notas](#comandos-para-la-aplicación-de-notas)
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
  ···
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

***

## Ejercicio 4 - Wrapper

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
- **npm run test:watch** `inicia la ejecución de los test unitarios de manera ininterrumpida`
- **npm run test:coverage** `inicia la ejecución de los test junto con la cobertura de código`
- **npm run get:coverage** `transforma el informe de la cobertura de código en formato lcov`
- **npm run build** `ejecuta los test y traduce el código TypeScript a JavaScript`
- **npm run docs** `Genera la documentación de código con TypeDoc del código fuente`
