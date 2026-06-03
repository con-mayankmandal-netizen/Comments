# TBR Duration — deploy to `tbr-duration` repo

Copy these files into https://github.com/con-mayankmandal-netizen/tbr-duration (replace existing):

- `index.html` → root
- `.gitignore` → root
- `worker/README.md` → optional

**Reuses your existing proxy** (no new Worker):

`https://comments-proxy.con-mayank-mandal.workers.dev`

Both Comments and TBR call `PROXY_BASE + '/cms' + …` (e.g. `/cms/v2/content_api/book.show_episodes`). Deploy or update only the Worker in the **Comments** repo (`worker/src/index.js`).

After copying files here, push `main` and hard-refresh https://con-mayankmandal-netizen.github.io/tbr-duration/
