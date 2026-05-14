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

    // 🔥 DEBUG (THIS IS IMPORTANT)
    console.log("GITHUB DATA:", data);

    const installedVersion = getVersion();

    // ================= UI =================

    // version ON TOP of title
    document.getElementById("status").innerText =
      "v" + installedVersion;

    // title from GitHub (NO HARDCODE)
    document.getElementById("title").innerText =
      data.title || "NO TITLE FOUND";

    document.getElementById("news").innerText =
      data.message || "NO MESSAGE";

    // ================= PLACE ID =================
    const placeId = data.robloxPlaceId || "0";

    // ================= UPDATE BUTTON =================
    const btn = document.getElementById("updateBtn");
    btn.style.display = "none";

    if (data.version !== installedVersion) {
      btn.style.display = "inline-block";
    }

    // ================= PLAY =================
    window.play = function () {
      if (!placeId || placeId === "0") return;

      window.location.href =
        "https://www.roblox.com/games/start?placeId=" + placeId;
    };

  } catch (err) {
    console.log("CONFIG ERROR:", err);
    document.getElementById("status").innerText =
      "FAILED TO LOAD CONFIG";
  }
}

// ---------------- UPDATE ----------------
async function manualUpdate() {
  const btn = document.getElementById("updateBtn");

  btn.style.display = "none";
  document.getElementById("status").innerText = "Updating...";

  try {
    const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
      cache: "no-store"
    });

    const data = await res.json();

    console.log("UPDATE DATA:", data);

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
setInterval(loadConfig, 10000);
