// The box will move 200mm in the y axis after being clicked.
// It waits for a click before doing anything.

beScript.onStart = function () {
  this.totalDistance = 0;
  this.done = true; // Wait for click first
};

beScript.onStop = function () {
};

// When the box is clicked, reset and allow movement
beScript.onClickablePress = function () {
  this.totalDistance = 0;
  this.done = false;
};

beScript.execute = function (context) {
  // If box has completed its motion, do nothing
  if (this.done) return;

  // Movement speed (200mm over 1 second)
  var moveSpeed = 200 / 1000; // mm per ms
  var moveStep = context.deltaTime * moveSpeed;

  // Move in Z axis
  if (this.totalDistance < 200) {
    this.totalDistance += moveStep;
    var translationVector = new DSMath.Vector3D(0.0, moveStep, 0.0);
    this.actor.translate(translationVector);
  } else {
    this.done = true;
  }
};
