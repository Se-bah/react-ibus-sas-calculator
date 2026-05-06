# IBUS-SAS Calculator 🧮

A simple offline-ready Progressive Web App (PWA) for calculating the IBUS-SAS score in bowel ultrasound assessments.

This project includes:
- a browser Progressive Web App (PWA)
- a desktop application for Linux (.AppImage)
- a desktop application for Windows (.exe)
- a shared React codebase

## 🔧 Features

- Fully offline PWA (works after first load)
- Light and dark mode
- Input validation and clean UI
- Input fields: BWT, i-fat, CDS, BWS
- Automatic score calculation based on IBUS-SAS scoring
- Electron desktop builds for Linux and Windows

---

## 📦 Tech Stack

- React 18
- Yarn (package manager)
- Create React App (with cra-template-pwa)
- Electron (desktop packaging)
- Service Worker & Web App Manifest API

---

## ⚙️ Prerequisites

Ensure the following are installed:

- Node.js (≥ 18.x)
- Yarn (preferred):  
  Install via
  ```bash
  npm install --global yarn
  ```
- Git (for version control)
- Chrome / Brave (to test PWA install & offline mode)

---


## 🚀 Getting Started

### 1. Clone the repository

```bash
  git clone https://github.com/Se-bah/ibus-sas-calculator.git
  cd ibus-sas-calculator
```

### 2. Install dependencies

Make sure you have Yarn installed:

```bash
  yarn install
```

### 3. Start the development server

```bash
  yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

> Note: In development mode, the service worker is disabled to avoid caching issues.

---

## 🛠 Production Build & Offline Mode

To create a fully working offline PWA:

1. Build the app:

   ```bash
   yarn build
   ```

2. Serve the production build locally (to test PWA):

   ```bash
   yarn global add serve
   serve -s build
   ```
>Note: There might be permission issues. If that happens, redo this step with 
> `sudo yarn global add serve` and `serve -s build`

3. Open in your browser (Chrome/Brave):

   ```
   http://localhost:3000
   ```

   ✔️ The app will register a service worker and cache necessary files  
   ✔️ It will now work offline (after first full load)

---

## 📱 Install as PWA

1. Visit the running app in Chrome or Brave
2. You should see an “Install” button in the address bar
3. Click it — the app installs like a desktop application 

→ Works fully offline   
→ You can now open it from your desktop/home screen     
→ It launches in standalone window (not inside browser tab)

---

## ⚙️ Service Worker Behavior

The app uses a service worker (via CRA) for offline caching.

- When a new version is deployed, the service worker:
    - fetches new files in background,
    - triggers an update notification:

      ```
      "A new version is available. Would you like to refresh?"
      ```

- If user confirms, the app immediately reloads with the new version (`skipWaiting()` is called)

This logic is configured in:
```js
src/calculatorRegistry.js → serviceWorkerRegistration.register({ onUpdate: ... })
```
>Note: For development and to avoid caching issues, change ```serviceWorkerRegistration.register()```
> to ```serviceWorkerRegistration.unregister()```

ℹ️ For more info on CRA’s service worker:  
https://create-react-app.dev/docs/making-a-progressive-web-app

---
## Desktop App Builds (Linux and Windows)
**This project uses Electron to generate standalone desktop apps.**
### Build Linux AppImage
Run
```
yarn electron:build
```
The output will be inside the dist/folder: `IBUS-SAS Calculator-x.x.x.AppImage  ` 
To run the AppImage on Linux:   
1. Right-click → Properties → Permissions   
2. Check "Allow executing file as program"
3. Double-click to launch the app


### Build Windows .exe installer
If you are building on Windows:
```
yarn electron:build
```
If you are building on Linux: 
```
sudo apt install wine nsis
yarn electron:build --win
```
This output will appear in `dist/IBUS-SAS Calculator Setup.exe`

#### Testing the windows .exe
Option A: Test on a real Windows PC (recommended)   
Option B: Test via Vine:
```
wine "IBUS-SAS Calculator Setup.exe"
```
Option C: Test inside Windows Virtual Machine


---
## 💡 IBUS-SAS Score Formula

```
IBUS-SAS = 4 × BWT + 15 × i-fat + 7 × CDS + 4 × BWS
```

Where:
- BWT = Bowel Wall Thickness (mm)
- i-fat = Inflammatory Fat (0–2)
- CDS = Color Doppler Signal (0–3)
- BWS = Bowel Wall Stratification (0–3)

All scoring logic is implemented inside `App.js`


---

## 📂 Folder Structure

```
├── public/
│   ├── manifest.json
│   └── icons
├── src/
│   ├── components/
│   ├── App.js
│   └── serviceWorkerRegistration.js
├── README.md
```

---

## ✅ TODO

- [ ] Add result saving to database
- [x] UI enhancements
- [x] Enable Light/Dark mode
- [ ] Test app working on tablet and mobile

---

## 📄 License

MIT License — free for use, modification and distribution.

---

## 🙏 Acknowledgments

- Inspired by the IBUS-SAS scoring system for intestinal ultrasound
- Built as a practical demo for offline clinical calculators
