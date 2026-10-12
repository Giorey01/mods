// The whole catalogue. To add a mod, copy one entry, change it, and put its pictures in
// assets/mods/<id>/. The newest mod goes first. Nothing else needs editing.
//
// shotRatio: width / height of the screenshots, so the page keeps its shape while they load.
//            One screenshot can differ with its own "ratio"; "wide: true" makes it span two columns.
// status: "released" | "early" | "wip" | "archived"
// repo:   "owner/name" on GitHub. The site reads the latest release from it to show the current
//         version; "version" below is what is shown when GitHub cannot be reached.
window.MODS = [
  {
    id: "kill-the-crows-coop",
    title: "Kill The Crows Co-op",
    game: "Kill The Crows",
    gameUrl: "https://store.steampowered.com/app/2441270/",
    developer: "5minlab",
    tagline: "Two-player co-op for a single-player game: on one screen, or online with a friend.",
    summary:
      "Adds a second gunslinger with their own input, ammo and showdown bar, and makes the rest of the game cope with two of them: enemies pick the nearest player, the camera frames both, and a run only ends when both are down.",
    status: "early",
    year: 2026,
    version: "0.1.0",
    gameVersion: "1.5.1",
    engine: "Unity 2022 (Mono)",
    loader: "BepInEx 5.4.23",
    platforms: ["Windows", "Linux", "Steam Deck"],
    players: "2, local or online",
    tags: ["Co-op", "Multiplayer", "Networking"],
    repo: "Giorey01/KillTheCrowsCoop",
    cover: "cover.jpg",
    shotRatio: "16 / 9",
    screenshots: [
      { file: "fight.jpg", caption: "Two players in a run. Player two is tinted blue, with their own magazine and showdown bar." },
      { file: "camera-zoom.jpg", caption: "The camera widens when the two of you split up." },
      { file: "downed.jpg", caption: "Player two is down and returns in 8 seconds." },
      { file: "showdown.jpg", caption: "Showdown slows the world for both players." },
      { file: "online.jpg", caption: "Online: the host's screen (left) and the client's (right), a second apart.", wide: true, ratio: "32 / 9" },
      { file: "menu.jpg", caption: "The co-op box in the main menu." },
    ],
    features: [
      { title: "Local co-op", text: "Player one on keyboard and mouse, player two on a gamepad, or one gamepad each." },
      { title: "Online co-op", text: "Invite a Steam friend, or connect directly by IP address. Both players need the game and the mod." },
      { title: "Respawn timer", text: "Picked before the run, from never to two minutes. A downed player comes back next to their partner." },
      { title: "Shared slow motion", text: "Showdown and the dodge slow-down affect both players, as in the solo game." },
      { title: "A camera for two", text: "It follows the midpoint and widens as the players spread out, then closes back in." },
      { title: "Your save is left alone", text: "Co-op runs do not write records, unlocks, tasks or achievements." },
    ],
    install: {
      windows: "irm https://github.com/Giorey01/KillTheCrowsCoop/releases/latest/download/install.ps1 | iex",
      linux: "bash <(curl -fsSL https://github.com/Giorey01/KillTheCrowsCoop/releases/latest/download/install.sh)",
      note: 'On Linux, set this Steam launch option for the game once: WINEDLLOVERRIDES="winhttp=n,b" %command%',
    },
    notes: [
      "Early version. Tested on Linux with a scripted second player, and online with two copies of the game on one PC.",
      "Not yet tested: a physical gamepad for player two, the Steam connection, two real PCs, bosses, Windows.",
    ],
  },
  {
    id: "big-walk-mod-menu",
    title: "Big Walk Mod Menu",
    game: "Big Walk",
    gameUrl: "https://store.steampowered.com/app/1478500/",
    developer: "House House",
    tagline: "One in-game menu, one tab per mod. Install only the tabs you want.",
    summary:
      "A modular menu for Big Walk. Every tab is its own DLL: faces, solo play, character looks, camera, graphics, voice, replay and more. The menu shows only the tabs you installed, and a tab that is switched off leaves the game's own values alone.",
    status: "released",
    year: 2026,
    version: "1.7.0",
    gameVersion: "1.6.0",
    engine: "Unity (IL2CPP)",
    loader: "BepInEx 6 (be.785)",
    platforms: ["Windows", "Linux", "Steam Deck"],
    players: "Client-side; some tabs sync between friends",
    tags: ["Mod menu", "Cosmetics", "Camera", "Graphics"],
    repo: "Giorey01/BigWalkModMenu",
    cover: "cover.jpg",
    shotRatio: "556 / 754",
    screenshots: [
      { file: "general.jpg", caption: "General: window, key bindings, sharing your look with friends." },
      { file: "faces.jpg", caption: "Faces: a photo, or your webcam, on a character's head." },
      { file: "character.jpg", caption: "Character: hats, head shapes, colours, proportions." },
      { file: "solo.jpg", caption: "Solo: up to four characters for one player." },
      { file: "camera.jpg", caption: "Camera: selfie, third person, free camera, photos." },
      { file: "performance.jpg", caption: "Performance: FPS counter, render scale, FOV, quality." },
      { file: "world.jpg", caption: "World: time of day, sky, fog, colour filters." },
      { file: "reshade.jpg", caption: "Reshade: bloom, film tones, sharpening." },
      { file: "voice.jpg", caption: "Voice: volume of each other player." },
      { file: "extras.jpg", caption: "Extras: music, sounds, emotes, speech bubbles." },
      { file: "replay.jpg", caption: "Replay: record a scene and play it back." },
    ],
    features: [
      { title: "Faces", text: "Put a photo on a character's head and torso, with placement controls. Or your webcam, live." },
      { title: "Solo", text: "Play alone with up to four characters: add, switch, gather, follow." },
      { title: "Character", text: "Hats, accessories, twenty head shapes, colours, proportions, light and trail." },
      { title: "Camera", text: "Selfie, third person, free camera, screenshots up to 4x, hidden interface." },
      { title: "Performance and World", text: "Render scale, FOV, shadows and LOD; fixed time of day, sky, fog, filters." },
      { title: "Reshade", text: "Bloom, lens flares, filmic tone curve, sharpening and ready-made looks. No ReShade needed." },
      { title: "Voice and Extras", text: "Per-player voice volume up to 1500%; your own music, sounds, emotes and speech bubbles." },
      { title: "Replay", text: "Record a scene, play it back on the real characters, export frames for a video." },
    ],
    install: {
      windows: "irm https://github.com/Giorey01/BigWalkModMenu/releases/latest/download/install.ps1 | iex",
      linux: "bash <(curl -fsSL https://github.com/Giorey01/BigWalkModMenu/releases/latest/download/install.sh)",
      note: 'On Linux, set this Steam launch option for the game once: WINEDLLOVERRIDES="winhttp=n,b" %command%',
    },
    notes: [
      "Open the menu in game with F8 or Insert.",
      "Seeing each other's faces and looks needs the mod on every player, host included, on the same version.",
    ],
  },
];

// Shown in the header, footer and contact section.
window.SITE = {
  author: "Giorey01",
  github: "https://github.com/Giorey01",
  repo: "Giorey01/mods",
};
