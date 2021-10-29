
class Curso {

  constructor(id, nombre, valor, alumnosAnotados) {

    this.id = id;
    this.nombre = nombre;
    this.valor = valor;
    this.alumnosAnotados = alumnosAnotados;

  }

  nuevoAlumno() {

    if (this.alumnosAnotados < 10) {

      this.alumnosAnotados++
      swal("Muchas gracias", "Se ha inscripto correctamente", "success");
      return true;

    }else{

      swal("Lo sentimos!", "No hay vacantes disponibles", "error");
      document.getElementById("botonInscripcion").disabled = true
      return false;

    }
  }
}




/* --------------------------------------------------------------------------------------------------------------------- */


