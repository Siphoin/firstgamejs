// system propertes


var pathResources = "resources/";

var pathImages = pathResources + "images/";

var pathAudio = pathResources + "wav/";

var engineScene = new Phaser.Scene("Game");

let config = {
type: Phaser.CANVAS,
width: 1200,
height: 600,
scene: engineScene,
autoCenter: true,
physics: {
    default: "arcade"
}};
// propertes sprites
var fon;
var apple;



// text score

var textScore;

var textScoreRecord;

// ini

var score = 0;

var scoreRecord = 0;



var deltaTime = 20;

var apples = [];

var max_count_apples = 5;

var count_apples = 0;

var soundClick;


var soundRecord;


var engine = new Phaser.Game(config);





engineScene.preload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (score > 0) {
         if (score > scoreRecord) {
             scoreRecord = score;
            localStorage.setItem('score', scoreRecord);
         }        
        }
    
    
    })

    if (localStorage.getItem("score") != null) {
        scoreRecord = localStorage.getItem('score');
        console.log(scoreRecord); 
      }

      
    this.load.image("fon", GetPathImage("fon"));
    this.load.image("apple", GetPathImage("apple"));
    this.load.image("appleGold", GetPathImage("appleGold"));
    this.load.audio('soundClick', GetPathAudio("soundClick"));
    this.load.audio('newRecord', GetPathAudio("newRecord"));
    setInterval(CreateApple, 5000);
}

engineScene.update = function() {

    apples.forEach(function(item, i, apples) {
        item.y += 0.1 * deltaTime;
        item.angle += 0.1 * deltaTime / 2;
        if (item.y >= 630) {
            delete apples[item];
            count_apples--;
        item.destroy();

        }
});

}

engineScene.create = function () {
    engine.scale.pageAlignHorizontally = true;
    engine.scale.pageAlignVertically = true;
    engine.scale.refresh();
    fon = this.add.tileSprite(0, 0, 1200, 600, "fon").setOrigin(0, 0);
    textScore = this.add.text(1100, 15, "Score: " + score, { fill: 'green', align: 'center', fontSize: 18, stroke: "black", strokeThickness: 0.5 });
    if (scoreRecord > 0) {
        textScoreRecord = this.add.text(1100, 35, "Record: " + scoreRecord, { fill: 'green', align: 'center', fontSize: 15, stroke: "black", strokeThickness: 0.5 });
    }
    soundClick = this.sound.add('soundClick');
    soundRecord = this.sound.add('newRecord');
    CreateApple();
}

function GetPathImage(path) {
    return pathImages + path + ".png";
}

function GetPathAudio(path) {
    return pathAudio + path + ".wav";
}

function CreateApple() {
    if (count_apples == max_count_apples) {
    return;
    }

    var randomAppleIndex = Math.random() * (+10 - +0) + +0; 

    var randomX = Math.random() * (+980 - +0) + +0;

    if (randomAppleIndex < 7) {
        var newApple = engineScene.add.sprite(randomX, -150, "apple").setInteractive();
        newApple.inputEnabled = true;
    count_apples++;
        newApple.on('pointerdown', function (pointer) {
    
        AddScore();
        CreateApple();
        delete apples[newApple];
        count_apples--;
    this.destroy();
        });
    
     apples.push(newApple);
    }

    else {
        var newApple = engineScene.add.sprite(randomX, -150, "appleGold").setInteractive();
        newApple.inputEnabled = true;
    count_apples++;
        newApple.on('pointerdown', function (pointer) {
    
        AddScoreGold();
        CreateApple();
        delete apples[newApple];
        count_apples--;
    this.destroy();
        });
    
     apples.push(newApple);
    }
    }

function AddScore () {
    score++;
    textScore.text = "Score: " + score;
    soundClick.play();

    if (scoreRecord > 0) {
        if (scoreRecord == score) {
                NewRecordEvent();
            }
        }
}

function AddScoreGold () {
    score += 2;
    textScore.text = "Score: " + score;
    soundClick.play();
if (scoreRecord > 0) {
if (scoreRecord == score) {
        NewRecordEvent();
    }
}
    
}

function NewRecordEvent() {
    soundRecord.play();
    scoreRecord = score;
    textScoreRecord.text =  "Record: " + scoreRecord;
}
