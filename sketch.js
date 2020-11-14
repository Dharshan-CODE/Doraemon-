var PLAY = 3;
var END = 2;
var gameState="start";



var ground,groundImage;
var invisibleground;
var player,playerImage;
var coin,coinImage,coinGroup;
var cake,cakeImage,cakeG;
var score,cakes,coins;
var cutter,cutterImage,cutterG;
var rocket,rocketImage,rocketG;
var knife,knifeImage,knifeG;

function preload(){

  groundImage = loadImage("helllo.jpg");
  playerImage = loadAnimation("tile000.png","tile001.png","tile002.png",
                             "tile003.png","tile005.png","tile006.png");
  
  coinImage = loadAnimation("1.png","2.png","3.png","4.png");
  cakeImage = loadImage("cake.jpg");
  cutterImage = loadAnimation("c1.png","c2.png","c3.png","c4.png");
  rocketImage = loadImage("output-onlinepngtools.png");
  knifeImage = loadImage("kni.png");
  collided = loadAnimation("tile000.png");
  
  
}

function setup() {
  createCanvas(550,500);
  
  ground = createSprite(250,420,380,17);
  ground.scale=5;
  ground.addImage(groundImage);
  ground.scale=0.125;
  
  player = createSprite(70,360,10,10);
  player.addAnimation("run",playerImage);
  player.addAnimation("collide",collided);
  player.scale=0.5;
  player.debug=false;
  player.setCollider("circle",0,0,100);
  
  invisibleground = createSprite(70,380,100,10);
  invisibleground.visible=false;
  
  
  coinGroup = new Group();
  cakeG = new Group();
  cutterG = new Group();
  rocketG = new Group();
  knifeG = new Group();
  
  score=0;
  cakes=0;
  coins=0;
  
}

function draw() {
 background("white");
  
  if(gameState === "start"){
     textSize(18);
     fill("black");
     text("IN THIS GAME YOU HAVE TT ESCAPE FROM MANY OBSTACLE",10,50)
     text("JUMP BY PRESSING SPACE AND ",50,100)
     text("FOR BECOMING MINI DORAEMON PRESS DOWN KEY",50,150);
     text("FOR BECOMING NORMAL DORAEMON PRESS UP KEY",50,200)
     fill("red");
     text("PESS SPACE TO START ",200,300) 
  if(keyDown("space")){
     gameState=PLAY;
     
     }
    
     }
       
  
  

 player.velocityY=player.velocityY+0.6;
 player.collide(invisibleground);
  if(gameState === PLAY){
     
      ground.velocityX=-5;
  
  
   
 
  if(ground.x<10){
    ground.x=300;
    
  }  
    
  if(keyDown("space")&&player.y>320){
     player.velocityY=-15;
     
     }
  if(keyDown("down_arrow")){
     player.scale=0.25;
     
     
     }
  if(keyDown("up_arrow")){
     player.scale=0.5;
     
     
     } 
     
  if(coinGroup.isTouching(player)){
     coins=coins+1;
     coinGroup.setLifetimeEach(0);
     
     }
  if(cakeG.isTouching(player)){
     cakes=cakes+1;
     cakeG.destroyEach();
     
     }
  
  score = score + Math.round(getFrameRate()/65);
  
  spawnCoin();
  spawnCutter();
    
    if(cutterG.isTouching(player)||knifeG.isTouching(player)||
       rocketG.isTouching(player))
      {
       gameState = END;
       
       
       }
     drawSprites();
  fill("red");
  stroke("red");
  textSize(20);
  text("SCORE : "+score,50,50);
  
  
  fill("red");
  stroke("red");
  textSize(20);
  text("DORACAKE : "+cakes,200,50);
  
  fill("red");
  stroke("red");
  textSize(20);
  text("COINS : "+coins,370,50);
  
    
    
     
     }
  
  else if(gameState === END){
     
      
    
    
    player.changeAnimation("collide", collided);
    
     
     
    ground.velocityX = 0;
    player.velocityY = 0
    
    coinGroup.setLifetimeEach(-1);
    cakeG.setLifetimeEach(-1);
    cutterG.setLifetimeEach(-1);
    knifeG.setLifetimeEach(-1);
    rocketG.setLifetimeEach(-1);
    
    coinGroup.setVelocityXEach(0);
    cutterG.setVelocityXEach(0); 
    rocketG.setVelocityXEach(0); 
    knifeG.setVelocityXEach(0); 
    cakeG.setVelocityEach(0);
    
    textSize(25);
    fill("red");
    stroke("red");
    text("YOU LOSS GAME PRESS R TO RESTART",50,300);
    drawSprites();
    
    if(keyDown("r")){
       reset();
       }
    
    
          }
 
}

function reset(){
   
  gameState = PLAY;

  score = 0;
  cakes = 0;
  coins = 0;
  
  coinGroup.destroyEach(0);
  cakeG.destroyEach(0);     
  cutterG.destroyEach(0);     
  rocketG.destroyEach(0);
  knifeG.destroyEach(0); 
  
  player.changeAnimation("run",playerImage);
  
  
  
}

function spawnCoin(){
  
if (frameCount % 180 === 0) {
    coin = createSprite(600,120,40,10);
    coin.y = Math.round(random(120,220));
    coin.addAnimation("coins",coinImage);
    coin.scale = 0.5;
    coin.velocityX = -6;
    
     //assign lifetime to the variable
    coin.lifetime = 200;  
  
    coin.depth=player.depth;
    player.depth=player.deph+1;
  
    
    coinGroup.add(coin);
  
}

if (frameCount % 160 === 0) {
    cake = createSprite(600,120,40,10);
    cake.y = Math.round(random(100,220));
    cake.addImage(cakeImage);
    cake.scale = 0.25;
    cake.velocityX = -6;
    
     //assign lifetime to the variable
    cake.lifetime = 230;  
  
    cake.depth=player.depth;
    player.depth=player.deph+1;
  
    
    cakeG.add(cake);
  


}
    
  
  
}

function spawnCutter(){
  
if (frameCount % 300 === 0) {
    cutter = createSprite(600,380,10,10);
    cutter.addAnimation("cutter",cutterImage);
    cutter.scale = 0.75;
    cutter.velocityX = -6;
    
     
    cutter.lifetime = 230;  
    cutterG.add(cutter);
}
if(frameCount%180 === 0){    
    rocket = createSprite(600,Math.round(random(160,300)),10,10);
    rocket.addImage(rocketImage);
    rocket.scale = 0.75;
    rocket.velocityX = -6;
    
    rocket.lifetime = 230;
    rocketG.add(rocket);
    rocket.debug=false;
    rocket.setCollider("rectangle",80,0,130,50);
  
}

  if(frameCount%400 === 0){    
    knife = createSprite(400,100,10,10);
    knife.addImage(knifeImage);
    knife.scale = 0.25;
    knife.velocityX = -6;
    knife.velocityY = 6;
    knife.debug=false;
    knife.setCollider("circle",0,0,100);
  
    knife.lifetime = 330;
    knifeG.add(knife);
  
  }
}










