/* (() => {
  // Hook into the UI and Player modules to manipulate player data display
  const originalAddChatLine = UI.addChatLine;
  UI.addChatLine = function (msg, text, msgType) {
    // Use /flag with random ISO country code
    const countryCodes = [
      "SY", "TH", "TM", "TN", "TR", "TT", "TW", "TZ", "UA", "UN", "US", "UY", "UZ", "VE", "VN", "PR", "PT", "PY", "QA", "RAINBOW", "RO", "RS", "RU", "SA", "SE", "SG", "SI", "SK", "SM", "MK", "MO", "MT", "MX", "MY", "NG", "NL", "NO", "NP", "NZ", "OM", "PA", "PE", "JP", "KP", "KR", "KW", "KZ", "LB", "LI", "LK", "LT", "LU", "LV", "HN", "HR", "HU", "ID", "IE", "IL", "IM", "IMPERIAL", "IN", "IQ", "DE", "DK", "DO", "DZ", "EC", "EE", "EG", "ES", "EU", "BH", "BO", "BR", "BT", "BY", "CA", "CH", "AD", "AE", "AL", "AM", "CL", "AQ", "CN", "AR", "FI", "CO", "AT", "IR", "FR", "COMMUNIST", "AU", "LY", "IS", "GB", "CONFEDERATE", "AZ", "MA", "IT", "GE", "CR", "BA", "PH", "MC", "JM", "GR", "CU", "BD", "SO", "PK", "MD", "JO", "GT", "CY", "BE", "ZA", "SV", "PL", "ME", "JOLLY", "HK", "CZ", "BG"
    ];
    const randomCountryCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
    msg.name = `[Anonymous]`;
    originalAddChatLine.call(this, msg, text, msgType);
    UI.parseCommand(`/flag ${randomCountryCode}`);
  };

  const originalScoreboardUpdate = UI.scoreboardUpdate;
  UI.scoreboardUpdate = function (msgData, msgRankings, maxScoreboard) {
    // Replace player names and pings in the scoreboard
    msgRankings.forEach((player) => {
      player.name = "[Anonymous]";
      player.flag = "[Hidden]"; // Hide player flags
      player.ping = 0; // Set ping to 0ms for all players
    });
    originalScoreboardUpdate.call(this, msgData, msgRankings, maxScoreboard);
  };

  const originalUpdateGameInfo = UI.updateGameInfo;
  UI.updateGameInfo = function () {
    // Replace player info in the game info display
    const allPlayers = Players.all();
    if (typeof allPlayers === 'object') {
      Object.values(allPlayers).forEach((player) => {
        player.name = "[Anonymous]";
        player.flag = "[Hidden]"; // Hide player flags
        player.ping = 0; // Set ping to 0ms for all players
      });
    }
    originalUpdateGameInfo.call(this);
  };

  // Hook into player rendering if available
  if (typeof Player !== 'undefined' && Player.prototype.render) {
    const originalPlayerRender = Player.prototype.render;
    Player.prototype.render = function () {
      // Hide player names and flags displayed under their ship
      if (!this.name) {
        this.name = "[Anonymous]";
      }
      if (!this.flag) {
        this.flag = "[Hidden]";
      }
      this.ping = 0; // Set ping to 0ms for rendering purposes
      originalPlayerRender.call(this);
    };
  }

  // Hook into Tools to modify player-related data centrally
  if (typeof Tools !== 'undefined') {
    const originalStripBotsNamePrefix = Tools.stripBotsNamePrefix;
    Tools.stripBotsNamePrefix = function (name) {
      // Always return '[Anonymous]' for player names
      return "[Anonymous]";
    };

    const originalMungeNonAscii = Tools.mungeNonAscii;
    Tools.mungeNonAscii = function (s, id) {
      // Override to always return '[Anonymous]'
      return "[Anonymous]";
    };
  }

  // Randomize player name and flag before loading into the server
  const randomNames = [
    "Shadow", "Phoenix", "Blaze", "Ghost", "Viper", "Raven", "Cyclone", "Falcon", "Mystic", "Hunter", "Titan", "Storm", "Knight", "Wraith", "Hawk", "Echo", "Omega", "Nova", "Rogue", "Maverick", "Ace", "Bolt", "Drake", "Spartan", "Raider", "Fury", "Nebula", "Specter", "Zephyr", "Valkyrie", "Onyx", "Striker", "Sentinel", "Inferno", "Razor", "Archer", "Cobra", "Lancer", "Reaper", "Vanguard", "Nomad", "Saber", "Riptide", "Tempest", "Banshee", "Scorpion", "Hydra", "Griffin", "Jaguar", "Vortex", "Sphinx", "Atlas", "Echo", "Bolt", "Talon", "Blade", "Frost", "Gale", "Surge", "Prowler", "Wrath", "Phantom", "Obsidian", "Havoc", "Lynx", "Venom", "Rogue", "Ranger", "Viper", "Wolf", "Zodiac", "Nitro", "Pulse", "Volt", "Blizzard", "Chaos", "Cosmos", "Edge", "Flare", "Gladiator", "Inferno", "Jester", "Kraken", "Leviathan", "Mirage", "Oblivion", "Quasar", "Rogue", "Stingray", "Titan", "Umbra", "Viper", "Warlock", "Xenon", "Yeti", "Zenith", "Apollo", "Bandit", "Comet", "Dagger", "Ember", "Fang", "Ghoul", "Helix", "Ignite", "Javelin", "Krait", "Lucifer", "Magma", "Nighthawk", "Outlaw", "Panic", "Quake", "Ravage", "Sonic", "Tsunami", "Umbra", "Vandal", "Wildcat", "Xander", "Yurei", "Zircon", "Abyss", "Blitz", "Crimson", "Dynasty", "Ember", "Frostbite", "Gunner", "Harbinger", "Ion", "Jinx", "Karma", "Liberty", "Myst", "Nexus", "Oracle", "Pulse", "Quill", "Rift", "Savage", "Talon", "Unity", "Vesper", "Warden", "Xena", "Yonder", "Zephyr", "Raptor", "Frost", "Nebula", "Blizzard", "Venom", "Spectre", "Eclipse", "Pulse", "Inferno", "Solstice", "Midnight", "Ember", "Oblivion", "Tempest", "Cryptic", "Raven", "Echo", "Falcon", "Blaze", "Nighthawk", "Phantom", "Mantis", "Wolf", "Cobalt", "Zenith", "Titanium", "Vortex", "Astra", "Nebula", "Shadow", "Harbinger", "Catalyst", "Nexus", "Spectra", "Glimmer", "Fury", "Vesper", "Obsidian", "Solace", "Cinder", "Horizon", "Phantom", "Rift", "Quasar", "Synergy", "Nimbus", "Zephyr", "Karma", "Luna", "Spire", "Genesis", "Revenant", "Aurora", "Omega", "Bolt", "Helix", "Cosmic", "Nyx", "Eclipse", "Mystic", "Tempest", "Guardian", "Spartan", "Nomad", "Berserker", "Pioneer", "Resolve", "Turbine", "Flare", "Pheonix", "Ironclad", "Voyager", "Comet", "Crescent", "Beacon", "Pulse", "Rift", "Zenith", "Oracle", "Beacon", "Echo", "Nebula", "Torrent", "Maelstrom", "Wrath", "Astral", "Crimson", "Spectral", "Paradox", "Sable", "Jinx", "Bolt", "Ardent", "Frostbite", "Nightshade", "Pyro", "Ghost", "Sentinel", "Obelisk", "Nimbus", "Fury", "Radiant", "Hydra", "Zealot", "Pulse", "Tremor", "Ignis", "Gladius", "Astrid", "Vesper", "Scythe", "Nimbus", "Spire", "Zenith", "Echo", "Phantom", "Bolt", "Twilight", "Ember", "Solace", "Cryptic", "Warden", "Rogue", "Guardian", "Lyra", "Vanguard", "Myst", "Cobra", "Ravager"
  ];
  const randomFlags = Object.keys(FlagCodeById);

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  const originalGameStart = UI.gameStart;
  UI.gameStart = function (playerName, isFirstTime) {
    // Randomize player name and flag
    const randomizedName = getRandomElement(randomNames);
    const randomizedFlag = getRandomElement(randomFlags);

    game.myOriginalName = randomizedName;
    game.lastFlagSet = randomizedFlag;

    Tools.setSettings({ flag: randomizedFlag }); // Ensure the flag is set properly in settings

    setTimeout(() => {
      UI.addChatMessage(`Your flag has been set to '${randomizedFlag}' and your name has been set to '${randomizedName}'`);
    }, 3000); // Send message to player's username

    originalGameStart.call(this, randomizedName, isFirstTime);
  };

  // Send messages at regular intervals
  setInterval(() => {
    Network.sendSay(`Your Usernames has been set to [Anonymous].`);
  }, 120000); // Every 2 minutes

  setInterval(() => {
    if (game.gameType === GameType.CTF) {
      Network.sendTeam(`Your Usernames has been set to [Anonymous]. Please Usurped if I am leader!`);
    }
  }, 180000); // Every 3 minutes if in CTF mode
})(); */

