const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let config = null;

// ---------------- VERSION STORAGE ----------------
function getVersion() {
  return localStorage.getItem("installedVersion") || "1.0.0";
}

function setVersion(v) {
  localStorage.setItem("installedVersion", v);
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

    // ================= UI =================
    const statusEl = document.getElementById("status");
    const titleEl = document.getElementById("title");
    const newsEl = document.getElementById("news");
    const btn = document.getElementById("updateBtn");

    if (!statusEl || !titleEl || !newsEl || !btn) return;

    statusEl.innerText = "v" + installedVersion;

    titleEl.innerText = data.title || "NO TITLE FOUND";
    newsEl.innerText = data.message || "NO MESSAGE";

    // ================= UPDATE BUTTON =================
    btn.style.display = "none";

    if (data.version && data.version !== installedVersion) {
      btn.style.display = "inline-block";
    }

    // ================= PLAY FUNCTION =================
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
    if (statusEl) {
      statusEl.innerText = "FAILED TO LOAD CONFIG";
    }
  }
}

// ---------------- UPDATE ----------------
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

    if (data.version) {
      setVersion(data.version);

      if (statusEl) {
        statusEl.innerText = "Updated to v" + data.version;
      }
    }

    setTimeout(() => {
      window.location.reload();
    }, 700);

  } catch (err) {
    console.log(err);

    if (statusEl) {
      statusEl.innerText = "Update failed";
    }
  }
}

// ---------------- INIT ----------------
loadConfig();
setInterval(loadConfig, 10000);
