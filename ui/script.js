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

// ---------------- UI ----------------
function render(data) {
  const installedVersion = getVersion();

  // VERSION ON TOP
  document.getElementById("status").innerText =
    "v" + installedVersion;

  // TITLE FROM GITHUB (THIS IS WHAT YOU MEAN)
  document.getElementById("title").innerText =
    data.title || "WOEBLOCKS PLAYER";

  // NEWS
  document.getElementById("news").innerText =
    data.message || "";

  placeId = data.robloxPlaceId || "0";

  // UPDATE BUTTON
  const btn = document.getElementById("updateBtn");
  btn.style.display = "none";

  if (data.version !== installedVersion) {
    btn.style.display = "inline-block";
  }
}

// ---------------- LOAD CONFIG ----------------
async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    render(data);

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
