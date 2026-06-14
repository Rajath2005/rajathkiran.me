# Secret Features & Easter Eggs

Because a developer portfolio should never be boring.

This document outlines the hidden features, interactions, and "Hacker Mode" logic embedded in the `rajathkiran.io` repository.

---

## 🕹️ Hacker Mode Terminal (The Matrix Egg)

The most prominent easter egg transforms the entire portfolio into a vintage CRT terminal with a Matrix rain background.

### How to Trigger
- **Secret Command**: Type the word `hacker` anywhere on the screen (when not focused on an input field).

### Hidden Interactions & Commands
Once inside the terminal, you can interact with a custom CLI environment.

- `help`: Lists available commands.
- `whoami`: Prints developer identity stats.
- `skills`: Prints tech stack data.
- `projects`: Lists top projects.
- `github`: Automatically opens a new tab to my GitHub profile.
- `contact`: Prints email and social links.
- `raj`: **Developer Joke Trigger**. Prints a sequence about debugging for 6 hours only to find a missing semicolon, resulting in "emotional damage: irreversible".
- `clear`: Clears the terminal output.
- `exit` or pressing `Escape`: Returns to the standard portfolio UI.

---

## ⌨️ Global Keyboard Shortcuts

The portfolio implements an "OS-like" intelligence layer (`os-intelligence.js`) that includes power-user shortcuts.

| Shortcut | Action |
|----------|--------|
| `k` | Toggles the Identity/Environment selector orbit. |
| `r` | Toggles Recruiter Mode (optimizes project sorting and visual indicators). |
| `a` | Opens the AI Chat Assistant. |
| `Escape` | Closes any open modals, chat panels, or environment selectors. |

*(Note: Shortcuts are automatically disabled if the user is typing inside an `<input>` or `<textarea>`)*

---

## 🧭 Environment Switcher

While visible as a button on the dock, the Environment Switcher is a subtle feature that drastically changes the Three.js background engine. 

Clicking the `ion-icon name="planet-outline"` button opens an orbit menu with the following "Identities":
- **Mission Control**: Cyan colors, rotating particles.
- **Neural Nexus**: Magenta colors, pulsing particles (Lines hidden).
- **Aurora Studio**: Silver/Soft Blue, flowing particles.
- **Research Lab**: Emerald green.
- **Project Foundry**: Terminal Green, heavy particle count (100-300), linear movement simulating code.
- **Innovation Garage**: Neon Orange, jittery particle movement.

---

## 🔮 Future Easter Egg Ideas

*(Placeholders for future implementation)*

- [ ] **Konami Code Integration**: `Up Up Down Down Left Right Left Right B A` to trigger a mini-game.
- [ ] **Console.log Surprises**: Leaving ASCII art or hidden recruiter messages in the browser DevTools console.
- [ ] **404 Page Mini-game**: A small interactive element on the 404 route.
- [ ] **Time-based themes**: Automatically switching to a "Late Night Coding" theme if the user visits past 2 AM local time.
