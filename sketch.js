var title, titleImg;
var icon, iconImg
var icon2, icon2Img;
var instructions, instructionsImg;

var greenBin, greenBinImg;
var blueBin, blueBinImg;
var clean, cleanImg;
var won, wonImg;
var line1, line2;
var gameOver, gameoverImg;

var coverImg, tinImg, shoeImg, bottleImg;
var vegImg, paperImg, plantImg, eggImg;

var vegGrp, paperGrp, plantGrp, eggGrp;
var coverGrp, tinGrp, shoeGrp, bottleGrp;

var bio, nonBio;
var paddle;
var veg;
var vegFall;
var gameState = 0;

var score = 0;

function preload () {

    titleImg        = loadImage("sprites/title.png");
    iconImg         = loadImage("sprites/icon.png");
    icon2Img        = loadImage("sprites/icon2.png");
    instructionsImg = loadImage("sprites/instructions.png");
    
    wonImg          = loadImage("sprites/won.png");
    gameoverImg     = loadImage("sprites/gameOver.png");
    greenBinImg     = loadImage("sprites/greenBin.png");
    blueBinImg      = loadImage("sprites/blueBin.png");
    cleanImg        = loadAnimation("animations/clean-1.png", "animations/clean-2.png", "animations/clean-3.png", 
                                    "animations/clean-4.png", "animations/clean-5.png", "animations/clean-6.png", 
                                    "animations/clean-7.png", "animations/clean-8.png", "animations/clean-9.png", 
                                    "animations/clean-10.png", "animations/clean-11.png", "animations/clean-12.png", 
                                    "animations/clean-13.png");

    coverImg        = loadImage("sprites/cover.png");
    tinImg          = loadImage("sprites/tin.png");
    shoeImg         = loadImage("sprites/shoe.png");
    bottleImg       = loadImage("sprites/bottle.png");

    vegImg          = loadImage("sprites/veg.png");
    paperImg        = loadImage("sprites/paper.png");
    plantImg        = loadImage("sprites/plant.png");
    eggImg          = loadImage("sprites/egg.png");

}

function setup () {

    createCanvas(1365, 653);

    title = createSprite(660, 230);
    title.addImage(titleImg);
    title.scale = 2.5;

    icon = createSprite(660, 550);
    icon.addImage(iconImg);
    icon.scale = 0.5;

    instructions = createSprite(680, 225);
    instructions.addImage(instructionsImg);
    instructions.visible = false;

    icon2 = createSprite(1150, 600);
    icon2.addImage(icon2Img);
    icon2.visible = false;

    paddle = createSprite(700, 650, 1500, 10);
    paddle.shapeColor = "brown";
    paddle.visible    = false;

    greenBin = createSprite(500, 530);
    greenBin.addImage(greenBinImg);
    greenBin.visible = false;

    blueBin = createSprite(800, 530);
    blueBin.addImage(blueBinImg);
    blueBin.scale   = 0.45;
    blueBin.visible = false;

    clean = createSprite(650, 425);
    clean.addAnimation("neat", cleanImg);
    clean.scale = 2;
    clean.visible = false;

    won = createSprite(650, 100);
    won.addImage(wonImg);
    won.scale = 0.8;
    won.velocityY = 2;
    won.debug = false;
    won.setCollider("rectangle", 0, 0, 900, 180);
    won.visible = false;

    gameOver = createSprite(700, 320);
    gameOver.addImage(gameoverImg);
    gameOver.scale = 1.2;
    gameOver.visible = false;

    line1 = createSprite(650, 0, 700, 05);
    line1.visible = false;

    line2 = createSprite(650, 200, 700, 05);
    line2.visible = false;

    vegGrp   = createGroup();
    paperGrp = createGroup();
    plantGrp = createGroup();
    eggGrp   = createGroup();

    coverGrp  = createGroup();
    tinGrp    = createGroup();
    shoeGrp   = createGroup();
    bottleGrp = createGroup();

}

