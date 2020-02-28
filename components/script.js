class Vector {
  constructor(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.va = 0.05;
  }
}

class Particle extends Vector {
  constructor(colors){
    super();
    this.id = Math.random().toString();
    this.color = randomColor();
    this.radius = 8;
    this.opacity = 1;
    this.colors = colors;
  }
  randomColor() {
    return sample(this.colors);
  }
  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  sample(a) {
    return a[Math.floor(Math.random() * a.length)];
  }
}
class Unicorn extends Vector {
  constructor(image){
    super()
  }
}
class ParticleFactory{
  constructor(){
    this.particleArchive = {};
  }
  archive(p){
   this.particleArchive[p.id] = Object.assign({}, p);
  }
  retrieve(p){
    if (p.id in this.particleArchive) {
      return this.particleArchive[p.id];
    }
    return null;
  }
  create(options){
    const p = new Particle();
    Object.assign(p, options);
    this.archive(p);
    return p;
  }
  reset(p){
    let archivedVersion = this.retrieve(p);
    if (archivedVersion) {
      ;
      Object.assign(p, archivedVersion);
    }
  }
}
class Renderer{
  constructor(ctx){
    this.ctx = ctx;
  }
  renderStar(p) {
      let radius = p.radius, color = p.color, x = p.x, y = p.y, opacity = p.opacity;
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = opacity;
      this.ctx.beginPath();
      for (var i = 5; i--;) {
        this.ctx.lineTo(0, radius);
        this.ctx.translate(0, radius);
        this.ctx.rotate(PI2 / 10);
        this.ctx.lineTo(0, -radius);
        this.ctx.translate(0, -radius);
        ctx.rotate(-(Math.PI * 6 / 10));
      }
      this.ctx.lineTo(0, radius);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
  }
  
    clearScreen () {
        this.ctx.clearRect(0, 0, $.canvas.width, $.canvas.height);
      this.ctx.fillStyle = 'black';
}

renderImage(img, x, y) {
  this.ctx.save();
  this.ctx.drawImage(img, x, y);
  this.ctx.restore();
};
renderUnicorn (u) {
  this.renderImage(u.image, u.x, u.y);
}
}
  
    

// ------ utils

// function outsideScreen(p) {
//   var diameter = p.radius * 2;
//   var yExceeded = p.y - diameter > HEIGHT || p.y + diameter < 0;
//   var xExceeded = p.x - diameter > WIDTH || p.x + diameter < 0;
//   return yExceeded || xExceeded;
// }
// ---------- animation



// function outsideScreen(p) {
//   var diameter = p.radius * 2;
//   var yExceeded = p.y - diameter > HEIGHT || p.y + diameter < 0;
//   var xExceeded = p.x - diameter > WIDTH || p.x + diameter < 0;
//   return yExceeded || xExceeded;
// }

function animation(){
  window.requestAnimationFrame(animation)
}
function setup(data){

}
