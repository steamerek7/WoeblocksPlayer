const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let placeId = "0";

async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    // ALWAYS STATIC TITLE
    document.getElementById("title").innerText =
      "WOEBLOCKS PLAYER";

    document.getElementById("news").innerText =
      data.message || "";

    placeId = data.robloxPlaceId || "0";

    const btn = document.getElementById("updateBtn");

    // ONLY SHOW OR HIDE BUTTON
    if (data.version !== VERSION) {
      btn.style.display = "inline-block";
      document.getElementById("status").innerText = "";
    } else {
      btn.style.display = "none";
      document.getElementById("status").innerText = "";
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

function manualUpdate() {
  document.getElementById("status").innerText = "Updating...";

  loadConfig().then(() => {
    const btn = document.getElementById("updateBtn");

    btn.style.display = "none";

    document.getElementById("status").innerText =
      "Update completed successfully";
  });
}

loadConfig();
setInterval(loadConfig, 15000);
