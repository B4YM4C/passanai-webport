'use client';

import React, { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   Real project data — pulled from portfolio.html
───────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    num: '01',
    accent: 'frost',
    period: '2025 — 2026',
    company: 'Personal Project',
    role: { en: 'Full-Stack Owner', th: 'Full-Stack Owner' },
    title: { en: 'Interactive Resume Website', th: 'เว็บไซต์ Resume แบบ Interactive' },
    desc: {
      en: 'A bilingual (EN/TH) personal portfolio built from scratch, featuring hand-crafted character animations, a built-in CMS editor, and a clean responsive layout. Demonstrates ability to define product vision, design UX, and deliver polished output.',
      th: 'เว็บไซต์ Resume แบบ Interactive พร้อมตัวละครน่ารักเคลื่อนไหวได้ รองรับ 2 ภาษา มี CMS สำหรับแก้ไข content แบบ real-time',
    },
    links: [
      { label: { en: '↗ Live Site', th: '↗ เว็บไซต์จริง' }, href: 'https://passanai.vercel.app/', primary: true },
    ],
    metrics: [
      { val: 'TH/EN', desc: { en: 'Bilingual toggle', th: 'สลับ 2 ภาษา' } },
      { val: 'CMS', desc: { en: 'Built-in live editor', th: 'แก้ไข content สด' } },
      { val: '5', desc: { en: 'Character animations', th: 'ตัวละครเคลื่อนไหว' } },
      { val: '100%', desc: { en: 'Mobile responsive', th: 'รองรับ Mobile' } },
    ],
    tags: ['Bilingual TH/EN', 'Character Animation', 'Responsive Design', 'Built-in CMS', 'Next.js', 'Vercel'],
    features: [
      { icon: '🎬', title: { en: 'Custom Animations', th: 'Animation สั่งทำ' }, desc: { en: 'Hand-drawn character reacting to scroll — coding, writing, ninja kick, shoes', th: 'ตัวละครเคลื่อนไหวตาม scroll — coding, writing, ninja kick' } },
      { icon: '🌐', title: { en: 'Bilingual Toggle', th: 'สลับ 2 ภาษา' }, desc: { en: 'Full EN/TH content switch with one click, preserving layout integrity', th: 'สลับ EN/TH ด้วย 1 คลิก layout ไม่แตก' } },
      { icon: '✏️', title: { en: 'Live CMS Editor', th: 'CMS แก้ไขสด' }, desc: { en: 'Edit mode to update text, fonts, colors & export HTML — no deploy needed', th: 'แก้ text, font, สีสด แล้ว export HTML ได้เลย' } },
      { icon: '📱', title: { en: 'Mobile-First', th: 'Mobile-First' }, desc: { en: 'Responsive across all breakpoints with consistent UX', th: 'responsive ทุก breakpoint UX สม่ำเสมอ' } },
    ],
  },
  {
    id: 2,
    num: '02',
    accent: 'sage',
    period: '11 / 2024 — 08 / 2025',
    company: 'ProsperSof Consulting',
    role: { en: 'Lead BA · Ground Zero to Production', th: 'Lead BA · สร้างตั้งแต่ 0 ถึง Production' },
    title: { en: 'The Ladder — IT Career Platform', th: 'The Ladder — แพลตฟอร์มอาชีพ IT' },
    desc: {
      en: '"Your IT Career Shortcut" — a recruitment & e-learning platform. Led BA effort from absolute zero to live production: manual process design, database structures, BABOK-aligned analysis, SOP creation, wireframing, and cross-team briefings.',
      th: 'แพลตฟอร์มสอน Java Enterprise + จัดหางาน IT ผมเป็น Lead BA สร้างตั้งแต่ 0 จนเป็น Production — ออกแบบ process, DB structure, วิเคราะห์ตาม BABOK, เขียน SOP และ Wireframe',
    },
    links: [
      { label: { en: '↗ Live Site', th: '↗ เว็บไซต์จริง' }, href: 'https://theladder.in.th/', primary: true },
      { label: { en: '🖥 Wireframe Demo', th: '🖥 Wireframe Demo' }, href: '/showcase-assets/career-shortcut.html', primary: false },
    ],
    metrics: [
      { val: '100+', desc: { en: 'Graduates in Enterprise jobs', th: 'ศิษย์เข้าทำงาน Enterprise' } },
      { val: '6', desc: { en: 'Online courses launched', th: 'คอร์สออนไลน์ที่ launch' } },
      { val: 'Full', desc: { en: 'E-commerce + LMS + Exam', th: 'E-commerce + LMS + ข้อสอบ' } },
      { val: 'C-EPT', desc: { en: 'Certification exam built', th: 'ระบบสอบ Cert ที่สร้าง' } },
    ],
    tags: ['Led from Zero to Production', 'BABOK v3.0', 'WordPress + Elementor', 'WooCommerce', 'Process Design', 'DB Structure', 'SOP', 'FlowAccount', '2C2P'],
    features: [
      { icon: '🏗️', title: { en: 'Built from Zero', th: 'สร้างตั้งแต่ศูนย์' }, desc: { en: 'Designed manual workflows before automation, built DB schema for course/user/exam entities', th: 'ออกแบบ workflow มือก่อน automate, สร้าง DB schema สำหรับ course/user/exam' } },
      { icon: '💳', title: { en: 'Payment Integration', th: 'ระบบชำระเงิน' }, desc: { en: 'Integrated FlowAccount invoicing & 2C2P payment gateway', th: 'เชื่อมต่อ FlowAccount + 2C2P' } },
      { icon: '📋', title: { en: 'BABOK Analysis', th: 'วิเคราะห์ตาม BABOK' }, desc: { en: 'BABOK Knowledge Areas methodology — needs, scope, feasibility', th: 'ใช้ BABOK Knowledge Areas วิเคราะห์ความต้องการ ขอบเขต และความเป็นไปได้' } },
      { icon: '🎓', title: { en: 'LMS + Certification', th: 'LMS + ระบบ Cert' }, desc: { en: 'Full learning management system with C-EPT certification exam', th: 'ระบบจัดการเรียนรู้ + ข้อสอบ C-EPT Certification' } },
    ],
  },
  {
    id: 3,
    num: '03',
    accent: 'lavender',
    period: '08 / 2025 — 04 / 2026',
    company: 'CP Axtra',
    role: { en: 'Product Owner · UX/UI Revamp Lead', th: 'Product Owner · นำ UX/UI Revamp' },
    title: { en: 'SGM Portal — Makro Price Management', th: 'SGM Portal — ระบบจัดการราคา Makro' },
    desc: {
      en: 'Enterprise-grade price management portal for Makro stores (CP Axtra). As Product Owner, I own end-to-end delivery: user stories, requirement specs, backlog prioritization, roadmap, and UX/UI revamp. The actual system is access-restricted — clickable HTML prototype available.',
      th: 'ระบบจัดการราคาสินค้าหน้าสาขา Makro ผมเป็น PO ดูแลตั้งแต่ User Story, Requirement, Backlog, Roadmap จนถึง UX/UI Revamp ระบบจริงจำกัดสิทธิ์เข้าถึง จึงทำ Clickable Prototype ให้ทดลองเล่นได้',
    },
    links: [
      { label: { en: '🖥 Clickable Prototype', th: '🖥 Clickable Prototype' }, href: '/showcase-assets/price-wireframe.html', primary: true },
    ],
    metrics: [
      { val: '2wk→3d', desc: { en: 'Design cycle with Agentic AI', th: 'ย่อรอบ Design ด้วย AI' }, highlight: true },
      { val: 'E2E', desc: { en: 'End-to-end ownership', th: 'ดูแลแบบ end-to-end' } },
      { val: 'Revamp', desc: { en: 'Full transaction flow redesign', th: 'ออกแบบ Flow ใหม่ทั้งหมด' } },
      { val: 'Interlock', desc: { en: 'Logic to prevent margin loss', th: 'ป้องกันการเสีย Margin' } },
    ],
    tags: ['Product Owner', 'Agentic AI (Lovable)', 'UX/UI Revamp', 'Interlock Logic', 'International Dev Team', 'Jira', 'Slack Canvas', 'Oracle SQL'],
    hasTabs: true,
    tabs: [
      {
        key: 'before',
        label: { en: 'Before (As-Is)', th: 'ก่อน (As-Is)' },
        intro: {
          en: 'Problems identified: Cluttered admin page with 25+ unorganized buttons, no dashboard overview, raw table layout without proper status visualization, poor information hierarchy, no approval workflow visibility.',
          th: 'ปัญหาที่พบ: หน้า Admin รกมาก 25+ ปุ่ม ไม่มี Dashboard ตารางดิบไม่มี status, hierarchy ข้อมูลแย่, ไม่เห็น approval workflow',
        },
        images: [
          { src: '/showcase-assets/sgm-asis-1.png', label: { en: 'As-Is: Price Request', th: 'As-Is: Price Request' }, type: 'before' },
          { src: '/showcase-assets/sgm-asis-2.png', label: { en: 'As-Is: Request Detail', th: 'As-Is: Request Detail' }, type: 'before' },
          { src: '/showcase-assets/sgm-asis-3.png', label: { en: 'As-Is: Admin Panel', th: 'As-Is: Admin Panel' }, type: 'before', full: true },
        ],
      },
      {
        key: 'after',
        label: { en: 'After (To-Be)', th: 'หลัง (To-Be)' },
        intro: {
          en: 'Improvements: Clean dashboard with status cards (Open / Expiring / Completed), searchable task list, clear approval workflow visualization, structured navigation with role-based access, modern UI built via Agentic AI "Lovable".',
          th: 'สิ่งที่ปรับปรุง: Dashboard สะอาดพร้อม status card, ค้นหาได้, เห็น approval workflow ชัดเจน, navigation ตาม role, UI ทันสมัยสร้างด้วย Lovable AI',
        },
        images: [
          { src: '/showcase-assets/sgm-tobe-1.png', label: { en: 'To-Be: Dashboard', th: 'To-Be: Dashboard' }, type: 'after' },
          { src: '/showcase-assets/sgm-tobe-2.png', label: { en: 'To-Be: Request Detail', th: 'To-Be: Request Detail' }, type: 'after' },
        ],
      },
    ],
    features: [
      { icon: '🤖', title: { en: 'Agentic AI Adoption', th: 'ใช้ Agentic AI' }, desc: { en: 'Used Lovable to generate clickable prototypes — compressed 2-week design cycle to 3 days', th: 'ใช้ Lovable สร้าง prototype ย่อรอบ design 2 อาทิตย์ → 3 วัน' } },
      { icon: '🔒', title: { en: 'Interlock Logic', th: 'Interlock Logic' }, desc: { en: 'Designed business rules to prevent margin loss during price update transactions', th: 'ออกแบบ business rules ป้องกันการเสีย Margin ตอนอัปเดตราคา' } },
      { icon: '🌐', title: { en: 'International Collab', th: 'ทีมต่างชาติ' }, desc: { en: 'Coordinated with offshore dev teams aligning execution with CP Axtra business objectives', th: 'ประสานทีม dev ต่างประเทศให้ตรงเป้าธุรกิจ CP Axtra' } },
      { icon: '📋', title: { en: 'Full PO Ownership', th: 'PO แบบ Full' }, desc: { en: 'User stories, scenarios, backlog via Slack Canvas, sprint management via Jira', th: 'User story, Backlog ผ่าน Slack Canvas, Sprint ผ่าน Jira' } },
    ],
  },
  {
    id: 4,
    num: '04',
    accent: 'champagne',
    period: '2025',
    company: 'Personal Project',
    role: { en: 'Product Owner & Designer', th: 'Product Owner & Designer' },
    title: { en: 'Blott. — Perfume Suggestion Platform', th: 'Blott. — แพลตฟอร์มแนะนำน้ำหอม' },
    desc: {
      en: '"One dip. One match." — A perfume recommendation platform using quiz-based profiling, multi-select blending logic, behavioral tracking, and real-time weather data to suggest fragrances. Demonstrates product thinking, feature prioritization, and creative UX design.',
      th: 'แพลตฟอร์มแนะนำน้ำหอม ใช้ Quiz, ระบบ Beaker ผสมกลิ่น, Mini Game จับพฤติกรรม และแนะนำตามวัน/อุณหภูมิ แสดงทักษะ Product Thinking และ Creative UX',
    },
    links: [
      { label: { en: '↗ Live Site', th: '↗ เว็บไซต์จริง' }, href: 'https://tryblott.vercel.app/', primary: true },
    ],
    metrics: [
      { val: '200+', desc: { en: 'Fragrances in database', th: 'น้ำหอมในระบบ' } },
      { val: 'Quiz', desc: { en: '7-10 question profiling', th: 'ระบบ quiz 7-10 ข้อ' } },
      { val: 'Weather', desc: { en: 'Real-time API integration', th: 'ข้อมูลสภาพอากาศสด' } },
      { val: 'Easter', desc: { en: 'Hidden mini game inside', th: 'Mini game ซ่อนอยู่' } },
    ],
    tags: ['Product Thinking', 'Creative UX', '200+ Fragrances', 'Behavioral Tracking', 'Weather API', 'Bilingual TH/EN', 'Vercel'],
    features: [
      { icon: '🧪', title: { en: 'Quiz Engine', th: 'ระบบ Quiz' }, desc: { en: '7-10 question profiling filtering 200+ fragrances through 10+ years of expert logic', th: 'quiz 7-10 ข้อกรอง 200+ น้ำหอมด้วย logic จาก expert 10+ ปี' } },
      { icon: '⚗️', title: { en: 'Beaker System', th: 'ระบบ Beaker' }, desc: { en: 'Select multiple perfumes, get recommendations based on shared scent profiles', th: 'เลือกหลายกลิ่นผสมกัน แนะนำตาม scent profile ที่ใกล้เคียง' } },
      { icon: '🎮', title: { en: 'Easter Egg Mini Game', th: 'Mini Game ซ่อน' }, desc: { en: 'Hidden puzzle that tracks browsing behavior to give surprise recommendations', th: 'เกม puzzle ซ่อนอยู่ จับพฤติกรรมมาแนะนำน้ำหอม' } },
      { icon: '🌡️', title: { en: 'Weather-Based', th: 'ตามสภาพอากาศ' }, desc: { en: 'Recommends by current temperature — citrus for hot days, deep woods for cool nights', th: 'แนะนำตามอุณหภูมิสด — citrus วันร้อน, wood คืนเย็น' } },
    ],
  },
];

