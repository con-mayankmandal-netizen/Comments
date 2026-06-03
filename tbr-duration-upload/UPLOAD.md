# Upload these files to `tbr-duration`

Copy everything in this folder into the root of:

**https://github.com/con-mayankmandal-netizen/tbr-duration**

## Files to upload

| File | Action |
|------|--------|
| `index.html` | Replace existing `index.html` on `main` |
| `README.md` | Replace existing `README.md` on `main` |

## GitHub web (no terminal)

1. **index.html** — https://github.com/con-mayankmandal-netizen/tbr-duration/edit/main/index.html  
   - Select all → delete → paste contents of this folder’s `index.html` → Commit.

2. **README.md** — https://github.com/con-mayankmandal-netizen/tbr-duration/edit/main/README.md  
   - Paste this folder’s `README.md` → Commit.

3. Open https://con-mayankmandal-netizen.github.io/tbr-duration/ and hard-refresh (Ctrl+Shift+R).

## Terminal

```bash
git clone https://github.com/con-mayankmandal-netizen/tbr-duration.git
cd tbr-duration
cp /path/to/tbr-duration-upload/index.html .
cp /path/to/tbr-duration-upload/README.md .
git add index.html README.md
git commit -m "TBR: proxy via comments-proxy, bookmarklet auth"
git push origin main
```

## Proxy (already deployed)

Uses the same Worker as Comments:

`https://comments-proxy.con-mayank-mandal.workers.dev`

Health: https://comments-proxy.con-mayank-mandal.workers.dev/health

## Quick test

1. Log into https://cms.pocketfm.com  
2. Open the live TBR page → use **TBR Connect** bookmarklet on CMS  
3. Paste Show ID → **Extract TBR Durations**
