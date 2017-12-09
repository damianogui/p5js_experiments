var content;
var canvas;
var amiover;
var myAlt;
var html;

var drawDistance = 1;


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

// create sections

    var section_content = createElement('div');
//    div.addClass(content.sections[i].section_title);
//    div.addClass('hidden');
    section_content.addClass('section_content');
    section_content.addClass('hidden');
//    div.attribute('showing_content','false');


    var section_title = createElement('a', content.sections[i].section_title);
    section_title.attribute("href","#");
    section_title.addClass('section_title');


    var section_desc = createElement('p', content.sections[i].section_desc);
//    section_desc.addClass(content.sections[i].section_title);

    section_desc.addClass('section_desc');

    main_container.child(section_title);
    main_container.child(section_content);
    section_content.child(section_desc);


// create projects

    for (var j = 0; j < content.sections[i].projects.length; j++) {

      var section_project = createElement('div');
      section_project.addClass('section_project');
      section_project.addClass('hidden');

      var project_title = createElement('a', content.sections[i].projects[j].title);
      project_title.addClass('project_title');
      project_title.attribute("href","#");

      var project_desc = createElement('p', content.sections[i].projects[j].desc);
      project_desc.addClass('project_desc');

      section_content.child(project_title);
      section_content.child(section_project);
      section_project.child(project_desc);
    }
}

  var a = selectAll('a');
  for (var i = 0; i<a.length;i++){
    a[i].mouseOver(showAlt);
  }

// create section accordions

  var section_accordions = document.getElementsByClassName("section_title");
  var project_accordions = document.getElementsByClassName("project_title");
  for (var i = 0; i < section_accordions.length; i++) {

    section_accordions[i].onclick = function() {
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      // create project accordions

      for (var f = 0; f < project_accordions.length; f++) {
        project_accordions[f].onclick = function() {
          var project = this.nextElementSibling;
          if (project.style.maxHeight){
            project.style.maxHeight = null;
          } else {
            project.style.maxHeight = project.scrollHeight + "px";
            content.style.maxHeight = project.scrollHeight + content.scrollHeight + "px";;
          }
        }
      }
    }
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
