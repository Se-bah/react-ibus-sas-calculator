# IBUS-SAS Calculator 🧮

A simple offline-ready Progressive Web App (PWA) for calculating the IBUS-SAS score in bowel ultrasound assessments.

## 🔧 Features

- Fully offline and installable (PWA)
- Input fields: BWT, i-fat, CDS, BWS
- Automatic score calculation
- Responsive UI
- Built with React 18, Yarn, and Create React App (PWA template)

## 📦 Tech Stack

- React 18
- Yarn (package manager)
- Create React App (PWA template)
- Service Worker & Manifest API

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

## 🛠 Build for Production (with PWA)

To create a production-ready, installable PWA:

```bash
  yarn build
```

To test the production version locally:

```bash
  yarn global add serve
  serve -s build
```
if there is an error with permissions, try:

```bash
  sudo yarn global add serve
  serve -s build
```

Then open the app at [http://localhost:3000](http://localhost:3000).  
The service worker will register, and the app will work offline after first load.

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

---

## 📱 Install as App

- Open the app in Chrome or Brave
- Click “Add to Home Screen” (mobile) or install icon (desktop)
- App will be available offline after first load

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
- [ ] UI enhancements
- [ ] Enable Light/Dark mode

---

## 📄 License

MIT License — free for use, modification and distribution.

---

## 🙏 Acknowledgments

- Inspired by the IBUS-SAS scoring system for intestinal ultrasound
- Built as a practical demo for offline clinical calculators
