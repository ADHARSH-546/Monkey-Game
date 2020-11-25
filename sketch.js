    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;
    var monkey , monkey_running;
    var banana ,bananaImage, obstacle, obstacleImage;
    var bananasGroup, obstaclesGroup;
    var survivalTime = 0;
    var score = 0;
    var monkey_collided;

    function preload(){

    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

      bananaImage = loadImage("banana.png");
      obstacleImage = loadImage("obstacle.png");
      monkey_collided = loadAnimation("sprite_0.png");


    }



    function setup() {
      createCanvas(600,300);

      monkey = createSprite(50,239,20,50);
      monkey.addAnimation("running", monkey_running);
      monkey.scale = 0.13;

      monkey.addAnimation("collided", monkey_collided);

      ground = createSprite(200,292,4000,15);
      ground.x = ground.width /2;

      invisibleGround = createSprite(200,293,400,10);
      invisibleGround.visible = false;



      survivalTime = 0;
      monkey.debug = true;

      obstaclesGroup = createGroup();
     bananasGroup = createGroup();

    }


    function draw() {

     background("lightblue");

     stroke("white");
     textSize(20);
     fill("green");
     text("Score: "+ score, 300,50);

      stroke("black");
      textSize(20);
      fill("black");
      survivalTime=Math.ceil(frameCount/frameRate());
      text("SurvivalTime: "+ score, 100,50);


      if(gameState === PLAY){

      ground.velocityX = -4;

        if (ground.x < 0){
            ground.x = ground.width/2;
      }



        obstacles();
        bananas();

        score = score + Math.round(getFrameRate()/60);



     if(keyDown("space")&& monkey.y >= 100) {
              monkey.velocityY = -10;
        }

        monkey.velocityY = monkey.velocityY + 0.8;

        



        if(obstaclesGroup.isTouching(monkey)){
          gameState= END;
        }
      } else if (gameState === END) {


        monkey.changeAnimation("collided", monkey_collided);
        ground.velocityX = 0;
        monkey.velocityY = 0


        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setLifetimeEach(-1);

         obstaclesGroup.setVelocityXEach(0);
         bananasGroup.setVelocityXEach(0); 


      }

       monkey.collide(invisibleGround); 
       drawSprites();
    }

    function obstacles (){

      if (frameCount % 300 === 0){
      var obstacle = createSprite(600,250,10,40);
      obstacle.velocityX = -4;
      var rand = Math.round(random(1,6));

      obstacle.addImage(obstacleImage);
       obstacle.scale = 0.2;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);

      }

    }

    function bananas (){
      if (frameCount % 80 === 0){
        var banana = createSprite(600,10,40);
        banana.velocityX = -4;
        banana.addImage(bananaImage);

        var rand = Math.round(random(1,6));
          switch(rand) {

    case 1: banana.y = banana.y+120;
            break;
    case 2: banana.y = banana.y+150;
            break;               
    case 3: banana.y = banana.y+170;
            break;
    case 4: banana.y = banana.y+130;
            break;
    case 5: banana.y = banana.y+200;
            break; 
    case 6: banana.y = banana.y+126;
            break;
    default: break;

              }
        banana.scale = 0.1;
        banana.lifetime = 300;
        bananasGroup.add(banana);
      }



    }