const CONFIG_URL =
"https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json";

async function load() {
  try {
    const res = await fetch(CONFIG_URL);
    const data = await res.json();

    console.log(data);

  } catch (e) {
    console.log("Failed:", e);
    document.getElementById("status").innerText =
      "Failed to load config";
  }
}

load();
