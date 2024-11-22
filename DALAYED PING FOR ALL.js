
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
                }, 106); // Set Ping to however much you want it to be disguised for 
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
     * Part 3: Handle Asynchronous UI Loading
     * =====================================
     */

    // In some cases, the game might dynamically load scripts after the initial load.
    // The above interval-based override should suffice for most cases.

})();
