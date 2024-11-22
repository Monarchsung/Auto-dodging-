(function() {
    'use strict';

    if (typeof Mobs === 'undefined' || typeof MobType === 'undefined' || typeof Players === 'undefined' || typeof game === 'undefined') {
        console.error('Required game objects (Mobs, MobType, Players, game) are not defined.');
        return;
    }

    console.log('Missile Tracker Overlay script initialized.');

    const missileTypes = new Set([
        MobType.PredatorMissile,
        MobType.TornadoSingleMissile,
        MobType.TornadoTripleMissile,
        MobType.ProwlerMissile,
        MobType.GoliathMissile,
        MobType.MohawkMissile,
        MobType.CarrotMissile
    ]);

    const canvas = document.createElement('canvas');
    canvas.id = 'missileOverlay';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let showMissilePaths = true;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener('keydown', function(event) {
        if (event.key === 'p' || event.key === 'P') {
            showMissilePaths = !showMissilePaths;
        }
    });

    function getPlayerPosition() {
        const myPlayer = Players.get(game.myID);
        return myPlayer ? { x: myPlayer.pos.x, y: myPlayer.pos.y } : { x: 0, y: 0 };
    }

    function worldToScreen(worldX, worldY, playerX, playerY) {
        const scale = game.scale;
        const deltaX = (worldX - playerX) * scale;
        const deltaY = (worldY - playerY) * scale;
        return {
            screenX: window.innerWidth / 2 + deltaX,
            screenY: window.innerHeight / 2 + deltaY
        };
    }

    function drawAdaptiveCurvySafetyPaths(playerPos, incomingMissiles) {
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.7)';
        ctx.lineWidth = 2;

        const safeAngles = [];
        for (let angle = -Math.PI; angle <= Math.PI; angle += Math.PI / 8) {
            let isSafe = true;

            for (const missile of incomingMissiles) {
                const missileAngle = Math.atan2(missile.pos.y - playerPos.y, missile.pos.x - playerPos.x);
                const angleDifference = Math.abs(angle - missileAngle);
                if (angleDifference < Math.PI / 6) { // If angle is too close to missile path
                    isSafe = false;
                    break;
                }
            }

            if (isSafe) {
                safeAngles.push(angle);
            }
        }

        for (const angle of safeAngles) {
            ctx.beginPath();
            ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);

            for (let t = 0; t <= 1; t += 0.05) {
                const curveFactor = Math.sin(t * Math.PI); // Creates a curvy path
                const x = playerPos.x + Math.cos(angle) * 300 * t * curveFactor;
                const y = playerPos.y + Math.sin(angle) * 300 * t * curveFactor;
                const { screenX, screenY } = worldToScreen(x, y, playerPos.x, playerPos.y);
                ctx.lineTo(screenX, screenY);
            }

            ctx.stroke();
        }
    }

    function drawMissiles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const playerPos = getPlayerPosition();
        const myPlayer = Players.get(game.myID);
        const myTeam = myPlayer ? myPlayer.team : null;
        let playerInCollision = false;
        const incomingMissiles = [];

        const mobs = Mobs.mobs();
        for (const mobId in mobs) {
            const mob = mobs[mobId];
            if (missileTypes.has(mob.type) && mob.ownerId !== game.myID && (!myTeam || Players.get(mob.ownerId).team !== myTeam)) {
                const { screenX, screenY } = worldToScreen(mob.pos.x, mob.pos.y, playerPos.x, playerPos.y);
                if (screenX >= 0 && screenX <= window.innerWidth && screenY >= 0 && screenY <= window.innerHeight) {
                    // Draw missile indicator (red circle)
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
                    ctx.fill();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'black';
                    ctx.stroke();
                    ctx.font = '12px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText(mob.type, screenX + 6, screenY - 6);

                    // Draw semi-transparent yellow line indicating missile path
                    if (mob.speed) {
                        const futurePosX = mob.pos.x + mob.speed.x * 50; // Predict future position (factor can be adjusted)
                        const futurePosY = mob.pos.y + mob.speed.y * 50;
                        const { screenX: futureScreenX, screenY: futureScreenY } = worldToScreen(futurePosX, futurePosY, playerPos.x, playerPos.y);

                        if (showMissilePaths) {
                            ctx.beginPath();
                            ctx.moveTo(screenX, screenY);
                            ctx.lineTo(futureScreenX, futureScreenY);
                        }

                        // Calculate vector from missile to player and missile direction
                        const missileToPlayer = new Vector(playerPos.x - mob.pos.x, playerPos.y - mob.pos.y);
                        const missileDirection = new Vector(mob.speed.x, mob.speed.y);

                        // Check if missile is heading towards the player
                        const dotProduct = missileToPlayer.dot(missileDirection);
                        if (dotProduct > 0) { // Missile is heading towards the player
                            // Check for collision with player using line intersection
                            const playerRadius = 20; // Adjust radius as needed
                            const playerScreenX = window.innerWidth / 2;
                            const playerScreenY = window.innerHeight / 2;

                            // Calculate distance from line to player center
                            const a = futureScreenY - screenY;
                            const b = screenX - futureScreenX;
                            const c = futureScreenX * screenY - screenX * futureScreenY;
                            const distance = Math.abs(a * playerScreenX + b * playerScreenY + c) / Math.sqrt(a * a + b * b);

                            if (distance <= playerRadius) {
                                if (showMissilePaths) {
                                    // Change missile path line to blue
                                    ctx.strokeStyle = 'rgba(0, 0, 255, 0.7)';
                                }
                                playerInCollision = true;
                                incomingMissiles.push(mob);
                            } else {
                                if (showMissilePaths) {
                                    ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                                }
                            }
                        } else {
                            if (showMissilePaths) {
                                ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
                            }
                        }

                        if (showMissilePaths) {
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        if (playerInCollision) {
            drawAdaptiveCurvySafetyPaths(playerPos, incomingMissiles);
        }

        // Set player sprite glow based on collision status
        if (myPlayer && myPlayer.sprites && myPlayer.sprites.sprite) {
            if (playerInCollision) {
                myPlayer.sprites.sprite.tint = 0xff0000; // Set player sprite to glow red
            } else {
                myPlayer.sprites.sprite.tint = 0xffffff; // Reset player sprite color
            }
        }
    }

    function updateCanvas() {
        drawMissiles();
        requestAnimationFrame(updateCanvas);
    }

    requestAnimationFrame(updateCanvas);
})();

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(other) {
        return this.x * other.x + this.y * other.y;
    }
}
