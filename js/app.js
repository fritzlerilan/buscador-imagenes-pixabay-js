const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const inputs = document.querySelector('#inputs');
const inputTermino = document.querySelector('#termino');

const registrosPorPagina = 40;

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

function buscarImagenes(termino) {
    const key = '23715495-8d80aca1a7b327e04a0e101fe';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&image_type=photo`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const totalPaginas = calcularPaginas(data.totalHits);
            console.log(totalPaginas);
            mostrarImagenes(data.hits)
        });

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
}


function calcularPaginas(total) {
    return parseInt(Math.ceil( total / registrosPorPagina ));
}
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}