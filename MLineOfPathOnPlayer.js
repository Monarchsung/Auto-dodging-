(function() {
    'use strict';

    // Ensure that necessary game objects are accessible
    if (typeof Mobs === 'undefined' || typeof MobType === 'undefined' || typeof Players === 'undefined' || typeof game === 'undefined') {
        console.error('Required game objects (Mobs, MobType, Players, game) are not defined.');
        return;
    }

    console.log('Missile Tracker Overlay script initialized.');

    // Define the missile types you're interested in
    const missileTypes = new Set([
        MobType.PredatorMissile,
        MobType.TornadoSingleMissile,
        MobType.TornadoTripleMissile,
        MobType.ProwlerMissile,
        MobType.GoliathMissile,
        MobType.MohawkMissile,
        MobType.CarrotMissile
    ]);

    // Create a canvas overlay for visualization
    const canvas = document.createElement('canvas');
    canvas.id = 'missileOverlay';
    canvas.style.position = 'fixed'; // Fixed to viewport
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    canvas.style.zIndex = '1000'; // Ensure it's on top
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Function to resize the canvas when the window size changes
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Add event listener for window resize
    window.addEventListener('resize', resizeCanvas);

    // Missile tracking storage (for threat detection and dodging)
    const missileData = {};

    // Function to get the player's current position
    function getPlayerPosition() {
        const myPlayer = Players.get(game.myID);
        if (myPlayer && myPlayer.status === 0 && !myPlayer.spectate) {
            const spritePos = myPlayer.sprites.sprite.position;
            return { x: spritePos.x, y: spritePos.y };
        }
        // Default to (0,0) if player data is not available
        return { x: 0, y: 0 };
    }

    // Function to convert world coordinates to screen coordinates based on player's position
    function worldToScreen(worldX, worldY, playerX, playerY) {
        const scale = game.scale; // Assuming 'scale' is the zoom level
        const halfScreenX = window.innerWidth / 2;
        const halfScreenY = window.innerHeight / 2;

        // Calculate the difference between missile and player positions
        const deltaX = (worldX - playerX) * scale;
        const deltaY = (worldY - playerY) * scale;

        // Convert to screen coordinates with the player at the center
        const screenX = halfScreenX + deltaX;
        const screenY = halfScreenY + deltaY;

        return { screenX, screenY };
    }

    // Function to draw missiles on the canvas
    function drawMissiles() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get the player's current position
        const playerPos = getPlayerPosition();

        // Iterate over all active mobs to find missiles
        const activeMobs = Mobs.mobs(); // Assuming Mobs.mobs() returns an object of active mobs

        for (const mobId in activeMobs) {
            const mob = activeMobs[mobId];
            if (!mob || !missileTypes.has(mob.type)) continue;

            // Safety checks to ensure required properties exist
            if (!mob.pos || typeof mob.pos.x !== 'number' || typeof mob.pos.y !== 'number') {
                console.warn(`Missile ID ${mobId} lacks position data.`);
                continue;
            }

            // Check ownership: skip missiles that belong to the player
            if (mob.ownerId === game.myID) {
                // Draw a predicted path for player's missiles
                drawMissilePath(mob, playerPos);
                continue; // Skip rendering this missile
            }

            // Get current missile position directly from the game
            const missilePosX = mob.pos.x;
            const missilePosY = mob.pos.y;

            // Convert world coordinates to screen coordinates
            const { screenX, screenY } = worldToScreen(missilePosX, missilePosY, playerPos.x, playerPos.y);

            // Only draw if the missile is within the visible screen area
            if (screenX < 0 || screenX > window.innerWidth || screenY < 0 || screenY > window.innerHeight) continue;

            // Draw a circle representing the missile
            ctx.beginPath();
            ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI); // Radius of 5 pixels
            ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Semi-transparent red
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            // Optionally, display missile type
            ctx.font = '12px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(mob.type, screenX + 6, screenY - 6);
        }
    }

    // Function to draw the predicted path of player's missiles
    function drawMissilePath(missile, playerPos) {
        // Predict the future positions of the missile
        const futurePositions = [];
        let currentPos = { x: missile.pos.x, y: missile.pos.y };
        const speed = { x: missile.speed.x, y: missile.speed.y };

        for (let i = 0; i < 100; i++) { // Predict next 100 frames
            currentPos = {
                x: currentPos.x + speed.x,
                y: currentPos.y + speed.y
            };
            futurePositions.push(currentPos);
        }

        // Draw the path on the canvas
        ctx.beginPath();
        futurePositions.forEach((pos, index) => {
            const { screenX, screenY } = worldToScreen(pos.x, pos.y, playerPos.x, playerPos.y);
            if (index === 0) {
                ctx.moveTo(screenX, screenY);
            } else {
                ctx.lineTo(screenX, screenY);
            }
        });
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)'; // Semi-transparent green for player's missile path
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Function to update the canvas at regular intervals using requestAnimationFrame for smoother rendering
    function updateCanvas() {
        drawMissiles();
        requestAnimationFrame(updateCanvas);
    }

    // Start the canvas update loop
    requestAnimationFrame(updateCanvas);

    console.log('Missile Tracker Overlay is actively tracking missiles.');
})();
