var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -2,
            gameItems: [
                {type: 'sawblade',x:400,y:320},
                {type: 'sawblade',x:700,y:350},
                {type: 'sawblade',x:1000,y:380},
                {type: 'box',x:100,y:350},
                {type: 'reward',x:900,y:300},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
           
           for(var i = 0; i< gameItem.length;i++) {
                obstacleImage.x = -25;
                obstacleImage.y = -25;
                myObstacle.x = x;
                myObstacle.y = y;
            } 
            
            
            game.addGameItem(myObstacle);
        } 
        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItem = levelData.gameItems[i]; 
            if (gameItem.type === 'sawblade'){
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'box'){
                createBox(gameItem.x, gameItem.y);
            } else if(gameItem.type === 'reward'){
                createReward(gameItem.x, gameItem.y);
            }
        }
        function createBox(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            var obstacleImage = draw.rect(50,50,'blue');
            myObstacle.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.x = x;
            myObstacle.y = y;
            
            game.addGameItem(myObstacle);
        }
        function createEnemy(x,y) { 
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);
                
                enemy.x = x;
                enemy.y = y;
                
                game.addGameItem(enemy);
             
                enemy.velocityX = -1;
                enemy.rotationalVelocity = 10;
                enemy.onPlayerCollision = function() {
                    game.changeIntegrity(10);
                    enemy.shrink();
                };
                enemy.onProjectileCollision = function() {
                    game.increaseScore(100);
                    enemy.fadeOut();
                };
        }
            createEnemy(400,groundY-10);
            createEnemy(800,groundY-100);
            createEnemy(1200,groundY-50);
            
        function createReward(x,y){
            var reward =  game.createGameItem('reward',25);
            var shape = draw.circle(25, 'yellow');
                reward.addChild(shape);
                
                reward.x = x;
                reward.y = y;
                
                game.addGameItem(reward);
             
                reward.velocityX = -1;
                reward.rotationalVelocity = 10;
                reward.onPlayerCollision = function() {
                    game.changeIntegrity(10);
                    reward.shrink();
                };
        }
        };
        
            
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}