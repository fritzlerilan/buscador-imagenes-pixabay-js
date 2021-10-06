const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const inputs = document.querySelector('#inputs');
const inputTermino = document.querySelector('#termino');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarFormulario);
});

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = inputTermino.value;
    if (terminoBusqueda === '') {
        mostrarMensaje('El término de búsqueda es obligatorio', 'error');
        return;
    }
};

function mostrarMensaje(mensaje, tipo) {
    if(!document.querySelector('.mensaje')){
        const div = document.createElement('div');
        if(tipo === 'error') {
            div.classList.add('mensaje', 'error');
        }else {
            div.classList.add('mensaje', 'correcto');
        }
        div.textContent = mensaje;
        inputs.insertBefore(div, inputTermino);
        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
}
