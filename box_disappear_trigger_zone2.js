//----------------------THIS SCRIPT IS ALSO NOT WORKING-------------------//
/* This script aims to hide the box when it enters a trigger zone. I created a 
   cube trigger zone. In the console it says "successfully linked to: triggerZone".
   Howeverm the disappearing logic is wrong I think.*/

beScript.onStart = function () {
    this.totalDistance = 0;
    this.done = true;

    // SDK CORRECT: Use getActorByName to retrieve the object from the experience
    if (!this.triggerZone) {
        this.triggerZone = STU.Experience.getCurrent().getActorByName("triggerZone", true);
    }

    if (this.triggerZone) {
        // Register the built-in TriggerZone event
        this.actor.addObjectListener(STU.TriggerZoneEnterEvent, this, 'onTriggerEnter');
        console.log("Successfully linked to: " + this.triggerZone.getName());
    } else {
        console.error("Critical: 'triggerZone' actor not found in scene tree.");
    }
};

beScript.onStop = function () {
    this.actor.visible = true;
    // Standard cleanup for event listeners
    this.actor.removeObjectListener(STU.TriggerZoneEnterEvent, this, 'onTriggerEnter');
};

beScript.onClickablePress = function () {
    this.totalDistance = 0;
    this.done = false;
};

beScript.onTriggerEnter = function (iEvent) {
    // Validate that the object entered is indeed our target zone
    if (iEvent.triggerZone === this.triggerZone) {
        this.actor.visible = false;
        this.done = true;
        console.log("Collision detected: Box hidden.");
    }
};

beScript.execute = function (context) {
    if (this.done) return;

    // 1. Movement Logic
    var moveSpeed = 200 / 1000;
    var moveStep = context.deltaTime * moveSpeed;

    if (this.totalDistance < 200) {
        this.totalDistance += moveStep;
        var translationVector = new DSMath.Vector3D(0.0, moveStep, 0.0);
        this.actor.translate(translationVector);
    } else {
        this.done = true;
    }

    // 2. Manual Proximity Check (The Backup)
    // If the event listener above isn't firing, this will catch it.
    if (this.triggerZone) {
        var boxPos = this.actor.getPosition();
        var zonePos = this.triggerZone.getPosition();

        // Calculate distance between centers
        var diff = boxPos.sub(zonePos);
        var distance = Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);

        // If box is within 150mm of the center, hide it
        if (distance < 150) {
            this.actor.visible = false;
            this.done = true;
            console.log("Proximity reached: Box hidden by manual check.");
        }
    }
};
