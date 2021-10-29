let something = (function () {
  let cursosSeleccionados = []
  let executed = false;

  function wipeOut() {
    localStorage.setItem("inscripciones", JSON.stringify([]) )
    let cursosSeleccionados = []
  }

  function execution() {
    if (!executed) {
      executed = true;
      localStorage.setItem("inscripciones", JSON.stringify(this.cursosSeleccionados) )
    }
  }

  return {
    execution,
    wipeOut
  }
})();


let cursosArray = [];


async function todaLaAscincroniaPiola(){

  await $.get("https://6154eb422473940017efb016.mockapi.io/cursos", (peticion) => {

   peticion.forEach( (curso) => {

      cursosArray.push( new Curso(curso.id, curso.nombre, curso.valor, curso.alumnosAnotados) )

    })
  })

  try {

    let divCursoId = 1

    for (cursos of cursosArray) {

      const curso = document.createElement("div")
      const contenedorCursos = document.getElementById("contenedorCursos")

      curso.className = "curso"
      curso.id = "curso" + divCursoId

      curso.setAttribute("onclick", `setModal(${divCursoId})`)
      contenedorCursos.appendChild(curso);

      divCursoId++

    }

    console.log("campot")

  }

  catch(error) {

    console.log(error)

  }

  /* -----------------------------------------------slideDown----------------------------------------------------------------- */

  $("#botonAnotate").click( () => {

    $("#cursos").slideDown("ease")
    $("#footer").slideDown("ease")

  })


  /* -----------------------------------------------HOVER-----------------------------------------------------------------*/


  let getHover = document.getElementsByClassName("curso")
  let index = 0
  let hoverId = 1


  for (divs of getHover) {

    const hover = document.createElement("div")
    hover.id = "hover" + hoverId
    hover.className = "hoverCursos"
    hover.innerHTML = `<p> ${cursosArray[index].nombre} </p>`
    divs.appendChild(hover);
    index++
    hoverId++

  }


  /* ----------------------------HOVERS------------------------------- */



  const cursoCalistenia = document.getElementById("curso1")
  const hoverCurso1 = document.getElementById("hover1")


  cursoCalistenia.onmouseover = () => {
    hoverCurso1.classList.toggle("hoverCursosVisible")
  }

  cursoCalistenia.onmouseout = () => {
    hoverCurso1.classList.toggle("hoverCursosVisible")
  }

  /* ------------------------------------------------------------------------- */

  const cursoAerobico = document.getElementById("curso2")
  const hoverCurso2 = document.getElementById("hover2")


  cursoAerobico.onmouseover = () => {
    hoverCurso2.classList.toggle("hoverCursosVisible")

  }

  cursoAerobico.onmouseout = () => {
    hoverCurso2.classList.toggle("hoverCursosVisible")

  }


  /* ------------------------------------------------------------------------- */

  const cursoCrossfit = document.getElementById("curso3")
  const hoverCurso3 = document.getElementById("hover3")


  cursoCrossfit.onmouseover = () => {
    hoverCurso3.classList.toggle("hoverCursosVisible")

  }

  cursoCrossfit.onmouseout = () => {
    hoverCurso3.classList.toggle("hoverCursosVisible")
  }

}


todaLaAscincroniaPiola()







/* ----------------------------------funcion set modal----------------------------------------------- */

function setModal (id) {

  let crearDivModal = document.createElement("div");
  let crearDivTraslucido = document.createElement("div");
  let title = document.createElement("h3")
  let valorCurso = document.createElement("p")
  let crearLabel = document.createElement("label")
  let crearInput = document.createElement("select")
  let precioEnCuotas = document.createElement("p")

  crearInput.setAttribute("id", "cuotas")
  crearInput.setAttribute("onchange",`cuotas(${id})`)

  valorCurso.setAttribute("id", "precioCurso")

  title.innerHTML = cursosArray[id - 1].nombre

  valorCurso.innerHTML = "precio: " + cursosArray[id - 1].valor

  crearLabel.innerHTML = "cuotas"
  crearInput.innerHTML = `<option value = 3> 3 </option>
                          <option value = 6> 6 </option>
                          <option value = 12> 12 </option>`

  precioEnCuotas.id = "precioEnCuotas"


  /* -------------------------------boton cerrar---------------------------------------- */


  let botonCerrar = document.createElement("button");
  botonCerrar.classList.add("boton")
  botonCerrar.innerHTML = "cerrar"
  botonCerrar.setAttribute("onclick", "removeModal()")



 /* ---------------------------------------boton inscripcion-------------------------------------------------- */


  const botonInscripcion = document.createElement("button")
  botonInscripcion.classList.add("boton")
  botonInscripcion.innerHTML = "Inscribirse"
  botonInscripcion.setAttribute("onclick", `inscripcion(  ${id} )`)
  botonInscripcion.id = "botonInscripcion"


/* -------------------------------------contenido modal---------------------------------------------------------------- */

  crearDivModal.appendChild(title)
  crearDivModal.appendChild(valorCurso)
  crearDivModal.appendChild(precioEnCuotas)
  crearDivModal.appendChild(crearLabel)
  crearDivModal.appendChild(crearInput)
  crearDivModal.appendChild(botonInscripcion)
  crearDivModal.appendChild(botonCerrar)


  crearDivModal.classList.add("modal");
  crearDivModal.setAttribute("id","boardId")

  crearDivTraslucido.classList.add("traslucido")
  crearDivTraslucido.setAttribute("id","traslucidoId")

  document.body.appendChild(crearDivModal)
  document.body.appendChild(crearDivTraslucido)

}


