const VERSION = "1.0.0";

const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/refs/heads/main/version.json";

// cache-free fetch helper
async function fetchConfig() {
  const res = await fetch(CONFIG_URL + "?t=" + Date.now(), {
    cache: "no-store"
  });

  if (!res.ok) throw new Error("HTTP " + res.status);

  return await res.json();
}

// APPLY EVERYTHING FROM SERVER
function applyConfig(data) {
  document.getElementById("news").innerText = data.message || "No news";
  document.getElementById("title").innerText = data.title || "WOEBLOCKS PLAYER";

  const placeId = data.robloxPlaceId || "0";

  // update status
  if (data.version !== VERSION) {
    document.getElementById("status").innerText =
      "Update Available: " + data.version;

    document.getElementById("updateBtn").style.display = "inline-block";
  } else {
    document.getElementById("status").innerText =
      "Up to date";
  }

  // attach play logic dynamically
  window.play = () => {
    if (placeId === "0") return;

    window.location.href =
      "https://www.roblox.com/games/start?placeId=" + placeId;
  };
}

// MAIN LOAD FUNCTION
async function loadConfig() {
  try {
    const data = await fetchConfig();
    applyConfig(data);
  } catch (err) {
    console.log("CONFIG ERROR:", err);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

// AUTO REFRESH SYSTEM (THIS IS WHAT YOU WANT)
setInterval(loadConfig, 15000); // every 15 seconds

// INITIAL LOAD
loadConfig();

// MANUAL UPDATE BUTTON
function manualUpdate() {
  document.getElementById("status").innerText = "Updating...";
  loadConfig();
}
