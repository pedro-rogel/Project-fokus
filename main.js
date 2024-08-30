const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const botaoLista = document.querySelectorAll('.app__card-button')
const descansoCurtoBt = document.querySelector('.app__card-button--curto');
const descandoLongoBt = document.querySelector('.app__card-button--longo');
const baner = document.querySelector('.app__image');
const txtTitlulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('.app__card-primary-button');
const botaoMusicaFoco = document.getElementById('alternar-musica');
const btComeçarEPausar = document.querySelector('#start-pause span');
const iconPlayPause = document.querySelector('.app__card-primary-butto-icon');
const tempoTela = document.getElementById('timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const beep = new Audio('/sons/beep.mp3');
const pause = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');
musica.loop = true;

let tempoSegundos = 1500;
let intervaloId = null;


botaoMusicaFoco.addEventListener('change', function() {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
});


focoBt.addEventListener('click', function () {
    tempoSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
    descandoLongoBt.classList.remove('active');
    descansoCurtoBt.classList.remove('active');
});

descansoCurtoBt.addEventListener('click', function () {
    tempoSegundos = 300;
    alterarContexto('descanso-curto');
    descansoCurtoBt.classList.add('active');
    focoBt.classList.remove('active');
    descandoLongoBt.classList.remove('active');
});

descandoLongoBt.addEventListener('click', function() {
    tempoSegundos = 900;
    alterarContexto('descanso-longo');
    descandoLongoBt.classList.add('active');
    focoBt.classList.remove('active');
    descansoCurtoBt.classList.remove('active');
});

function alterarContexto(contexto) {
    tempoNaTela();
    botaoLista.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    baner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            txtTitlulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            txtTitlulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            txtTitlulo.innerHTML = `Hora de voltr à superfície. <strong class ="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
};

const contagem = function() {
    if (tempoSegundos <= 0){
        beep.play();
        zerar()
        btComeçarEPausar.textContent = "Começar";
        iconPlayPause.setAttribute('src', '/imagens/play_arrow.png');
        return
    }
    tempoSegundos -= 1;
    tempoNaTela()
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId == null){
        play.play();
        intervaloId = setInterval(contagem, 1000)
        btComeçarEPausar.textContent = "Pausar"
        iconPlayPause.setAttribute('src', '/imagens/pause.png');
    } else {
        pause.play();
        zerar()
        btComeçarEPausar.textContent = "Começar";
        iconPlayPause.setAttribute('src', '/imagens/play_arrow.png');
        
    }
    
};
 
function zerar() {
    clearInterval(intervaloId)
    
    intervaloId = null
};

function tempoNaTela() {
    const tempo = new Date(tempoSegundos * 1000);
    const temoFormatado =  tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoTela.innerHTML = `${temoFormatado}`
}

tempoNaTela()