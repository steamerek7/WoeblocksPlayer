const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/refs/heads/main/version.json";

let placeId = "0";

// load config from GitHub
async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL);
    const data = await res.json();

    document.getElementById("news").innerText = data.message;
    document.getElementById("title").innerText = data.title || "WOEBLOCKS PLAYER";

    placeId = data.robloxPlaceId || "0";

    if (data.version !== VERSION) {
      document.getElementById("status").innerText =
        "Update Available: " + data.version;
    } else {
      document.getElementById("status").innerText =
        "Up to date";
    }

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

function play() {
  if (placeId === "0") return;

  window.location.href =
    "https://www.roblox.com/games/start?placeId=" + placeId;
}

loadConfig();
