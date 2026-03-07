// This is a file that makes the box rotate in the z-axis with constant speed counter-clockwise.
// The box will rotate exactly 2 full times and then stop.
// It rotates everytime the play button is clicked in 3dexperience

beScript.onStart = function () {
  this.totalAngle = 0; // Track total rotation
  this.done = false;   // Flag to stop rotation
};

beScript.onStop = function () {
};

beScript.execute = function (context) {
  // If box has completed 2 full rotations, do nothing
  if (this.done) return;

  var speed = 2 * Math.PI / 1000; // Full rotation every 1 second (in rad/ms)
  var angle = context.deltaTime * speed;

  // Add to total angle rotated
  this.totalAngle += angle;

  // Check if 2 full rotations have been completed (2 * 2π)
  if (this.totalAngle >= 2 * 2 * Math.PI) {
    this.done = true;
    return;
  }

  var rotationVector = new DSMath.Vector3D(0.0, 0.0, angle);
  this.actor.rotate(rotationVector);
};
