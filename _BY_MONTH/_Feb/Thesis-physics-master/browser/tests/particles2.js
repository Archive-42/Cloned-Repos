/**
 * @fileoverview Particle test.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */

goog.require('smash.ParticleEmitter');
goog.require('smash.ParticleSystem2');
goog.require('smash.flags');

var system = new smash.ParticleSystem2();

var emitter = new smash.ParticleEmitter();
emitter.positionX = 600;
emitter.positionY = 100;
emitter.setVelocity(3);
emitter.setSpread(30);
emitter.setProductionRate(1000);
system.addEmitter(emitter);

var emitter2 = new smash.ParticleEmitter();
emitter2.positionX = 200;
emitter2.positionY = 300;
emitter2.setVelocity(1);
emitter2.setVelocitySpread(0.75);
emitter2.setSpread(60);
emitter2.setLifespan(100);
emitter2.setAngle(90);
emitter2.setProductionRate(1000);
system.addEmitter(emitter2);

if (smash.flags.DRAWING_ENABLED) {
  window.addEventListener('load', function() {
    var step = function() {
      system.step();
      window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, true);
} else {
  for (var i = 0; i < 1000; i++) {
    system.step();
  }
}
