// Variaveis globais
const game = document.querySelector(".container");
const cards = [];
let numCards;
let finished = 0;
let moves = 0;

// declaração de funções
function gameSettings() {
    let validNumCards;
    // intervalo permitido e par
    do {
        numCards = Number(prompt("Com quantas cartas você quer jogar?"));
        validNumCards = (numCards >= 4  && numCards <= 14) && numCards % 2 === 0;
        if(!validNumCards) {
            alert("Valor inválido :( \n escolha um número par entre 4 e 14");
        }
    } while(!validNumCards);
}

function flipCard(card) {    
    // encontrando cartas no js (manter fonte unica de verdade)
    let cardJs; // carta clicada
    let openedBeforeJs; // carta clicada anteriormente
    const openedBefore = game.querySelector(".opened");

    if(!(card.classList.contains("finished"))){
        for(let i = 0; i < numCards; i++) {
            if(card === game.querySelector(cards[i].selector)) {
                cardJs = cards[i];
            }
            if(openedBefore === game.querySelector(cards[i].selector)) {
                openedBeforeJs = cards[i];
            }
        }
        // se for a primeira carta clicada ela caira em else e sera aberta
        if(openedBefore){
            // mesmo tipo mas nao a mesma carta => acerto => encerrada
            if(cardJs.type === openedBeforeJs.type && cardJs.id != openedBeforeJs.id){
                cardJs.status = "finished";
                openedBeforeJs.status = "finished";
                moves += 1;
                finished += 2;
            } else if(cardJs.type != openedBeforeJs.type ) {
                cardJs.status = "closed";
                openedBeforeJs.status = "closed";
                moves += 1;
            }
        } else {
            cardJs.status = "opened";
        }
        updateCards();   
        // caso as cartas sejam viradas novamente ou acertadas foi feita uma jogada
        // caso contrario se trata de cliques superfluo (em cartas já acertadas ou na mesma carta)
        // ou de primeiro clique
    }     
}

function updateCards() {
    game.innerHTML = "";
    for(let i = 0; i < numCards; i++) {
        game.innerHTML += `<div onclick="flipCard(this);" class="card ${cards[i].type} ${cards[i].id} ${cards[i].status}">
        <img class="image" src="/arquivos/imgs/front.png" alt="papagaio">
        <img class="gif" src="/arquivos/gifs/${cards[i].type}.gif" alt="papagaio gif">        
        </div>`;
        cards[i].selector = `.${cards[i].type}.${cards[i].id}`;
    }
    console.log(finished, numCards)
    if(finished === numCards) {
        console.log("chegou")
        alert(`Você venceu em ${moves} jogadas!`);
    }
}

function comparador() { 
	return Math.random() - 0.5; 
} 

function createCards() {
    const cardTypes = numCards / 2;
    for(let i = 0; i < cardTypes; i++){
        // objetos carta
        const cardA = {
            selector: "",
            type:  `card-${i}`,
            id: 'A',
            status: "closed"
        }
        const cardB = {
            selector: "",
            type:  `card-${i}`,
            id: 'B',
            status: "closed"
        }
        cards.push(cardA);
        cards.push(cardB);                
    }
    cards.sort(comparador);

    // adicionando ao container
    updateCards();
}

function gameStart() {
    gameSettings();
    createCards();
}

//codigo
gameStart();