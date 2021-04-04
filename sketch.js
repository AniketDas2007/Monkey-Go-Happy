// banana for the game
var bananaImage, bananaGroup;

// player for the game
var player, playerImage, playerGroup, playerSize;

// ground for the game
var invisibleGround, background, groundImage;

// score for the game
var score;

// obstacle for the game
var obstacleImage, obstacleGroup;

// gameState for the game
var gameState;

function preload() {
  playerImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  backgroundImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 400);
  
  background = createSprite(200, 150);
  background.x = background.width / 2;
  background.addImage(backgroundImage);
  background.scale = 1.2;
  background.velocityX = -3;
  
  player = createSprite(100, 310);
  player.addAnimation("player", playerImage);
  playerSize = 0.11
  player.scale = playerSize;
  
  //invisible ground
  invisibleGround = createSprite(width / 2, 390, width, 10);
  invisibleGround.visible = false;
  
  score = 0;
  
  gameState = "play";
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  playerGroup = new Group();
}

function draw() {
  
  player.velocityY += 1;
  player.collide(invisibleGround);

  player.scale = playerSize;
  
  // gameState play
  if (gameState === "play"){
    
    // to move the ground
    background.velocityX = -5;
    
    // for infinite game screen
    if (background.x < 0) {
      background.x = background.width / 2;
    }
    
    // jump
    if(keyDown("space") && player.y >= 344){
      player.velocityY = -13;
    }
    
    // to spawn Banana and Stone
    spawnBanana();
    stone();

    // to calculate the sixe of player
    Pscore();

    if(playerGroup.isTouching(obstacleGroup) && player.scale >= 0.12){
      playerSize = 0.11;
    }
    else if(playerGroup.isTouching(obstacleGroup) && player.scale === 0.11){
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      
      bananaGroup.setVelocityXEach(0);
      bananaGroup.setLifetimeEach(-1);
      gameState = "end";
  }
  
  // gameState end  
  if (gameState === "end"){
    
  }

  // adding the player in group
  playerGroup.add(player);
  
  // to draw Sprites
  drawSprites();
  
  // to display the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
    
    if (gameState === "end"){
    // to display gameOver
    stroke("white");
    textSize(50);
    fill("red");
    text("game over", 200, 150)
    }
}
}

function spawnBanana(){

  // to spawn fruit after 80 frames
  if(frameCount % 80 === 0){
    var banana = createSprite(550, 250);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -10;
    banana.lifetime = 50;
    
    bananaGroup.add(banana);
  }
}

function Pscore(){
  if(playerGroup.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score += 2;
  }
  
  switch(score){
    case 10: playerSize = 0.12;
      break;
      
    case 20: playerSize = 0.14;
      break;
      
    case 30: playerSize = 0.16;
      break;
    
    case 40: playerSize = 0.18;
      break;
      
    default: break;
  }
}

function stone(){
  
  // to spawn obstacles after 90 frames
  if(frameCount % 90 === 0){
    var stone = createSprite(550, 350);
    stone.velocityX = -5;
    stone.addImage(obstacleImage);
    stone.scale = 0.2
    stone.lifetime = 120;
    
    obstacleGroup.add(stone);
  }
}