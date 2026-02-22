// This is a file that makes the box rotate in the z-axis with constant speed.
// No interaction is required for the box to rotate for this file. 
// It rotates everytime the play button is clicked in 3dexperience

beScript.onStart = function () {
};

beScript.onStop = function () {
};

beScript.execute = function (context) {
  var speed = 2 * Math.PI / 1000; // Full rotation every 1 second (in rad/ms)
  var rotationVector = new DSMath.Vector3D(0.0, 0.0, context.deltaTime * speed);
  this.actor.rotate(rotationVector); // 'this.actor' is a shortcut for this.getActor()
};
