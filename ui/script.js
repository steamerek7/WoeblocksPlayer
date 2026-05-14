const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    // ONLY NEWS
    document.getElementById("news").innerText =
      data.message || "";

    // NEVER TOUCH TITLE
    document.getElementById("title").innerText =
      "WOEBLOCKS PLAYER";

    const upToDate = data.version === VERSION;

    // CLEAN BUTTON LOGIC ONLY
    const btn = document.getElementById("updateBtn");

    if (!upToDate) {
      btn.style.display = "inline-block";
      document.getElementById("status").innerText = "";
    } else {
      btn.style.display = "none";
      document.getElementById("status").innerText = "";
    }

    // store placeId for play
    window.placeId = data.robloxPlaceId || "0";

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

function play() {
  if (!window.placeId || window.placeId === "0") return;

  window.location.href =
    "https://www.roblox.com/games/start?placeId=" + window.placeId;
}

function manualUpdate() {
  document.getElementById("status").innerText = "Updating...";

  loadConfig().then(() => {
    document.getElementById("status").innerText =
      "Update completed successfully";
  });
}

loadConfig();
setInterval(loadConfig, 15000);
