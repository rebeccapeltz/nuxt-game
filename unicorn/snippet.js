var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
      { __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; } ||
      function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
// window.addEventListener('DOMContentLoaded', init);
// init()
//#region classes
var Vector = /** @class */function () {
  function Vector() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.va = 0.05;
  }
  return Vector;
}();
var Particle = /** @class */function (_super) {
  __extends(Particle, _super);
  function Particle() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.id = Math.random().toString();
    _this.color = randomColor();
    _this.radius = 8;
    _this.opacity = 1;
    return _this;
  }
  return Particle;
}(Vector);
var Unicorn = /** @class */function (_super) {
  __extends(Unicorn, _super);
  function Unicorn(image) {
    var _this = _super.call(this) || this;
    _this.image = image;
    return _this;
  }
  return Unicorn;
}(Vector);


var ParticleFactory = /** @class */function () {
  function ParticleFactory() {
  }
  ParticleFactory.archive = function (p) {
    ParticleFactory.particleArchive[p.id] = Object.assign({}, p);
  };
  ParticleFactory.retrieve = function (p) {
    if (p.id in ParticleFactory.particleArchive) {
      return ParticleFactory.particleArchive[p.id];
    }
    return null;
  };
  ParticleFactory.create = function (options) {
    var p = new Particle();
    Object.assign(p, options);
    ParticleFactory.archive(p);
    return p;
  };
  ParticleFactory.reset = function (p) {
    var archivedVersion = ParticleFactory.retrieve(p);
    if (archivedVersion) {
      ;
      Object.assign(p, archivedVersion);
    }
  };
  ParticleFactory.particleArchive = {};
  return ParticleFactory;
}();
var Renderer = /** @class */function () {
  function Renderer($) {
    var _this = this;
    this.$ = $;
    this.renderStar = function (p) {
      var $ = _this.$;
      var radius = p.radius, color = p.color, x = p.x, y = p.y, opacity = p.opacity;
      $.save();
      $.translate(x, y);
      $.fillStyle = color;
      $.globalAlpha = opacity;
      $.beginPath();
      for (var i = 5; i--;) {
        $.lineTo(0, radius);
        $.translate(0, radius);
        $.rotate(PI2 / 10);
        $.lineTo(0, -radius);
        $.translate(0, -radius);
        $.rotate(-(Math.PI * 6 / 10));
      }
      $.lineTo(0, radius);
      $.fill();
      $.stroke();
      $.restore();
    };
    
  }
  // Renderer.prototype.clearScreen = function () {
  //   var $ = this.$;
  //   // $.clearRect(0, 0, $.canvas.width, $.canvas.height);
  // };
  Renderer.prototype.renderImage = function (img, x, y) {
    var $ = this.$;
    $.save();
    $.drawImage(img, x, y);
    $.restore();
  };
  Renderer.prototype.renderUnicorn = function (u) {
    this.renderImage(u.image, u.x, u.y);
  };
  return Renderer;
}();
//#endregion
//#region globals
var CANVAS = document.createElement('canvas');
var CTX = CANVAS.getContext('2d');

var WIDTH = CANVAS.width = window.innerWidth;
var HEIGHT = CANVAS.height = window.innerHeight;

var PI2 = 2 * Math.PI;
var GRAVITY = 0.125;
var COLOR_FADE = 0.01;
var COLORS = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000'];

var RENDERER = new Renderer(CTX);
var PARTICLES = [];
var PARTICLE_COUNT = 40;
var UNICORN_IMAGE = document.getElementById('unicorn');
var UNICORN = new Unicorn(UNICORN_IMAGE);
//#endregion
//#region utils
function randomColor() {
  return sample(COLORS);
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
function randomBoolean() {
  return Math.random() > 0.5;
}
function sample(a) {
  return a[Math.floor(Math.random() * a.length)];
}
function outsideScreen(p) {
  var diameter = p.radius * 2;
  var yExceeded = p.y - diameter > HEIGHT || p.y + diameter < 0;
  var xExceeded = p.x - diameter > WIDTH || p.x + diameter < 0;
  return yExceeded || xExceeded;
}
//#endregion
//#region animation
function updateParticle(p) {
  p.vy += GRAVITY;
  p.y += p.vy;
  p.x += p.vx;
  if (p.opacity > COLOR_FADE) {
    p.opacity -= COLOR_FADE;
  }
  if (outsideScreen(p)) {
    ParticleFactory.reset(p);
  }
}
function updateUnicorn(unicorn) {
  var image = unicorn.image;
  var centerX = WIDTH / 2 - image.width / 2;
  //   var centerY = HEIGHT / 2 - image.height / 2 - 50;
  //   var centerX = WIDTH / 2 + image.width ;
  var centerY = HEIGHT / 2 - image.height / 2 - 50;
  var radiusX = 40;
  var radiusY = 18;
  unicorn.x = centerX + Math.cos(unicorn.angle) * radiusX;
  unicorn.y = centerY + Math.sin(unicorn.angle) * radiusY;
  unicorn.angle += unicorn.va;
}
function animation() {
  requestAnimationFrame(animation);
  // RENDERER.clearScreen();
  PARTICLES.forEach(updateParticle);
  PARTICLES.forEach(RENDERER.renderStar);
  if (UNICORN_IMAGE.complete) {
    updateUnicorn(UNICORN);
    RENDERER.renderUnicorn(UNICORN);
  }
}
function createParticles() {
  for (var i = PARTICLE_COUNT; i > 0; --i) {
    var p = ParticleFactory.create({
      x: WIDTH / 2,
      y: HEIGHT / 2,
      vx: randomNumber(-14, -3),
      vy: randomNumber(-8, 2)
    });

    var i_1 = Math.floor(randomNumber(0, 60)) + 1;
    while (i_1--) {
      updateParticle(p);
    }
    PARTICLES.push(p);
  }
}

function setup() {
  // document.body.appendChild(CANVAS);

  var unicornX = WIDTH / 2 - UNICORN.image.width / 2;
  var unicornY = HEIGHT / 2 - UNICORN.image.height / 2;
  UNICORN.x = unicornX;
  UNICORN.y = unicornY;
  createParticles();
 
  CTX.fillStyle = 'black';
  CTX.fillRect(0,0,window.innerWidth,window.innerHeight);
}
function init() {
  setup();
  animation();
}
