const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarFormulario);
});

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;
    if (terminoBusqueda === '') {
        mostrarMensaje('El término de búsqueda es obligatorio', 'error');
        return;
    }
};

function mostrarMensaje(mensaje, tipo) {
    const div = document.createElement('div');
    if(tipo === 'error') {
        div.classList.add('mensaje', 'error');
    }else {
        div.classList.add('mensaje', 'correcto');
    }
    div.textContent = mensaje;
    resultado.appendChild(div);
    setTimeout(() => {
        document.querySelector('.mensaje').remove();
    }, 3000);
}
