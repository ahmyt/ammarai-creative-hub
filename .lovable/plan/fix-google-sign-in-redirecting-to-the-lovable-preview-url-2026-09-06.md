# Fix Google sign-in redirecting to the Lovable preview URL

## Diagnosis (confirmed by tests)

- Your Google credentials work — Google sign-in now completes.
- After Google hands you back, the sign-in service sends you to its configured **Site URL**, which is still the old Lovable preview address:
  `https://id-preview--ab4a5e87-30cb-4379-b661-4f70b8317377.lovable.app`
- I confirmed this by calling the auth callback directly — it redirects to that preview URL. So `https://ammarai.com` is not registered as an allowed return address, and the fallback Site URL still points at the preview.

This is a backend configuration issue, not a code bug.

## What will change

### Step 1 — You: update the sign-in URL settings (2 minutes)

In the Lovable Cloud dashboard: **Users → Authentication Settings → URL Configuration**

1. Set **Site URL** to: `https://ammarai.com`
2. Under **Redirect URLs** (allowed return addresses), add:
   - `https://ammarai.com/**`
   - `https://www.ammarai.com/**` (if you use the www version)
   - Keep the existing `id-preview--...lovable.app` entry so preview sign-in keeps working

<presentation-actions><presentation-open-backend>Open Backend Settings</presentation-open-backend></presentation-actions>

### Step 2 — I verify

1. Re-run the callback test and confirm the fallback is now `https://ammarai.com`.
2. Confirm `https://ammarai.com/auth` is accepted as a return address.
3. You then retry "Continue with Google" on `https://ammarai.com/auth` — it should land you back on ammarai.com signed in, and `/admin` should load the CMS.

## Notes

- No code change is needed; the deployed app already requests the correct return address (`https://ammarai.com/auth`) — the backend just doesn't trust it yet.
- If you prefer, I can also make the app handle being signed in on a wrong domain by offering a one-click "Continue to ammarai.com" — optional, only if Step 1 alone doesn't fully resolve it.
