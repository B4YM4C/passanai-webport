'use client';

import { useEffect } from 'react';

export default function CMSEditor() {
  useEffect(() => {
    const LS_KEY = 'cms-portfolio-v1';
    const CLOUD_URL = '/api/cms-state';
    // `state` is mutated in place throughout this file, so we keep the
    // const reference and only overwrite its keys.
    const state = load() || { elements: {}, addedNav: [], addedSections: [], deleted: [] };

    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

    // ---- Cloud hydration -----------------------------------------------
    // Fetches the canonical shared state from /api/cms-state (Vercel Blob
    // backed). Runs on EVERY visit — public or editor — so what you see
    // on your Mac after Save is exactly what a stranger on iPhone sees.
    //
    // The first paint uses localStorage (fast, no flicker). When the
    // cloud response lands, we overwrite state and call applyAll() so
    // the DOM reflects the latest shared version.
    async function hydrateFromCloud() {
      try {
        const res = await fetch(CLOUD_URL, { cache: 'no-store' });
        if (!res.ok) return;
        const cloud = await res.json();
        if (!cloud || typeof cloud !== 'object') return;
        state.elements = cloud.elements || {};
        state.addedNav = cloud.addedNav || [];
        state.addedSections = cloud.addedSections || [];
        state.deleted = cloud.deleted || [];
        // Keep a local offline copy in sync.
        try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
        // Re-render the DOM from the fresh state.
        if (typeof applyAll === 'function') applyAll();
      } catch (e) {
        // Silent: if cloud is unreachable, we stay on localStorage.
        console.warn('[cms] cloud hydrate skipped:', e.message);
      }
    }

    async function save() {
      // Always persist locally first — this is the offline fallback and
      // also protects work if the network hiccups mid-save.
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(state));
      } catch (e) {
        status('Local save failed: ' + e.message, true);
        showBigBanner('Save FAILED', e.message, true);
        return;
      }

      const count = Object.keys(state.elements || {}).length;
      const nav = (state.addedNav || []).length;
      const sec = (state.addedSections || []).length;
      const del = (state.deleted || []).length;
      const summary =
        count + ' edits' +
        (nav ? ', ' + nav + ' nav' : '') +
        (sec ? ', ' + sec + ' sections' : '') +
        (del ? ', ' + del + ' deletes' : '');

      status('Saving to cloud…');

      // Push to the shared Blob store. Middleware checks cms-ok cookie.
      try {
        const res = await fetch(CLOUD_URL, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        });
        if (res.ok) {
          status('✓ Saved globally (' + summary + ')');
          showBigBanner(
            'Saved globally ✓  (' + count + ' edits)',
            'Live on / for every visitor now — refresh your iPhone or any other device to see it.'
          );
          return;
        }
        const msg = await res.text();
        if (res.status === 503) {
          // Blob store not configured — explain clearly.
          status('Saved locally only (cloud not configured).', true);
          showBigBanner(
            'Saved locally only',
            'Cloud store not set up yet — create a Blob in Vercel → Storage to sync across devices.',
            true
          );
          return;
        }
        throw new Error(res.status + ' ' + msg);
      } catch (e) {
        status('Cloud save failed — kept locally: ' + e.message, true);
        showBigBanner(
          'Cloud save FAILED (kept locally)',
          e.message + ' — edits are still on this browser. Retry Save when online.',
          true
        );
      }
    }

    // Big centered flash to make Save obviously work. Users kept asking
    // "did it save?" because the subtle bottom-right status bar was too
    // easy to miss.
    function showBigBanner(title, sub, warn) {
      let n = document.getElementById('cmsFlash');
      if (!n) {
        n = document.createElement('div');
        n.id = 'cmsFlash';
        n.style.cssText = [
          'position:fixed',
          'left:50%',
          'top:72px',
          'transform:translateX(-50%)',
          'z-index:2147483647',
          'padding:14px 20px',
          'border-radius:12px',
          'font:600 14px/1.35 system-ui,sans-serif',
          'color:#0b1220',
          'background:#7CFFB2',
          'box-shadow:0 12px 40px rgba(0,0,0,.35)',
          'max-width:520px',
          'text-align:center',
          'pointer-events:none',
          'opacity:0',
          'transition:opacity .18s ease'
        ].join(';');
        document.body.appendChild(n);
      }
      n.style.background = warn ? '#ff9797' : '#7CFFB2';
      n.innerHTML =
        '<div style="font-size:16px;margin-bottom:4px">' + title + '</div>' +
        '<div style="font-weight:500;opacity:.85">' + (sub || '') + '</div>';
      // Force reflow then fade in
      // eslint-disable-next-line no-unused-expressions
      n.offsetWidth;
      n.style.opacity = '1';
      clearTimeout(showBigBanner._t);
      showBigBanner._t = setTimeout(() => { n.style.opacity = '0'; }, 2600);
    }

    function load() {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY) || 'null');
      } catch (e) {
        return null;
      }
    }

    function status(msg, warn) {
      const s = $('#cmsStatus');
      if (!s) return;
      s.textContent = msg;
      s.style.color = warn ? '#ffb4b4' : '';
      s.classList.add('show');
      clearTimeout(status._t);
      status._t = setTimeout(() => s.classList.remove('show'), 1800);
    }

    function uid() {
      return 'e' + Math.random().toString(36).slice(2, 9);
    }

    // Selectors tuned to the JSX markup in components/Portfolio.jsx. Generic
    // tag selectors (h1–h4, p, li) cover most headings + body copy inside
    // skill-card / tl-card / cert automatically, so we only list specific
    // classes for text nodes that aren't a standard tag.
    const EDITABLE_SELECTORS = [
      { sel: 'h1,h2,h3,h4', kind: 'text' },
      { sel: 'p', kind: 'text' },
      { sel: 'li', kind: 'text' },
      { sel: '.eyebrow', kind: 'text' },
      { sel: '.tag', kind: 'text' },
      { sel: '.info-cell .v', kind: 'text' },
      { sel: '.info-cell .k', kind: 'text' },
      { sel: '.brand .sig', kind: 'text' },
      // Timeline cards (.tl-item > .tl-card): meta spans + company tagline.
      { sel: '.tl-meta .date', kind: 'text' },
      { sel: '.tl-meta .loc', kind: 'text' },
      { sel: '.tl-card .co', kind: 'text' },
      { sel: '.stat .num', kind: 'text' },
      { sel: '.stat .lab', kind: 'text' },
      { sel: '.cert .t', kind: 'text' },
      { sel: '.cert .i', kind: 'text' },
      { sel: '.toeic .score', kind: 'text' },
      { sel: '.toeic .label', kind: 'text' },
      { sel: '.contact-card h3', kind: 'text' },
      { sel: '.contact-tag', kind: 'text' },
      { sel: '.contact-links a', kind: 'link' },
      { sel: 'footer p, footer span', kind: 'text' },
      { sel: '#navLinks a, .nav-links a', kind: 'link' },
      { sel: '.btn', kind: 'link' },
      // Container-level (width, padding, background, border).
      {
        sel: 'section, header.hero, .container, .hero-grid, .info-strip, footer',
        kind: 'container',
      },
      {
        sel: '.info-cell, .stat, .skill-card, .cert, .toeic, .tl-item, .tl-card, .panel, .contact-card, .hero-card',
        kind: 'container',
      },
      {
        sel: '.about-grid, .skills-grid, .toeic-row, .two-col, .tags, .cert-list, .timeline, .contact-links',
        kind: 'container',
      },
    ];

    function registerAll() {
      EDITABLE_SELECTORS.forEach(({ sel, kind }) => {
        $$(sel).forEach((el) => {
          if (el.hasAttribute('data-edit')) return;
          if (el.closest('.cms-toolbar, .cms-inspector, .cms-status')) return;
          el.setAttribute('data-edit', kind);
          el.setAttribute('data-edit-id', uid());
          el.setAttribute('data-edit-kind', kind);
        });
      });
    }

    function applyAll() {
      Object.entries(state.elements || {}).forEach(([selKey, data]) => {
        const el = findByKey(selKey);
        if (!el) return;
        applyTo(el, data);
      });

      (state.deleted || []).forEach((k) => {
        const el = findByKey(k);
        if (el) el.style.display = 'none';
      });

      (state.addedNav || []).forEach((n) => {
        if (!$('#navLinks a[data-added="' + n.id + '"]')) {
          const a = document.createElement('a');
          a.textContent = n.label;
          a.href = n.href;
          a.setAttribute('data-added', n.id);
          $('#navLinks').appendChild(a);
        }
      });

      (state.addedSections || []).forEach((s) => {
        if (!document.getElementById(s.id)) spawnSection(s);
      });

      registerAll();
    }

    function applyTo(el, data) {
      if (data.text != null) {
        if (typeof data.text === 'string') el.textContent = data.text;
        else if (data.text.html != null) el.innerHTML = data.text.html;
        else {
          const en = el.querySelector('span.en');
          const th = el.querySelector('span.th');
          if (en && data.text.en != null) en.textContent = data.text.en;
          if (th && data.text.th != null) th.textContent = data.text.th;
          if (!en && !th && data.text.en != null) el.textContent = data.text.en;
        }
      }
      if (data.style) {
        Object.entries(data.style).forEach(([k, v]) => {
          if (v === '' || v == null) el.style.removeProperty(k);
          else el.style.setProperty(k, v);
        });
      }
      if (data.art) {
        el.classList.remove('hand', 'frost', 'sage', 'lavender', 'champagne', 'rose', 'ink');
        if (data.art !== 'plain' && data.art !== '') {
          el.classList.add('hand', data.art);
        }
      }
      if (data.href != null && el.tagName === 'A') {
        el.href = data.href;
        if (data.target) el.target = data.target;
        else el.removeAttribute('target');
      }
    }

    function keyFor(el) {
      // Persistence key MUST be stable across page reloads. The old
      // implementation used the `data-edit-id` runtime uid as the key,
      // but registerAll() re-generates that uid on every page load — so
      // after saving, the next visit couldn't find the element and all
      // edits silently vanished.
      //
      // pathOf() returns a CSS selector like "body>main.container>section.about>h2"
      // that survives reloads as long as the DOM structure around the element
      // doesn't change.
      return pathOf(el);
    }

    function pathOf(el) {
      if (el.id) return '#' + el.id;
      const parts = [];
      let n = el;
      while (n && n.nodeType === 1 && n !== document.body) {
        let sel = n.nodeName.toLowerCase();
        if (n.className && typeof n.className === 'string') {
          const c = n.className
            .trim()
            .split(/\s+/)
            .filter((x) => !x.startsWith('cms-'))
            .slice(0, 2)
            .join('.');
          if (c) sel += '.' + c;
        }
        const parent = n.parentNode;
        if (parent) {
          const sibs = Array.from(parent.children).filter((c) => c.nodeName === n.nodeName);
          if (sibs.length > 1) sel += ':nth-of-type(' + (sibs.indexOf(n) + 1) + ')';
        }
        parts.unshift(sel);
        n = n.parentNode;
      }
      return parts.join('>');
    }

    function findByKey(k) {
      if (!k) return null;
      // Keys are pathOf() selectors (stable across reloads) or "#id" shortcuts
      // for elements with an id. Fall back to data-edit-id for any legacy
      // state loaded from an older localStorage snapshot.
      try {
        const el = document.querySelector(k);
        if (el) return el;
      } catch (e) {
        // k wasn't valid CSS — fall through to legacy lookup
      }
      return document.querySelector('[data-edit-id="' + CSS.escape(k) + '"]');
    }

    function spawnSection(s) {
      const sec = document.createElement('section');
      sec.id = s.id;
      sec.innerHTML = `
        <div class="container">
          <div class="section-head reveal">
            <span class="tag">${s.tag || 'New Section'}</span>
            <h2>${s.title || 'Section title'}</h2>
            <p>${s.body || 'Write your section content here. Click to edit in CMS mode.'}</p>
          </div>
        </div>`;
      const contactSec = document.getElementById('contact');
      (contactSec ? contactSec.parentNode.insertBefore(sec, contactSec) : document.body.appendChild(sec));
    }

    function toggleEdit(forceOn) {
      const on = forceOn != null ? !!forceOn : !document.body.classList.contains('cms-edit');
      document.body.classList.toggle('cms-edit', on);
      const btn = $('#cmsToggleEdit');
      if (btn) {
        btn.textContent = 'Edit: ' + (on ? 'ON' : 'OFF');
        // Visual cue so the user can see the click registered.
        btn.style.background = on ? '#7CFFB2' : '';
        btn.style.color = on ? '#0b1220' : '';
      }
      if (!on) {
        closeInspector();
      }
      status(on ? 'Edit mode ON — click any text to edit' : 'Edit mode OFF');
    }

    function showToolbar() {
      document.body.classList.add('cms-ready');
    }

    let current = null;
    let _lastRange = null;

    function openInspector(el) {
      if (current && current !== el) current.removeAttribute('contenteditable');
      current = el;
      $$('.cms-selected').forEach((n) => n.classList.remove('cms-selected'));
      el.classList.add('cms-selected');
      document.body.classList.add('cms-inspector-open');

      const kind = el.getAttribute('data-edit-kind');
      $('#cmsInspTitle').textContent =
        (kind.charAt(0).toUpperCase() + kind.slice(1)) + ' · ' + el.tagName;

      $('#cmsPaneLink').style.display = kind === 'link' ? '' : 'none';
      $('#cmsPaneText').style.display = kind === 'container' ? 'none' : '';

      if (kind === 'text' || kind === 'link') {
        el.setAttribute('contenteditable', 'true');
        el.addEventListener('input', onCurrentInput);
      }

      _lastRange = null;
      updateTargetIndicator();

      const en = el.querySelector('span.en');
      const th = el.querySelector('span.th');
      $('#cmsTextEN').value = en ? en.textContent : kind === 'container' ? '' : el.textContent.trim();
      $('#cmsTextTH').value = th ? th.textContent : '';

      const cs = getComputedStyle(el);
      setRange('cmsFontSize', 'cmsFontSizeVal', parseFloat(el.style.fontSize) || parseFloat(cs.fontSize) || 16);
      $('#cmsFontFamily').value = el.style.fontFamily || '';
      $('#cmsFontWeight').value = el.style.fontWeight || '';
      setRange(
        'cmsLetterSpacing',
        'cmsLetterSpacingVal',
        parseFloat(el.style.letterSpacing) || 0,
        (x) => x + 'em'
      );
      setRange(
        'cmsLineHeight',
        'cmsLineHeightVal',
        parseFloat(el.style.lineHeight) || parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 1.4
      );
      $('#cmsColor').value = rgbToHex(el.style.color || cs.color);
      $('#cmsShadowOn').checked = !!el.style.textShadow && el.style.textShadow !== 'none';
      $('#cmsShadowColor').value = rgbToHex(extractShadowColor(el.style.textShadow) || '#D4C5A9');

      $$('#cmsAlignRow .chip').forEach((b) => b.classList.toggle('on', b.dataset.align === (el.style.textAlign || cs.textAlign)));

      const art = ['frost', 'sage', 'lavender', 'champagne', 'rose', 'ink'].find((c) => el.classList.contains(c)) || '';
      $$('#cmsArtRow .chip').forEach((b) => b.classList.toggle('on', b.dataset.art === art));

      if (kind === 'link') {
        const href = el.getAttribute('href') || '';
        const isSection = href.startsWith('#');
        setLinkType(isSection ? 'section' : 'url');
        populateSectionSelect();
        if (isSection) {
          $('#cmsLinkSectionSelect').value = href.slice(1);
        } else {
          $('#cmsLinkUrlInput').value = href;
        }
        $('#cmsLinkNewTab').checked = el.getAttribute('target') === '_blank';
      }

      const maxW = parseInt(el.style.maxWidth) || 0;
      setRange('cmsMaxW', 'cmsMaxWVal', maxW);
      setRange('cmsPadX', 'cmsPadXVal', parseInt(el.style.paddingLeft) || parseInt(cs.paddingLeft) || 0);
      setRange('cmsPadY', 'cmsPadYVal', parseInt(el.style.paddingTop) || parseInt(cs.paddingTop) || 0);
      setRange('cmsGap', 'cmsGapVal', parseInt(el.style.gap) || parseInt(cs.gap) || 0);
      $('#cmsBg').value = rgbToHex(el.style.backgroundColor || '#ffffff');
      $('#cmsBgOn').checked = !!el.style.backgroundColor;
    }

    function closeInspector() {
      document.body.classList.remove('cms-inspector-open');
      $$('.cms-selected').forEach((n) => n.classList.remove('cms-selected'));
      if (current) {
        current.removeAttribute('contenteditable');
        current.removeEventListener('input', onCurrentInput);
      }
      current = null;
      const tgt = document.getElementById('cmsTargetLabel');
      if (tgt) tgt.textContent = 'whole element';
      const tb = document.getElementById('cmsTarget');
      if (tb) tb.classList.remove('selection');
    }

    function setRange(inputId, valId, val, fmt) {
      const input = $('#' + inputId);
      input.value = val;
      $('#' + valId).textContent = fmt ? fmt(val) : val;
    }

    function rgbToHex(str) {
      if (!str) return '#2C2C2E';
      if (str.startsWith('#')) return str;
      const m = str.match(/\d+/g);
      if (!m) return '#2C2C2E';
      const r = parseInt(m[0]),
        g = parseInt(m[1]),
        b = parseInt(m[2]);
      return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
    }

    function extractShadowColor(str) {
      if (!str) return '';
      const m = str.match(/rgba?\([\d,\s\.]+\)|#[0-9a-fA-F]{3,8}/);
      return m ? m[0] : '';
    }

    function stateFor(el) {
      const k = keyFor(el);
      state.elements[k] = state.elements[k] || {};
      return state.elements[k];
    }

    function setStyle(el, prop, val) {
      const rec = stateFor(el);
      rec.style = rec.style || {};
      if (val === '' || val == null) {
        el.style.removeProperty(prop);
        delete rec.style[prop];
      } else {
        el.style.setProperty(prop, val);
        rec.style[prop] = val;
      }
    }

    function setText(el, en, th) {
      const rec = stateFor(el);
      const enSpan = el.querySelector('span.en');
      const thSpan = el.querySelector('span.th');
      if (enSpan || thSpan) {
        if (enSpan && en != null) enSpan.textContent = en;
        if (thSpan && th != null) thSpan.textContent = th;
        rec.text = { en, th };
      } else {
        el.textContent = en || '';
        rec.text = en || '';
      }
    }

    function setArt(el, art) {
      ['frost', 'sage', 'lavender', 'champagne', 'rose', 'ink'].forEach((c) => el.classList.remove(c));
      if (art) {
        el.classList.add('hand', art);
      }
      stateFor(el).art = art;
    }

    function setLink(el, href, newTab) {
      el.setAttribute('href', href);
      if (newTab) el.setAttribute('target', '_blank');
      else el.removeAttribute('target');
      const rec = stateFor(el);
      rec.href = href;
      rec.target = newTab ? '_blank' : '';
    }

    function currentSelectionRange() {
      if (!current) return null;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return null;
      if (sel.isCollapsed) return null;
      const r = sel.getRangeAt(0);
      if (!current.contains(r.commonAncestorContainer)) return null;
      return r;
    }

    function rememberRange() {
      const r = currentSelectionRange();
      if (r) _lastRange = r.cloneRange();
    }

    function restoreRange() {
      if (!_lastRange) return null;
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(_lastRange);
      return _lastRange;
    }

    function hasActiveRange() {
      return !!(currentSelectionRange() || _lastRange);
    }

    function updateTargetIndicator() {
      const t = document.getElementById('cmsTargetLabel');
      const bx = document.getElementById('cmsTarget');
      if (!t || !bx) return;
      const r = currentSelectionRange();
      if (r) {
        const txt = r.toString().replace(/\s+/g, ' ').trim().slice(0, 36);
        t.textContent = 'selection' + (txt ? ': "' + txt + '"' : '');
        bx.classList.add('selection');
        _lastRange = r.cloneRange();
      } else if (_lastRange) {
        const txt = _lastRange.toString().replace(/\s+/g, ' ').trim().slice(0, 36);
        t.textContent = 'selection' + (txt ? ': "' + txt + '"' : '');
        bx.classList.add('selection');
      } else {
        t.textContent = 'whole element';
        bx.classList.remove('selection');
      }
    }

    function onCurrentInput() {
      if (!current) return;
      const rec = stateFor(current);
      if (typeof rec.text === 'string' || rec.text == null) rec.text = {};
      rec.text.html = current.innerHTML;
      clearTimeout(onCurrentInput._t);
      onCurrentInput._t = setTimeout(save, 250);
    }

    function wrapSelectionWithTP(styleObj, classStr) {
      let r = currentSelectionRange() || (restoreRange() && currentSelectionRange());
      if (!r) return false;

      let existing = null;
      const sc = r.startContainer,
        ec = r.endContainer;
      if (sc === ec && sc.nodeType === 3) {
        const p = sc.parentElement;
        if (p && p.tagName === 'TP' && current.contains(p)) existing = p;
      } else if (
        r.startContainer === r.endContainer &&
        r.startContainer.nodeType === 1 &&
        r.startContainer.tagName === 'TP' &&
        current.contains(r.startContainer)
      ) {
        existing = r.startContainer;
      }

      if (existing) {
        if (styleObj)
          Object.entries(styleObj).forEach(([k, v]) => {
            if (v === '' || v == null) existing.style.removeProperty(k);
            else existing.style.setProperty(k, v);
          });
        if (classStr != null) {
          ['frost', 'sage', 'lavender', 'champagne', 'rose', 'ink', 'hand'].forEach((c) =>
            existing.classList.remove(c)
          );
          classStr.split(/\s+/).filter(Boolean).forEach((c) => existing.classList.add(c));
        }
      } else {
        const tp = document.createElement('tp');
        if (styleObj)
          Object.entries(styleObj).forEach(([k, v]) => {
            if (v !== '' && v != null) tp.style.setProperty(k, v);
          });
        if (classStr) classStr.split(/\s+/).filter(Boolean).forEach((c) => tp.classList.add(c));
        try {
          const frag = r.extractContents();
          tp.appendChild(frag);
          r.insertNode(tp);
        } catch (e) {
          console.warn('tp wrap failed', e);
          return false;
        }
        const sel = window.getSelection();
        sel.removeAllRanges();
        const nr = document.createRange();
        nr.selectNodeContents(tp);
        sel.addRange(nr);
        _lastRange = nr.cloneRange();
      }
      onCurrentInput();
      updateTargetIndicator();
      return true;
    }

    function unwrapAllTP() {
      if (!current) return;
      const tps = current.querySelectorAll('tp');
      tps.forEach((tp) => {
        const parent = tp.parentNode;
        while (tp.firstChild) parent.insertBefore(tp.firstChild, tp);
        parent.removeChild(tp);
      });
      _lastRange = null;
      onCurrentInput();
      updateTargetIndicator();
    }

    function applyStyleSmart(prop, val) {
      if (!current) return;
      if (hasActiveRange()) {
        wrapSelectionWithTP({ [prop]: val }, null);
      } else {
        setStyle(current, prop, val);
      }
    }

    function applyArtSmart(art) {
      if (!current) return;
      if (hasActiveRange()) {
        const cls = art ? 'hand ' + art : '';
        wrapSelectionWithTP({}, cls);
      } else {
        setArt(current, art);
      }
    }

    function populateSectionSelect() {
      const sel = $('#cmsLinkSectionSelect');
      sel.innerHTML = '';
      $$('section[id], header[id]').forEach((s) => {
        const o = document.createElement('option');
        o.value = s.id;
        const h = s.querySelector('h1,h2,h3');
        o.textContent = '#' + s.id + (h ? ' — ' + h.textContent.trim().slice(0, 30) : '');
        sel.appendChild(o);
      });
    }

    function setLinkType(t) {
      $$('#cmsPaneLink .chip[data-link-type]').forEach((b) =>
        b.classList.toggle('on', b.dataset.linkType === t)
      );
      $('#cmsLinkSection').style.display = t === 'section' ? '' : 'none';
      $('#cmsLinkUrl').style.display = t === 'url' ? '' : 'none';
    }

    function wireInspector() {
      $$('.cms-inspector .tabs button').forEach((b) =>
        b.addEventListener('click', () => {
          $$('.cms-inspector .tabs button').forEach((x) => x.classList.remove('on'));
          b.classList.add('on');
          $$('.cms-pane').forEach((p) =>
            p.classList.toggle('on', p.dataset.pane === b.dataset.pane)
          );
        })
      );
      $('#cmsInspClose').addEventListener('click', closeInspector);

      $('#cmsTextEN').addEventListener('input', (e) => {
        if (current) setText(current, e.target.value, $('#cmsTextTH').value);
      });
      $('#cmsTextTH').addEventListener('input', (e) => {
        if (current) setText(current, $('#cmsTextEN').value, e.target.value);
      });

      $('#cmsFontFamily').addEventListener('change', (e) => {
        applyStyleSmart('font-family', e.target.value);
      });
      $('#cmsFontWeight').addEventListener('change', (e) => {
        applyStyleSmart('font-weight', e.target.value);
      });
      $('#cmsFontSize').addEventListener('input', (e) => {
        applyStyleSmart('font-size', e.target.value + 'px');
        $('#cmsFontSizeVal').textContent = e.target.value + 'px';
      });
      $('#cmsLetterSpacing').addEventListener('input', (e) => {
        applyStyleSmart('letter-spacing', e.target.value + 'em');
        $('#cmsLetterSpacingVal').textContent = e.target.value + 'em';
      });
      $('#cmsLineHeight').addEventListener('input', (e) => {
        applyStyleSmart('line-height', e.target.value);
        $('#cmsLineHeightVal').textContent = e.target.value;
      });
      $('#cmsColor').addEventListener('input', (e) => {
        applyStyleSmart('color', e.target.value);
      });

      $('#cmsShadowColor').addEventListener('input', applyShadow);
      $('#cmsShadowOn').addEventListener('change', applyShadow);

      function applyShadow() {
        if (!current) return;
        if ($('#cmsShadowOn').checked) {
          applyStyleSmart('text-shadow', '4px 4px 0 ' + $('#cmsShadowColor').value);
        } else {
          applyStyleSmart('text-shadow', 'none');
        }
      }

      $$('#cmsAlignRow .chip').forEach((b) =>
        b.addEventListener('click', () => {
          $$('#cmsAlignRow .chip').forEach((x) => x.classList.remove('on'));
          b.classList.add('on');
          if (current) setStyle(current, 'text-align', b.dataset.align);
        })
      );

      $$('#cmsArtRow .chip').forEach((b) =>
        b.addEventListener('click', () => {
          $$('#cmsArtRow .chip').forEach((x) => x.classList.remove('on'));
          b.classList.add('on');
          applyArtSmart(b.dataset.art);
        })
      );

      const unwrapBtn = document.getElementById('cmsUnwrap');
      if (unwrapBtn) unwrapBtn.addEventListener('click', unwrapAllTP);

      $('#cmsMaxW').addEventListener('input', (e) => {
        if (current) {
          const v = +e.target.value;
          setStyle(current, 'max-width', v ? v + 'px' : '');
          $('#cmsMaxWVal').textContent = v ? v + 'px' : 'auto';
        }
      });

      $('#cmsPadX').addEventListener('input', (e) => {
        if (current) {
          const v = e.target.value;
          setStyle(current, 'padding-left', v + 'px');
          setStyle(current, 'padding-right', v + 'px');
          $('#cmsPadXVal').textContent = v + 'px';
        }
      });

      $('#cmsPadY').addEventListener('input', (e) => {
        if (current) {
          const v = e.target.value;
          setStyle(current, 'padding-top', v + 'px');
          setStyle(current, 'padding-bottom', v + 'px');
          $('#cmsPadYVal').textContent = v + 'px';
        }
      });

      $('#cmsGap').addEventListener('input', (e) => {
        if (current) {
          setStyle(current, 'gap', e.target.value + 'px');
          $('#cmsGapVal').textContent = e.target.value + 'px';
        }
      });

      $('#cmsBg').addEventListener('input', () => {
        if (current && $('#cmsBgOn').checked) setStyle(current, 'background-color', $('#cmsBg').value);
      });

      $('#cmsBgOn').addEventListener('change', () => {
        if (current)
          setStyle(current, 'background-color', $('#cmsBgOn').checked ? $('#cmsBg').value : '');
      });

      $$('#cmsPaneLink .chip[data-link-type]').forEach((b) =>
        b.addEventListener('click', () => setLinkType(b.dataset.linkType))
      );

      $('#cmsLinkSectionSelect').addEventListener('change', (e) => {
        if (current) setLink(current, '#' + e.target.value, $('#cmsLinkNewTab').checked);
      });

      $('#cmsLinkUrlInput').addEventListener('input', (e) => {
        if (current) setLink(current, e.target.value, $('#cmsLinkNewTab').checked);
      });

      $('#cmsLinkNewTab').addEventListener('change', () => {
        if (current) {
          setLink(current, current.getAttribute('href'), $('#cmsLinkNewTab').checked);
        }
      });

      $('#cmsDelete').addEventListener('click', () => {
        if (!current) return;
        if (!confirm('Delete this element? You can restore by resetting.')) return;
        const k = keyFor(current);
        state.deleted = state.deleted || [];
        state.deleted.push(k);
        current.style.display = 'none';
        closeInspector();
        save();
      });
    }

    function onDocClick(e) {
      if (!document.body.classList.contains('cms-edit')) return;

      const link = e.target.closest('a');
      if (link && !link.closest('.cms-toolbar, .cms-inspector, .cms-status')) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.target.id === 'navLinks' || (e.target.closest('#navLinks') && !link)) {
        const label = prompt('Nav link label', 'New link');
        if (!label) return;
        const href = prompt('URL or #section', '#about');
        if (href == null) return;
        const id = uid();
        state.addedNav = state.addedNav || [];
        state.addedNav.push({ id, label, href });
        const a = document.createElement('a');
        a.textContent = label;
        a.href = href;
        a.setAttribute('data-added', id);
        $('#navLinks').appendChild(a);
        registerAll();
        save();
        return;
      }

      const target = e.target.closest('[data-edit]');
      if (!target) return;
      if (target.closest('.cms-toolbar, .cms-inspector, .cms-status')) return;
      e.stopPropagation();
      openInspector(target);
    }

    function wireToolbar() {
      // NOTE: use `.onclick = fn` (not addEventListener) so that repeat
      // mounts (e.g. React StrictMode runs this effect twice in dev)
      // can't stack duplicate handlers. With addEventListener, every
      // click of "Edit: OFF" would flip the mode twice and look stuck.
      $('#cmsToggleEdit').onclick = () => toggleEdit();
      $('#cmsSave').onclick = save;
      $('#cmsReset').onclick = () => {
        if (!confirm('Discard all CMS edits?')) return;
        localStorage.removeItem(LS_KEY);
        location.reload();
      };

      $('#cmsAddSection').onclick = () => {
        const title = prompt('Section title', 'New Section');
        if (!title) return;
        const id =
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') || 'sec-' + uid();
        const sec = { id, tag: title, title, body: 'Write your section content here.' };
        state.addedSections = state.addedSections || [];
        state.addedSections.push(sec);
        spawnSection(sec);
        registerAll();
        save();
        location.hash = '#' + id;
      };

      $('#cmsAddNav').onclick = () => {
        const label = prompt('Nav link label', 'New link');
        if (!label) return;
        const href = prompt('URL or #section', '#about');
        if (href == null) return;
        const id = uid();
        state.addedNav = state.addedNav || [];
        state.addedNav.push({ id, label, href });
        const a = document.createElement('a');
        a.textContent = label;
        a.href = href;
        a.setAttribute('data-added', id);
        $('#navLinks').appendChild(a);
        registerAll();
        save();
      };

      $('#cmsExport').onclick = exportHtml;
    }

    function exportHtml() {
      const clone = document.documentElement.cloneNode(true);
      clone.querySelectorAll('.cms-toolbar,.cms-inspector,.cms-status,.cms-add-zone').forEach((n) => n.remove());
      clone.querySelectorAll('script').forEach((s) => {
        if (s.textContent.includes('CMS Editor')) s.remove();
      });
      clone
        .querySelectorAll('[data-edit],[data-edit-id],[data-edit-kind]')
        .forEach((n) => {
          n.removeAttribute('data-edit');
          n.removeAttribute('data-edit-id');
          n.removeAttribute('data-edit-kind');
          n.classList.remove('cms-selected');
        });
      clone.classList.remove('cms-edit', 'cms-ready', 'cms-inspector-open');
      const html = '<!DOCTYPE html>\n' + clone.outerHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'portfolio-export.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      status('Exported portfolio-export.html');
    }

    function boot() {
      // ---- Step 1: replay saved edits for EVERY visit -----------------
      // Run registerAll() + applyAll() synchronously using whatever
      // localStorage has — this avoids any flash of the pristine JSX
      // before the cloud state arrives.
      registerAll();
      applyAll();

      // Then reach out to the shared Blob store for the canonical state.
      // When it comes back (usually <300ms), state is overwritten and
      // applyAll() runs again so the page shows the latest global
      // version — the same one iPhone / desktop visitors will see.
      hydrateFromCloud();

      // ---- Step 2: edit-mode gate -------------------------------------
      // The editor UI (toolbar, inspector, contentEditable) only mounts
      // when the URL carries `?edit=1` and middleware has set the
      // `cms-ok` cookie. Visiting `/` plain shows the normal site.
      const sp = (typeof location !== 'undefined')
        ? new URLSearchParams(location.search)
        : new URLSearchParams('');
      if (sp.get('edit') !== '1') return;

      const authed = (typeof document !== 'undefined') &&
        /(?:^|;\s*)cms-ok=1(?:;|$)/.test(document.cookie);
      if (!authed) return;

      // ---- Step 3: mount editor UI ------------------------------------
      wireToolbar();
      wireInspector();
      showToolbar();

      document.addEventListener('click', onDocClick, true);
      document.addEventListener('selectionchange', onSelectionChange);
      document.addEventListener('mousedown', onDocMouseDown);
      document.addEventListener('keydown', onDocKeyDown);

      // Enter edit mode by default when ?edit=1 — the whole point of
      // opening that URL is to edit.
      toggleEdit(true);

      window.addEventListener('beforeunload', save);
    }

    // Named handlers so cleanup can actually remove them. Anonymous
    // arrow callbacks passed to addEventListener could never be removed
    // and leaked across React StrictMode double-mounts.
    function onSelectionChange() {
      if (!document.body.classList.contains('cms-inspector-open')) return;
      const r = currentSelectionRange();
      if (r) _lastRange = r.cloneRange();
      updateTargetIndicator();
    }

    function onDocMouseDown(e) {
      if (!current) return;
      if (e.target.closest('.cms-inspector, .cms-toolbar')) return;
      if (current.contains(e.target)) return;
      _lastRange = null;
      updateTargetIndicator();
    }

    function onDocKeyDown(e) {
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        toggleEdit();
      }
      if (e.key === 'Escape' && document.body.classList.contains('cms-inspector-open')) {
        closeInspector();
      }
    }

    boot();

    return () => {
      document.removeEventListener('click', onDocClick, true);
      document.removeEventListener('selectionchange', onSelectionChange);
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onDocKeyDown);
      document.body.classList.remove('cms-edit', 'cms-ready', 'cms-inspector-open');
      window.removeEventListener('beforeunload', save);
    };
  }, []);

  return null;
}
