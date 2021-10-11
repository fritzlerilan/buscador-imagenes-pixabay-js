const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const inputs = document.querySelector('#inputs');
const inputTermino = document.querySelector('#termino');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;

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

    buscarImagenes();
};

function mostrarMensaje(mensaje, tipo) {
    if (!document.querySelector('.mensaje')) {
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('mensaje', 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mt-6', 'text-center');
        } else {
            div.classList.add('mensaje', 'bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mt-6', 'text-center');
        }
        div.textContent = mensaje;
        inputs.insertBefore(div, inputTermino);
        setTimeout(() => {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
}

function buscarImagenes(page=1) {
    const termino = inputTermino.value;
    const key = '23715495-8d80aca1a7b327e04a0e101fe';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalPaginas = calcularPaginas(data.totalHits);
            mostrarImagenes(data.hits)
        });
}

// Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
function *crearPaginador(total){
    for(let i = 1; i <= totalPaginas; i++) {
        yield i;
    }
}

function mostrarImagenes(imagenes) {
    limpiarHTML();
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">

                <div class="p-4">
                    <p class="font-bold">${likes}<span class="font-light"> Me Gusta</span></p>
                    <p class="font-bold">${views}<span class="font-light"> Veces vista</span></p>

                    <a 
                    class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded p-1 mt-5"
                    href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                    Ver Imagen
                    </a>
                </div>
            </div>
        </div>
        `
    })
    limpiarPaginador();
    imprimirPaginador();
}

function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    while(true) {
        const {value, done} = iterador.next();
        if (done) return;

        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'uppercase', 'rounded');
        boton.onclick = function () {
            buscarImagenes(value);
        }
        paginacionDiv.appendChild(boton);
    }
}

function calcularPaginas(total) {
    return parseInt(Math.ceil( total / registrosPorPagina ));
}

function limpiarPaginador() {
    while(paginacionDiv.hasChildNodes()){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
}
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}