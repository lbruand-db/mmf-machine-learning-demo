# MMF demo

Recording of a MMF demo

## Quick Start

```bash
npm install
npm run dev
```

## Repository Structure

```
rehearseur-template/
├── index.html                  # Main HTML entry point
├── package.json                # Project dependencies and scripts
├── vite.config.js             # Vite build configuration
│
├── src/
│   ├── main.jsx               # React app entry point with global CSS import
│   ├── App.jsx                # Main app component with RrwebPlayer
│   └── index.css              # Global styles for full-screen layout
│
└── public/
    ├── recording_jupyterlite.json           # rrweb session recording (JSON)
    └── recording_jupyterlite.annotations.md # Markdown annotations with timestamps
```

