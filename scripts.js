// declaração de funções

function comparador() { 
	return Math.random() - 0.5; 
}

function gameSettings() {
    let numCards;
    let validNumCards;
    // intervalo permitido e par
    do {
        numCards = prompt("Com quantas cartas você quer jogar?");
        validNumCards = (numCards >= 4  && numCards <= 14) && numCards % 2 === 0;
        if(!validNumCards) {
            alert("Valor inválido :( \n escolha um número par entre 4 e 14");
        }
    } while(!validNumCards);
    return numCards;
}

function createCards(numCards) {
    const cardTypes = numCards / 2;
    const game = document.querySelector(".container");
    const cards = [];
    for(let i = 0; i < cardTypes; i++){
        // objetos carta
        const cardA = {
            seletor: "",
            type:  `card-${i}`,
            id: 'a',
        }
        const cardB = {
            seletor: "",
            type:  `card-${i}`,
            id: 'b',
        }
        cards.push(cardA);
        cards.push(cardB);                
    }
    cards.sort(comparador);

    // adicionando ao container
    for(let i = 0; i < numCards; i++) {
        game.innerHTML += `<div class="card ${cards[i].type} a">
        <img src="/arquivos/imgs/front.png" alt="papagaio">
        </div>`
        cards[i].seletor = `.${cards[i].type}.${cards[i].id}`;
    }
    console.log(cards);
}

function gameStart() {
    let numCards = gameSettings();
    createCards(numCards);

}

gameStart();