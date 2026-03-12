/*This is a script that will rotate the box in the z axis
  only when the mouse is clicked*/
// The box rotates only while the mouse button is held down.
// When the mouse press is released, the box stops rotating

beScript.onStart = function () {
  this.isHeld = false; // Track if mouse button is held
};

beScript.onStop = function () {
};

// Start rotating when mouse button is pressed
beScript.onClickablePress = function (iEvent) {
  this.isHeld = true;
};

// Stop rotating when mouse button is released
beScript.onClickableRelease = function (iEvent) {
  this.isHeld = false;
};

beScript.execute = function (context) {
  // Only rotate if mouse button is held down
  if (this.isHeld) {
    var speed = 2 * Math.PI / 1000;
    var rotationVector = new DSMath.Vector3D(0.0, 0.0, context.deltaTime * speed);
    this.actor.rotate(rotationVector);
  }
  
  return;

};
