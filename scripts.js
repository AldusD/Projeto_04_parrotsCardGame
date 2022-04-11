// Variaveis globais
const game = document.querySelector(".container");
let cards = [];
let numCards;
let moves = 0;
let segundos = 0;

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
    let initCardST;
    let initOpBST; //status inicial a ser passado para a funcao updateCards

    // procedimento: descartar cliques em cartas já acertadas if, encontrar a carda clicada no array e se existir a clicada ateriormente,
    // definir os status iniciais dessas cartas, executar a logica do jogo para definir novos status e chamar a updateCards

    if(!(card.classList.contains("finished"))){
        console.log("s")
        for(let i = 0; i < numCards; i++) {
            if(card === game.querySelector(cards[i].selector)) {
                cardJs = cards[i];
                initCardST = cardJs.status;
            }
            if(openedBefore === game.querySelector(cards[i].selector)) {
                openedBeforeJs = cards[i];
                initOpBST = openedBeforeJs.status;
            }
        }

        // se for a primeira carta clicada ela caira em else e sera aberta null é convertido em um booleano false
        if(openedBefore){
            // mesmo tipo mas nao a mesma carta => acerto
            if(cardJs.type === openedBeforeJs.type){
                cardJs.status = "finished";
                openedBeforeJs.status = "finished";
                moves += 1;
            } else if(cardJs.type != openedBeforeJs.type ) {
                cardJs.status = "closed";
                openedBeforeJs.status = "closed";
                moves += 1;
            }
        } else {
            initOpBST = initCardST.status;
            cardJs.status = "opened";
        }
        updateCards(cardJs, openedBeforeJs);
        // jogadas só são computadas quando a acertos ou erros para não somar clique superfluos
        // (em cartas que acabaram de ser clicadas ou em cartas acertadas)
    }    
}

function updateCards(cardJs, openedBeforeJs) {
    // mostra a carta para o usuario depois aplica os status definidos pela logica em flipCards
    // removendo os status iniciais e aplicando os finais
    let card1 = game.querySelector(cardJs.selector);
    card1.classList.add("opened");
    setTimeout(function(){
            card1.classList.remove("opened");
            card1.classList.add(cardJs.status); 

    }, 1000);
    if(openedBeforeJs){
        let card2 = game.querySelector(openedBeforeJs.selector);
        setTimeout(function(){
            card2.classList.remove("opened");
            card2.classList.add(openedBeforeJs.status);
        }, 1000);

    }
    let finished = true;
    for(let i = 0; i < cards.length; i++) {
        if(cards[i].status != "finished") {
            finished = false;
        }
    }
    // tentei primeiro fazer um contador de finished mas por conta do delay do setTimeout era possivel encontrar duas vezes o mesmo par
    // portanto esse for executa o mesmo papel; tentei impedir esse erro mas não encontrei maneira eficiente de resolver.
    if(finished) {
        alert(`Você venceu em ${2*moves} jogadas e ${segundos} segundos!`);
        let newGame = prompt("Quer jogar uma nova partida? ") === "sim"; 
        if(newGame){
            gameStart();
        }
    }
}

function comparador() {
	return Math.random() - 0.5;
}

function createCards() {
    // cria um array de objetos carta e uo utiliza para preencher o container(game)
    // cada carta tem: seletor para buscas no DOM, tipo para definir o gif e conferir acertos,
    // id para separar duas cartas de mesmo tipo e status para saber de a carta esta aberta fechada ou acertada

    // array de objetos carta
    const cardTypes = numCards / 2;
    for(let i = 0; i < cardTypes; i++){
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
    for(let i = 0; i < numCards; i++) {
        game.innerHTML += `
        <div onclick="flipCard(this);" class="card ${cards[i].type} ${cards[i].id} ${cards[i].status}">
            <div class="front-face face">
                <img class="image" src="/arquivos/imgs/front.png" alt="papagaio">
            </div>
            <div class="back-face face">
                <img class="gif" src="/arquivos/gifs/${cards[i].type}.gif" alt="papagaio gif">
            </div>
        </div>`;
        cards[i].selector = `.${cards[i].type}.${cards[i].id}`;
    }
}

function gameStart() {
    moves = 0;
    cards = [];
    game.innerHTML = "";
    gameSettings();
    createCards();
}

function contador() {
    setInterval(function() {
        segundos ++;
        document.querySelector(".contador").innerHTML = `${segundos} s`;
    }, 1000)
}

//codigo
gameStart();
contador();
