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


function preload() {
  bg = loadImage("assets/background.png");
  melon = loadImage("assets/melon.png");
  rabbit1 = loadImage("assets/sad_1.png");
  blink = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png")
  sadbunny = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png")
  eatbunny = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png",)

  blink.playing = true;
  blink.looping = true;

  eatbunny.playing = true;
  eatbunny.looping = false;

  sadbunny.playing = true;
  sadbunny.looping = false;

}


function setup() {
  createCanvas(500, 700);
  engine = Engine.create();
  world = engine.world;


  sadbunny.frameDelay = 20;
  blink.frameDelay = 20;
  eatbunny.frameDelay = 20;

  ground = new Ground(200, 680, 600, 20);

  rope = new Rope(7, { x: 245, y: 30 });

  var fruitOptions = {
    density: 0.001
  }

  bunny = createSprite(250, 650, 100, 100);

  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eatbunny);
  bunny.addAnimation("sad", sadbunny);

  bunny.changeAnimation("blinking");



  bunny.scale = 0.2;

  fruit = Bodies.circle(300, 300, 20);


  Matter.Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);

  cutbutton = createImg("assets/cut_btn.png");
  cutbutton.position(220, 30);
  cutbutton.size(50, 50);
  cutbutton.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

}

function draw() {
  background(bg);
  if (fruit != null) {
    image(melon, fruit.position.x, fruit.position.y, 70, 70);
  }

  Engine.update(engine);
  ground.display();
  rope.show();
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating");
    blink.looping = true;
  }

  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("sad");
  }
  drawSprites();
}

function drop() {
  rope.break();
  fruitCon.detach();
  fruitCon = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if (d <= 80) {
      World.remove(world, fruit);
      fruit = null;
      return true;

    } else {
      return false;
    }
  }
}




