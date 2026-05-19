'use client';

import React, { useEffect } from 'react';

const projects = [
  {
    id: 1,
    accent: 'frost',
    period: '08 / 2025 — 04 / 2026',
    company: 'CP Axtra',
    role: { en: 'Product Owner', th: 'Product Owner' },
    title: { en: 'SGM Portal & Price Promotion', th: 'SGM Portal & Price Promotion' },
    desc: {
      en: 'End-to-end product delivery for the SGM Portal — redesigning transaction flows, integrating legacy systems, and building interlock logic to prevent margin loss.',
      th: 'ดูแลการส่งมอบ SGM Portal แบบ end-to-end — ออกแบบ Flow ใหม่ เชื่อมระบบเดิม และสร้าง Interlock Logic เพื่อลดการเสีย Margin',
    },
    highlights: {
      en: ['UX/UI revamp for transaction workflows', 'Interlock logic to protect margins', 'Lovable AI for clickable prototype validation', 'Backlog via Slack Canvas · Team via Jira'],
      th: ['ออกแบบ UX/UI ใหม่สำหรับ Transaction Workflow', 'Interlock Logic ป้องกันการเสีย Margin', 'ใช้ Lovable AI สร้าง Prototype ตรวจสอบ Requirement', 'Backlog ผ่าน Slack Canvas · ทีมผ่าน Jira'],
    },
    tags: ['Jira', 'Slack Canvas', 'Figma', 'Lovable', 'Oracle SQL'],
  },
  {
    id: 2,
    accent: 'sage',
    period: '11 / 2024 — 08 / 2025',
    company: 'ProsperSof Consulting',
    role: { en: 'Senior Business Analyst', th: 'Senior Business Analyst' },
    title: { en: 'Debt Management System — Student Loan', th: 'ระบบบริหารหนี้ — กองทุนกู้ยืม' },
    desc: {
      en: 'Translated complex TOR into structured business requirements; built debt calculation matrices and decision tables for a national student-loan portfolio.',
      th: 'แปลง TOR เป็น Requirement ที่เป็นโครงสร้าง พร้อมตารางคำนวณหนี้และ Decision Table สำหรับพอร์ตฟอลิโอสินเชื่อการศึกษาระดับประเทศ',
    },
    highlights: {
      en: ['TOR → structured requirements mapping', 'Debt calculation matrix & decision tables', 'Briefings across technical & business teams'],
      th: ['แปลง TOR เป็น Requirement ที่เป็นโครงสร้าง', 'ตารางคำนวณหนี้และ Decision Table', 'นำ Briefing ระหว่างฝ่าย Technical และ Business'],
    },
    tags: ['BABOK v3', 'PostgreSQL', 'Confluence', 'Excel'],
  },
  {
    id: 3,
    accent: 'lavender',
    period: '11 / 2024 — 08 / 2025',
    company: 'ProsperSof Consulting',
    role: { en: 'Senior Business Analyst', th: 'Senior Business Analyst' },
    title: { en: 'The Ladder — Recruitment Platform', th: 'The Ladder — แพลตฟอร์มจัดหางาน' },
    desc: {
      en: 'Built a recruitment agency from ground zero — manual process design, DB structures, BABOK-aligned analysis, and SOPs that cut Time-to-Fill.',
      th: 'สร้างบริษัทจัดหางานตั้งแต่ศูนย์ — ออกแบบกระบวนการ, โครงสร้างฐานข้อมูล, วิเคราะห์ตาม BABOK และทำ SOP ลดเวลา Time-to-Fill',
    },
    highlights: {
      en: ['Agency built from ground zero', 'Manual process design & DB structures', 'BABOK Knowledge Areas methodology', 'SOPs that reduced Time-to-Fill'],
      th: ['สร้างธุรกิจตั้งแต่ศูนย์', 'ออกแบบกระบวนการและโครงสร้างฐานข้อมูล', 'วิเคราะห์ตามหลัก BABOK', 'SOP ลดเวลา Time-to-Fill'],
    },
    tags: ['BABOK v3', 'Figma', 'PostgreSQL', 'SOP Design'],
  },
  {
    id: 4,
    accent: 'champagne',
    period: '03 / 2023 — 11 / 2024',
    company: 'Code-D 789 Co., Ltd.',
    role: { en: 'Business Analyst', th: 'Business Analyst' },
    title: { en: 'Education e-Commerce Platform', th: 'แพลตฟอร์ม e-Commerce สายการศึกษา' },
    desc: {
      en: 'Led pre-project BA using BABOK — designed the Design System, CI standards, sitemaps, wireframes, and integrated FlowAccount with 2C2P payment gateway.',
      th: 'ทำ BA ช่วง Pre-project ตามหลัก BABOK — ออกแบบ Design System, CI, Sitemap, Wireframe และเชื่อมต่อ FlowAccount กับ Payment Gateway 2C2P',
    },
    highlights: {
      en: ['Design System & CI from scratch', 'FlowAccount + 2C2P integration', 'UAT deployment approval', 'Pixel-perfect responsive QA'],
      th: ['Design System และ CI ตั้งแต่ต้น', 'เชื่อมต่อ FlowAccount + 2C2P', 'อนุมัติการขึ้น UAT', 'QA แบบ Pixel-perfect Responsive'],
    },
    tags: ['Figma', 'BABOK v3', 'WordPress', 'FlowAccount', '2C2P'],
  },
  {
    id: 5,
    accent: 'rose',
    period: '03 / 2020 — 03 / 2023',
    company: 'ThaiBeverage PLC',
    role: { en: 'Senior Engineering Officer', th: 'วิศวกรอาวุโส' },
    title: { en: '25+ Industrial Projects', th: '25+ โปรเจกต์อุตสาหกรรม' },
    desc: {
      en: 'Led mechanical design and TOR development for 25+ industrial projects from procurement to commissioning — aligning diverse stakeholders with enterprise standards.',
      th: 'นำงานออกแบบเครื่องกลและ TOR ของ 25+ โปรเจกต์ ตั้งแต่จัดซื้อจนเปิดใช้งาน — ประสานงานผู้มีส่วนได้ส่วนเสียทุกฝ่าย',
    },
    highlights: {
      en: ['25+ industrial projects end-to-end', 'Worked with international Scotch whisky teams', 'Coached engineering interns 3 consecutive years', 'Procurement to commissioning ownership'],
      th: ['25+ โปรเจกต์อุตสาหกรรมแบบ end-to-end', 'ทำงานกับทีมวิศวกรต่างชาติจากกลุ่ม Scotch Whisky', 'โค้ชนักศึกษาฝึกงานติดต่อกัน 3 ปี', 'รับผิดชอบตั้งแต่จัดซื้อจนเปิดใช้งาน'],
    },
    tags: ['AutoCAD', 'TOR Design', 'Procurement', 'MS Office'],
  },
  {
    id: 6,
    accent: 'frost',
    period: '2024',
    company: 'Code-D 789 Hackathon',
    role: { en: 'Competitor · Top 8', th: 'ผู้แข่งขัน · Top 8' },
    title: { en: 'Code-D 789 Hackathon — Top 8 / 1,000+', th: 'แฮกกาธอน Code-D 789 — Top 8 จาก 1,000+ ทีม' },
    desc: {
      en: 'Competed among 1,000+ teams and reached the Top 8 — delivering a concept product under time pressure with a cross-functional team.',
      th: 'แข่งขันกับกว่า 1,000 ทีม และผ่านเข้า Top 8 — ส่งมอบแนวคิดผลิตภัณฑ์ภายใต้เวลาจำกัดพร้อมทีมข้ามสายงาน',
    },
    highlights: {
      en: ['Top 8 out of 1,000+ teams', 'Product concept under time constraint', 'Cross-functional team collaboration'],
      th: ['Top 8 จาก 1,000+ ทีม', 'พัฒนา Product Concept ภายใต้เวลาจำกัด', 'ทำงานร่วมกับทีมข้ามสายงาน'],
    },
    tags: ['Product Thinking', 'Pitching', 'Figma', 'Rapid Prototyping'],
  },
];

