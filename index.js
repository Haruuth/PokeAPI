//6 Creamos una funcion para hacer la paginacion
// const getPaginas = (page) => {

// }

const getPokes = async (url) => {
  try {
    const respuesta = await fetch(url);
    const res = await respuesta.json();
    //comprobamos que nos devuelve este result, tenemos que dejarlo en el punto para encontrarnos en el array
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//2º Paso, creo una funcion de donde estan mis datos y los que me voy a traer

//3º Creamos una funciona que reciba nuestros pokemos que se los enviaremos desde la funcion init

const mapear = (characters) => {
  return characters.map((character) => ({
    nombre: character.name.toUpperCase(),
    imagen: character.sprites.other.home.front_default,
    types: character.types.map((type) => type.type.name).join("-"),
    id: character.id,
    
  }));
};

//4 creamos una funcion para pintar en mi documento

const printPokes = (characters) => {
  const ol$$ = document.querySelector("#pokedex");
  // console.log(characters.types)
  const cromo = `
  <div class = "tarjeta">
        <div class="poke-id">
        <p>#${characters.id}</p>
        </div>
        <div class="superPosicion">
        <img src="${characters.imagen}" alt="${characters.nombre}"/>
        </div>
        <div class="poke-nombre">
        <h3> ${characters.nombre} </h3>
        </div>
        <div class = "info">${characters.types} </div>
        

    </div>`;

  // console.log(cromo);
  ol$$.innerHTML += cromo;
};

// 1º Creando una funcion para seguir un orden

//recuperamos los pokes de 1 en 1 con un bucle
const bolaPokemons = [];

const init = async () => {
  for (let i = 1; i <= 151; i++) {
    const pokesRecuperados = await getPokes(
      `https://pokeapi.co/api/v2/pokemon/${i}`
    );

    bolaPokemons.push(pokesRecuperados);
  }

  const pokemonsMapeados = mapear(bolaPokemons);
  //   console.log(pokemonsMapeados);

  for (const myPoke of pokemonsMapeados) {
    printPokes(myPoke);
  }

  cogerInput(pokemonsMapeados);
  // busqueda(pokemonsMapeados);
};

init();

//5 creamos funcion y seleccionamos el input

const cogerInput = (characters) => {
  // console.log(characters);
  const input$$ = document.querySelector("input");
  console.log(input$$);

  //le damos evento de escuchar

  input$$.addEventListener("input", () => busqueda(input$$.value, characters));
};
//le damos filtro

const busqueda = (filtro, characters) => {
  // console.log(characters);
  let charactersFiltrados = characters.filter((character) =>
    character.nombre.toLowerCase().includes(filtro)
  );
  // console.log(charactersFiltrados);

  ol$$ = document.querySelector("ol");
  ol$$.innerHTML = "";
  for (const characterrr of charactersFiltrados) {
    printPokes(characterrr);
  }
};