(() => {
  // Function to set player names to "[Anonymous]" and hide flags
  const anonymizePlayer = (player) => {
    player.name = "[Anonymous]";
    player.flag = "[Hidden]";
    player.ping = 0; // Set ping to 0ms
  };

  // Hook into the UI and Player modules to manipulate player data display
  const originalAddChatLine = UI.addChatLine;
  UI.addChatLine = function (msg, text, msgType) {
    msg.name = "[Anonymous]";
    originalAddChatLine.call(this, msg, text, msgType);
  };

  const originalScoreboardUpdate = UI.scoreboardUpdate;
  UI.scoreboardUpdate = function (msgData, msgRankings, maxScoreboard) {
    msgRankings.forEach(anonymizePlayer);
    originalScoreboardUpdate.call(this, msgData, msgRankings, maxScoreboard);
  };

  const originalUpdateGameInfo = UI.updateGameInfo;
  UI.updateGameInfo = function () {
    const allPlayers = Players.all();
    if (typeof allPlayers === 'object') {
      Object.values(allPlayers).forEach(anonymizePlayer);
    }
    originalUpdateGameInfo.call(this);
  };

  if (typeof Player !== 'undefined' && Player.prototype.render) {
    const originalPlayerRender = Player.prototype.render;
    Player.prototype.render = function () {
      anonymizePlayer(this);
      originalPlayerRender.call(this);
    };
  }

  if (typeof Tools !== 'undefined') {
    const originalStripBotsNamePrefix = Tools.stripBotsNamePrefix;
    Tools.stripBotsNamePrefix = () => "[Anonymous]";

    const originalMungeNonAscii = Tools.mungeNonAscii;
    Tools.mungeNonAscii = () => "[Anonymous]";
  }
})();
