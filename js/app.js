
//variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


//contenedor para los resultados
const resultado = document.querySelector('#resultado');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 15;

//eventlistener para select busqueda

marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});


year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
    
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puerta = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
    
})


//generar un objeto con la busqueda 
const datosBusqueda = {
    marca:"",
    year:"",
    minimo:"",
    maximo:"",
    puerta:"",
    color:"",
    transmision:""
}




//eventos
document.addEventListener('DOMContentLoaded', ()=>{

    mostrarAutos(autos);//muestra los autos

    //llenar las opciones de año

    llenarSelect();


})

//funciones

function mostrarAutos(autos){

    limpiarHTML();

    autos.forEach(auto => {

        const {marca, modelo, year, precio, puertas, color, transmision} = auto

        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} -${year} - $ ${precio}-Puertas: ${puertas} -Color: ${color} -Transmision: ${transmision}
        
        `;
        

        //insertar en el html
        resultado.appendChild(autoHTML);
    });
}

function llenarSelect (){

    for(let i = maxYear; i >=minYear; i-- ){
        const opcion = document.createElement('option');

        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

//funcion limpiar el html

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


//funcion que filtra en base a busqueda

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTransmision);
    //console.log(resultado)

    if(resultado.length){
        mostrarAutos(resultado);
    }else {
        
        noResultado();
    }
   
    
}

function noResultado(){
    limpiarHTML();
    const noresultado = document.createElement('div');

    noresultado.classList.add('alerta', 'error');
    noresultado.textContent = 'No Hay Resultados, Con esas caracteristicas de busqueda',
    resultado.appendChild(noresultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda
    if(marca){
        return auto.marca === marca;
    }
    return auto
}
function filtrarYear(auto) {
    const {year} = datosBusqueda
    if(year){
        return auto.year === parseInt(year);
    }
    return auto
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto
}
function filtrarPuertas(auto){
    const {puerta} = datosBusqueda
    if(puerta){
        return auto.puertas === parseInt(puerta);
    }
    return auto
}
function filtrarColor(auto){
    const {color} = datosBusqueda
    if(color){
        return auto.color === color;
    }
    return auto
}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto
}