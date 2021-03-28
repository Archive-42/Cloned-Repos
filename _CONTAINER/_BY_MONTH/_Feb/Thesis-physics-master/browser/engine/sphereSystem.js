/**
 * @fileoverview Sphere collision detection system.
 * @author sebastian.poreba@gmail.com (Sebastian Poreba)
 */

goog.provide('smash.SphereSystem');

goog.require('smash.Sphere');
goog.require('smash.flags');
goog.require('smash.math');



/**
 * @constructor
 */
smash.SphereSystem = function() {
  var generalVelocity = 1;
  /**
   * @type {!Array.<!smash.Sphere>}
   */
  this.spheres = new Array(smash.SphereSystem.SPHERES_COUNT);
  for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
    var sphere = new smash.Sphere();
    sphere.positionX = (Math.random() - 0.5) * 400;
    sphere.positionY = (Math.random() - 0.5) * 200;
    sphere.positionZ = (Math.random() - 0.5) * 100;
    sphere.velocityX = (Math.random() - 0.5) * generalVelocity;
    sphere.velocityY = (Math.random() - 0.5) * generalVelocity;
    sphere.velocityZ = (Math.random() - 0.5) * generalVelocity;
    this.spheres[i] = sphere;
  }

  if (smash.flags.DRAWING_ENABLED) {
    /**
     * @type {!THREE.PerspectiveCamera}
     */
    this.camera = new THREE.PerspectiveCamera(20,
        smash.SphereSystem.CANVAS_WIDTH /
            smash.SphereSystem.CANVAS_HEIGHT,
        1, 10000);
    this.camera.position.z = 1000;

    var controls = new THREE.OrbitControls(this.camera);
    controls.addEventListener('change', goog.bind(function() {
      this.renderer.render(this.scene, this.camera);
    }, this));

    /**
     * @type {!THREE.Scene}
     */
    this.scene = new THREE.Scene();

    var spotLight = new THREE.PointLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    this.scene.add(spotLight);

    var axes = new THREE.AxisHelper(20);
    this.scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(
        10000, 10000, 100, 100);
    var planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      wireframe: true
    });

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = smash.SphereSystem.FLOOR_LEVEL;
    plane.position.z = 0;

    this.scene.add(plane);



    var material = new THREE.MeshLambertMaterial({
      color: 0xff0000
    });
    /**
     * @type {!Array.<!THREE.SphereGeometry>}
     */
    this.threeSpheres = new Array(smash.SphereSystem.SPHERES_COUNT);
    for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
      var sphere = new THREE.SphereGeometry(this.spheres[i].radius, 10, 10);
      var mesh = new THREE.Mesh(sphere, material);
      mesh.position.x = this.spheres[i].positionX;
      mesh.position.y = this.spheres[i].positionY;
      mesh.position.z = this.spheres[i].positionZ;
      this.threeSpheres[i] = mesh;

      this.scene.add(mesh);
    }



    /**
     * @type {!THREE.WebGLRenderer}
     */
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(smash.SphereSystem.CANVAS_WIDTH,
        smash.SphereSystem.CANVAS_HEIGHT);
    document.body.appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * @type {number}
   */
  this.collisions = 0;
};


/**
 * @const {number}
 */
smash.SphereSystem.SPHERES_COUNT = 1000;


/**
 * @const {boolean}
 */
smash.SphereSystem.GRAVITY_ENABLED = true;


/**
 * @const {number}
 */
smash.SphereSystem.GRAVITY_FORCE = 0.1;


/**
 * @const {number}
 */
smash.SphereSystem.FLOOR_LEVEL = -100;


/**
 * (1 - energy lost on floor hit)
 * @const {number}
 */
smash.SphereSystem.FLOOR_FRICTON = 0.8;


/**
 * @const {number}
 */
smash.SphereSystem.CANVAS_WIDTH = 1200;


/**
 * @const {number}
 */
smash.SphereSystem.CANVAS_HEIGHT = 400;


/**
 * @param {!smash.Sphere} sphere1
 * @param {!smash.Sphere} sphere2
 */
smash.SphereSystem.collide = function(sphere1, sphere2) {
  var distanceX = sphere1.positionX - sphere2.positionX;
  var distanceY = sphere1.positionY - sphere2.positionY;
  var distanceZ = sphere1.positionZ - sphere2.positionZ;
  var distanceLength = smash.math.vectorLength(
      distanceX, distanceY, distanceZ);

  // normalize
  distanceX /= distanceLength;
  distanceY /= distanceLength;
  distanceZ /= distanceLength;

  var a1 = smash.math.dot(sphere1.velocityX, sphere1.velocityY,
      sphere1.velocityZ, distanceX, distanceY, distanceZ);
  var a2 = smash.math.dot(sphere2.velocityX, sphere2.velocityY,
      sphere2.velocityZ, distanceX, distanceY, distanceZ);
  var optimizedP = (2.0 * (a1 - a2)) / (sphere1.mass + sphere2.mass);

  sphere1.velocityX -= optimizedP * sphere2.mass * distanceX;
  sphere1.velocityY -= optimizedP * sphere2.mass * distanceY;
  sphere1.velocityZ -= optimizedP * sphere2.mass * distanceZ;
  sphere2.velocityX += optimizedP * sphere1.mass * distanceX;
  sphere2.velocityY += optimizedP * sphere1.mass * distanceY;
  sphere2.velocityZ += optimizedP * sphere1.mass * distanceZ;
};


/**
 * @param {!smash.Sphere} sphere
 */
smash.SphereSystem.prototype.applyGravity = function(sphere) {
  if (smash.SphereSystem.GRAVITY_ENABLED) {
    sphere.velocityY -= smash.SphereSystem.GRAVITY_FORCE;
  }
};


/**
 * @param {!smash.Sphere} sphere
 */
smash.SphereSystem.prototype.applyFloor = function(sphere) {
  if (sphere.positionY - sphere.radius <
      smash.SphereSystem.FLOOR_LEVEL) {
    sphere.velocityY *= -smash.SphereSystem.FLOOR_FRICTON;
  }
};


/**
 *
 */
smash.SphereSystem.prototype.step = function() {
  for (var i = 0; i < smash.SphereSystem.SPHERES_COUNT; i++) {
    this.applyGravity(this.spheres[i]);
    this.applyFloor(this.spheres[i]);


    this.spheres[i].step(1);
    for (var j = 0; j < smash.SphereSystem.SPHERES_COUNT; j++) {
      if (i != j &&
          smash.math.checkCollidingSpheres(this.spheres[i], this.spheres[j])) {
        this.collisions++;
        smash.SphereSystem.collide(this.spheres[i], this.spheres[j]);
      }
    }

    if (smash.flags.DRAWING_ENABLED) {
      this.threeSpheres[i].position.x = this.spheres[i].positionX;
      this.threeSpheres[i].position.y = this.spheres[i].positionY;
      this.threeSpheres[i].position.z = this.spheres[i].positionZ;
    }
  }

  if (smash.flags.DRAWING_ENABLED) {
    this.renderer.render(this.scene, this.camera);
  }
};
