var bird;
var bird_image
var cityBg
var building, building_img, streetLamp_img
var blimp_img, obsBird_img
var obstaclesBottom, obstaclesTop
var bottomGround, topGround
var gameState = "play"
var score = 0, coin_img, coin
var gameover, gameOver_img
var restart, restart_img
var count = 0 

function preload(){
cityBg_img = loadImage("city.webp")

bird_image = loadImage("bird-flap-animation.gif")
building_img = loadImage("building.webp")
streetLamp_img = loadImage("streetLamp.png")
blimp_img = loadImage("blimp.png")
obsBird_img = loadImage("obstaclesBird.gif")
coin_img = loadImage("coin.png")

gameOver_img = loadImage("gameOver.png")
restart_img = loadImage("restart.png")
}

function setup() {   
  createCanvas(800,400);
  topGround = createSprite(200,10,800,20)
  topGround.visible = false;

  bottomGround = createSprite(200,390,800,20)
  bottomGround.visible=false;

  gameover = createSprite(400, 200, 50, 50)
  gameover.addImage("Game Over", gameOver_img)
  gameover.scale = 0.1;


  restart = createSprite(400, 250, 50, 50)
  restart.addImage("Restart", restart_img)
  restart.scale = 0.1


  cityBg = createSprite(400, 200, 800, 400)
  cityBg.addImage(cityBg_img)
  cityBg.scale = 0.8;
   
  bird = createSprite(400, 200, 50, 50);
  bird.scale = 0.2 ;
  bird.addImage(bird_image)

  obstaclesBottom_group = new Group()
  obstaclesTop_group = new Group()
  coin_group = new Group()

  bird.setCollider("rectangle", 0, 0,0, 75, 75 )
  //bird.debug = true;
 


}

function draw() {
  background("black");
 if(gameState==="play"){
 
  if(keyDown("space") || keyIsDown(UP_ARROW)) {
    bird.velocityY = -6 ;
    
  }
  if(cityBg.x < 400){
    cityBg.x = cityBg.width/4
  }

  spawnBottomObstacles();
  spawnTopObstacles();
  spawnCoins();

  if(bird.isTouching(obstaclesTop_group) || bird.isTouching(obstaclesBottom_group) || bird.isTouching(bottomGround) || bird.isTouching(topGround)){
    gameState = "end"
}

if(bird.isTouching(coin_group)){
  score += 5; 
  coin_group.destroyEach()
}
gameover.depth = cityBg.depth+1
gameover.depth = bird.depth+1

restart.depth = cityBg+ 1
restart.depth = bird.depth+1

gameover.visible = false;
restart.visible = false; 

  bird.velocityY = bird.velocityY + 2;
  count += Math.round(getFrameRate()/100); 
  cityBg.velocityX = -(5+3*count/100);
  



 }

 if(gameState==="end"){
  cityBg.velocityX=0; 
  

  obstaclesBottom_group.setVelocityXEach(0)
  obstaclesTop_group.setVelocityXEach(0)

  obstaclesTop_group.setLifetimeEach(-1)
  obstaclesBottom_group.setLifetimeEach(-1)

  coin_group.setVelocityXEach(0)
  coin_group.setLifetimeEach(-1)

  bird.y = 150
  bird.velocityX = 0;
  bird.velocityX = 0;

  gameover.depth = cityBg.depth+1
  gameover.depth = bird.depth+1
  
  restart.depth = cityBg+ 1
  restart.depth = bird.depth+1

  gameover.visible = true
  restart.visible = true

   
  if(mousePressedOver(restart)){
    reset()
  }

  

 }  
  
  


  drawSprites();
  fill("white")
  textSize(20)
  text("Score: "+score,10, 30)
  
}

function spawnBottomObstacles(){
  if(frameCount%65===0){
    obstaclesBottom = createSprite(800, 350, 50,50)
    obstaclesBottom.scale = 0.8;  
    obstaclesBottom.velocityX = -4
    obstaclesBottom.lifetime = 217;
    ran = Math.round(random(1,2))
    obstaclesBottom_group.add(obstaclesBottom)
    obstaclesBottom_group.velocityX = -(5+3*count/100);

    switch(ran){
      case 1 : obstaclesBottom.addImage(building_img)
      break; 

      case 2: obstaclesBottom.addImage(streetLamp_img)
      obstaclesBottom.scale = 0.08;
      break;

      default:

    }
  }
  }
  function spawnTopObstacles(){
    if(frameCount%87===0){
      obstaclesTop = createSprite(800, 100, 50, 50)
      obstaclesTop.scale = 0.5;
      obstaclesTop.velocityX = -4
      obstaclesTop.lifetime = 238;
      obstaclesTop.y = Math.round(random(35, 90))
      ran = Math.round(random(1,2))
      obstaclesTop_group.add(obstaclesTop)
      obstaclesTop_group.velocityX = -(5+3*count/100);

      switch(ran){
        case 1: obstaclesTop.addImage(blimp_img)
        break;

        case 2: obstaclesTop.addImage(obsBird_img)
        break;

        default:
      }
    }
  }

function spawnCoins(){
  if(frameCount%111===0){
    coin = createSprite(400,200, 30,30 )
    coin.scale = 0.5;
    coin.addImage(coin_img)
    coin.velocityX = -4
    coin.lifetime = 204; 
    coin.scale = 0.02;
    coin_group.add(coin)
    coin.y = Math.round(random(152,305))

  }
  
}
function reset(){
  score = 0;
  count =0
  gameover.visible = false;
  restart.visible=false;
  obstaclesBottom_group.destroyEach();
  obstaclesTop_group.destroyEach();
  coin_group.destroyEach();
  gameState = "play";  
}