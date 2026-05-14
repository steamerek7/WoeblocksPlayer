const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let placeId = "0";

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    document.getElementById("news").innerText = data.message || "No news";
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
    console.log("CONFIG ERROR:", err);
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
