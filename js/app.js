// Selectores

const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');

// Eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', submitCita);

// Objeto de cita
const citaObj = {
  paciente: '',
  propietario: '',
  email: '',
  fecha: '',
  sintomas: ''
};

// Funciones
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
  console.log(citaObj);
}

function submitCita(e) {
  e.preventDefault();
  
  // Validar
  if (Object.values(citaObj).some(valor => valor.trim()==='')){
    new Notificacion({
      mensaje: 'Todos los campos son obligatorios',
      tipo: 'error',
    })

    return;
  }
}

// Crear la clase notificación

class Notificacion {
  constructor({mensaje, tipo}) {
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.mostrar();
  }

  mostrar() {
    // Crear el elemento div con la clase notificacion y el mensaje
    const alerta = document.createElement('DIV');
    alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

    // Si es de tipo error, agrega una clase
    this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

    // Agregar el mensaje al elemento div
    alerta.textContent = this.mensaje;

    // Insertar en el DOM
    formulario.parentElement.insertBefore(alerta, formulario);
  }
}