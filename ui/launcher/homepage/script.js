const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let config = null;

// ---------------- VERSION STORAGE ----------------
function getVersion() {
  return localStorage.getItem("installedVersion") || "1.0.0";
}

function setVersion(v) {
  localStorage.setItem("installedVersion", v);

  // force sync marker (helps avoid stale UI)
  sessionStorage.setItem("lastSync", Date.now());
}

// ---------------- LOAD CONFIG ----------------
async function loadConfig() {
  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();
    config = data;

    console.log("GITHUB DATA:", data);

    const installedVersion = getVersion();

    const statusEl = document.getElementById("status");
    const titleEl = document.getElementById("title");
    const newsEl = document.getElementById("news");
    const btn = document.getElementById("updateBtn");

    if (!statusEl || !titleEl || !newsEl || !btn) return;

    // ---------------- UI UPDATE ----------------
    statusEl.innerText = "v" + installedVersion;
    titleEl.innerText = data.title || "NO TITLE FOUND";
    newsEl.innerText = data.message || "NO MESSAGE";

    // reset update button every refresh
    btn.style.display = "none";

    if (data.version && data.version !== installedVersion) {
      btn.style.display = "inline-block";
    }

    // ---------------- PLAY FUNCTION ----------------
    window.play = function () {
      const placeId = data.robloxPlaceId || "0";

      if (!placeId || placeId === "0") {
        alert("No placeId set in config");
        return;
      }

      window.location.href =
        "https://www.roblox.com/games/start?placeId=" + placeId;
    };

  } catch (err) {
    console.log("CONFIG ERROR:", err);

    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.innerText = "FAILED TO LOAD CONFIG";
  }
}

// ---------------- UPDATE SYSTEM ----------------
async function manualUpdate() {
  const btn = document.getElementById("updateBtn");
  const statusEl = document.getElementById("status");

  if (btn) btn.style.display = "none";
  if (statusEl) statusEl.innerText = "Updating...";

  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    console.log("UPDATE DATA:", data);

    if (!data.version) {
      throw new Error("No version found in config");
    }

    // ---------------- SAVE NEW VERSION ----------------
    setVersion(data.version);

    // ---------------- FORCE FULL REFRESH ----------------
    setTimeout(() => {
      window.location.href =
        window.location.origin +
        window.location.pathname +
        "?updated=" +
        Date.now();
    }, 600);

  } catch (err) {
    console.log(err);

    if (statusEl) statusEl.innerText = "Update failed";
  }
}

// ---------------- INIT ----------------
loadConfig();
setInterval(loadConfig, 10000);
