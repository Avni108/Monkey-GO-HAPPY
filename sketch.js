var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(400, 400);

  monkey = createSprite(50, 200, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(100, 250, 800, 20);
  ground.shapeColor = "brown";
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  console.log(ground.x);

  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background("lightgreen");

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }

  stroke("white");
  textSize(20);
  fill("black");
  text("Score: " + score, 300, 50);

  stroke("white");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("survivalTime: " + survivalTime, 230, 80);

  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  monkey.depth = monkey.depth + 1;

  food();
  spawnObstacles();

  drawSprites();
  
   if (monkey.isTouching(obstaclesGroup)) {
    reset();
    stroke("white");
    fill("black");
    textSize(30);
    text("GAME OVER", 100, 150);
  }
}


function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 100, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    bananaGroup.add(banana);
    var banana = Math.round(random(120, 200));
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 220, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
    obstaclesGroup.add(obstacle);

    obstaclesGroup.lifeTime = 50;

    var obstacle = Math.round(random(120, 200));
  }
}


function reset() {
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  bananaGroup.setVelocityXEach(0);
  bananaGroup.setLifetimeEach(-1);
  score = 0;
  monkey.velocityY = 0;
  ground.velocityX = 0;




}