const countryCodes = [ "SY", "TH", "TM", "TN", "TR", "TT", "TW", "TZ", "UA", "UN", "US", "UY", "UZ", "VE", "VN", "PR", "PT", "PY", "QA", "RAINBOW", "RO", "RS", "RU", "SA", "SE", "SG", "SI", "SK", "SM", "MK", "MO", "MT", "MX", "MY", "NG", "NL", "NO", "NP", "NZ", "OM", "PA", "PE", "JP", "KP", "KR", "KW", "KZ", "LB", "LI", "LK", "LT", "LU", "LV", "HN", "HR", "HU", "ID", "IE", "IL", "IM", "IMPERIAL", "IN", "IQ", "DE", "DK", "DO", "DZ", "EC", "EE", "EG", "ES", "EU", "BH", "BO", "BR", "BT", "BY", "CA", "CH", "AD", "AE", "AL", "AM", "CL", "AQ", "CN", "AR", "FI", "CO", "AT", "IR", "FR", "COMMUNIST", "AU", "LY", "IS", "GB", "CONFEDERATE", "AZ", "MA", "IT", "GE", "CR", "BA", "PH", "MC", "JM", "GR", "CU", "BD", "SO", "PK", "MD", "JO", "GT", "CY", "BE", "ZA", "SV", "PL", "ME", "JOLLY", "HK", "CZ", "BG" ];