export default function Showcase() {
  useEffect(() => {
    // Language toggle
    const buttons = document.querySelectorAll('.lang-toggle button');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.body.setAttribute('lang', lang);
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        try { localStorage.setItem('mac-lang', lang); } catch (e) {}
      });
    });
    try {
      const saved = localStorage.getItem('mac-lang');
      if (saved) {
        document.body.setAttribute('lang', saved);
        buttons.forEach((b) => b.classList.toggle('active', b.dataset.lang === saved));
      }
    } catch (e) {}

    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );

    // Intersection reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Hide nav on scroll
    let lastY = 0;
    const nav = document.querySelector('.nav');
    const scrollHandler = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastY) nav.style.transform = 'translateY(-100%)';
      else nav.style.transform = 'translateY(0)';
      lastY = y;
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      io.disconnect();
    };
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
              <a href="/#about">
                <span className="en">About</span>
                <span className="th">เกี่ยวกับ</span>
              </a>
              <a href="/#skills">
                <span className="en">Skills</span>
                <span className="th">ทักษะ</span>
              </a>
              <a href="/#experience">
                <span className="en">Experience</span>
                <span className="th">ประสบการณ์</span>
              </a>
              <a href="/showcase" style={{ color: 'var(--ink)', fontWeight: 700 }}>
                <span className="en">Showcase</span>
                <span className="th">ผลงาน</span>
              </a>
              <a href="/#contact">
                <span className="en">Contact</span>
                <span className="th">ติดต่อ</span>
              </a>
            </div>
            <div className="lang-toggle" role="group" aria-label="Language toggle">
              <button data-lang="en" className="active">EN</button>
              <button data-lang="th">TH</button>
            </div>
            <button className="menu-btn" id="menuBtn" aria-label="Menu">☰</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="sc-hero">
        <div className="container">
          <div className="sc-hero-inner reveal">
            <span className="eyebrow">
              <span className="pulse"></span>
              <span className="en">6+ years · 3 disciplines · real impact</span>
              <span className="th">6+ ปี · 3 สายงาน · ผลลัพธ์จริง</span>
            </span>
            <h1 className="sc-title">
              <span className="en">
                Work <span className="hand frost">Showcase</span>
              </span>
              <span className="th">
                ผลงาน <span className="hand frost">ที่ภาคภูมิใจ</span>
              </span>
            </h1>
            <p className="lead sc-lead">
              <span className="en">
                A curated collection of products, platforms, and analyses delivered across
                manufacturing, consulting, and tech — each one shipped with intent.
              </span>
              <span className="th">
                รวมผลงานจากหลากหลายอุตสาหกรรม — โรงงาน, ที่ปรึกษา, และเทคโนโลยี —
                ทุกชิ้นส่งมอบด้วยความตั้งใจ
              </span>
            </p>
            <div className="sc-hero-cta">
              <a href="/#contact" className="btn primary">
                <span className="en">Get in touch</span>
                <span className="th">ติดต่อผม</span>
                <span className="arrow">→</span>
              </a>
              <a href="/" className="btn ghost">
                <span className="en">← Back to portfolio</span>
                <span className="th">← กลับหน้าหลัก</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Project grid ── */}
      <section className="sc-section">
        <div className="container">
          <div className="sc-grid">
            {projects.map((p, i) => (
              <div key={p.id} className={`sc-card reveal sc-card--${p.accent}`} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="sc-card-top">
                  <div className="sc-meta">
                    <span className="sc-period">{p.period}</span>
                    <span className="sc-company">{p.company}</span>
                  </div>
                  <span className={`sc-role-badge sc-role-badge--${p.accent}`}>
                    <span className="en">{p.role.en}</span>
                    <span className="th">{p.role.th}</span>
                  </span>
                </div>

                <h2 className="sc-card-title">
                  <span className="en">{p.title.en}</span>
                  <span className="th">{p.title.th}</span>
                </h2>

                <p className="sc-card-desc">
                  <span className="en">{p.desc.en}</span>
                  <span className="th">{p.desc.th}</span>
                </p>

                <ul className="sc-highlights">
                  {p.highlights.en.map((h, j) => (
                    <li key={j}>
                      <span className="en">{h}</span>
                      <span className="th">{p.highlights.th[j]}</span>
                    </li>
                  ))}
                </ul>

                <div className="tags sc-tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact strip ── */}
      <section className="sc-contact-strip">
        <div className="container">
          <div className="contact-card reveal">
            <span className="contact-tag">
              <span className="en">Let's Connect</span>
              <span className="th">ติดต่อกัน</span>
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
        /* ── Showcase-specific styles (extends globals.css) ── */

        /* Hero */
        .sc-hero {
          min-height: 60vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          position: relative;
        }
        .sc-hero-inner { max-width: 780px; }
        .sc-title {
          font-size: clamp(52px, 8vw, 104px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.02;
          color: var(--ink);
          margin: 20px 0 18px;
          animation: fadeUp 1s .2s both;
        }
        .sc-lead { max-width: 640px; animation: fadeUp 1.1s .3s both; }
        .sc-hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
          animation: fadeUp 1.2s .4s both;
        }

        /* Section */
        .sc-section { padding: 60px 0 110px; }

        /* Grid */
        .sc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }
        @media(max-width: 760px) { .sc-grid { grid-template-columns: 1fr; } }

        /* Card */
        .sc-card {
          padding: 30px 28px 26px;
          border-radius: 24px;
          background: var(--card);
          border: 1px solid var(--line);
          backdrop-filter: blur(10px);
          transition: transform .4s ease, box-shadow .4s ease, border-color .4s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sc-card::before {
          content: "";
          position: absolute;
          top: -70px; right: -70px;
          width: 200px; height: 200px;
          border-radius: 50%;
          opacity: .13;
          transition: opacity .4s ease;
          pointer-events: none;
        }
        .sc-card:hover { transform: translateY(-6px); }
        .sc-card:hover::before { opacity: .28; }

        .sc-card--frost::before { background: radial-gradient(circle, var(--frost) 0%, transparent 70%); }
        .sc-card--frost:hover { border-color: var(--frost); box-shadow: 0 22px 48px rgba(156,185,209,.28); }

        .sc-card--sage::before { background: radial-gradient(circle, var(--sage) 0%, transparent 70%); }
        .sc-card--sage:hover { border-color: var(--sage); box-shadow: 0 22px 48px rgba(168,184,168,.28); }

        .sc-card--lavender::before { background: radial-gradient(circle, var(--lavender) 0%, transparent 70%); }
        .sc-card--lavender:hover { border-color: var(--lavender); box-shadow: 0 22px 48px rgba(181,175,200,.28); }

        .sc-card--champagne::before { background: radial-gradient(circle, var(--champagne) 0%, transparent 70%); }
        .sc-card--champagne:hover { border-color: var(--champagne); box-shadow: 0 22px 48px rgba(201,184,150,.28); }

        .sc-card--rose::before { background: radial-gradient(circle, var(--rose) 0%, transparent 70%); }
        .sc-card--rose:hover { border-color: var(--rose); box-shadow: 0 22px 48px rgba(212,168,160,.28); }

        /* Card top row */
        .sc-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sc-meta { display: flex; flex-direction: column; gap: 3px; }
        .sc-period {
          font-size: 11px;
          font-weight: 700;
          color: var(--ink-3);
          letter-spacing: .1em;
          text-transform: uppercase;
        }
        .sc-company {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-2);
          letter-spacing: .04em;
        }
        .sc-role-badge {
          display: inline-flex;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
          background: rgba(255,255,255,.55);
          border: 1px solid var(--line);
          color: var(--ink-2);
        }
        .sc-role-badge--frost { color: var(--frost); border-color: rgba(156,185,209,.45); }
        .sc-role-badge--sage { color: var(--sage); border-color: rgba(168,184,168,.45); }
        .sc-role-badge--lavender { color: var(--lavender); border-color: rgba(181,175,200,.45); }
        .sc-role-badge--champagne { color: var(--champagne); border-color: rgba(201,184,150,.45); }
        .sc-role-badge--rose { color: var(--rose); border-color: rgba(212,168,160,.45); }

        /* Card title */
        .sc-card-title {
          font-size: clamp(18px, 2.4vw, 22px);
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -.3px;
          line-height: 1.2;
          margin: 0;
        }

        /* Card description */
        .sc-card-desc {
          color: var(--ink-2);
          font-size: 13.5px;
          line-height: 1.7;
          margin: 0;
        }

        /* Highlights */
        .sc-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
          flex: 1;
        }
        .sc-highlights li {
          position: relative;
          padding-left: 18px;
          color: var(--ink-2);
          font-size: 13px;
          line-height: 1.6;
        }
        .sc-card--frost .sc-highlights li::before { background: var(--frost); }
        .sc-card--sage .sc-highlights li::before { background: var(--sage); }
        .sc-card--lavender .sc-highlights li::before { background: var(--lavender); }
        .sc-card--champagne .sc-highlights li::before { background: var(--champagne); }
        .sc-card--rose .sc-highlights li::before { background: var(--rose); }
        .sc-highlights li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 9px;
          width: 10px;
          height: 2px;
          border-radius: 2px;
        }

        /* Tags */
        .sc-tags { margin-top: auto; }

        /* Contact strip */
        .sc-contact-strip { padding: 0 0 110px; }

        @media(max-width: 600px) {
          .sc-hero { padding: 120px 0 50px; }
          .sc-title { font-size: clamp(40px, 12vw, 72px); }
        }
      `}</style>
    </>
  );
}
