//---------------------------------------THIS SCRIPT IS NOT WORKING--------------------------------//
// The box will disappear when it enters the trigger zone.
// The trigger zone area is set to the right of the box in the y axis
// Console says "No trigger zone assigned"

beScript.onStart = function () {
  this.totalDistance = 0;
  this.done = true;

  // Make sure triggerZone property is assigned
  if (!this.triggerZone) {
    console.error("No trigger zone actor assigned!");
  }
};

beScript.onStop = function () {
  // Make box visible again when experience stops
  this.actor.visible = true;
};

beScript.onClickablePress = function () {
  this.totalDistance = 0;
  this.done = false;
};

beScript.execute = function (context) {
  if (this.done) return;

  // Movement speed (200mm over 1 second)
  var moveSpeed = 200 / 1000;
  var moveStep = context.deltaTime * moveSpeed;

  // Move in Y axis
  if (this.totalDistance < 200) {
    this.totalDistance += moveStep;
    var translationVector = new DSMath.Vector3D(0.0, moveStep, 0.0);
    this.actor.translate(translationVector);
  } else {
    this.done = true;
  }

  // Check distance between box and trigger zone each frame
  if (this.triggerZone) {
    var boxPos = this.actor.getPosition();
    var zonePos = this.triggerZone.getPosition();

    // Calculate distance between box and trigger zone
    var diff = boxPos.sub(zonePos);
    var distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);

    // If box is within 150mm of trigger zone center, hide it
    if (distance < 150) {
      this.actor.visible = false;
      this.done = true;
    }
  }
};