function SGMTabs({ tabs }) {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(null);

  return (
    <>
      <div className="sc-tab-bar">
        {tabs.map((t, i) => (
          <button key={t.key} className={`sc-tab-btn${active === i ? ' on' : ''}`} onClick={() => setActive(i)}>
            <span className="en">{t.label.en}</span>
            <span className="th">{t.label.th}</span>
          </button>
        ))}
      </div>

      <div className="sc-tab-panel">
        <p className="sc-tab-intro">
          <span className="en">{tabs[active].intro.en}</span>
          <span className="th">{tabs[active].intro.th}</span>
        </p>
        <div className={`sc-img-grid sc-img-grid--${tabs[active].images.length}`}>
          {tabs[active].images.map((img, j) => (
            <div key={j} className={`sc-img-wrap${img.full ? ' sc-img-wrap--full' : ''}`}>
              <span className={`sc-img-label sc-img-label--${img.type}`}>
                <span className="en">{img.label.en}</span>
                <span className="th">{img.label.th}</span>
              </span>
              <img src={img.src} alt={img.label.en} className="sc-img-thumb" onClick={() => setModal(img.src)} />
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="sc-modal" onClick={() => setModal(null)}>
          <img src={modal} alt="Full view" onClick={e => e.stopPropagation()} />
          <button className="sc-modal-close" onClick={() => setModal(null)}>✕</button>
        </div>
      )}
    </>
  );
}

export default function Showcase() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.lang-toggle button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.body.setAttribute('lang', lang);
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        try { localStorage.setItem('mac-lang', lang); } catch (e) {}
      });
    });
    try {
      const saved = localStorage.getItem('mac-lang');
      if (saved) {
        document.body.setAttribute('lang', saved);
        buttons.forEach(b => b.classList.toggle('active', b.dataset.lang === saved));
      }
    } catch (e) {}

    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.06 }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    let lastY = 0;
    const nav = document.querySelector('.nav');
    const onScroll = () => {
      const y = window.scrollY;
      nav.style.transform = y > 80 && y > lastY ? 'translateY(-100%)' : 'translateY(0)';
      lastY = y;
    };
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <div className="page-wash" aria-hidden="true"></div>
      <div className="orb a" aria-hidden="true"></div>
      <div className="orb b" aria-hidden="true"></div>
      <div className="orb c" aria-hidden="true"></div>

      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="brand" style={{ textDecoration: 'none' }}>
            <span className="sig">Mac</span>
            <span className="sig">Passanai</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className="nav-links" id="navLinks">
              <a href="/#about"><span className="en">About</span><span className="th">เกี่ยวกับ</span></a>
              <a href="/#skills"><span className="en">Skills</span><span className="th">ทักษะ</span></a>
              <a href="/#experience"><span className="en">Experience</span><span className="th">ประสบการณ์</span></a>
              <a href="/showcase" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                <span className="en">Showcase</span><span className="th">ผลงาน</span>
              </a>
              <a href="/#contact"><span className="en">Contact</span><span className="th">ติดต่อ</span></a>
            </div>
            <div className="lang-toggle" role="group" aria-label="Language toggle">
              <button data-lang="en" className="active">EN</button>
              <button data-lang="th">TH</button>
            </div>
            <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
          </div>
        </div>
      </nav>

      <header className="sc-hero">
        <div className="container">
          <div className="sc-hero-inner reveal">
            <span className="eyebrow">
              <span className="pulse"></span>
              <span className="en">4 projects · live sites · clickable prototypes</span>
              <span className="th">4 โปรเจกต์ · เว็บจริง · prototype กดได้</span>
            </span>
            <h1 className="sc-title">
              <span className="en"><span className="hand frost">Work Showcase</span></span>
              <span className="th"><span className="hand frost">ผลงานที่ภาคภูมิใจ</span></span>
            </h1>
            <p className="lead sc-lead">
              <span className="en">Selected projects shipped across personal, consulting, and enterprise contexts — each one clickable, not just a slide deck.</span>
              <span className="th">ผลงานจากทั้ง personal, consulting และ enterprise — ทุกชิ้นกดเล่นได้ ไม่ใช่แค่ slide</span>
            </p>
            <div className="sc-hero-cta">
              <a href="/#contact" className="btn primary">
                <span className="en">Get in touch</span><span className="th">ติดต่อผม</span>
                <span className="arrow">→</span>
              </a>
              <a href="/" className="btn ghost">
                <span className="en">← Portfolio</span><span className="th">← กลับหน้าหลัก</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="sc-section">
        <div className="container">
          {projects.map(p => (
            <article key={p.id} className={`sc-project reveal sc-project--${p.accent}`}>

              <div className="sc-project-head">
                <div className="sc-project-meta">
                  <span className="sc-num">Project {p.num}</span>
                  <span className="sc-period">{p.period} · {p.company}</span>
                </div>
                <span className={`sc-role-badge sc-role-badge--${p.accent}`}>
                  <span className="en">{p.role.en}</span>
                  <span className="th">{p.role.th}</span>
                </span>
              </div>

              <h2 className="sc-project-title">
                <span className="en">{p.title.en}</span>
                <span className="th">{p.title.th}</span>
              </h2>

              <div className="sc-links">
                {p.links.map((l, j) => (
                  <a key={j} href={l.href} target="_blank" rel="noopener"
                    className={`sc-link-btn${l.primary ? ' sc-link-btn--primary' : ''}`}>
                    <span className="en">{l.label.en}</span>
                    <span className="th">{l.label.th}</span>
                  </a>
                ))}
              </div>

              <p className="sc-project-desc">
                <span className="en">{p.desc.en}</span>
                <span className="th">{p.desc.th}</span>
              </p>

              <div className="sc-metrics">
                {p.metrics.map((m, j) => (
                  <div key={j} className={`sc-metric${m.highlight ? ' sc-metric--highlight' : ''}`}>
                    <div className={`sc-metric-val sc-metric-val--${p.accent}`}>{m.val}</div>
                    <div className="sc-metric-desc">
                      <span className="en">{m.desc.en}</span>
                      <span className="th">{m.desc.th}</span>
                    </div>
                  </div>
                ))}
              </div>

              {p.hasTabs && <SGMTabs tabs={p.tabs} />}

              <div className="sc-features">
                {p.features.map((f, j) => (
                  <div key={j} className={`sc-feature sc-feature--${p.accent}`}>
                    <div className="sc-feature-icon">{f.icon}</div>
                    <div>
                      <div className="sc-feature-title">
                        <span className="en">{f.title.en}</span>
                        <span className="th">{f.title.th}</span>
                      </div>
                      <div className="sc-feature-desc">
                        <span className="en">{f.desc.en}</span>
                        <span className="th">{f.desc.th}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tags sc-tags">
                {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>

            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 0 110px' }}>
        <div className="container">
          <div className="contact-card reveal">
            <span className="contact-tag">
              <span className="en">Let's Connect</span><span className="th">ติดต่อกัน</span>
            </span>
            <h2>
              <span className="hand rose">
                <span className="en">Let's build something useful together.</span>
                <span className="th">มาร่วมสร้างสิ่งที่มีประโยชน์ด้วยกันครับ</span>
              </span>
            </h2>
            <p>
              <span className="en">Open to Product Owner, Senior BA, and Product Strategy roles.</span>
              <span className="th">พร้อมรับโอกาสในสาย Product Owner, Senior BA และ Product Strategy</span>
            </p>
            <div className="contact-links">
              <a href="mailto:passanai.work@gmail.com">✉ passanai.work@gmail.com</a>
              <a href="https://www.linkedin.com/in/passanai-tampawisit-6504531b0" target="_blank" rel="noopener">⬈ LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <span className="en">© 2026 <span className="sig">Mac</span> · Passanai "Mac" Tampawisit · Built with care in Bangkok</span>
          <span className="th">© 2026 <span className="sig">Mac</span> · ภัสนัย "แม็ค" ตามผาวิศิษฎ์ · สร้างด้วยใจจากกรุงเทพฯ</span>
        </div>
      </footer>

      <style>{`
        .sc-hero { min-height: 55vh; display: flex; align-items: center; padding: 140px 0 70px; }
        .sc-hero-inner { max-width: 800px; }
        .sc-title { font-size: clamp(52px,8vw,104px); font-weight:800; letter-spacing:-2px; line-height:1.02; color:var(--ink); margin:20px 0 18px; animation:fadeUp 1s .2s both; }
        .sc-lead { max-width:640px; animation:fadeUp 1.1s .3s both; }
        .sc-hero-cta { display:flex; flex-wrap:wrap; gap:12px; margin-top:30px; animation:fadeUp 1.2s .4s both; }

        .sc-section { padding: 40px 0 80px; }

        .sc-project {
          padding:36px 34px 30px; border-radius:26px;
          background:var(--card); border:1px solid var(--line);
          backdrop-filter:blur(10px); margin-bottom:28px;
          transition:border-color .4s, box-shadow .4s;
          position:relative; overflow:hidden;
        }
        .sc-project::before {
          content:""; position:absolute; top:-80px; right:-80px;
          width:240px; height:240px; border-radius:50%;
          opacity:.10; pointer-events:none; transition:opacity .4s;
        }
        .sc-project:hover::before { opacity:.22; }
        .sc-project--frost::before   { background:radial-gradient(circle,var(--frost) 0%,transparent 70%); }
        .sc-project--frost:hover     { border-color:var(--frost); box-shadow:0 24px 56px rgba(156,185,209,.22); }
        .sc-project--sage::before    { background:radial-gradient(circle,var(--sage) 0%,transparent 70%); }
        .sc-project--sage:hover      { border-color:var(--sage); box-shadow:0 24px 56px rgba(168,184,168,.22); }
        .sc-project--lavender::before{ background:radial-gradient(circle,var(--lavender) 0%,transparent 70%); }
        .sc-project--lavender:hover  { border-color:var(--lavender); box-shadow:0 24px 56px rgba(181,175,200,.22); }
        .sc-project--champagne::before{ background:radial-gradient(circle,var(--champagne) 0%,transparent 70%); }
        .sc-project--champagne:hover { border-color:var(--champagne); box-shadow:0 24px 56px rgba(201,184,150,.22); }

        .sc-project-head { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:10px; }
        .sc-project-meta { display:flex; flex-direction:column; gap:3px; }
        .sc-num { font-size:11px; font-weight:700; color:var(--ink-3); letter-spacing:.12em; text-transform:uppercase; }
        .sc-period { font-size:12px; color:var(--ink-3); letter-spacing:.04em; }

        .sc-role-badge { display:inline-flex; padding:5px 13px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; background:rgba(255,255,255,.55); border:1px solid var(--line); white-space:nowrap; }
        .sc-role-badge--frost    { color:var(--frost);     border-color:rgba(156,185,209,.45); }
        .sc-role-badge--sage     { color:var(--sage);      border-color:rgba(168,184,168,.45); }
        .sc-role-badge--lavender { color:var(--lavender);  border-color:rgba(181,175,200,.45); }
        .sc-role-badge--champagne{ color:var(--champagne); border-color:rgba(201,184,150,.45); }

        .sc-project-title { font-size:clamp(20px,2.8vw,28px); font-weight:800; color:var(--ink); letter-spacing:-.4px; margin:4px 0 16px; }

        .sc-links { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
        .sc-link-btn {
          display:inline-flex; align-items:center; gap:7px;
          padding:10px 20px; border-radius:999px;
          font-size:13px; font-weight:600; text-decoration:none;
          border:1px solid var(--line); background:rgba(255,255,255,.6); color:var(--ink);
          transition:all .3s;
        }
        .sc-link-btn:hover { background:#fff; transform:translateY(-2px); box-shadow:var(--shadow); }
        .sc-link-btn--primary { background:var(--ink); color:var(--bg); border-color:transparent; box-shadow:0 8px 24px rgba(44,44,46,.22); }
        .sc-link-btn--primary:hover { background:var(--ink-2); transform:translateY(-3px); box-shadow:0 14px 34px rgba(44,44,46,.28); }

        .sc-project-desc { color:var(--ink-2); font-size:14px; line-height:1.75; margin-bottom:22px; }

        .sc-metrics { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:12px; margin-bottom:22px; }
        .sc-metric { padding:16px 14px; border-radius:16px; background:rgba(255,255,255,.5); border:1px solid var(--line); transition:transform .3s, border-color .3s; }
        .sc-metric:hover { transform:translateY(-3px); }
        .sc-metric--highlight { border-color:var(--sage); }
        .sc-metric-val { font-family:'Caveat',cursive; font-weight:700; font-size:28px; line-height:1; }
        .sc-metric-val--frost    { color:var(--frost);     text-shadow:3px 3px 0 var(--frost-shadow); }
        .sc-metric-val--sage     { color:var(--sage);      text-shadow:3px 3px 0 var(--sage-shadow); }
        .sc-metric-val--lavender { color:var(--lavender);  text-shadow:3px 3px 0 var(--lavender-shadow); }
        .sc-metric-val--champagne{ color:var(--champagne); text-shadow:3px 3px 0 var(--champagne-shadow); }
        .sc-metric-desc { color:var(--ink-3); font-size:11px; margin-top:6px; line-height:1.4; }

        .sc-tab-bar { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
        .sc-tab-btn { padding:8px 18px; border-radius:999px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid var(--line); background:rgba(255,255,255,.55); color:var(--ink-2); font-family:inherit; transition:all .25s; }
        .sc-tab-btn:hover { border-color:var(--lavender); color:var(--ink); }
        .sc-tab-btn.on { background:var(--ink); color:var(--bg); border-color:transparent; }
        .sc-tab-panel { margin-bottom:22px; animation:fadeUp .4s ease; }
        .sc-tab-intro { font-size:13px; color:var(--ink-2); line-height:1.7; padding:14px 16px; border-radius:14px; background:rgba(255,255,255,.45); border:1px solid var(--line); margin-bottom:14px; }
        .sc-img-grid { display:grid; gap:10px; }
        .sc-img-grid--2 { grid-template-columns:1fr 1fr; }
        .sc-img-grid--3 { grid-template-columns:1fr 1fr; }
        .sc-img-wrap { position:relative; border-radius:12px; overflow:hidden; border:1px solid var(--line); }
        .sc-img-wrap--full { grid-column:1 / -1; }
        .sc-img-label { position:absolute; top:8px; left:8px; z-index:2; font-size:10px; font-weight:700; text-transform:uppercase; padding:3px 8px; border-radius:5px; letter-spacing:.06em; }
        .sc-img-label--before { background:var(--rose); color:#fff; }
        .sc-img-label--after  { background:#7FB89A; color:#fff; }
        .sc-img-thumb { width:100%; display:block; cursor:zoom-in; transition:transform .3s; }
        .sc-img-thumb:hover { transform:scale(1.02); }

        .sc-modal { position:fixed; inset:0; z-index:9999; background:rgba(10,10,14,.88); display:flex; align-items:center; justify-content:center; padding:24px; cursor:zoom-out; animation:fadeUp .25s ease; }
        .sc-modal img { max-width:95vw; max-height:90vh; border-radius:10px; cursor:default; box-shadow:0 30px 80px rgba(0,0,0,.5); }
        .sc-modal-close { position:absolute; top:20px; right:20px; background:rgba(255,255,255,.12); color:#fff; border:1px solid rgba(255,255,255,.2); border-radius:999px; width:36px; height:36px; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .2s; }
        .sc-modal-close:hover { background:rgba(255,255,255,.25); }

        .sc-features { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin-bottom:20px; }
        .sc-feature { display:flex; gap:12px; padding:16px 14px; border-radius:16px; background:rgba(255,255,255,.45); border:1px solid var(--line); transition:border-color .3s, transform .3s; }
        .sc-feature:hover { transform:translateY(-3px); }
        .sc-feature--frost:hover    { border-color:var(--frost); }
        .sc-feature--sage:hover     { border-color:var(--sage); }
        .sc-feature--lavender:hover { border-color:var(--lavender); }
        .sc-feature--champagne:hover{ border-color:var(--champagne); }
        .sc-feature-icon { font-size:22px; flex-shrink:0; line-height:1.2; }
        .sc-feature-title { font-size:13px; font-weight:700; color:var(--ink); margin-bottom:4px; }
        .sc-feature-desc { font-size:12px; color:var(--ink-3); line-height:1.55; }
        .sc-tags { margin-top:4px; }

        @media(max-width:760px) {
          .sc-project { padding:24px 20px 20px; }
          .sc-metrics { grid-template-columns:repeat(2,1fr); }
          .sc-img-grid--2,.sc-img-grid--3 { grid-template-columns:1fr; }
          .sc-features { grid-template-columns:1fr; }
          .sc-hero { padding:120px 0 50px; }
          .sc-title { font-size:clamp(40px,12vw,72px); }
        }
      `}</style>
    </>
  );
}
