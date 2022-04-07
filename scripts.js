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
}
gameSettings();