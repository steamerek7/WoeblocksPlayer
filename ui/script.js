const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

// ---------------- GET SAVED VERSION ----------------
function getLocalVersion() {
  return localStorage.getItem("launcherVersion") || "1.0.0";
}

// ---------------- SAVE VERSION ----------------
function setLocalVersion(v) {
  localStorage.setItem("launcherVersion", v);
}

// ---------------- STATE ----------------
let placeId = "0";

// ---------------- LOAD CONFIG ----------------
async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    const localVersion = getLocalVersion();
    const remoteVersion = data.version;

    // UI reset
    const btn = document.getElementById("updateBtn");
    btn.style.display = "none";
    document.getElementById("status").innerText = "";

    // ALWAYS show current version
    document.getElementById("status").innerText =
      "Version: " + localVersion;

    document.getElementById("news").innerText =
      data.message || "";

    document.getElementById("title").innerText =
      "WOEBLOCKS PLAYER";

    placeId = data.robloxPlaceId || "0";

    // UPDATE CHECK
    if (remoteVersion !== localVersion) {
      btn.style.display = "inline-block";
    }

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

// ---------------- PLAY ----------------
function play() {
  if (!placeId || placeId === "0") return;

  window.location.href =
    "https://www.roblox.com/games/start?placeId=" + placeId;
}

// ---------------- UPDATE ----------------
async function manualUpdate() {
  const btn = document.getElementById("updateBtn");

  btn.style.display = "none";
  document.getElementById("status").innerText = "Updating...";

  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now());
    const data = await res.json();

    // SAVE NEW VERSION (THIS IS THE FIX)
    setLocalVersion(data.version);

    document.getElementById("status").innerText =
      "Updated to version " + data.version;

    // reload UI cleanly
    setTimeout(() => {
      window.location.reload();
    }, 800);

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Update failed";
  }
}

// ---------------- INIT ----------------
loadConfig();
setInterval(loadConfig, 15000);
