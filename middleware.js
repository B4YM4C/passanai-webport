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
  // Only gate requests that explicitly ask for the editor.
  const wantsEdit = url.searchParams.has('edit');
  if (!wantsEdit) return NextResponse.next();

  const user = process.env.CMS_USER || '';
  const pass = process.env.CMS_PASS || '';

  // If env vars aren't configured, refuse the request loudly so you notice.
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
    res.cookies.set('cms-ok', '1', {
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
      secure: true,
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

// Run only on the root route — that's where the portfolio lives.
export const config = {
  matcher: ['/'],
};
