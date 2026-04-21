import { NextResponse } from 'next/server';

/**
 * Portfolio CMS auth gate.
 *
 * The public site is open to everyone. The CMS editor only mounts if the
 * browser has the `cms-ok` cookie (see components/CMSEditor.jsx). This
 * middleware sets that cookie after the visitor passes HTTP Basic Auth.
 *
 * Credentials live in Vercel environment variables:
 *   - CMS_USER   (e.g. "admin")
 *   - CMS_PASS   (a long random password you keep private)
 *
 * Trigger the gate by visiting: https://your-site.vercel.app/?edit=1
 * The browser shows a native username/password prompt. Enter the creds
 * you set on Vercel. Auth is remembered for 8 hours via an http cookie.
 *
 * Anyone without valid credentials gets a 401 and never sees the CMS UI.
 */
export function middleware(req) {
  const url = new URL(req.url);
  const { pathname } = url;
  const isDev = process.env.NODE_ENV !== 'production';

  // ---- Gate: POST /api/cms-state (cloud save endpoint) ---------------
  // Anyone can GET the shared state (public-read for all visitors), but
  // writes require an authenticated editor. The browser already holds
  // `cms-ok=1` from the /?edit=1 basic-auth flow, so we just re-check
  // that cookie here — no extra password prompt on Save.
  if (pathname === '/api/cms-state') {
    if (req.method === 'GET') return NextResponse.next();
    if (req.method === 'POST') {
      const cookie = req.cookies.get('cms-ok');
      if (cookie && cookie.value === '1') return NextResponse.next();
      return new NextResponse('Unauthorized — open /?edit=1 and sign in first.', {
        status: 401,
      });
    }
    return new NextResponse('Method not allowed', { status: 405 });
  }

  // ---- Gate: /?edit=1 (editor UI) ------------------------------------
  // Only gate root requests that explicitly ask for the editor.
  const wantsEdit = url.searchParams.has('edit');
  if (!wantsEdit) return NextResponse.next();

  // Resolve credentials in this order:
  //   1. Real env vars (production on Vercel + local .env.local)
  //   2. Dev fallback (local `npm run dev` only) — user: dev / pass: dev
  //
  // The dev fallback NEVER applies on Vercel because Next automatically sets
  // NODE_ENV=production there, so production is always locked down behind the
  // real CMS_USER / CMS_PASS env vars.
  let user = process.env.CMS_USER || '';
  let pass = process.env.CMS_PASS || '';

  if ((!user || !pass) && isDev) {
    user = 'dev';
    pass = 'dev';
  }

  // If env vars still aren't set (production with no config), refuse loudly.
  if (!user || !pass) {
    return new NextResponse(
      'CMS auth not configured. Set CMS_USER and CMS_PASS env vars on Vercel.',
      { status: 503 }
    );
  }

  const got = req.headers.get('authorization') || '';
  const expected = 'Basic ' + btoa(`${user}:${pass}`);

  if (got === expected) {
    const res = NextResponse.next();
    // 8-hour session cookie. Not http-only so the client CMSEditor can read it.
    // `secure: true` is required on Vercel (HTTPS) but breaks on http://localhost,
    // so only enable it in production.
    res.cookies.set('cms-ok', '1', {
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
      secure: !isDev,
    });
    return res;
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Portfolio CMS", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

// Run on the root route (editor UI gate) and the shared-state API
// endpoint (POST auth gate). Leave every other route untouched.
export const config = {
  matcher: ['/', '/api/cms-state'],
};
