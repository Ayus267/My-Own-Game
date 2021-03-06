var ufo,asteroid,bullet,button,restart,gameOver,reset;
var ufo_img,asteroid_img,bullets_img,button_img,background_img,restart_img,gameOver_img;
var bulletGroup, asteroidGroup;
var Play=1,End=0,gameState = Play, score=0;
var bg_sound,mute,blast_sound,die_sound;

function preload(){
 ufo_img = loadImage("./assets/ufo.png");
 background_img = loadImage("./assets/background.png")
 asteroid_img = loadImage("./assets/asteroid.png");
 bullets_img = loadImage("./assets/bullet.png");
 restart_img = loadImage("./assets/restart.png");
 gameOver_img = loadImage("./assets/gameover.png");

 bg_sound = loadSound("./assets/La Espada.mp3");
 blast_sound = loadSound("./assets/blast.mp3");
 die_sound = loadSound("./assets/die.mp3");
}

function setup(){
 createCanvas(windowWidth, windowHeight);

bg_sound.play();
bg_sound.setVolume(0.5);
 
 ufo = createSprite(100,height/2);
 ufo.addImage(ufo_img);
 ufo.scale = 0.2;

 bulletGroup = createGroup(); 
 asteroidGroup = createGroup();
 
 button = createImg('./assets/button.png');
 button.position(width-150,height-130);
 button.size(100,100);
 button.mouseClicked(shoot); //callback function

 mute = createImg("./assets/mute.png");
 mute.position(width/2+580,50);
 mute.mouseClicked(mute_fn);
 mute.size(50,50);

 restart=createSprite(width/2-80,height/2+200);
 restart.addImage(restart_img);
 restart.scale = 0.2;

 gameover=createSprite(width/2-80,height/2-10);
 gameover.addImage(gameOver_img);
 gameover.scale = 0.5;

 gameover.visible = false;
 restart.visible = false;
}

function draw(){
  background(background_img);

  textSize(25);
  textFont("Times New Roman");
  fill("yellow");
  stroke("green");
  text("SCORE: "+score,width/2-130,50);

if(gameState == Play) {
  
 createAsteroid();
 move();

 if(asteroidGroup.isTouching(bulletGroup)){
    asteroidGroup.destroyEach();
    bulletGroup.destroyEach();
    score=score+1;
    blast_sound.play();
    //console.log("Hello");  
 }

 if(asteroidGroup.isTouching(ufo)){
   gameState = End;
   asteroidGroup.destroyEach();
   die_sound.play()
   //console.log(gameState);
 }

 if(score >= 5){
   asteroidGroup.setVelocityXEach(-10);
 }
 else
 if(score >= 10){
  asteroidGroup.setVelocityXEach(-15);
 }
 else
 if(score >= 15){
  asteroidGroup.setVelocityXEach(-20);
 }
 else
 if(score >= 20){
  asteroidGroup.setVelocityXEach(-25);
 }
}  //End of gamestate Play

if(gameState == End){
  gameover.visible = true;
  restart.visible = true;

  bg_sound.stop();

  asteroidGroup.setVelocityXEach(0);
  bulletGroup.setVelocityXEach(0);
  ufo.velocityX=0;

  ufo.visible=false;
  asteroidGroup.visible = false;

  asteroidGroup.setLifetimeEach(-1);
  bulletGroup.setLifetimeEach(-1);
  //console.log("End State"+gameState);

  if(mousePressedOver(restart)) {
    reset();
   }
}
 drawSprites();
 
}

function shoot(){
  bullet= createSprite(150, width/2, 50,20);
  bullet.y= ufo.y-20
  bullet.addImage(bullets_img);
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
  bullet.setCollider("rectangle",0,0,120,20);
}

function createAsteroid(){
  if(frameCount%40==0) {
  asteroid = createSprite(800,random(1,400),40,40); 
  asteroid.addImage(asteroid_img);
  asteroid.scale = 0.1;
  asteroid.velocityX = -7;
  asteroid.lifetime = 500;
  asteroidGroup.add(asteroid);
  }
}

function move(){
  if(keyWentDown("UP_ARROW")){
    ufo.velocityY = -4 ;
    ufo.velocityX = 0
   }
  
   if(keyWentUp("UP_ARROW")){
     ufo.velocityY = 0;
   }
  
   if(keyWentDown("DOWN_ARROW")){
    ufo.velocityY = 4 ;
    ufo.velocityX = 0 ;
   }
  
   if(keyWentUp("DOWN_ARROW")){
    ufo.velocityY = 0;
  }
}

function reset(){
  gameState = Play;
  gameover.visible = false;
  restart.visible = false;
  ufo.visible = true;
    
  asteroidGroup.destroyEach();
  bulletGroup.destroyEach();

  bg_sound.play();

  score = 0;
}

function mute_fn(){
 if(bg_sound.isPlaying()){
   bg_sound.stop();
 }
 else{
   bg_sound.play();
 }
}