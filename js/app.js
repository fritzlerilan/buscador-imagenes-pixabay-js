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
            div.classList.add('mensaje', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mt-6', 'text-center');
        }else {
            div.classList.add('mensaje', 'bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mt-6', 'text-center');
        }
        div.textContent = mensaje;
        inputs.insertBefore(div, inputTermino);
        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
}
