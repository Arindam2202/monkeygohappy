var ground, invisible_Ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var PLAY =1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600, 400);
  
monkey = createSprite(60,320,50,50); 
monkey.addAnimation("running monkey" , monkey_running);
monkey.scale = 0.15;  

  
ground = createSprite(300,398,600,10)


invisible_Ground = createSprite(300,100,600,10);
invisible_Ground.visible = false;
  
monkey.setCollider("circle",0,0,260);
//monkey.debug = true;


  
obstacleGroup = new Group();
bananaGroup = new Group();
  
}


function draw() {
background("lightBlue");
  



monkey.collide(ground);
monkey.collide(invisible_Ground);

text("Bananas Eaten = "+ score,490,20)
if(gameState === PLAY){
if(keyDown("space")){
  monkey.velocityY = -15;
}
monkey.velocityY = monkey.velocityY + 0.8
getObstacles();
getBanana();
  
if(bananaGroup.isTouching(monkey)){
  score = score+1;
  bananaGroup.destroyEach();
}
  
if(obstacleGroup.isTouching(monkey)){
  gameState = END;
}
}

if(gameState === END){
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     text("Press R to restart" , 250,200);
  
  if(keyDown("r") || keyDown("R")){
    reset();
}
}  
 
drawSprites();
}
function getObstacles(){
  if(frameCount % 230 ===0){
    obstacle = createSprite(540,370,50,50);
    obstacle.addImage("obstacles", obstacleImage)
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
}
}

function getBanana(){
  if(frameCount%140 ===0){
  banana = createSprite(540,370,50,50);
  banana.addImage("bananas" , bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -5;
  bananaGroup.add(banana);
}
}

function reset(){
  score = 0;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  gameState = PLAY;
}




