(function() {
    'use strict';

    /**
     * ================================================
     * Part 1: Override WebSocket to Delay PONG Messages
     * ================================================
     */

    // Store the original WebSocket constructor
    const OriginalWebSocket = window.WebSocket;

    // Override the WebSocket constructor
    window.WebSocket = function(url, protocols) {
        const socket = new OriginalWebSocket(url, protocols);

        // Store the original send method
        const originalSend = socket.send;

        // Override the send method to delay PONG messages
        socket.send = function(data) {
            let isPong = false;

            // Detect if the message is a PONG
            if (data instanceof ArrayBuffer) {
                const view = new DataView(data);
                isPong = view.getUint8(0) === 6; // 6 corresponds to ClientPacket.PONG
            } else if (typeof data === 'string') {
                isPong = data.charCodeAt(0) === 6;
            }

            if (isPong) {
                console.log('Intercepted PONG message, delaying by 106ms');
                setTimeout(() => {
                    originalSend.call(socket, data);
                    console.log('Delayed PONG message sent');
                }, 106);
            } else {
                originalSend.call(socket, data);
            }
        };

        return socket;
    };

    // Inherit WebSocket prototype
    window.WebSocket.prototype = OriginalWebSocket.prototype;
    window.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
    window.WebSocket.OPEN = OriginalWebSocket.OPEN;
    window.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
    window.WebSocket.CLOSED = OriginalWebSocket.CLOSED;

    console.log('Airmash Ping Spoofing script injected: PONG messages will be delayed by 200ms');

    /**
     * =========================================================
     * Part 2: Override Incoming Messages to Add 100ms to All Players' Pings
     * =========================================================
     */

    // Function to override UI.updateScore once it's available
    function overrideUIUpdateScore() {
        if (typeof UI === 'undefined' || typeof UI.updateScore !== 'function') {
            return false; // UI or updateScore not yet loaded
        }

        // Store the original UI.updateScore function
        const originalUpdateScore = UI.updateScore;

        // Override the UI.updateScore function
        UI.updateScore = function(scoreDetailedMsg) {
            // Check if the message contains score data
            if (scoreDetailedMsg && scoreDetailedMsg.scores && Array.isArray(scoreDetailedMsg.scores)) {
                // Iterate through each player's score
                scoreDetailedMsg.scores.forEach(score => {
                    if (score.id !== game.myID) { // Ensure we're not modifying your own ping
                        // Add 100ms to the existing ping
                        score.ping = (score.ping || 0) + 100;

                        // Optional: Clamp the ping to a maximum value to prevent excessively high pings
                        score.ping = Math.min(score.ping, 999); // Maximum ping set to 999ms
                    }
                });
            }

            // Call the original UI.updateScore with the modified message
            originalUpdateScore.call(UI, scoreDetailedMsg);
        };

        console.log('UI.updateScore overridden: All other players\' pings increased by 100ms');

        return true; // Successfully overridden
    }

    // Periodically check and override UI.updateScore
    const overrideInterval = setInterval(() => {
        if (overrideUIUpdateScore()) {
            clearInterval(overrideInterval);
        }
    }, 100); // Check every 100ms

    /**
     * =====================================
     * Part 3: Optimize Input Handling for Responsiveness
     * =====================================
     */

    // Function to override handleRotation for latency compensation
    function overrideHandleRotation() {
        if (typeof handleRotation !== 'function') {
            return false; // handleRotation not yet loaded
        }

        // Store the original handleRotation function
        const originalHandleRotation = handleRotation;

        // Override the handleRotation function
        handleRotation = function(rotation, touchForce) {
            var player = Players.getMe();
            if (player) {
                var rotationDifference = rotation - player.rot;
                // Normalize the rotation difference to the range [-π, π]
                if (rotationDifference > Math.PI) rotationDifference -= 2 * Math.PI;
                if (rotationDifference < -Math.PI) rotationDifference += 2 * Math.PI;

                // Calculate the time delay based on rotation difference and ship's turn factor
                var delay = Math.round(Math.abs(rotationDifference) / (60 * config.ships[player.type].turnFactor) * 1000);

                // Add a minimal base delay for latency compensation
                var baseDelay = 50; // 50ms base delay for higher responsiveness
                delay += baseDelay;

                // Clamp the delay to a reasonable maximum
                delay = Math.min(delay, 200); // Max 200ms delay

                // If delay is too short or rotations are happening too frequently, skip
                if (!(delay < 10 || game.time - lastRotationTime < 100)) {
                    clearTimeout(rotationTimerId);
                    lastRotationTime = game.time;

                    var direction = rotationDifference > 0 ? "RIGHT" : "LEFT";

                    // Apply rotation commands
                    A("UP", !(touchForce && touchForce < 0.5));
                    A(direction, true);

                    // Set a timeout to stop the rotation command after the calculated delay
                    rotationTimerId = setTimeout(function() {
                        A(direction, false);
                    }, delay);
                }
            }
        };

        console.log('handleRotation overridden: Reduced latency compensation for more responsive inputs');

        return true; // Successfully overridden
    }

    // Periodically check and override handleRotation
    const rotationOverrideInterval = setInterval(() => {
        if (overrideHandleRotation()) {
            clearInterval(rotationOverrideInterval);
        }
    }, 100); // Check every 100ms

    /**
     * =====================================
     * Part 4: Ensure All Other Players' Pings are Modified
     * =====================================
     */

    // If the game has other functions or message handlers that display pings,
    // ensure that they are also overridden to display the modified ping values.
    // This might include tooltip displays, scoreboards, etc.

    /**
     * =====================================
     * Part 5: Finalization and Testing
     * =====================================
     */

    console.log('Airmash Ping Spoofing and Latency Compensation script fully injected');

})();
