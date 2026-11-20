# Holiday Hunt

A Christmas/winter scavenger hunt for Consumer Health IT teams. Small groups join with a shared code (paste it into a Teams call), explore eight initiative stations, unlock festive charms, and race to light the **FIREPLACE**.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Without Firebase env vars the app runs in **demo mode** (localStorage + BroadcastChannel). That is enough for a single-laptop rehearsal. For multi-laptop live sync at the party, configure Firebase (below).

## Party runbook

1. Host opens the app and creates a practice team to smoke-test.
2. Each real team: one person hits **Create a team**, shares the 6-character code in Teams; others hit **Join with a code**.
3. Teams visit stations in any order, read/watch assets, answer the short challenge, unlock a charm (syncs for the whole team).
4. When all 8 charms are collected, open **Final**, solve the riddle, enter **`FIREPLACE`**.
5. Celebrate on the win screen; watch the live **Leaderboard**.

### Facilitator answer key

| Item | Answer |
|------|--------|
| Final passphrase | `FIREPLACE` (case-insensitive) |
| GhostwrAIter | content / content generation / writing |
| Elevate MyOrders | orders / ordering / myorders |
| Gap Detective | gaps |
| FORGE | forge / build / building |
| OrbitOne | one / 1 |
| LLM optimization | llm / models |
| Cross-divisional pilot | divisions / cross-divisional |
| Elevit & D2C | consumer / consumers |

Edit challenges anytime in [`src/data/stations.ts`](src/data/stations.ts).

## Adding documents, slides, and video

Drop files into each station folder:

```
public/stations/{id}/
  video.mp4
  slides.pdf
  notes.docx
  deck.pptx
```

Station IDs: `ghostwriter`, `myorders`, `gap`, `forge`, `orbit`, `llm`, `pilot`, `elevit`.

- **Video** and **PDF** embed in the page when present.
- **Word / PowerPoint** appear as download buttons (browsers do not preview Office well; export a PDF for in-app reading when you can).
- Missing files show a friendly “Asset coming soon” placeholder so the hunt still works.

## Firebase (live multi-laptop sync)

1. Create a Firebase project and enable **Cloud Firestore**.
2. Copy `.env.example` to `.env` and fill in the web app config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

3. Suggested Firestore rules for a short internal party (tighten if you keep the project longer):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /teams/{teamId} {
      allow read, write: if true;
    }
  }
}
```

4. Restart `npm run dev`. The “Demo mode” badge disappears when config is detected.

### Resetting a team

In the Firebase console → Firestore → `teams` → delete the team document, or clear browser localStorage key `holiday-hunt-demo-teams` in demo mode.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Deploy (GitHub Pages)

This repo deploys automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy-pages.yml`.

1. Create the GitHub repo `holiday-hunt-app` and push `main`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. After the workflow finishes, open:
   `https://<your-username>.github.io/holiday-hunt-app/`

Local Pages build check: `npm run build:pages`

For other hosts, use `npm run build` and upload `dist/`.
