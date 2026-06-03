# TBR Duration Extractor

Export PocketFM CMS episode audio durations as CSV (HH:MM:SS).

**Live app:** https://con-mayankmandal-netizen.github.io/tbr-duration/

## Proxy (required on GitHub Pages)

This app uses the same Cloudflare Worker as the Comments tool:

`https://comments-proxy.con-mayank-mandal.workers.dev`

No second proxy to deploy. The Worker must allow your GitHub Pages origin (already configured for `con-mayankmandal-netizen.github.io`).

Health check: https://comments-proxy.con-mayank-mandal.workers.dev/health → `comments-proxy OK`

## How to use

1. Open https://cms.pocketfm.com and log in.
2. Open https://con-mayankmandal-netizen.github.io/tbr-duration/
3. Copy the **TBR Connect** bookmarklet from the page → add to bookmarks bar.
4. On the CMS tab, click **TBR Connect** (opens TBR tool connected).
5. Paste a **Show ID** or full CMS show URL.
6. Click **Extract TBR Durations** → download CSV.

## Deploy / update this repo

Replace `index.html` in this repo with the latest from your machine or agent bundle, then push `main`. GitHub Pages publishes from `main` automatically.

## CSV columns

- Episode Number  
- Episode Title  
- Duration (HH:MM:SS)  
- Duration (Formatted)  
- Duration (Seconds)
