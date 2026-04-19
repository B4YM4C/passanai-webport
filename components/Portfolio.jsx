'use client';

import React, { useEffect } from 'react';
import Cinema from './Cinema';
import CMSEditor from './CMSEditor';

export default function Portfolio() {
  useEffect(() => {
    // ====== Language toggle ======
    const buttons = document.querySelectorAll('.lang-toggle button');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        document.body.setAttribute('lang', lang);
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        try {
          localStorage.setItem('mac-lang', lang);
        } catch (e) {}
      });
    });
    try {
      const saved = localStorage.getItem('mac-lang');
      if (saved) {
        document.body.setAttribute('lang', saved);
        buttons.forEach((b) => b.classList.toggle('active', b.dataset.lang === saved));
      }
    } catch (e) {}

    // ====== Mobile menu ======
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks?.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );

    // ====== Intersection reveal ======
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // ====== Hide nav on scroll down, show on scroll up ======
    let lastY = 0;
    const nav = document.querySelector('.nav');
    const scrollHandler = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastY) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastY = y;
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      // Cleanup
      buttons.forEach((btn) => btn.removeEventListener('click', () => {}));
      menuBtn?.removeEventListener('click', () => {});
      navLinks?.querySelectorAll('a').forEach((a) => a.removeEventListener('click', () => {}));
      window.removeEventListener('scroll', scrollHandler);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="page-wash" aria-hidden="true"></div>

      <div className="cinema" aria-hidden="true">
        <video className="scene s0" data-scene="0" autoPlay muted loop playsInline preload="auto">
          <source src="/writting2.webm" type="video/webm" />
          <source src="/writting2.MP4" type="video/mp4" />
        </video>
        <video className="scene s1" data-scene="1" autoPlay muted loop playsInline preload="auto">
          <source src="/shoes2.webm" type="video/webm" />
          <source src="/Shoes2.MP4" type="video/mp4" />
        </video>
        <video className="scene s2" data-scene="2" autoPlay muted loop playsInline preload="auto">
          <source src="/kick2.webm" type="video/webm" />
          <source src="/kick 2.MP4" type="video/mp4" />
        </video>
        <video className="scene s3" data-scene="3" autoPlay muted loop playsInline preload="auto">
          <source src="/ninja2.webm" type="video/webm" />
          <source src="/ninja run2.MP4" type="video/mp4" />
        </video>
        <video className="scene s4" data-scene="4" autoPlay muted loop playsInline preload="auto">
          <source src="/coding2.webm" type="video/webm" />
          <source src="/Coding 2.MP4" type="video/mp4" />
        </video>
      </div>

      <div className="orb a" aria-hidden="true"></div>
      <div className="orb b" aria-hidden="true"></div>
      <div className="orb c" aria-hidden="true"></div>

      <div className="cinema-marker" aria-hidden="true">
        <div className="frame" data-idx="0"></div>
        <div className="frame" data-idx="1"></div>
        <div className="frame" data-idx="2"></div>
        <div className="frame" data-idx="3"></div>
        <div className="frame" data-idx="4"></div>
      </div>

      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="sig">Mac</span>
            <span className="sig">Passanai</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div className="nav-links" id="navLinks">
              <a href="#about">
                <span className="en">About</span>
                <span className="th">เกี่ยวกับ</span>
              </a>
              <a href="#skills">
                <span className="en">Skills</span>
                <span className="th">ทักษะ</span>
              </a>
              <a href="#experience">
                <span className="en">Experience</span>
                <span className="th">ประสบการณ์</span>
              </a>
              <a href="#education">
                <span className="en">Education</span>
                <span className="th">การศึกษา</span>
              </a>
              <a href="#contact">
                <span className="en">Contact</span>
                <span className="th">ติดต่อ</span>
              </a>
            </div>
            <div className="lang-toggle" role="group" aria-label="Language toggle">
              <button data-lang="en" className="active">
                EN
              </button>
              <button data-lang="th">TH</button>
            </div>
            <button className="menu-btn" id="menuBtn" aria-label="Menu">
              ☰
            </button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">
                <span className="pulse"></span>
                <span className="en">Available for new opportunities</span>
                <span className="th">พร้อมรับโอกาสใหม่</span>
              </span>
              <h1>
                <span className="en">
                  Hi, I'm <span className="hand frost">Mac</span>
                  <br />
                  Product Owner who
                  <br />
                  ships <span className="hand sage">real impact</span>.
                </span>
                <span className="th">
                  สวัสดีครับ ผม <span className="hand frost">แม็ค</span>
                  <br />
                  Product Owner ที่สร้าง
                  <br />
                  <span className="hand sage">ผลลัพธ์จริง</span> ให้ธุรกิจ
                </span>
              </h1>
              <p className="lead">
                <span className="en">
                  Forward-thinking Business Analyst &amp; Product Owner with 6+ years bridging
                  engineering, analysis, and product strategy. Currently driving end-to-end
                  delivery for the SGM Portal at CP Axtra.
                </span>
                <span className="th">
                  นักวิเคราะห์ธุรกิจและ Product Owner ประสบการณ์กว่า 6 ปี เชื่อมโยงงาน
                  วิศวกรรม การวิเคราะห์ธุรกิจ และกลยุทธ์ผลิตภัณฑ์ ปัจจุบันดูแลผลิตภัณฑ์ SGM
                  Portal ที่ CP Axtra แบบ end-to-end
                </span>
              </p>
              <div className="hero-cta">
                <a href="#experience" className="btn primary">
                  <span className="en">View experience</span>
                  <span className="th">ดูประสบการณ์</span>
                  <span className="arrow">→</span>
                </a>
                <a href="#contact" className="btn ghost">
                  <span className="en">Get in touch</span>
                  <span className="th">ติดต่อผม</span>
                </a>
              </div>
            </div>

            <div className="hero-card">
              <img
                className="profile-img"
                src="/profile.jpg"
                alt="Passanai 'Mac' Tampawisit"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('no-photo');
                }}
              />
              <div className="photo-ci-tint"></div>
            </div>
          </div>

          <div className="info-strip">
            <div className="info-cell">
              <span className="k">
                <span className="en">Role</span>
                <span className="th">ตำแหน่ง</span>
              </span>
              <span className="v">Product Owner</span>
            </div>
            <div className="info-cell">
              <span className="k">
                <span className="en">Company</span>
                <span className="th">บริษัท</span>
              </span>
              <span className="v">CP Axtra</span>
            </div>
            <div className="info-cell">
              <span className="k">
                <span className="en">Location</span>
                <span className="th">สถานที่</span>
              </span>
              <span className="v">Bangkok, TH</span>
            </div>
            <div className="info-cell">
              <span className="k">
                <span className="en">Experience</span>
                <span className="th">ประสบการณ์</span>
              </span>
              <span className="v">
                6+ <span className="en">yrs</span>
                <span className="th">ปี</span>
              </span>
            </div>
          </div>
        </div>
        <div className="scroll-ind">
          <span className="en">Scroll</span>
          <span className="th">เลื่อนลง</span>
          <span className="line"></span>
        </div>
      </header>

      <section id="about">
        <div className="container">
          <div className="section-head reveal">
            <span className="tag">
              <span className="en">About Me</span>
              <span className="th">เกี่ยวกับผม</span>
            </span>
            <h2>
              <span className="hand frost">
                <span className="en">People · Process · Technology</span>
                <span className="th">คน · กระบวนการ · เทคโนโลยี</span>
              </span>
            </h2>
            <p>
              <span className="en">
                I connect people, process, and technology to deliver "less-effort" solutions
                that create real business impact — from factory floors to enterprise portals.
              </span>
              <span className="th">
                ผมเชื่อมคน กระบวนการ และเทคโนโลยีเข้าด้วยกัน เพื่อสร้างโซลูชัน "ใช้แรงน้อย
                ผลลัพธ์สูง" ที่ส่งผลต่อธุรกิจอย่างแท้จริง — ตั้งแต่โรงงานไปจนถึงระบบองค์กร
              </span>
            </p>
          </div>

          <div className="about-grid reveal">
            <div className="stat">
              <div className="num">6+</div>
              <div className="lab">
                <span className="en">Years of experience</span>
                <span className="th">ปีแห่งประสบการณ์</span>
              </div>
            </div>
            <div className="stat">
              <div className="num">25+</div>
              <div className="lab">
                <span className="en">Industrial projects led at ThaiBev</span>
                <span className="th">โปรเจกต์อุตสาหกรรมที่ ThaiBev</span>
              </div>
            </div>
            <div className="stat">
              <div className="num">Top 8</div>
              <div className="lab">
                <span className="en">of 1,000+ — Code-D 789 Hackathon</span>
                <span className="th">จาก 1,000+ ทีม — แฮกกาธอน Code-D 789</span>
              </div>
            </div>
            <div className="stat">
              <div className="num">855</div>
              <div className="lab">
                <span className="en">TOEIC score (valid to 2028)</span>
                <span className="th">คะแนน TOEIC (ถึงปี 2028)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-head reveal">
            <span className="tag">
              <span className="en">Skill Sets</span>
              <span className="th">ทักษะ</span>
            </span>
            <h2>
              <span className="hand sage">
                <span className="en">Tools &amp; Capabilities</span>
                <span className="th">เครื่องมือและความสามารถ</span>
              </span>
            </h2>
            <p>
              <span className="en">
                A blended toolkit across product, analysis, design, and delivery.
              </span>
              <span className="th">
                ชุดทักษะที่ผสมผสานระหว่างงานผลิตภัณฑ์ การวิเคราะห์ ออกแบบ และส่งมอบ
              </span>
            </p>
          </div>

          <div className="skills-grid">
            <div className="skill-card reveal">
              <h3>
                <span className="en">Documentation</span>
                <span className="th">การจัดทำเอกสาร</span>
              </h3>
              <p>
                <span className="en">Structured requirements, user stories, and living specs.</span>
                <span className="th">
                  เขียน Requirement, User Story และเอกสารสเปกที่ใช้งานจริงได้
                </span>
              </p>
              <div className="tags">
                <span className="tag">Microsoft Office</span>
                <span className="tag">Google Workspace</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Task &amp; Team Mgmt</span>
                <span className="th">บริหารงานและทีม</span>
              </h3>
              <p>
                <span className="en">Backlog hygiene, sprint flow, and cross-team coordination.</span>
                <span className="th">ดูแล Backlog, Sprint และประสานงานข้ามทีม</span>
              </p>
              <div className="tags">
                <span className="tag">Slack</span>
                <span className="tag">Jira</span>
                <span className="tag">Confluence</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Databases</span>
                <span className="th">ฐานข้อมูล</span>
              </h3>
              <p>
                <span className="en">
                  Query, validate, and model data across relational systems.
                </span>
                <span className="th">เขียน Query ตรวจสอบข้อมูล และออกแบบเชิงสัมพันธ์</span>
              </p>
              <div className="tags">
                <span className="tag">Oracle SQL</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">phpMyAdmin</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Diagram &amp; Design</span>
                <span className="th">ไดอะแกรมและออกแบบ</span>
              </h3>
              <p>
                <span className="en">Wireframes, flows, whiteboards — thinking made visible.</span>
                <span className="th">ทำ Wireframe, Flow, Whiteboard ให้ความคิดเห็นชัดเจน</span>
              </p>
              <div className="tags">
                <span className="tag">Figma</span>
                <span className="tag">FigJam</span>
                <span className="tag">Draw.io</span>
                <span className="tag">Miro</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Third-party Config</span>
                <span className="th">ตั้งค่าแอปภายนอก</span>
              </h3>
              <p>
                <span className="en">User &amp; permission setup on enterprise identity platforms.</span>
                <span className="th">ตั้งค่าผู้ใช้และสิทธิ์บนแพลตฟอร์ม Identity ระดับองค์กร</span>
              </p>
              <div className="tags">
                <span className="tag">Microsoft Azure</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Dev Platforms</span>
                <span className="th">แพลตฟอร์มพัฒนา</span>
              </h3>
              <p>
                <span className="en">Hands-on with low-code and CMS platforms for fast delivery.</span>
                <span className="th">ใช้งาน Low-code และ CMS เพื่อส่งมอบเร็ว</span>
              </p>
              <div className="tags">
                <span className="tag">WordPress</span>
                <span className="tag">Mendix</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Agentic AI</span>
                <span className="th">Agentic AI</span>
              </h3>
              <p>
                <span className="en">Use Lovable &amp; AI tools to compress design-to-prototype cycles.</span>
                <span className="th">ใช้ Lovable และเครื่องมือ AI เร่งรอบงาน Design-to-Prototype</span>
              </p>
              <div className="tags">
                <span className="tag">Lovable</span>
                <span className="tag">Prompting</span>
                <span className="tag">Clickable UI</span>
              </div>
            </div>

            <div className="skill-card reveal">
              <h3>
                <span className="en">Web Basics</span>
                <span className="th">พื้นฐานเว็บ</span>
              </h3>
              <p>
                <span className="en">
                  Enough HTML / CSS to talk fluently with designers &amp; devs.
                </span>
                <span className="th">เข้าใจ HTML / CSS พอที่จะสื่อสารกับดีไซเนอร์และนักพัฒนาได้</span>
              </p>
              <div className="tags">
                <span className="tag">HTML</span>
                <span className="tag">CSS</span>
                <span className="tag">Webflow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <div className="section-head reveal">
            <span className="tag">
              <span className="en">Experience</span>
              <span className="th">ประสบการณ์</span>
            </span>
            <h2>
              <span className="hand lavender">
                <span className="en">Career Journey</span>
                <span className="th">เส้นทางอาชีพ</span>
              </span>
            </h2>
            <p>
              <span className="en">
                From mechanical engineer to Product Owner — a journey of 6 years, three
                disciplines.
              </span>
              <span className="th">จากวิศวกรเครื่องกลสู่ Product Owner — 6 ปี สามสายงาน</span>
            </p>
          </div>

          <div className="timeline">
            <div className="tl-item reveal">
              <div className="tl-card">
                <div className="tl-meta">
                  <span className="date">08 / 2025 — 04 / 2026</span>
                  <span className="loc">· Bangkok, Thailand</span>
                </div>
                <h3>Product Owner</h3>
                <span className="co">CP Axtra · SGM Portal &amp; Price Promotion Squad</span>
                <ul>
                  <li>
                    <span className="en">
                      Own end-to-end product delivery for SGM Portal and Price Promotion initiatives.
                    </span>
                    <span className="th">
                      ดูแลการส่งมอบ SGM Portal และงาน Price Promotion แบบ end-to-end
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Collaborate with international dev teams to align execution with business
                      objectives.
                    </span>
                    <span className="th">
                      ทำงานร่วมกับทีมพัฒนาต่างประเทศให้สอดคล้องกับเป้าหมายธุรกิจ
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Define user stories, scenarios, and requirements for price-update transaction
                      workflows.
                    </span>
                    <span className="th">
                      เขียน User Story และ Requirement สำหรับ Workflow การอัปเดตราคา
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Lead UX/UI revamp, redesign transaction flows, integrate with legacy, minimize
                      resource usage.
                    </span>
                    <span className="th">
                      นำงาน UX/UI Revamp ออกแบบ Flow ใหม่ เชื่อมระบบเดิม ลดการใช้ทรัพยากร
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Prioritize backlog, define roadmap, implement interlock logic to prevent margin
                      loss.
                    </span>
                    <span className="th">
                      จัดลำดับ Backlog, วาง Roadmap และใส่ Interlock Logic เพื่อลดการเสีย Margin
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Leverage the agentic AI tool Lovable to generate clickable prototypes,
                      accelerating validation.
                    </span>
                    <span className="th">
                      ใช้ Agentic AI "Lovable" สร้าง Clickable Prototype เร่งการตรวจสอบ
                      Requirement
                    </span>
                  </li>
                  <li>
                    <span className="en">Backlog via Slack canvas; team mgmt via Jira.</span>
                    <span className="th">จัดการ Backlog ผ่าน Slack Canvas และทีมผ่าน Jira</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tl-item reveal">
              <div className="tl-card">
                <div className="tl-meta">
                  <span className="date">11 / 2024 — 08 / 2025</span>
                  <span className="loc">· Bangkok, Thailand</span>
                </div>
                <h3>Senior Business Analyst</h3>
                <span className="co">ProsperSof Consulting (Transfer from Code-D 789)</span>
                <ul>
                  <li>
                    <strong>
                      <span className="en">Debt Management System — Student Loan:</span>
                      <span className="th">ระบบบริหารหนี้ — ลูกค้ากองทุนกู้ยืมเพื่อการศึกษา:</span>
                    </strong>
                    <span className="en">
                      {' '}
                      translated TOR into structured business requirements and built debt
                      calculation matrices &amp; decision tables.
                    </span>
                    <span className="th">
                      {' '}
                      แปลง TOR เป็น Requirement ที่เป็นโครงสร้าง พร้อมตารางคำนวณหนี้และ
                      Decision Table
                    </span>
                  </li>
                  <li>
                    <strong>
                      <span className="en">The Ladder Recruitment Platform:</span>
                      <span className="th">แพลตฟอร์ม The Ladder:</span>
                    </strong>
                    <span className="en">
                      {' '}
                      built the agency from ground zero — manual process design, DB structures,
                      BABOK-aligned analysis, SOPs that cut Time-to-Fill.
                    </span>
                    <span className="th">
                      {' '}
                      สร้างบริษัทจัดหางานตั้งแต่ศูนย์ — ออกแบบกระบวนการ, โครงสร้างฐานข้อมูล,
                      วิเคราะห์ตาม BABOK และทำ SOP ลดเวลา Time-to-Fill
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Led briefings across technical and business teams for unified understanding.
                    </span>
                    <span className="th">
                      นำ Briefing ระหว่างฝ่าย Technical และ Business ให้เข้าใจตรงกัน
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tl-item reveal">
              <div className="tl-card">
                <div className="tl-meta">
                  <span className="date">03 / 2023 — 11 / 2024</span>
                  <span className="loc">· Bangkok, Thailand</span>
                </div>
                <h3>Business Analyst</h3>
                <span className="co">Code-D 789 Co., Ltd.</span>
                <ul>
                  <li>
                    <span className="en">
                      Pre-project BA using BABOK Knowledge Areas to identify needs, scope, and
                      feasibility.
                    </span>
                    <span className="th">
                      ทำ BA ช่วง Pre-project ตามหลัก BABOK เพื่อระบุความต้องการ ขอบเขต
                      และความเป็นไปได้
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Designed foundational Design System, CI standards, sitemaps and low-fidelity
                      wireframes for an education e-Commerce platform.
                    </span>
                    <span className="th">
                      ออกแบบ Design System, CI, Sitemap และ Wireframe สำหรับแพลตฟอร์ม
                      e-Commerce สายการศึกษา
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Integrated FlowAccount invoice system &amp; 2C2P payment gateway.
                    </span>
                    <span className="th">
                      เชื่อมต่อระบบ Invoice FlowAccount และ Payment Gateway 2C2P
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Led dev-env system testing and approved UAT deployment; supported QA for
                      pixel-perfect responsive UI.
                    </span>
                    <span className="th">
                      นำการทดสอบ Dev, อนุมัติขึ้น UAT และสนับสนุน QA ด้าน UI แบบ
                      Pixel-perfect Responsive
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="tl-item reveal">
              <div className="tl-card">
                <div className="tl-meta">
                  <span className="date">03 / 2020 — 03 / 2023</span>
                  <span className="loc">· Bangkok, Thailand</span>
                </div>
                <h3>Senior Engineering Officer</h3>
                <span className="co">ThaiBeverage PLC</span>
                <ul>
                  <li>
                    <span className="en">
                      Led mechanical design and TOR development for 25+ industrial projects — from
                      procurement to commissioning.
                    </span>
                    <span className="th">
                      นำงานออกแบบเครื่องกลและ TOR ของ 25+ โปรเจกต์ ตั้งแต่จัดซื้อจนเปิดใช้งาน
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Coordinator aligning diverse stakeholders with enterprise standards.
                    </span>
                    <span className="th">
                      ประสานงานผู้มีส่วนได้ส่วนเสียทุกฝ่ายให้ตรงกับมาตรฐานองค์กร
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Coached engineering interns from multiple universities for 3 consecutive years.
                    </span>
                    <span className="th">
                      โค้ชนักศึกษาฝึกงานจากหลายมหาวิทยาลัยติดต่อกัน 3 ปี
                    </span>
                  </li>
                  <li>
                    <span className="en">
                      Collaborated with international teams from a leading Scotch whisky group during
                      on-site assignments.
                    </span>
                    <span className="th">
                      ทำงานกับทีมวิศวกรต่างชาติจากกลุ่มผู้ผลิต Scotch Whisky ชั้นนำ
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education">
        <div className="container">
          <div className="section-head reveal">
            <span className="tag">
              <span className="en">Education &amp; Certifications</span>
              <span className="th">การศึกษาและใบรับรอง</span>
            </span>
            <h2>
              <span className="hand champagne">
                <span className="en">Learning Never Stops</span>
                <span className="th">การเรียนรู้ไม่มีที่สิ้นสุด</span>
              </span>
            </h2>
          </div>

          <div className="two-col">
            <div className="panel reveal">
              <h3>
                <span className="en">Education</span>
                <span className="th">การศึกษา</span>
              </h3>
              <div className="cert">
                <div className="t">
                  <span className="en">Bachelor's Degree, Mechanical Engineering</span>
                  <span className="th">ปริญญาตรี วิศวกรรมเครื่องกล</span>
                </div>
                <div className="i">King Mongkut's University of Technology Thonburi · 2015 – 2019</div>
              </div>

              <h3 style={{ marginTop: '30px' }}>
                <span className="en">Language Proficiency</span>
                <span className="th">ภาษา</span>
              </h3>
              <div className="toeic-row">
                <div className="toeic">
                  <div className="score">855</div>
                  <div className="label">TOEIC</div>
                </div>
                <div className="toeic">
                  <div className="score">455</div>
                  <div className="label">
                    <span className="en">Listening</span>
                    <span className="th">ฟัง</span>
                  </div>
                </div>
                <div className="toeic">
                  <div className="score">400</div>
                  <div className="label">
                    <span className="en">Reading</span>
                    <span className="th">อ่าน</span>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--ink-3)', fontSize: '13px', marginTop: '14px' }}>
                <span className="en">Valid: 04/2026 – 04/2028</span>
                <span className="th">อายุใบรับรอง: 04/2026 – 04/2028</span>
              </p>
            </div>

            <div className="panel reveal">
              <h3>
                <span className="en">Certifications</span>
                <span className="th">ใบรับรอง</span>
              </h3>
              <div className="cert-list">
                <div className="cert">
                  <div className="t">Business Analyst (BA) — BABOK v3.0 · IIBA</div>
                  <div className="i">Code-D Academy / Code-D 789 Co., Ltd.</div>
                </div>
                <div className="cert">
                  <div className="t">Google Data Analytics Certificate</div>
                  <div className="i">Coursera</div>
                </div>
                <div className="cert">
                  <div className="t">Introduction to UX Design</div>
                  <div className="i">Skooldio</div>
                </div>
                <div className="cert">
                  <div className="t">Webflow for Designers</div>
                  <div className="i">Skooldio</div>
                </div>
                <div className="cert">
                  <div className="t">Web Basics with HTML / CSS</div>
                  <div className="i">Skooldio</div>
                </div>
                <div className="cert">
                  <div className="t">SEAC-PMP</div>
                  <div className="i">Simplilearn</div>
                </div>
                <div className="cert">
                  <div className="t">
                    <span className="en">Data Analyst — course &amp; exam</span>
                    <span className="th">Data Analyst — หลักสูตรและการสอบ</span>
                  </div>
                  <div className="i">Digital Economy Promotion Agency (depa) Thailand</div>
                </div>
                <div className="cert">
                  <div className="t">IT BA &amp; PM Technical Awareness</div>
                  <div className="i">Udemy</div>
                </div>
                <div className="cert">
                  <div className="t">
                    <span className="en">Associate Mechanical Engineer</span>
                    <span className="th">ภาคีวิศวกรเครื่องกล</span>
                  </div>
                  <div className="i">Council of Engineers Thailand (COE)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
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
              <span className="en">
                Open to Product Owner, Senior BA, and Product Strategy roles. Always happy to
                chat about product, process, and problem-solving.
              </span>
              <span className="th">
                พร้อมรับโอกาสในสาย Product Owner, Senior BA และ Product Strategy ยินดีพูดคุยเรื่อง
                ผลิตภัณฑ์ กระบวนการ และการแก้ปัญหาเสมอ
              </span>
            </p>
            <div className="contact-links">
              <a href="mailto:passanai.work@gmail.com">✉ passanai.work@gmail.com</a>
              <a href="tel:+66827310724">☎ +66 82-731-0724</a>
              <a href="https://www.linkedin.com/in/passanai-tampawisit-6504531b0" target="_blank" rel="noopener">
                ⬈ LinkedIn
              </a>
            </div>
            <p className="addr">
              📍 252/134 Tha Base, Saphanmai, Phaholyothin Rd, Anusawari, Bangkhen, Bangkok 10220
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <span className="en">
            © 2026 <span className="sig">Mac</span> · Passanai "Mac" Tampawisit · Built with care
            in Bangkok
          </span>
          <span className="th">
            © 2026 <span className="sig">Mac</span> · ภัสนัย "แม็ค" ตามผาวิศิษฎ์ · สร้างด้วยใจจาก
            กรุงเทพฯ
          </span>
        </div>
      </footer>

      <div className="cms-toolbar" id="cmsToolbar" role="toolbar" aria-label="Admin editor">
        <span className="cms-title">
          CMS · <b>Edit mode</b>
        </span>
        <button id="cmsToggleEdit" className="primary" title="Toggle edit mode (Ctrl+Shift+E)">
          Edit: OFF
        </button>
        <button id="cmsAddSection" title="Add a new section">
          + Section
        </button>
        <button id="cmsAddNav" title="Add a new nav link">
          + Nav link
        </button>
        <button id="cmsSave" title="Save to this browser">
          Save
        </button>
        <button id="cmsExport" title="Download a standalone HTML snapshot">
          Export HTML
        </button>
        <button id="cmsReset" className="danger" title="Discard all saved edits">
          Reset
        </button>
      </div>
      <div className="cms-status" id="cmsStatus"></div>

      <aside className="cms-inspector" id="cmsInspector" aria-label="Element inspector">
        <div className="head">
          <h4 id="cmsInspTitle">Element</h4>
          <button className="close" id="cmsInspClose" title="Close">
            ×
          </button>
        </div>
        <div className="tabs">
          <button data-pane="content" className="on">
            Content
          </button>
          <button data-pane="type">Typography</button>
          <button data-pane="box">Container</button>
        </div>

        <div className="cms-pane on" data-pane="content">
          <div className="sec" id="cmsPaneText">
            <label>Text (English)</label>
            <textarea id="cmsTextEN" placeholder="English wording"></textarea>
            <label>Text (ไทย)</label>
            <textarea id="cmsTextTH" placeholder="คำภาษาไทย"></textarea>
          </div>
          <div className="sec" id="cmsPaneLink" style={{ display: 'none' }}>
            <label>Link type</label>
            <div className="chip-row">
              <button className="chip on" data-link-type="section">
                Section on page
              </button>
              <button className="chip" data-link-type="url">
                External URL
              </button>
            </div>
            <div id="cmsLinkSection">
              <label>Go to section</label>
              <select id="cmsLinkSectionSelect"></select>
            </div>
            <div id="cmsLinkUrl" style={{ display: 'none' }}>
              <label>URL</label>
              <input type="url" id="cmsLinkUrlInput" placeholder="https://example.com" />
            </div>
            <label style={{ marginTop: '8px' }}>
              <input type="checkbox" id="cmsLinkNewTab" /> Open in new tab
            </label>
          </div>
          <button className="btn-danger" id="cmsDelete">
            Delete this element
          </button>
        </div>

        <div className="cms-pane" data-pane="type">
          <div className="cms-target" id="cmsTarget">
            <span>Applying to:</span>
            <b id="cmsTargetLabel">whole element</b>
            <span style={{ flex: 1 }}></span>
            <button className="chip" id="cmsUnwrap" title="Remove all tp styling wrappers">
              Unwrap all
            </button>
          </div>
          <div className="sec">
            <label>Font family</label>
            <select id="cmsFontFamily">
              <option value="">(default)</option>
              <option value="'Inter', sans-serif">Inter · Modern sans</option>
              <option value="'Prompt', sans-serif">Prompt · Thai-friendly sans</option>
              <option value="'Caveat', cursive">Caveat · Handwritten</option>
              <option value="'Caveat Brush', cursive">Caveat Brush · Bold hand</option>
              <option value="'Mali', cursive">Mali · Thai hand</option>
              <option value="Georgia, serif">Georgia · Serif</option>
              <option value="'Courier New', monospace">Monospace</option>
            </select>

            <label>Typography style (art)</label>
            <div className="chip-row" id="cmsArtRow">
              <button className="chip on" data-art="">
                Plain
              </button>
              <button className="chip" data-art="frost">
                Frost ice
              </button>
              <button className="chip" data-art="sage">
                Sage
              </button>
              <button className="chip" data-art="lavender">
                Lavender
              </button>
              <button className="chip" data-art="champagne">
                Champagne
              </button>
              <button className="chip" data-art="rose">
                Rose
              </button>
              <button className="chip" data-art="ink">
                Ink
              </button>
            </div>

            <div className="grid-2">
              <div>
                <label>Size (px)</label>
                <div className="row">
                  <input type="range" id="cmsFontSize" min="10" max="120" step="1" />
                  <span className="val" id="cmsFontSizeVal">
                    –
                  </span>
                </div>
              </div>
              <div>
                <label>Weight</label>
                <select id="cmsFontWeight">
                  <option value="">(default)</option>
                  <option value="300">300 · Light</option>
                  <option value="400">400 · Regular</option>
                  <option value="500">500 · Medium</option>
                  <option value="600">600 · Semibold</option>
                  <option value="700">700 · Bold</option>
                  <option value="800">800 · Extra bold</option>
                </select>
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label>Letter spacing (em)</label>
                <div className="row">
                  <input type="range" id="cmsLetterSpacing" min="-0.05" max="0.3" step="0.005" />
                  <span className="val" id="cmsLetterSpacingVal">
                    –
                  </span>
                </div>
              </div>
              <div>
                <label>Line height</label>
                <div className="row">
                  <input type="range" id="cmsLineHeight" min="0.9" max="2.2" step="0.05" />
                  <span className="val" id="cmsLineHeightVal">
                    –
                  </span>
                </div>
              </div>
            </div>

            <label>Text alignment</label>
            <div className="chip-row" id="cmsAlignRow">
              <button className="chip" data-align="left">
                Left
              </button>
              <button className="chip" data-align="center">
                Center
              </button>
              <button className="chip" data-align="right">
                Right
              </button>
            </div>

            <div className="grid-2">
              <div>
                <label>Main color</label>
                <input type="color" id="cmsColor" />
              </div>
              <div>
                <label>Shadow color</label>
                <input type="color" id="cmsShadowColor" />
              </div>
            </div>
            <label>
              <input type="checkbox" id="cmsShadowOn" /> Enable text shadow (art style)
            </label>
          </div>
        </div>

        <div className="cms-pane" data-pane="box">
          <div className="sec">
            <label>Max width (px, 0 = auto)</label>
            <div className="row">
              <input type="range" id="cmsMaxW" min="0" max="1800" step="10" />
              <span className="val" id="cmsMaxWVal">
                –
              </span>
            </div>

            <label>Horizontal padding (px)</label>
            <div className="row">
              <input type="range" id="cmsPadX" min="0" max="120" step="2" />
              <span className="val" id="cmsPadXVal">
                –
              </span>
            </div>

            <label>Vertical padding (px)</label>
            <div className="row">
              <input type="range" id="cmsPadY" min="0" max="200" step="2" />
              <span className="val" id="cmsPadYVal">
                –
              </span>
            </div>

            <label>Gap / spacing (px)</label>
            <div className="row">
              <input type="range" id="cmsGap" min="0" max="120" step="2" />
              <span className="val" id="cmsGapVal">
                –
              </span>
            </div>

            <label>Background</label>
            <input type="color" id="cmsBg" />
            <label style={{ marginTop: '6px' }}>
              <input type="checkbox" id="cmsBgOn" /> Apply background color
            </label>
          </div>
        </div>
      </aside>

      <Cinema />
      <CMSEditor />
    </>
  );
}
