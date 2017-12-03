var content;
var canvas;
var amiover;
var myAlt;
var html;


function preload() {
  content = loadJSON("content.json");
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  var main_container = select('#main_container');
  html = select('html');
  myAlt = createElement('span',' ');

  for (var i = 0; i < content.sections.length; i++) {

    var div = createElement('div');
    div.class(content.sections[i].section_title);
    var section_title = createElement('a', content.sections[i].section_title);
    section_title.attribute("href","#");
    section_title.addClass('title');
    var section_desc = createElement('p', content.sections[i].section_desc);

    main_container.child(div);
    div.attribute("showing_content","false");
    div.addClass('section');
    div.addClass('hidden');

    div.mousePressed(show_hide);
    section_title.mouseOver(overTitle);
    section_title.mouseOut(outTitle);

    div.child(section_title);
    div.child(section_desc);

    for (var j = 0; j < content.sections[i].projects.length; j++) {
      var project_title = createElement('h2', content.sections[i].projects[j].title);
      var project_desc = createElement('p', content.sections[i].projects[j].desc);
      div.child(project_title);
      project_title.mouseOver(overProject);
      div.child(project_desc);
    }

  }
  var a = selectAll('a');
  for (var i = 0; i<a.length;i++){
    a[i].mouseOver(showAlt);
  }

}
function overTitle(){
  amiover = true;
}
function outTitle(){
  amiover = false;
}

function overProject(){
  //html.style('background-image','url("images/planet1.png")');
}

function show_hide(){

  if (this.attribute("showing_content") == "false"){
  this.removeClass('hidden');
  this.addClass('visible');
  this.attribute("showing_content","true");

} else if (amiover == true) {
  this.removeClass('visible');
  this.addClass('hidden');
  this.attribute("showing_content","false");
}

}

function showAlt (){
  fill(0,0,255);
  noStroke();
  if (this.attribute("alt") != null){
    text(this.attribute("alt"),mouseX+random(-10,10),mouseY-20);
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}


function draw() {
  background(255,10);

  stroke(0,0,255);
  strokeWeight(2);
  line(pmouseX,pmouseY,mouseX,mouseY);
}

function mousePressed() {
}
