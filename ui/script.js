const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let placeId = "0";

// ---------------- VERSION STORAGE ----------------
function getVersion() {
  return localStorage.getItem("installedVersion") || "1.0.0";
}

function setVersion(v) {
  localStorage.setItem("installedVersion", v);
}

// ---------------- UI UPDATE ----------------
function renderUI(installedVersion, remoteData) {
  // VERSION ON TOP OF TITLE (your request)
  document.getElementById("title").innerText =
    "WOEBLOCKS PLAYER | v" + installedVersion;

  document.getElementById("news").innerText =
    remoteData.message || "";

  placeId = remoteData.robloxPlaceId || "0";
}

// ---------------- LOAD CONFIG ----------------
async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    const installedVersion = getVersion();

    // render UI first
    renderUI(installedVersion, data);

    const btn = document.getElementById("updateBtn");
    btn.style.display = "none";

    // update check
    if (data.version !== installedVersion) {
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

    // SAVE VERSION (THIS IS KEY FIX)
    setVersion(data.version);

    document.getElementById("status").innerText =
      "Updated to v" + data.version;

    setTimeout(() => {
      window.location.reload();
    }, 700);

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Update failed";
  }
}

// ---------------- INIT ----------------
loadConfig();
setInterval(loadConfig, 15000);