const randomNames = [
    "Shadow", "Phoenix", "Blaze", "Ghost", "Viper", "Raven", "Cyclone", "Falcon", "Mystic", "Hunter",
    "Titan", "Storm", "Knight", "Wraith", "Hawk", "Echo", "Omega", "Nova", "Rogue", "Maverick",
    "Ace", "Bolt", "Drake", "Spartan", "Raider", "Fury", "Nebula", "Specter", "Zephyr", "Valkyrie",
    "Onyx", "Striker", "Sentinel", "Inferno", "Razor", "Archer", "Cobra", "Lancer", "Reaper",
    "Vanguard", "Nomad", "Saber", "Riptide", "Tempest", "Banshee", "Scorpion", "Hydra", "Griffin",
    "Jaguar", "Vortex", "Sphinx", "Atlas", "Talon", "Blade", "Frost", "Gale", "Surge", "Prowler",
    "Wrath", "Phantom", "Obsidian", "Havoc", "Lynx", "Venom", "Ranger", "Wolf", "Zodiac", "Nitro",
    "Pulse", "Volt", "Blizzard", "Chaos", "Cosmos", "Edge", "Flare", "Gladiator", "Jester",
    "Kraken", "Leviathan", "Mirage", "Oblivion", "Quasar", "Stingray", "Titan", "Umbra",
    "Warlock", "Xenon", "Yeti", "Zenith", "Apollo", "Bandit", "Comet", "Dagger", "Ember",
    "Fang", "Ghoul", "Helix", "Ignite", "Javelin", "Krait", "Lucifer", "Magma", "Nighthawk",
    "Outlaw", "Panic", "Quake", "Ravage", "Sonic", "Tsunami", "Vandal", "Wildcat", "Xander",
    "Yurei", "Zircon", "Abyss", "Blitz", "Crimson", "Dynasty", "Frostbite", "Gunner", "Harbinger",
    "Ion", "Jinx", "Karma", "Liberty", "Myst", "Nexus", "Oracle", "Quill", "Rift", "Savage",
    "Unity", "Vesper", "Warden", "Xena", "Yonder", "Raptor", "Nebula", "Eclipse", "Solstice",
    "Midnight", "Cryptic", "Mantis", "Cobalt", "Titanium", "Astra", "Catalyst", "Spectra",
    "Glimmer", "Solace", "Cinder", "Horizon", "Synergy", "Nimbus", "Luna", "Spire", "Genesis",
    "Revenant", "Aurora", "Cosmic", "Nyx", "Guardian", "Berserker", "Pioneer", "Resolve",
    "Turbine", "Phoenix", "Ironclad", "Voyager", "Crescent", "Beacon", "Torrent", "Maelstrom",
    "Astral", "Spectral", "Paradox", "Sable", "Ardent", "Nightshade", "Pyro", "Obelisk",
    "Radiant", "Zealot", "Tremor", "Ignis", "Gladius", "Astrid", "Scythe", "Twilight", "Lyra",
    "Ravager",
    "Aether", "Brimstone", "Cobalt", "Dusk", "Emberlyn", "Frostbite", "Garnet", "Helios",
    "Ivory", "Jade", "Kaida", "Lumina", "Mirage", "Nyxie", "Orion", "Peridot", "Quartz",
    "Ravenna", "Sapphire", "Thorne", "Umbriel", "Vespera", "Willow", "Xandra", "Yara",
    "Zephyrine", "Alaric", "Briar", "Celeste", "Darian", "Elara", "Fenrir", "Gaia", "Haven",
    "Isolde", "Jasper", "Kairos", "Liora", "Morrigan", "Nero", "Orla", "Phoenixia", "Quillon",
    "Rowan", "Selene", "Theron", "Ulric", "Valeria", "Wren", "Xenith", "Yvette", "Zara",
    "Aldric", "Blaise", "Cassian", "Daphne", "Eldric", "Faelan", "Galadriel", "Hadrian",
    "Isis", "Jorah", "Kieran", "Lyric", "Maelis", "Niamh", "Orionis", "Peregrine", "Quinta",
    "Rune", "Soraya", "Tristan", "Ulyssa", "Varek", "Winry", "Xanthe", "Yseult", "Zarek",
    "Aria", "Bram", "Cyra", "Darius", "Eira", "Finnian", "Giselle", "Hawke", "Iris", "Juno",
    "Kara", "Lysander", "Mira", "Nolan", "Ophelia", "Pax", "Quincy", "Rhea", "Silas",
    "Talia", "Ulani", "Vion", "Wesley", "Xiomara", "Yara", "Zion", "Astraea", "Briar", "Caelum",
    "Dorian", "Elowen", "Fiora", "Griffin", "Harlow", "Isla", "Jasper", "Keira", "Lennon",
    "Mabel", "Nico", "Odette", "Piper", "Quinn", "Rosalie", "Soren", "Thalia", "Uriah",
    "Veda", "Wynn", "Xavier", "Yvonne", "Zelda", "Alina", "Benson", "Calla", "Dax", "Esme",
    "Flynn", "Gia", "Hector", "Ivy", "Jace", "Kael", "Luna", "Milo", "Nova", "Orin", "Poppy",
    "Quorra", "Reese", "Sage", "Talon", "Una", "Vera", "Wyatt", "Xena", "Yara", "Zane",
    "Aiden", "Belle", "Cyrus", "Demi", "Elias", "Freya", "Gideon", "Hazel", "Ian", "Jade",
    "Kian", "Leila", "Maxen", "Noa", "Olive", "Porter", "Quincy", "Rory", "Stella", "Theo",
    "Uma", "Vince", "Willa", "Xander", "Yasmine", "Zara", "Asher", "Brielle", "Cade",
    "Delilah", "Emmett", "Faye", "Grayson", "Hope", "Isaac", "Juno", "Kira", "Leo", "Maya",
    "Nolan", "Opal", "Phoenix", "Quinn", "Ruby", "Sebastian", "Tessa", "Uriah", "Violet",
    "Wyatt", "Ximena", "Yosef", "Zane", "Aurora", "Blake", "Cora", "Declan", "Elena",
    "Finn", "Gia", "Holden", "Isabel", "Jasper", "Keira", "Liam", "Mila", "Nathan", "Olivia",
    "Parker", "Quinn", "Rowan", "Sophia", "Tristan", "Uma", "Victor", "Willow", "Xavier",
    "Yara", "Zeke", "Ariana", "Bryce", "Camila", "Derek", "Eva", "Gavin", "Hailey",
    "Ian", "Juliet", "Kellan", "Lily", "Mason", "Nora", "Owen", "Paisley", "Quentin",
    "Reagan", "Sawyer", "Taylor", "Ulysses", "Vivian", "Wyatt", "Xenia", "Yvette", "Zachary",
    "Adeline", "Brody", "Caitlyn", "Dante", "Eliza", "Felix", "Gemma", "Hunter", "Isla",
    "Jace", "Kinsley", "Landon", "Molly", "Nolan", "Ophelia", "Paxton", "Quincy", "Riley",
    "Sienna", "Tyler", "Uma", "Vera", "Weston", "Xander", "Yvonne", "Zara", "Alaina", "Blake",
    "Chase", "Daisy", "Eli", "Faith", "Griffin", "Hazel", "Isaiah", "Jenna", "Kai", "Levi",
    "Maya", "Nina", "Oscar", "Piper", "Quinn", "Ryan", "Sophie", "Travis", "Uriah", "Violet",
    "Wyatt", "Ximena", "Yosef", "Zane", "Amelia", "Brandon", "Clara", "Dylan", "Elise",
    "Finn", "Grace", "Henry", "Ivy", "Jacob", "Kylie", "Logan", "Mila", "Noah", "Olive",
    "Parker", "Quinn", "Ruby", "Sebastian", "Tessa", "Uriah", "Violet", "Wyatt", "Xena",
    "Yara", "Zane", "Aiden", "Bella", "Caleb", "Daphne", "Ethan", "Fiona", "Gavin", "Hailey",
    "Isaac", "Jade", "Kai", "Lily", "Mason", "Nora", "Owen", "Piper", "Quinn", "Riley",
    "Sophie", "Tristan", "Uma", "Violet", "Wyatt", "Xavier", "Yara", "Zane", "Asher",
    "Brooklyn", "Connor", "Delilah", "Elijah", "Faith", "Grayson", "Hazel", "Ian",
    "Jasmine", "Kellan", "Luna", "Liam", "Maya", "Noah", "Olivia", "Parker", "Quincy",
    "Riley", "Sienna", "Tyler", "Uma", "Vera", "Wyatt", "Ximena", "Yosef", "Zane",
    "Ariana", "Brayden", "Chloe", "Derek", "Elena", "Felix", "Gianna", "Hunter",
    "Isla", "Jace", "Kinsley", "Landon", "Molly", "Nolan", "Ophelia", "Paxton",
    "Quinn", "Riley", "Sienna", "Tyler", "Uma", "Violet", "Wyatt", "Xander",
    "Yara", "Zane", "Aiden", "Bella", "Caleb", "Daphne", "Ethan", "Fiona",
    "Gavin", "Hailey", "Isaac", "Jade", "Kai", "Lily", "Mason", "Nora",
    "Owen", "Piper", "Quinn", "Riley", "Sophie", "Tristan", "Uma", "Violet",
    "Wyatt", "Xena", "Yara", "Zane", "Asher", "Brooklyn", "Connor", "Delilah",
    "Elijah", "Faith", "Grayson", "Hazel", "Ian", "Jasmine", "Kellan", "Luna",
    "Liam", "Maya", "Noah", "Olivia", "Parker", "Quincy", "Riley", "Sienna",
    "Tyler", "Uma", "Vera", "Wyatt", "Ximena", "Yosef", "Zane",    // The Eminence in Shadow
    "Cid Kagenou", "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Alexia Midgar", "Iris Midgar", 
    "Sherry Barnett", "Rose Oriana", "Beatrix", "Victoria", "Mary", "Nelson", "Annerose", "Claire Kagenou",

    // Solo Leveling
    "Sung Jin-Woo", "Cha Hae-In", "Go Gun-Hee", "Baek Yoon-Ho", "Yu Jin-Ho", "Liu Zhigang", "Thomas Andre", 
    "Kamish", "Igris", "Beru", "Iron", "Bellion", "Ryuji Goto", "Jin-Chul", "Esil Radiru",

    // Tokyo Ghoul
    "Ken Kaneki", "Touka Kirishima", "Rize Kamishiro", "Shuu Tsukiyama", "Hideyoshi Nagachika", "Koutarou Amon",
    "Yoshimura", "Renji Yomo", "Nishiki Nishio", "Juuzou Suzuya", "Hinami Fueguchi", "Kaya Irimi", "Kishou Arima",
    "Ayato Kirishima", "Eto Yoshimura",

    // Berserk
    "Guts", "Griffith", "Casca", "Puck", "Judeau", "Corkus", "Farnese", "Serpico", "Isidro", "Schierke", "Skull Knight",
    "Zodd", "Void", "Rickert", "Luca", "Mozgus",

    // Attack on Titan
    "Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi Ackerman", "Reiner Braun", "Erwin Smith", "Jean Kirstein",
    "Hange Zoë", "Historia Reiss", "Zeke Yeager", "Sasha Blouse", "Connie Springer", "Annie Leonhart", "Ymir", 
    "Hannes", "Floch Forster",

    // Jobless Reincarnation (Mushoku Tensei)
    "Rudeus Greyrat", "Roxy Migurdia", "Eris Boreas Greyrat", "Sylphiette", "Paul Greyrat", "Zenith Greyrat",
    "Norn Greyrat", "Aisha Greyrat", "Ruijerd Superdia", "Ghislaine Dedoldia", "Orsted", "Hitogami", "Lilia",

    // One Punch Man
    "Saitama", "Genos", "Speed-o'-Sound Sonic", "Mumen Rider", "Tatsumaki", "Fubuki", "Bang", "King", "Atomic Samurai",
    "Child Emperor", "Zombieman", "Drive Knight", "Watchdog Man", "Flashy Flash", "Garou", "Boros", "Suiryu",

    // Hunter x Hunter
    "Gon Freecss", "Killua Zoldyck", "Kurapika", "Leorio Paradinight", "Hisoka Morow", "Chrollo Lucilfer", 
    "Biscuit Krueger", "Meruem", "Komugi", "Neferpitou", "Shaiapouf", "Menthuthuyoupi", "Silva Zoldyck", 
    "Illumi Zoldyck", "Zeno Zoldyck",

    // Demon Slayer
    "Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira", "Kyojuro Rengoku", "Giyu Tomioka", 
    "Shinobu Kocho", "Muzan Kibutsuji", "Tamayo", "Yushiro", "Kanao Tsuyuri", "Genya Shinazugawa", "Tengen Uzui",
    "Gyomei Himejima", "Obanai Iguro", "Sanemi Shinazugawa", "Mitsuri Kanroji", "Akaza", "Daki", "Gyutaro",

    // Jujutsu Kaisen (JJK)
    "Yuji Itadori", "Megumi Fushiguro", "Nobara Kugisaki", "Satoru Gojo", "Sukuna", "Maki Zenin", "Toge Inumaki", 
    "Panda", "Kento Nanami", "Mai Zenin", "Aoi Todo", "Mahito", "Suguru Geto", "Choso", "Jogo", "Hanami", "Mechamaru",

    // Nemes
    "Doge", "Pepe", "Rickroll", "Grumpy Cat", "Success Kid", "Bad Luck Brian",
    "Ermahgerd", "This is fine", "Hide the Pain", "Mocking SpongeBob",
    "Surprised Pikachu", "One Does Not", "Roll Safe", "Epic Fail", 
    "Y U No", "You Had One Job", "Hold My Beer", "Florida Man",
    "Ight Imma Head Out", "Big Brain Time", "OK Boomer", "Karen", 
    "Brace Yourselves", "Condescending", "Scumbag Steve", 
    "First World Prob", "Philosoraptor", "Feels Guy", "Dat Boi",
    "All Your Base", "Leeroy Jenkins", "Over 9000!", "Do a Barrel Roll",
    "The Cake is a Lie", "Press F", "404 Error", "Blue Screen", 
    "Keep Calm", "Cash Me Outside", "Damn Daniel", "What Are Those?",
    "Do It for Vine", "Harlem Shake", "Gangnam Style", 
    "Charlie Bit Me", "Double Rainbow", "Nyan Cat", "Keyboard Cat",
    "Forever Alone", "Le Lenny Face", "Me Gusta", "Ancient Aliens",
    "Not Sure If", "You Died", "Wasted", "This Is a Pigeon?",
    "Hold My Beer", "Arrow to Knee", "Here's Johnny!", "I'll Be Back",
    "Hasta La Vista", "Say Hello", "I'm the King", "I See Dead People",
    "Infinity & Beyond", "No Place Like", "I'm the Captain",
    "I Am Groot", "I'm Inevitable", "Yo Mama", "Your Mom",
    "Knock Knock", "O RLY?", "Imma Let You", "It's a Trap!",
    "Take My Money", "I'm Not a Robot", "The Cloud", "There's an App",
    "I Can Has", "404 Not Found", "Keep Calm & Carry", "404 No Found",
    "Not Today Satan", "I Ship It", "Triggered", "Sorry Not Sorry",
    "Squad Goals", "Zero Chill", "Tea Spilled", "Fake News",
    "All the Feels", "No Chill", "Throwing Shade", "Feeling Cute",
    "You Mad Bro?", "Get Rekt", "Gonna Cry?", "Sad Reacts Only",
    "But Why?", "Challenge Accepted", "Deal With It", "It Me",
    "Shooketh", "On Fleek", "Hot Take", "Clap Back", "Big Yikes",
    "And I Oop", "Mood", "It's Lit", "Low Key", "Stan", "Yeet",
    "Savage", "Bruh", "Epic Fail", "That Escalated", "Glitching",
    "Brain Freeze", "Tea Spill", "Is This a Joke?", "Hold Up", 
    "Let's Get This", "Say Less", "Triggered", "Take an L",
    "Cash Me Outside", "That's Cap", "Press X to Doubt", "Ohio Rizz", 
    "Skibidi Toilet", "I Am Him", "Watch Out", "Gyat Damn!", "Anonymous", 
    "Fake Ping", "C-O Ping Loading", "That's a W", "49er Girl", "Call Me Baby!", "Daddy Getting Milk",
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const originalGameStart = UI.gameStart;
UI.gameStart = function (playerName, isFirstTime) {
    // Randomize player name and flag each time game starts
    const randomizedName = getRandomElement(randomNames);
    const randomizedFlag = getRandomElement(countryCodes);
    
    // Set the flag command with a random flag after the game starts
    setTimeout(() => {
        UI.parseCommand(`/flag ${randomizedFlag}`);
        UI.addChatMessage(`Your flag has been set to '${randomizedFlag}' and your name has been set to '${randomizedName}'`);
    }, 1000);

    // Call the original gameStart function
    originalGameStart(randomizedName, isFirstTime);
};

// New code
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

    function drawMissiles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const playerPos = getPlayerPosition();
        const myPlayer = Players.get(game.myID);
        const myTeam = myPlayer ? myPlayer.team : null;
        let playerInCollision = false;

        if (!myPlayer || myTeam === null) {
            return; // If my player or team is not defined, skip drawing
        }

        const mobs = Mobs.mobs();
        for (const mobId in mobs) {
            const mob = mobs[mobId];
            const ownerPlayer = Players.get(mob.ownerId);

            // Ensure the owner player is defined before accessing properties
            if (missileTypes.has(mob.type) && mob.ownerId !== game.myID && ownerPlayer && ownerPlayer.team !== myTeam) {
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
// New code

//New Code

// New code
(function() {
    // Check if the Team Chat Radio already exists to prevent duplication
    if (document.getElementById('team-chat-radio')) {
        console.warn('Team Chat Radio is already initialized.');
        return;
    }

    // Default messages for all 10 lines, numbered for reference
    const defaultMessages = [
        '#Cap',
        '#Recap',
        '#Dropnow',
        '#Auto',
        '#Assist Me',
        '#Drop',
        '#Defend',
        '#Status',
        '#Yes',
        '#Storm'
    ];

    // Load saved messages from localStorage or use defaults
    const savedMessages = JSON.parse(localStorage.getItem('teamChatRadioMessages')) || defaultMessages.slice();

    // Function to save messages to localStorage
    function saveMessages() {
        localStorage.setItem('teamChatRadioMessages', JSON.stringify(savedMessages));
    }

    // Create the pop-up container
    const popup = document.createElement('div');
    popup.id = 'team-chat-radio';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.left = '50%'; // Center horizontally
    popup.style.transform = 'translateX(-50%)'; // Adjust for perfect centering
    popup.style.width = '220px'; // Slightly wider to accommodate potential edits
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.color = '#fff';
    popup.style.padding = '10px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    popup.style.display = 'none';
    popup.style.zIndex = '10000';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.fontSize = '14px';
    popup.style.textAlign = 'left'; // Align text to the left for better readability
    popup.style.userSelect = 'none'; // Prevent text selection

    // Create the title
    const title = document.createElement('div');
    title.textContent = 'Team Chat Radio';
    title.style.textAlign = 'center';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    popup.appendChild(title);

    // Create the message lines
    const messageLines = [];
    for (let i = 0; i < 10; i++) {
        const line = document.createElement('div');
        line.textContent = `${i + 1}. ${savedMessages[i] || ''}`;
        line.style.padding = '4px 5px';
        line.style.borderRadius = '4px';
        line.style.cursor = 'pointer';
        line.title = 'Double-click (Desktop) or Long-press (Mobile) to edit';

        // Highlight on hover
        line.addEventListener('mouseenter', () => {
            line.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        line.addEventListener('mouseleave', () => {
            line.style.backgroundColor = 'transparent';
        });

        // Allow editing on double-click (Desktop)
        line.addEventListener('dblclick', () => {
            initiateEdit(line, i);
        });

        // Allow editing on long-press (Mobile)
        let touchTimer;
        const touchDuration = 500; // 500ms for long-press
        line.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent triggering other events
            touchTimer = setTimeout(() => {
                initiateEdit(line, i);
            }, touchDuration);
        });
        line.addEventListener('touchend', () => {
            clearTimeout(touchTimer);
        });

        popup.appendChild(line);
        messageLines.push(line);
    }

    // Append the pop-up to the body
    document.body.appendChild(popup);

    // Function to initiate edit mode
    function initiateEdit(line, index) {
        const currentText = line.textContent.slice(3); // Remove numbering
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.style.width = '90%';
        input.style.padding = '2px';
        input.style.border = 'none';
        input.style.borderRadius = '4px';
        input.style.outline = 'none';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        input.style.color = '#fff';
        input.style.fontSize = '14px';
        input.style.fontFamily = 'Arial, sans-serif';
        line.textContent = '';
        line.appendChild(input);

        // Focus the input after a slight delay to ensure it's rendered
        setTimeout(() => {
            input.focus();
        }, 100);

        // Save on Enter or Escape
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const newText = input.value.trim() || defaultMessages[index];
                savedMessages[index] = newText;
                saveMessages();
                line.textContent = `${index + 1}. ${newText}`;
                e.preventDefault();
            }
            if (e.key === 'Escape') {
                line.textContent = `${index + 1}. ${currentText}`;
                e.preventDefault();
            }

            // Prevent event from bubbling up to the game only for specific keys
            if (['Enter', 'Escape'].includes(e.key)) {
                e.stopPropagation();
            }
        });

        // Save on blur
        input.addEventListener('blur', () => {
            const newText = input.value.trim() || defaultMessages[index];
            savedMessages[index] = newText;
            saveMessages();
            line.textContent = `${index + 1}. ${newText}`;
        });
    }

    // Function to toggle the pop-up visibility
    function togglePopup() {
        if (popup.style.display === 'none') {
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    }

    // Function to send a message based on key press
    function sendMessage(index) {
        if (index < 0 || index >= savedMessages.length) return;
        const message = savedMessages[index];
        if (typeof Network !== 'undefined' && typeof Network.sendTeam === 'function') {
            Network.sendTeam(message);
            togglePopup();
        } else {
            console.error('Network.sendTeam is not available.');
        }
    }

    // Key listener for 'z' and number keys
    document.addEventListener('keydown', (e) => {
        // Ignore key presses when typing in an input or textarea
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;

        if (e.key === 'z' || e.key === 'Z') {
            togglePopup();
            e.preventDefault();
        }

        // Check if popup is visible and a number key is pressed
        if (popup.style.display === 'block') {
            let key = e.key;
            let index;
            if (key >= '1' && key <= '9') {
                index = parseInt(key) - 1;
            } else if (key === '0') {
                index = 9;
            } else {
                return;
            }
            sendMessage(index);
            e.preventDefault();
        }
    });

    // Optional: Add instructions or visual cues
    const instructions = document.createElement('div');
    instructions.textContent = 'Press "Z" to toggle Team Chat Radio';
    instructions.style.position = 'fixed';
    instructions.style.bottom = '5px';
    instructions.style.left = '50%';
    instructions.style.transform = 'translateX(-50%)';
    instructions.style.color = '#fff';
    instructions.style.fontSize = '12px';
    instructions.style.zIndex = '10000';
    instructions.style.fontFamily = 'Arial, sans-serif';
    instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    instructions.style.padding = '2px 5px';
    instructions.style.borderRadius = '4px';
    document.body.appendChild(instructions);

    console.log('Team Chat Radio initialized. Press "Z" to toggle.');
})();
