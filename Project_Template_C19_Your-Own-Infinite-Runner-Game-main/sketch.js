var PLAY = 1;
var END = 0;
var gameState = PLAY;

var background;
var recomecar;
var cat;
var emp;
var catGroup;

function preload(){
    background = loadImage("fundo.jpg");
    recomecar = loadImage("fim.jpg");
    cat = loadImage("gato.gif");
    emp = loadImage("per.webp");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    emp = createSprite(50,height-70,20,50);
    emp.setCollider('circle',0,0,350);
    emp.scale = 0.08;

    background = createSprite(width/2,height,width,2);
    background.x = width/2
    
    recomecar = createSprite(width/2,height/2);

    catGroup = new Group();

    score = 0;
}
  
function draw() {

    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);

    emp = createSprite(50,height-70,20,50);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        background.velocityX = -(6 + 3*score/100);
        recomecar.visible = false;
    }

    if((touches.length > 0 || keyDown("SPACE")) && emp.y  >= height-120) {
        emp.velocityY = -10;
         touches = [];
    }

    emp.velocityY = emp.velocityY + 0.8

    if (background.x < 0){
        background.x = background.width/2;
    }

    emp.collide(cat);

    spawnCats();

    if(catGroup.isTouching(emp)) {
        gameState = END;
    }

    else if (gameState === END) {
        recomec
        ar.visible = true;
        background.velocityX = 0;
        emp.velocityY = 0;
        catGroup.setLifetimeEach(-1);
        catGroup.setVelocityXEach(0);
    }

    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
    }

    drawSprites();
}


function spawnCats() 
{
    if(frameCount % 60 === 0)
    {
      var obstacle = createSprite(1300,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      //gerar obstáculos aleatórios
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
      
      //atribua dimensão e tempo de vida aos obstáculos           
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth = trex.depth;
      trex.depth +=1;
      //adicione cada obstáculo ao grupo
      obstaclesGroup.add(obstacle);
    }
}
  
  function reset(){
    gameState = PLAY;
    recomecar.visible = false;
    catGroup.destroyEach();

    score = 0;
  }
  