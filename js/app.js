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

    buscarImagenes(terminoBusqueda);
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

function buscarImagenes(termino){
    const key = '23715495-8d80aca1a7b327e04a0e101fe';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&image_type=photo`;
    console.log(termino);

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarImagenes(data.hits));

}

function mostrarImagenes(imagenes) {
    console.log(imagenes);
}