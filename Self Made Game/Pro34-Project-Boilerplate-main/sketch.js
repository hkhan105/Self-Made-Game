const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, vaccineBox,ground;
var vaccineBox_con;
var vaccineBox_con_2;
var vaccineBox_con_3;
var rope,rope2,rope3;

var bg_img;
var vaccineBoxImage
var hospital;
var check;
var error;
var muteImage;

var helicopter,helicopter2,helicopter3;
var hospital_main;
var helicopterAnimation;
var mute_btn;

let loadingGif;

var bg_song;
var cut_sound;
var error_sound;
var check_sound;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('./images/background.jpg');
  hospital = loadImage('./images/hospital-01.png');
  check = loadImage("./images/check.png")
  error = loadImage("./images/errorImg.png")
  vaccineBoxImage = loadImage("./images/vaccineBox.png")
  muteImage = loadImage("./images/mute.png")

  bg_song = loadSound('sounds/bgTrack.wav');
  error_sound = loadSound("sounds/errorTrack.wav")
  cut_sound = loadSound('sounds/cutTrack.wav');
  check_sound = loadSound('sounds/checkTrack.wav');


  loadingGif = loadImage('loadingAnimation/giphy.gif');
  helicopterGif = loadImage('helicopterAnimation/helicopter.gif')
  
  loadingGif.playing = true;
  check.playing = true;
  error.playing = true;
  error.looping= false;
  check.looping = false; 
}

function setup() 
{
  engine = Engine.create();
  world = engine.world;
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

  bg_song.play();
  bg_song.setVolume(0.5);

 
  
  helicopter = createSprite(20,30,100,100);
  

   
   helicopter2 = createSprite(330,35,100,100);
    

   
   helicopter3 = createSprite(360,200,100,100);
   


  mute_btn = createImg(muteImage);
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:20,y:30});
  rope2 = new Rope(7,{x:330,y:35});
  rope3 = new Rope(4,{x:360,y:200});

  ground = new Ground(200,canH,600,20);
  loadingGif.frameDelay = 20;
  check.frameDelay = 20;

  hospital_main = createSprite(20,20);
  hospital_main.scale = 0.2;

  hospital_main.addAnimation('loadingGif',loadingGif);
  hospital_main.addImage(check);
  hospital_main.addImage(error);
  
  
  vaccineBox = Bodies.rectangle(300,300,50,50);
  Matter.Composite.add(rope.body ,vaccineBox);
  //vaccineBox.debug = true
  //vaccineBox.setCollider("rectangle",0,0,50,50)

 vaccineBox_con = new Link(rope ,vaccineBox);
 vaccineBox_con_2 = new Link(rope2 ,vaccineBox);
 vaccineBox_con_3 = new Link(rope3 ,vaccineBox);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if (vaccineBox!=null){
    image(vaccineBoxImage,vaccineBox.position.x ,vaccineBox.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(vaccineBoxCollider())
  {
    hospital_main.changeImage(check);
    check_sound.play();
  }

  if (vaccineBox!=null && vaccineBox.position.y>=650)
  {
    hospital_main.changeImage(error);
    bg_song.stop();
    error_sound.play();
   vaccineBox=null;
     
   }

   image(loadingGif,300,300);
   image(helicopterGif,20,30);
   image(helicopterGif,330,35);
   image(helicopterGif,360,200);
}

function drop()
{
  rope.break();
 vaccineBox_con.detach();
 vaccineBox_con = null; 
}

function drop2()
{
  rope2.break();
 vaccineBox_con_2.detach();
 vaccineBox_con_2 = null;
}

function drop3()
{
  rope3.break();
 vaccineBox_con_3.detach();
 vaccineBox_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world ,vaccineBox);
               vaccineBox = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bg_song.isPlaying())
     {
      bg_song.stop();
     }
     else{
      bg_song.play();
     }
}

function vaccineBoxCollider()
{
  Matter.SAT.collides(hospital_main, vaccineBox)
}