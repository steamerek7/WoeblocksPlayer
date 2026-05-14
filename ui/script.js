const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

let latestData = null;

// ---------------- FETCH CONFIG ----------------

async function fetchConfig() {
  const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
    cache: "no-store"
  });

  if (!res.ok) throw new Error("HTTP " + res.status);

  return await res.json();
}

// ---------------- APPLY CONFIG (NO UPDATE TEXT HERE) ----------------

function applyConfig(data) {
  latestData = data;

  document.getElementById("news").innerText =
    data.message || "No news";

  document.getElementById("title").innerText =
    "WOEBLOCKS PLAYER"; // NEVER change title for updates

  const placeId = data.robloxPlaceId || "0";

  // ALWAYS HIDE UPDATE BUTTON BY DEFAULT
  document.getElementById("updateBtn").style.display = "none";

  // silent version check (no UI spam)
  const isOutdated = data.version !== VERSION;

  if (isOutdated) {
    // we only PREPARE update, do NOT show anything yet
    window._updateAvailable = true;
  } else {
    window._updateAvailable = false;
  }

  // play function
  window.play = () => {
    if (placeId === "0") return;

    window.location.href =
      "https://www.roblox.com/games/start?placeId=" + placeId;
  };
}

// ---------------- UPDATE SYSTEM ----------------

async function runUpdate() {
  document.getElementById("status").innerText = "Updating...";

  try {
    const data = await fetchConfig();

    applyConfig(data);

    // AFTER SUCCESSFUL UPDATE ONLY
    document.getElementById("status").innerText =
      "Update completed successfully";

  } catch (err) {
    console.log(err);
    document.getElementById("status").innerText =
      "Update failed";
  }
}

// ---------------- MANUAL UPDATE BUTTON ----------------

function manualUpdate() {
  runUpdate();
}

// ---------------- BACKGROUND CHECK (SILENT) ----------------

async function backgroundCheck() {
  try {
    const data = await fetchConfig();

    applyConfig(data);

    // ONLY SHOW BUTTON IF OUTDATED
    if (data.version !== VERSION) {
      document.getElementById("updateBtn").style.display = "inline-block";
      document.getElementById("status").innerText = " ";
    } else {
      document.getElementById("updateBtn").style.display = "none";
      document.getElementById("status").innerText = "";
    }

  } catch (err) {
    console.log("BG CHECK FAILED", err);
  }
}

// ---------------- INIT ----------------

backgroundCheck();
setInterval(backgroundCheck, 15000);