/* -------------------------------funcion cerrar modal / deletear divs-------------------------------------------------- */

function removeModal(){

  try{

    let div = $('#traslucidoId')
    let board = $('#boardId')
    div.remove()
    board.remove()

  }

  catch(error){

    console.log(error,'Hubo un error');

  }
}


/*---------------------------------------funcion cuotas-------------------------------------------------------*/



function cuotas (id) {

  const precioEnCuotas = $('#precioEnCuotas')
  const inputValue = $("#cuotas").val()
  precioEnCuotas.html("Cada cuota valdrá $" + Math.floor(cursosArray[id - 1].valor / inputValue ) )

}


/*-----------------------------funcion inscripcion------------------------------------*/

function inscripcion (id) {

  function comprobacionCursosAnotados(cursosSeleccionados, nuevaSeleccion) {

    for (let i = 0; i < cursosSeleccionados.length; i++) {
      if (nuevaSeleccion == cursosSeleccionados[i].curso.id) {
        return false

      }
    }
    return true

  }


  let cursoSeleccionado = cursosArray.find( (curso) => curso.id == id);

  let cursosFromLocal = JSON.parse(localStorage.inscripciones)

  if (comprobacionCursosAnotados(cursosFromLocal, id) ){

    if (cursoSeleccionado.nuevoAlumno() ) {

      window.location.href=`datosInscripcion.html?nombre=${cursoSeleccionado.nombre}&precio=${cursoSeleccionado.valor}&id=${cursoSeleccionado.id}`


    }

  }else{

    swal("Atento!", "Ya se ha anotado", "warning");
    document.getElementById("botonInscripcion").disabled = true
  }

  }






  function enviarDatos(e) {
    e.preventDefault()

    let url_string = window.location.href;
    let url = new URL(url_string);

    let nombreCurso = url.searchParams.get("nombre");
    let id = url.searchParams.get("id");
    let precio = url.searchParams.get("precio");
    let nombre = $("#inputNombre").val()
    let telefono = $("#inputNumero").val()
    let email = $("#inputEmail").val()


    let inscripto = {

      "nombre": nombre,
      "telefono": telefono,
      "email": email,
      "curso": {
        "nombre": nombreCurso,
        "id": id,
        "precio": precio
      }
    }


    let cursosFromLocal = JSON.parse(localStorage.inscripciones)
    cursosFromLocal.push(inscripto)

    localStorage.setItem("inscripciones", JSON.stringify(cursosFromLocal))

    swal("Muchas gracias", "Se ha inscripto correctamente", "success");


    setTimeout( () => {

      window.location.href = "index.html"

    }, 1500)

  }


function cancelar () {
  window.location.href = "index.html"
}




 /* function modalInscripciones() { */

  let cursosFromLocal = JSON.parse(localStorage.inscripciones)

  if(cursosFromLocal.length === 0){


    let crearLi = document.createElement("li")
    crearLi.innerHTML = `<p> no se registran cursos </p>
                         <button id=botonInsVolver class=boton>Volver</button>`
    document.getElementById("listaInscripcion").appendChild(crearLi)

    document.getElementById("botonInsVolver").onclick = () => {
      window.location.href = "index.html"
    }

}else{

  function deleteCurso (id) {

    let cursoPaBorrar = cursosFromLocal.findIndex( (inscripto) => inscripto.curso.id == id)

    cursosFromLocal.splice(cursoPaBorrar, 1)

    if (cursosFromLocal.length === 0){
      let crearLi = document.createElement("li")
      crearLi.innerHTML = `<p> no se registran cursos </p>
                           <button id=botonInsVolver class=boton>Volver</button>`
      document.getElementById("listaInscripcion").appendChild(crearLi)

      document.getElementById("botonInsVolver").onclick = () => {
        window.location.href = "index.html"
      }
    }

    localStorage.setItem("inscripciones", JSON.stringify(cursosFromLocal) )

    $(`#borrar${id}`).remove()

  }

  cursosFromLocal.forEach( (datosInscripto) => {

    let crearLi = document.createElement("li")

      crearLi.innerHTML = `
      <div class="divIns" id="borrar${datosInscripto.curso.id}">
      <li><p>${datosInscripto.curso.nombre}</p></li>
      <li><button class=boton onclick=deleteCurso(${datosInscripto.curso.id})> borrar </button></li>
      </div>
    `
  document.getElementById("listaInscripcion").appendChild(crearLi)

})

}


 /* modalInscripciones() */





