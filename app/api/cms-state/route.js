/**
 * Shared CMS state — global source of truth for the portfolio.
 *
 * Before this file existed, every save went into the editor browser's
 * localStorage only, so edits on the Mac didn't reach iPhone or public
 * visitors. This endpoint stores the same JSON blob in Vercel Blob so
 * every device — logged in or not — fetches the same latest version.
 *
 * Endpoints
 * ---------
 *   GET  /api/cms-state   → returns current state (public, no auth)
 *   POST /api/cms-state   → writes new state (protected by middleware)
 *
 * Setup on Vercel (one-time)
 * --------------------------
 *   1. Vercel dashboard → your project → Storage → Create → Blob
 *   2. Vercel auto-injects BLOB_READ_WRITE_TOKEN into the project env
 *   3. Redeploy; the editor's Save button now syncs globally
 *
 * Fallback: if BLOB_READ_WRITE_TOKEN is not set (local dev without blob)
 * the route returns an empty state on GET and a 503 on POST, and the
 * editor silently falls back to localStorage-only. Production with the
 * token set works across devices automatically.
 */

import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BLOB_KEY = 'cms-state.json';
const EMPTY_STATE = { elements: {}, addedNav: [], addedSections: [], deleted: [] };

async function readState() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (!blobs || !blobs.length) return null;
    // Newest wins (put with addRandomSuffix=false overwrites, but list
    // is tolerant if legacy entries linger).
    const latest = blobs.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )[0];
    const res = await fetch(latest.url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('[cms-state] read failed', e);
    return null;
  }
}

export async function GET() {
  const state = (await readState()) || EMPTY_STATE;
  return NextResponse.json(state, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(req) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Blob store not configured. Create a Blob in Vercel dashboard → Storage.' },
      { status: 503 }
    );
  }

  let state;
  try {
    state = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Sanity: state must be an object with at least `elements`.
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return NextResponse.json({ error: 'State must be an object' }, { status: 400 });
  }

  // Normalise — drop unknown top-level keys to keep the blob small.
  const clean = {
    elements: state.elements && typeof state.elements === 'object' ? state.elements : {},
    addedNav: Array.isArray(state.addedNav) ? state.addedNav : [],
    addedSections: Array.isArray(state.addedSections) ? state.addedSections : [],
    deleted: Array.isArray(state.deleted) ? state.deleted : [],
  };

  try {
    const result = await put(BLOB_KEY, JSON.stringify(clean), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true,
    });
    return NextResponse.json({ ok: true, url: result.url, bytes: JSON.stringify(clean).length });
  } catch (e) {
    console.error('[cms-state] write failed', e);
    return NextResponse.json({ error: 'Write failed: ' + e.message }, { status: 500 });
  }
}
