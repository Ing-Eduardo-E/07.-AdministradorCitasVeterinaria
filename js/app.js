// Selectores

const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');
const contenedorCitas = document.querySelector("#citas");

// Eventos
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formulario.addEventListener("submit", submitCita);

// Objeto de cita
const citaObj = {
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

// Crear la clase notificación

class Notificacion {
  constructor({ mensaje, tipo }) {
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.mostrar();
  }

  mostrar() {
    // Crear el elemento div con la clase notificacion y el mensaje
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "text-center",
      "w-full",
      "p-3",
      "text-white",
      "my-5",
      "alert",
      "uppercase",
      "font-bold",
      "text-sm"
    );

    // Eliminar alertas duplicadas
    const alertasAnteriores = document.querySelector(".alert");
    alertasAnteriores?.remove();

    // Si es de tipo error, agrega una clase
    this.tipo === "error"
      ? alerta.classList.add("bg-red-500")
      : alerta.classList.add("bg-green-500");

    // Agregar el mensaje al elemento div
    alerta.textContent = this.mensaje;

    // Insertar en el DOM
    formulario.parentElement.insertBefore(alerta, formulario);

    // Quitar notificación despúes de 5 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

// Clase de citas

class AdminCitas {
  constructor() {
    this.citas = [];
  }

  agregar(cita) {
    this.citas = [...this.citas, cita];
    this.mostrar();
  }

  mostrar() {
    // limpiar el HTML
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
    this.citas.forEach((cita) => {
      const divCita = document.createElement("div");
      divCita.classList.add(
        "mx-5",
        "my-10",
        "bg-white",
        "shadow-md",
        "px-5",
        "py-10",
        "rounded-xl",
        "p-3"
      );

      const paciente = document.createElement("p");
      paciente.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

      const propietario = document.createElement("p");
      propietario.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

      const email = document.createElement("p");
      email.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

      const fecha = document.createElement("p");
      fecha.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

      const sintomas = document.createElement("p");
      sintomas.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

      // Agregar al HTML
      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      contenedorCitas.appendChild(divCita);
    });
  }
}

// Funciones
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// instanciar la clase AdminCitas

const citas = new AdminCitas();

function submitCita(e) {
  e.preventDefault();

  // Validar
  if (Object.values(citaObj).some((valor) => valor.trim() === "")) {
    new Notificacion({
      mensaje: "Todos los campos son obligatorios",
      tipo: "error",
    });

    return;
  }

  // Agregar la cita a la lista de citas
  citas.agregar(citaObj);
  // Resetear el formulario
  formulario.reset();
  reiniciarObjetoCita();
}

// Reiniciar el objeto de citas
function reiniciarObjetoCita( ) {
  // citaObj.paciente = '';
  // citaObj.propietario = '';
  // citaObj.email = '';
  // citaObj.fecha = '';
  // citaObj.sintomas = '';

  // Otra forma de reiniciar el objeto
  Object.assign(citaObj, {
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
  });
}
