// =============================================================================
// Script Name: Box Translation on Mouse Hold
// =============================================================================
// Description:
//   This script moves a box actor along the Z axis while the mouse button is
//   held down on it. The box will continue to move for as long as the mouse
//   button is held down and will stop as soon as the mouse button is released.
//   The box will not move on its own and requires the user to hold the mouse
//   button down to trigger the movement.
//
// Usage:
//   - Attach this script to the box actor in the Behavior Editor
//   - Make sure the Clickable property on the box actor is set to true
//     in the Properties Panel, otherwise the mouse events will not be detected
//   - Press Play in 3DEXPERIENCE and hold down the mouse button on the box
//     to move it along the Z axis
//   - Release the mouse button to stop the movement
//
//
// Author: Omkar Ghodke
// Date: 3/12/2026
// =============================================================================

beScript.onStart = function () {
  this.isHeld = false; // Track if mouse button is held
};

beScript.onStop = function () {
};

// Start moving when mouse button is pressed
beScript.onClickablePress = function (iEvent) {
  this.isHeld = true;
};

// Stop moving when mouse button is released
beScript.onClickableRelease = function (iEvent) {
  this.isHeld = false;
};

beScript.execute = function (context) {
  // Only move if mouse button is held down
  if (this.isHeld) {
    var moveSpeed = 200 / 1000; // 200mm per second
    var moveStep = context.deltaTime * moveSpeed;
    var translationVector = new DSMath.Vector3D(0.0, 0.0, moveStep);
    this.actor.translate(translationVector);
  }
  else {
    return;
  }

};