function draw () {

    background("violet");

    won.bounceOff(line1);
    won.bounceOff(line2);

    if(mousePressedOver(icon) && gameState == 0) {
        gameState = 1;
        title.destroy();
        icon.destroy();
        instructions.visible = true;
        icon2.visible        = true;
    }

    if(mousePressedOver(icon2) && gameState == 1) {
        gameState = 2;
        instructions.destroy();
        icon2.destroy();
        paddle.visible   = true;
        greenBin.visible = true;
        blueBin.visible  = true;
    }

    if(gameState === 2){
        vegFall();
        paperFall();
        plantFall();
        eggFall();
        coverFall();
        tinFall();
        shoeFall();
        bottleFall();

        fill("purple");
        stroke("purple");
        textSize(30);
        textFont("COMIC SANS MS");
        text("SCORE : " + score, 50, 50);

    if(keyDown("LEFT_ARROW")) {
        greenBin.x = greenBin.x - 8;
    }

    if(keyDown("RIGHT_ARROW")) {
        greenBin.x = greenBin.x + 8;
    }

    if(keyDown("UP_ARROW")) {
        blueBin.x = blueBin.x + 8;
    }

    if(keyDown("DOWN_ARROW")) {
        blueBin.x = blueBin.x - 8;
    }

    if(greenBin.isTouching(vegGrp)){
        vegGrp.destroyEach();
        score = score + 5;
    }

    if(greenBin.isTouching(paperGrp)){
        paperGrp.destroyEach();
        score = score + 5;
    }

    if(greenBin.isTouching(plantGrp)){
        plantGrp.destroyEach();
        score = score + 5;
    }

    if(greenBin.isTouching(eggGrp)){
        eggGrp.destroyEach();
        score = score + 5;
    }

    if(greenBin.isTouching(coverGrp)){
        coverGrp.destroyEach();
        score = score - 2;
    }

    if(greenBin.isTouching(tinGrp)){
        tinGrp.destroyEach();
        score = score -2;
    }

    if(greenBin.isTouching(shoeGrp)){
        shoeGrp.destroyEach();
        score = score - 2;
    }

    if(greenBin.isTouching(bottleGrp)){
        bottleGrp.destroyEach();
        score = score - 2;
    }

    if(blueBin.isTouching(vegGrp)){
        vegGrp.destroyEach();
        score = score - 2;
    }

    if(blueBin.isTouching(paperGrp)){
        paperGrp.destroyEach();
        score = score - 2;
    }

    if(blueBin.isTouching(plantGrp)){
        plantGrp.destroyEach();
        score = score - 2;
    }

    if(blueBin.isTouching(eggGrp)){
        eggGrp.destroyEach();
        score = score - 2;
    }

    if(blueBin.isTouching(coverGrp)){
        coverGrp.destroyEach();
        score = score + 5;
    }

    if(blueBin.isTouching(tinGrp)){
        tinGrp.destroyEach();
        score = score + 5;
    }

    if(blueBin.isTouching(shoeGrp)){
        shoeGrp.destroyEach();
        score = score + 5;
    }

    if(blueBin.isTouching(bottleGrp)){
        bottleGrp.destroyEach();
        score = score + 5;
    }

    if(paddle.isTouching(vegGrp) || paddle.isTouching(paperGrp) || paddle.isTouching(plantGrp) || 
    paddle.isTouching(eggGrp) || paddle.isTouching(coverGrp) || paddle.isTouching(tinGrp) || 
    paddle.isTouching(shoeGrp) || paddle.isTouching(bottleGrp)) {
        score = score - 10;
    }

    if(score > 10){
        gameState = 3;
    }

    if(score < 0){
        gameOver.visible = true;

        vegGrp.setVelocityYEach(0);
        paperGrp.setVelocityYEach(0);
        plantGrp.setVelocityYEach(0);
        eggGrp.setVelocityYEach(0);

        coverGrp.setVelocityYEach(0);
        tinGrp.setVelocityYEach(0);
        shoeGrp.setVelocityYEach(0);
        bottleGrp.setVelocityYEach(0);

    }
    }
    
    if(gameState === 3){
        win();
    }
    drawSprites();
    
}

function vegFall() {
    if(frameCount % 90 === 0) {
        veg = createSprite(500, -30);
        veg.addImage(vegImg);
        veg.scale     = 0.15;
        veg.velocityY = 6; 
        veg.x         = Math.round(random(10,1300)); 
        vegGrp.add(veg);
    }
}

function paperFall() {
    if(frameCount % 150 === 0) {
        paper = createSprite(100, -30);
        paper.addImage(paperImg);
        paper.scale     = 0.2;
        paper.velocityY = 6; 
        paper.x         = Math.round(random(10,600)); 
        paperGrp.add(paper);
    }
}

function plantFall() {
    if(frameCount % 240 === 0) {
        plant = createSprite(100, -30);
        plant.addImage(plantImg);
        plant.scale     = 0.5;
        plant.velocityY = 6; 
        plant.x         = Math.round(random(400,1300)); 
        plantGrp.add(plant);
    }
}

function eggFall() {
    if(frameCount % 180 === 0) {
        egg = createSprite(100, -30);
        egg.addImage(eggImg);
        egg.scale     = 0.2;
        egg.velocityY = 6; 
        egg.x         = Math.round(random(10,400)); 
        eggGrp.add(egg);
    }
}

function coverFall() {
    if(frameCount % 120 === 0) {
        cover = createSprite(100, -30);
        cover.addImage(coverImg);
        cover.scale     = 0.5;
        cover.velocityY = 6; 
        cover.x         = Math.round(random(10,1300)); 
        coverGrp.add(cover);
    }
}

function tinFall() {
    if(frameCount % 210 === 0) {
        tin = createSprite(100, -30);
        tin.addImage(tinImg);
        tin.scale     = 0.5;
        tin.velocityY = 6; 
        tin.x         = Math.round(random(70,1300)); 
        tinGrp.add(tin);
    }
}

function shoeFall() {
    if(frameCount % 270 === 0) {
        shoe = createSprite(100, -30);
        shoe.addImage(shoeImg);
        shoe.scale     = 0.3;
        shoe.velocityY = 6; 
        shoe.x         = Math.round(random(70,600)); 
        shoeGrp.add(shoe);
    }
}

function bottleFall() {
    if(frameCount % 300 === 0) {
        bottle = createSprite(100, -30);
        bottle.addImage(bottleImg);
        bottle.scale     = 0.5;
        bottle.velocityY = 6; 
        bottle.x         = Math.round(random(05,900)); 
        bottleGrp.add(bottle);
    }
}

function win() {
    
    blueBin.destroy();
    paddle.destroy();
    greenBin.destroy();
    vegGrp.setVisibleEach(false);
    paperGrp.destroyEach();
    plantGrp.destroyEach();
    eggGrp.destroyEach();

    coverGrp.destroyEach();
    tinGrp.destroyEach();
    bottleGrp.destroyEach();
    shoeGrp.destroyEach();

    clean.visible = true;
    won.visible   = true;
}