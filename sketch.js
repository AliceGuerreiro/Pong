//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//variaveis da velocidade da bolinha
let velocidadexBolinha = 8;
let velocidadeyBolinha = 8;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis da raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 150;
let velocidadeyOponente;

let colidiu = false

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha =loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound('raquetada.mp3');
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
 
}

function mostraBolinha(){
   circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
    }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
  velocidadeyBolinha *= -1;
    }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura); 
  }


function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
      velocidadexBolinha *= -1;
      raquetada.play();
    }
    
}

function verificaColisaoRaquete(x, y){
 colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
 if (keyIsDown(87)){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
    }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(22);
  fill(color(0, 255, 0));
  rect(150, 10, 40, 25);
  fill(255)
  text(meusPontos, 170, 30);
  fill(color(0, 255, 0));
  rect(450, 10, 40, 25);
  fill(255);
  text(pontosOponente, 470, 30);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}