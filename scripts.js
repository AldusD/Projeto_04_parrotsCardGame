// declaração de funções

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
        // objeto carta
        const cardA = {
            seletor: game.querySelector(`.card-${i}.a`),
            type:  `card-${i}`,
            id: 'a',
        }
        const cardB = {
            seletor: game.querySelector(`.card-${i}.b`),
            type:  `card-${i}`,
            id: 'b',
        }
        cards.push(cardA);
        cards.push(cardB);

        // adicionando ao container
        game.innerHTML += `<div class="card card-${i} a">
        <img src="/arquivos/imgs/front.png" alt="papagaio">
        </div>
        <div class="card card-${i} b">
        <img src="/arquivos/imgs/front.png" alt="papagaio">
        </div>`
    }
    console.log(cards, cards[0], cards[1]);
}

function gameStart() {
    let numCards = gameSettings();
    createCards(numCards);

}

gameStart();