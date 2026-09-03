# Fix Plesk build error: `nodenv: node: command not found` (exit 127)

## Diagnosis

Your screenshot shows the build fails with:

```
> vite build
nodenv: node: command not found
The `node' command exists in these Node versions: 20, 22
```

This is **not a problem with the AmmarAI code**. Plesk's "Run Node.js commands" tool on your Zap Hosting server uses **nodenv** (a Node version manager), and the Node version selected in the dropdown (22.23.2) is **not actually installed** in nodenv — that's why the shell can't find the `node` binary. `npm install` worked because npm resolved differently, but the build script spawns `node` and fails.

Evidence: nodenv itself says node exists in versions `20` and `22` — but `22.23.2` (the version picked in the Plesk dropdown) is not one of the installed nodenv versions, or nodenv's shims are not on PATH for the command runner.

## Fix — try in this order (all in Plesk, no code changes)

### Step 1: Pick an installed Node version
1. In Plesk → **Websites & Domains → ammarai.com → Node.js** (Dashboard tab, not "Run Node.js commands").
2. Set **Node.js version** to a version that is actually installed — pick plain **22** or **20** (the ones nodenv lists), not `22.23.2`.
3. Save, then go back to **Run Node.js commands**, select the same version in the dropdown, and run:
   - `npm run build`
4. If the dropdown still only offers `22.23.2`, change it in the Dashboard tab first — the command runner inherits the app's configured version.

### Step 2: If it still fails — use SSH instead (most reliable)
Plesk's web command runner is fragile with nodenv. SSH into the server and run the commands directly:

```bash
cd /var/www/vhosts/ammarai.com/<your-app-folder>
export PATH="$HOME/.nodenv/shims:$HOME/.nodenv/bin:$PATH"
nodenv global 22        # or: nodenv global 20
node -v                 # should print a version, not "command not found"
npm install
npm run build           # should produce dist/server/index.mjs
```

If `nodenv global 22` fails, list installed versions with `nodenv versions` and pick one shown.

### Step 3: Set the startup file
Once the build succeeds, in Plesk Node.js settings set:
- **Application startup file:** `dist/server/index.mjs`
- **Environment variables:** the values from `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`) — then re-run `npm run build` so the VITE_* values bake in.
- Click **Restart App**.

## Docs update (code change, small)

Add a short **Troubleshooting** section to `SELF_HOSTING.md` documenting this exact error (`nodenv: node: command not found`, exit 127) and the two fixes above, so you have it next time.

## Verification

- `npm run build` exits 0 and `dist/server/index.mjs` exists (check via Plesk Files or `ls dist/server/` over SSH).
- After restart, `https://ammarai.com` renders the homepage and `/sitemap.xml` returns XML.

## Out of scope

- No changes to the app code are needed — the same code builds cleanly here.
