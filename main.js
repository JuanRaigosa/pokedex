const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const headerBtns = document.querySelectorAll(".btn-header")

for (let i = 1; i <= 151; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
};

function mostrarPokemon(data){
    let types = data.types.map((type) => 
        ` <p class="type ${type.type.name}">${type.type.name}</p>`);
        types = types.join("");
    let pokeId = data.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div")
    div.classList.add("pokemon")
    div.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-image">
        <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    </div>
    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-name">${data.name}</h2>
        </div>
        <div class="pokemon-type">
           ${types}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}m</p>
            <p class="stat">${data.weight}kg</p>
        </div>
    </div>`;
    listaPokemon.append(div);
}

headerBtns.forEach(button => button.addEventListener("click",(event)=>{
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = ""
    for (let i = 1; i <= 151; i++){
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                }else{
                    const types = data.types.map(type => type.type.name);
                if (types.some(type => type.includes(botonId))) {
                    mostrarPokemon(data);
                }
                }
                
            })
    };
}))







