buscarFilmes();

function buscarFilmes(){
const promessa = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes');
promessa.then(processarResposta);
}

function processarResposta(resposta) {
	renderizarFilmes(resposta.data);
}

function renderizarFilmes(filme){
    let filmes = document.querySelector(".movies");
    let listaDeFilmes = "";
        for (let i = 0; i < filme.length; i++){
            listaDeFilmes +=
            `<div class="movie">
            <img src="${filme[i].imagem}">
            <div class="title">${filme[i].titulo}</div>
            <button onclick="comprar(this)" class="${filme[i].id}">
              Comprar
              <ion-icon name="cart-outline"></ion-icon>
            </button>
          </div>`
        }
    filmes.innerHTML = listaDeFilmes;
}

function comprar(elemento){
    let nome = prompt("Qual o seu nome?");
    let assentos = parseInt(prompt("Qual a quantidade de assentos?"));

    let classe = elemento.getAttribute("class");
    
    let dados = {nome: nome, quantidade: assentos};
    const requisicao = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/moviefinder/filmes/${classe}}/ingresso`, dados);

    requisicao.then(tratarSucesso); 
    requisicao.catch(tratarErro);
}

function tratarErro() {
    alert("Os ingressos para este filme estão esgotados!");
}

function tratarSucesso() {
    alert("Ingresso comprado com sucesso!");
}

