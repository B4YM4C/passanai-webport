/**
 * Shared CMS state — global source of truth for the portfolio.
 *
 * Stores a single JSON blob in Vercel KV (Redis by Upstash, server-side
 * only). Every visitor fetches the same latest version, so edits made
 * on Mac show up instantly on iPhone / incognito / every device.
 *
 * Why KV and not Blob:
 *   - KV is always private: reads & writes both go through our server
 *     with a token, so there's no public URL to leak.
 *   - No CDN in between the SDK and Redis, so fresh data every time.
 *   - Tiny payload (JSON under 1 MB) fits free-tier comfortably.
 *
 * Endpoints
 * ---------
 *   GET  /api/cms-state   → returns current state (public read through us)
 *   POST /api/cms-state   → writes new state (middleware protects this)
 *
 * Setup on Vercel (one-time)
 * --------------------------
 *   1. Vercel dashboard → your project → Storage tab
 *   2. Click "Create Database" → choose "KV (Redis)" / "Upstash Redis"
 *   3. Name it (e.g. "cms-state") → Create → Connect to project
 *   4. Vercel auto-adds KV_URL + KV_REST_API_URL + KV_REST_API_TOKEN
 *      (and KV_REST_API_READ_ONLY_TOKEN) to the project env
 *   5. Redeploy; Save in /?edit=1 now syncs globally, privately
 *
 * If you still have a Vercel Blob store from the earlier setup, you
 * can leave it or delete it — this route no longer touches it.
 *
 * Local dev: set the KV_* variables in .env.local, or skip them —
 * without KV the route returns empty state on GET and a 503 on POST,
 * and the editor silently falls back to localStorage-only.
 */

import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const KV_KEY = 'cms-state:v1';
const EMPTY_STATE = { elements: {}, addedNav: [], addedSections: [], deleted: [] };

function kvConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function readState() {
  if (!kvConfigured()) return null;
  try {
    const raw = await kv.get(KV_KEY);
    if (!raw) return null;
    // @vercel/kv auto-deserialises objects it wrote, but returns strings
    // verbatim. Be tolerant of both shapes.
    if (typeof raw === 'string') {
      try { return JSON.parse(raw); } catch (e) { return null; }
    }
    if (typeof raw === 'object') return raw;
    return null;
  } catch (e) {
    console.error('[cms-state] kv read failed', e);
    return null;
  }
}

export async function GET() {
  const state = (await readState()) || EMPTY_STATE;
  return new NextResponse(JSON.stringify(state), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // No caching — every client must see the freshest version.
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(req) {
  if (!kvConfigured()) {
    return NextResponse.json(
      {
        error:
          'KV store not configured. In Vercel: Storage → Create Database → KV (Redis) → Connect to project, then redeploy.',
      },
      { status: 503 }
    );
  }

  let state;
  try {
    state = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return NextResponse.json({ error: 'State must be an object' }, { status: 400 });
  }

  // Drop unknown top-level keys so an injected payload can't bloat KV.
  const clean = {
    elements: state.elements && typeof state.elements === 'object' ? state.elements : {},
    addedNav: Array.isArray(state.addedNav) ? state.addedNav : [],
    addedSections: Array.isArray(state.addedSections) ? state.addedSections : [],
    deleted: Array.isArray(state.deleted) ? state.deleted : [],
  };

  try {
    await kv.set(KV_KEY, clean);
    return NextResponse.json({
      ok: true,
      bytes: JSON.stringify(clean).length,
      at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[cms-state] kv write failed', e);
    return NextResponse.json({ error: 'Write failed: ' + e.message }, { status: 500 });
  }
}
