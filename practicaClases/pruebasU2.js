//prueba flat
const array = [1, 2, [3, 4, [5, 6]]];
const arrayPlano = array.flat(3);
console.log(array);
console.log(arrayPlano);
//prueba trim
const text = "      a "
const textSinBlancos = text.trim();
console.log(text);
console.log(textSinBlancos);
//prueba nullish
const team = undefined;
const teamName = team ?? 'Patronato';
console.log(team);
console.log(teamName);
//formato de promesas
new Promise((resolve, reject)=>{'promesa'}).then(result=>{'codigo a ejecutar si se cumple la promesa'}).catch(error=>{'codigo a ejecutar si no se cumple la promesa'})
//async se suele utilizar para funciones que retornan promesas y await para esperar un proceso asincrono dentro de estas funciones
//consumo de api con async/await formato y luego ejemplo funcional con fetchDataPokemonAPI
async function fetchData(URL){
    try{
        const respuesta = await fetch(URL);
        const data = await respuesta.json();
        console.log(data);
    }catch{
        new Error('Se ha interrumpido la conexion');
        console.log(Error);
    }
}

async function fetchDataPokemonAPI(url){
    try{
        const respuesta = await fetch (url);
        const data = await respuesta.json();
        const nombre = data.results.map(data=>data.name)
        console.log(nombre);
    }catch(e){
        console.log(e);
    }
}

fetchDataPokemonAPI('https://pokeapi.co/api/v2/pokemon?limit=151');