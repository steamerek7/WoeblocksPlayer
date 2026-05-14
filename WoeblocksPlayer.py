import tkinter as tk
import webbrowser
import threading
import requests

VERSION = "1.0.0"
CONFIG_URL = "https://raw.githubusercontent.com/steamerek7/WoeblocksPlayer/main/version.json"


def run():
    root = tk.Tk()
    root.title("Woeblocks Player")
    root.geometry("500x320")
    root.configure(bg="#0d0d0d")
    root.resizable(False, False)

    place_id = "0"

    title = tk.Label(
        root,
        text="WOEBLOCKS PLAYER",
        fg="white",
        bg="#0d0d0d",
        font=("Arial", 22, "bold")
    )
    title.pack(pady=20)

    version_label = tk.Label(
        root,
        text=f"Version {VERSION}",
        fg="#00ff88",
        bg="#0d0d0d",
        font=("Arial", 11)
    )
    version_label.pack()

    status = tk.Label(
        root,
        text="Checking updates...",
        fg="gray",
        bg="#0d0d0d",
        font=("Arial", 10)
    )
    status.pack(pady=5)

    news_box = tk.Label(
        root,
        text="",
        fg="white",
        bg="#1a1a1a",
        width=50,
        height=4,
        wraplength=380,
        justify="left",
        anchor="nw",
        padx=10,
        pady=10,
        font=("Arial", 9)
    )
    news_box.pack(pady=15)

    def play():
        if place_id == "0":
            status.config(text="No game configured", fg="red")
            return

        webbrowser.open(f"https://www.roblox.com/games/start?placeId={place_id}")

    tk.Button(
        root,
        text="PLAY",
        command=play,
        bg="#00ff88",
        fg="black",
        activebackground="#00cc6f",
        relief="flat",
        bd=0,
        width=18,
        height=2,
        font=("Arial", 15, "bold")
    ).pack(pady=10)

    def update_check():
        nonlocal place_id
        try:
            data = requests.get(CONFIG_URL, timeout=5).json()

            latest = data.get("version", VERSION)
            message = data.get("message", "No news")
            place_id = data.get("robloxPlaceId", "0")

            news_box.config(text=message)

            if latest != VERSION:
                status.config(text=f"Update Available ({latest})", fg="orange")
            else:
                status.config(text="Launcher Up To Date", fg="#00ff88")

        except Exception as e:
            status.config(text="Failed to check updates", fg="red")
            news_box.config(text=str(e))

    threading.Thread(target=update_check, daemon=True).start()

    root.mainloop()


if __name__ == "__main__":
    run()
