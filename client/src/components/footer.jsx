import React from "react";

/**
 * Visual preview only — plain <a> tags stand in for React Router's
 * <Link>/<NavLink> here since this sandbox can't run react-router-dom.
 * The real project files use <Link>/<NavLink> as shown in the zip.
 */

function ScanMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <line x1="16.2" y1="16.2" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="6.5" x2="11" y2="15.5" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      <line x1="6.5" y1="11" x2="15.5" y2="11" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
    </svg>
  );
}

function MiniHeader() {
  return (
    <header className="pv-hdr">
      <div className="pv-hdr-inner">
        <a className="pv-brand" href="#home">
          <span className="pv-brand-mark"><ScanMark /></span>
          <span className="pv-brand-text">Micro<span className="pv-accent">Detect</span></span>
        </a>
        <nav className="pv-nav">
          <a href="#home" className="pv-link pv-link-active">Home</a>
          <a href="#test" className="pv-link">Test</a>
          <a href="#features" className="pv-link">Features</a>
          <a href="#about" className="pv-link">About Us</a>
        </nav>
        <a href="#test" className="pv-cta">Launch Detector</a>
      </div>
    </header>
  );
}

const PRODUCT_LINKS = ["Home", "Test the Detector", "Features"];

function Footer() {
  return (
    <footer className="pv-ftr">
      <div className="pv-ftr-top">
        <div className="pv-ftr-grid">
          <div className="pv-ftr-col pv-ftr-brand-col">
            <a href="#home" className="pv-ftr-brand">
              <span className="pv-ftr-brand-mark"><ScanMark size={18} /></span>
              <span className="pv-ftr-brand-text">Micro<span className="pv-accent">Detect</span></span>
            </a>
            <p className="pv-ftr-tagline">
              AI-powered microplastic detection for microscope imagery — upload an image,
              get particle-level results in seconds.
            </p>
            {/* <span className="pv-ftr-status">
              <span className="pv-ftr-status-dot" />
              detect endpoint: online
            </span> */}
          </div>

          <div className="pv-ftr-col">
            <h4>Product</h4>
            <ul>
              {PRODUCT_LINKS.map((l) => (
                <li key={l}><a href="#test">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="pv-ftr-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="mailto:hello@microdetect.app">Contact</a></li>
            </ul>
          </div>

          <div className="pv-ftr-col">
            <h4>Get in touch</h4>
            <p className="pv-ftr-contact"><a href="mailto:hello@microdetect.app">hello@microdetect.app</a></p>
            <a href="#test" className="pv-ftr-cta">Try the Detector</a>
          </div>
        </div>
      </div>

      <div className="pv-ftr-bottom">
        <span>© {new Date().getFullYear()} MicroDetect. All rights reserved.</span>
        <div className="pv-ftr-legal">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="pv-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap');

        .pv-root {
          --blue: #2454e0;
          --blue-deep: #14224d;
          --emerald: #0f9e6f;
          --bg: #eef1f6;
          --ink: #10182b;
          --muted: #5b6478;
          --line: #dde2ec;
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg);
          min-height: 100%;
          display: flex; flex-direction: column;
        }
        .pv-root * { box-sizing: border-box; }
        .pv-accent { color: var(--blue); }

        /* mini header, just for context */
        .pv-hdr { background: rgba(255,255,255,0.95); border-bottom: 1px solid var(--line); }
        .pv-hdr-inner { max-width: 1080px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .pv-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--ink); }
        .pv-brand-mark { width: 34px; height: 34px; border-radius: 9px; background: var(--blue-deep); color: #7fd8c2; display: flex; align-items: center; justify-content: center; }
        .pv-brand-text { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 17px; }
        .pv-nav { display: flex; gap: 4px; }
        .pv-link { text-decoration: none; color: var(--muted); font-size: 13.5px; font-weight: 500; padding: 8px 12px; border-radius: 8px; }
        .pv-link-active { color: var(--blue-deep); }
        .pv-cta { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px; text-decoration: none; color: #fff; background: var(--blue); padding: 9px 16px; border-radius: 9px; }
        @media (max-width: 700px) { .pv-nav { display: none; } }

        .pv-filler { flex: 1; max-width: 1080px; margin: 0 auto; padding: 40px 20px; text-align: center; color: var(--muted); font-size: 13px; }

        /* footer */
        .pv-ftr { background: var(--blue-deep); color: #cfd8f5; margin-top: auto; }
        .pv-ftr-top { padding: 48px 20px 32px; }
        .pv-ftr-grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        @media (max-width: 780px) { .pv-ftr-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .pv-ftr-grid { grid-template-columns: 1fr; } }
        .pv-ftr-brand-col { grid-column: 1 / 2; }
        @media (max-width: 780px) { .pv-ftr-brand-col { grid-column: 1 / -1; } }

        .pv-ftr-brand { display: flex; align-items: center; gap: 9px; text-decoration: none; color: #fff; }
        .pv-ftr-brand-mark { width: 30px; height: 30px; border-radius: 8px; background: rgba(127,216,194,0.14); color: #7fd8c2; display: flex; align-items: center; justify-content: center; }
        .pv-ftr-brand-text { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; }
        .pv-ftr-tagline { color: #a9b4dd; font-size: 13px; line-height: 1.6; margin: 14px 0 16px; max-width: 300px; }
        .pv-ftr-status { display: inline-flex; align-items: center; gap: 7px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #a9b4dd; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); padding: 6px 10px; border-radius: 999px; }
        .pv-ftr-status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--emerald); box-shadow: 0 0 0 3px rgba(15,158,111,0.25); }

        .pv-ftr-col h4 { font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 600; color: #fff; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 14px; }
        .pv-ftr-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .pv-ftr-col ul a, .pv-ftr-contact a { text-decoration: none; color: #a9b4dd; font-size: 13.5px; }
        .pv-ftr-col ul a:hover, .pv-ftr-contact a:hover { color: #fff; }
        .pv-ftr-contact { margin: 0 0 16px; font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; }
        .pv-ftr-cta { display: inline-flex; text-decoration: none; color: #fff; border: 1px solid rgba(255,255,255,0.25); font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 10px; }
        .pv-ftr-cta:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.4); }

        .pv-ftr-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding: 16px 20px; max-width: 1080px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; color: #8b96c2; font-size: 12px; }
        .pv-ftr-legal { display: flex; gap: 18px; }
        .pv-ftr-legal a { color: #8b96c2; text-decoration: none; }
        .pv-ftr-legal a:hover { color: #fff; }
      `}</style>

      <MiniHeader />
      <div className="pv-filler">Page content goes here — this block is just spacing so you can see the footer sit at the bottom of the viewport.</div>
      <Footer />
    </div>
  );
}