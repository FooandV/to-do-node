const fs = require("fs");

/* todas las notas las voy almacenar en un arreglo, ese arreglo va permitir:
mostrar listados, trabajar con cada una de las notas de forma independiente... */
let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile("db/data.json", data, err => {
    if (err) {
      throw new Error("No se pudo grabar", err);
    }
  });
};

/* proceso inverso, leer el .json y retornarlo al array "listadoPorHacer" */
const cargarDB = () => {
  try {
    listadoPorHacer = require("../db/data.json");
  } catch (error) {
    /* cuando se grabe siempre va haber un arreglo vacio en el .json:*/
    listadoPorHacer = [];
  }
};

/* al ejecutar la función se debe de crear un nuevo "por-hacer" y agregarse en
el listadoPorHacer[] */
const crear = descripcion => {
  cargarDB();
  let porHacer = {
    descripcion: descripcion,
    completado: false
  };
  /* push: para insertar en el array las tareas */
  listadoPorHacer.push(porHacer);

  guardarDB();

  return porHacer; /* para retornar algo o tener una retroalimentacion de que se acaba de crear */
};

const getListado = () => {
  cargarDB();
  return listadoPorHacer;
};
/* funcion que recibe 2 argumentos, 
descripcion, completado
permitira actualizar las tareas que se encuentran pendientes por hacer */
const actualizar = (descripcion, completado = true) => {
  /* 1. se carga la bd: Es decir cargar el arreglo en el listado "por-hacer" */
  cargarDB();
  /* 2. buscar en el arreglo de "listadoPorHacer" lo que coincida con la 
  descripción que la persona esta enviando */

  /* 
  finIndex()= El método findIndex () devuelve el índice del primer elemento en 
  una array que pasa una prueba (proporcionada como una función).
  array.findIndex(function(currentValue, index, arr), thisValue)
 */
  /* recibira un callback que sera un ciclo interno
  por cada uno de los elementos */
  /*dentro de esta callback estara la lógica de como voy a encontrar un elemento 
  particular:  */
  let index = listadoPorHacer.findIndex(
    tarea => tarea.descripcion === descripcion
  );

  /* si la posición de la tarea no coincide
    regresara un "-1" lo cual indica que no lo encontro, y cualquier número ya sea
    el 0 para arriba me va decir cual es esa posición index del elemento */

  if (index >= 0) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};
/* funcion que borra una tarea */
const borrar = descripcion => {
  /* 1.cargar la bd */
  cargarDB();
  /* filter: 
  Devuelve los elementos de una array que cumplen la condición especificada 
  en una función de devolución de llamada.. ya sea quitar o filtrar un elemento y regresa 
  un nuevo arreglo
  array.filter(function(currentValue, index, arr), thisValue)
*/
  let nuevoListado = listadoPorHacer.filter(tarea  => 
    /* se va regresar cada uno de los elmentos que NO coincidan: */
      tarea.descripcion !== descripcion /* descripción que se esta recibiendo */
  ) 
      /* condición que quiere decir que nada se borro: */
    if (listadoPorHacer.length === nuevoListado.length){
      return false;
    }else{
      /* quiere decir que si lo borro y debo de grabarlo en la bd */
      listadoPorHacer = nuevoListado;
      guardarDB();
      return true
    }
  }
  
module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
};
