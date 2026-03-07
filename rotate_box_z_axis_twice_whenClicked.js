// This is a file that makes the box rotate in the z-axis with constant speed.
// The box will rotate exactly 2 full times and then stop.
// When clicked, the box will rotate 2 full times again.

beScript.onStart = function () {
  this.totalAngle = 0;
  this.done = true; // Start as true so box waits for click first
};

beScript.onStop = function () {
};

// When the box is clicked, reset and allow rotation again
beScript.onClickablePress = function () {
  this.totalAngle = 0;
  this.done = false;
};

beScript.execute = function (context) {
  // If box has completed 2 full rotations, do nothing
  if (this.done) return;

  var speed = 2 * Math.PI / 1000;
  var angle = context.deltaTime * speed;

  this.totalAngle += angle;

  // Check if 2 full rotations have been completed
  if (this.totalAngle >= 2 * 2 * Math.PI) {
    this.done = true;
    return;
  }

  var rotationVector = new DSMath.Vector3D(0.0, 0.0, angle);
  this.actor.rotate(rotationVector);
};
