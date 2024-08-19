let canvaW = 400;
let canvaH = 400;

//Controles da cobra
let xCobra = 50;
let yCobra = 40;
let wCobra = 10;
let hCobra = 10;
let partes = 1;

let rabo = [];

let direcao = "right";
let velocidadeMovimentacao = 5;


posicaoXComida = randomIntFromInterval(11, canvaW - 10);
posicaoYComida = randomIntFromInterval(11, canvaW - 10);

let colidiu = false;
let comeu = false;

let wParED = 10;
let hParED = 400;
let posXParE = 0;
let posYParE = 0;
let posXParD = 390;
let posYParD = 0;

let wParCB = 400;
let hParCB = 10;
let posXParC = 0;
let posYParC = 0;
let posXParB = 0;
let posYParB = 390;

function setup() {
  createCanvas(400, 400);
  frameRate(10);
}

function draw() {
  background(0);
  desenhaCobrinha();
  desenhaParedes();
  desenhaComida();
  controleMovimentacao();
  colisaoNasParedes();
  comer();
  pegarPosicaoAtual();
  
}
function pegarPosicaoAtual() {
  
  rabo.push([xCobra, yCobra]);
  if (rabo.length > partes) {
    rabo.shift();
  }
}

function desenhaComida() {
  rect(posicaoXComida, posicaoYComida, 10, 10);
}

function desenhaCobrinha(){
   rect(xCobra, yCobra, wCobra, hCobra);
  if(rabo.length > 0){
    for (var i = 0; i < rabo.length; i++){
      rect(rabo[i][0], rabo [i][1], wCobra, hCobra);
    }
  }
}

function desenhaParedes(){
  rect(posXParE, posYParE, wParED, hParED);
  rect(posXParD, posYParD, wParED, hParED);
  rect(posXParC, posYParC, wParCB, hParCB);
  rect(posXParB, posYParB, wParCB, hParCB);
}

function controleCobra(){
  if(keyIsDown(LEFT_ARROW)){
   return "left";
  }
  if(keyIsDown(RIGHT_ARROW)){
   return "right";
  }
  if(keyIsDown(UP_ARROW)){
    return "up";
  }
  if(keyIsDown(DOWN_ARROW)){
    return "down"
  }
}

function controleMovimentacao(){
   
  if(controleCobra()){
    direcao = controleCobra();
  }
  
  if(direcao == "left"){
    xCobra -= velocidadeMovimentacao;
  }
  if(direcao == "right"){
    xCobra += velocidadeMovimentacao;
  }
  if(direcao == "up"){
    yCobra -= velocidadeMovimentacao;
  }
  if(direcao == "down"){
    yCobra += velocidadeMovimentacao;
  }
}

function colisaoNasParedes() {
  var colisaoDireita = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParD, posYParD, wParED, hParED );
   var colisaoEquerda = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParE, posYParE, wParED, hParED   );    
   var colisaoCima = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParC, posYParC, wParCB, hParCB   );    
   var colisaoBaixo = collideRectRect( xCobra, yCobra, wCobra, hCobra, posXParB, posYParB, wParCB, hParCB   );

  if ( colisaoCima == true || colisaoBaixo == true || colisaoDireita == true || colisaoEquerda == true) {
    xCobra = 200;
    yCobra = 200;
    rabo = [];
    partes = 0;
  }
}

function colisaoComida() {
  var colisaoComida = collideRectRect( posicaoXComida, posicaoYComida, 10, 10, xCobra, yCobra, wCobra, hCobra );
  return colisaoComida;
}

function comer() {
  if (colisaoComida()) {
    posicaoXComida = randomIntFromInterval(11, canvaW - 10);
    posicaoYComida = randomIntFromInterval(11, canvaW - 10);
    partes += 1
  }
}

// funções auxiliares
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
