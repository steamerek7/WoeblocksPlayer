const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let latestVersion = VERSION;
let placeId = "0";

// ---------------- LOAD CONFIG ----------------

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    latestVersion = data.version;
    placeId = data.robloxPlaceId || "0";

    document.getElementById("news").innerText =
      data.message || "No news";

    document.getElementById("title").innerText =
      data.title || "WOEBLOCKS PLAYER";

    // UPDATE CHECK
    if (latestVersion !== VERSION) {
      document.getElementById("status").innerText =
        "Update Available: " + latestVersion;

      document.getElementById("updateBtn").style.display = "inline-block";
    } else {
      document.getElementById("status").innerText =
        "Up to date";
    }

  } catch (err) {
    console.log("CONFIG ERROR:", err);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

// ---------------- PLAY BUTTON ----------------

function play() {
  if (placeId === "0") return;

  window.location.href =
    "https://www.roblox.com/games/start?placeId=" + placeId;
}

// ---------------- MANUAL UPDATE ----------------

function manualUpdate() {
  document.getElementById("status").innerText =
    "Updating...";

  setTimeout(() => {
    window.location.reload();
  }, 800);
}

// ---------------- INIT ----------------

loadConfig();
