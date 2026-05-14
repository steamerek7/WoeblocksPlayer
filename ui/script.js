const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/refs/heads/main/version.json?token=GHSAT0AAAAAAD3W26VTZGMETERKCKL55AWI2QGBFNQ";

let placeId = "0";

async function load() {
  try {
    const res = await fetch(CONFIG_URL);
    const data = await res.json();

    document.getElementById("news").innerText = data.message;
    placeId = data.robloxPlaceId;

    if (data.version !== VERSION) {
      document.getElementById("status").innerText =
        "Update Available: " + data.version;
    } else {
      document.getElementById("status").innerText =
        "Up to date";
    }

  } catch (e) {
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

function play() {
  if (placeId === "0") return;

  window.location.href =
    "https://www.roblox.com/games/start?placeId=" + placeId;
}

load();
