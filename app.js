const argv = require("./config/yargs").argv;
const colors = require("colors");

const porHacer = require("./por-hacer/por-hacer");

let comando = argv._[0];
// console.log(comando);
switch (comando) {
  case "crear":
    /* funcion que retorna una tarea por-hacer */
    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;
  case "listar":
    let listado = porHacer.getListado();

    for (let tarea of listado) {
      console.log("========Por Hacer====".green);
      console.log(tarea.descripcion);
      console.log("Estado: ", tarea.completado);
      console.log("====================".green);
    }

    break;

  case "actualizar":
    // console.log("Atualiza una tarea por hacer ");
    /* se almacena el resultado en una variable: */
    let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
    console.log(actualizado);
    break;


    case "borrar": 
    /* se almacena el resultado, de la función borrar: */
    /* recibe argumento: el comando "argv.descripcion" el cual esta definido en el yargs.js */
    /* ya que se borrara a partir de la coincidencia de la descripción que digite el usuario */
    let borrado = porHacer.borrar(argv.descripcion );
    console.log(borrado);/* esto va indicar si se logro hacer el borrado */

  default:
    console.log("Comando no es reconocido");
}
