import React, { useEffect } from 'react';

declare const document: {
  head?: { appendChild: (node: unknown) => void };
  createElement?: (tag: string) => {
    rel?: string;
    href?: string;
    setAttribute?: (name: string, value: string) => void;
  };
  fonts?: { ready?: Promise<unknown> };
  getElementById?: (id: string) => { getBBox?: () => { x: number; y: number; width: number; height: number }; setAttribute?: (name: string, value: string) => void } | null;
};
declare const window: { addEventListener?: (name: string, callback: () => void) => void; removeEventListener?: (name: string, callback: () => void) => void };

const footerHtml = `
  <style>
    .footer-section, .footer-section * , .footer-section *::before, .footer-section *::after { box-sizing: border-box; margin: 0; padding: 0; }
    .footer-section { background: #ffffff; padding: 48px 24px; color: #2d3148; font-family: 'DM Sans', sans-serif; }
    .footer-wrapper { max-width: 1150px; margin: 0 auto; display: grid; grid-template-columns: 350px 1fr; gap: 16px; align-items: stretch; position: relative; z-index: 1; }
    .footer-left { position: relative; min-height: 340px; border-radius: 28px; padding: 32px; overflow: hidden; box-shadow: 0 12px 40px rgba(21, 76, 189, 0.25); background: #1e4fc0; display: flex; flex-direction: column; justify-content: space-between; }
    .footer-left-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none; }
    .footer-logo { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
    .footer-logo-mark { width: 32px; height: 32px; border-radius: 8px; background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.85); display: grid; place-items: center; color: #fff; font: 700 16px 'DM Sans', sans-serif; letter-spacing: -0.02em; }
    .footer-logo-name { font: 700 22px 'DM Sans', sans-serif; color: #fff; letter-spacing: -0.02em; }
    .footer-tagline-container { margin-top: auto; margin-bottom: 28px; position: relative; z-index: 1; }
    .footer-tagline { font: 400 19px/1.45 'DM Sans', sans-serif; color: #fff; }
    .footer-tagline span { color: rgba(255,255,255,0.65); }
    .footer-social-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; position: relative; z-index: 1; }
    .footer-social-label { font: 600 17px 'Caveat', cursive; color: rgba(255,255,255,0.9); letter-spacing: 0.3px; }
    .footer-social-icons { display: flex; gap: 7px; }
    .social-icon { width: 36px; height: 36px; border-radius: 9px; background: #0e1014; display: grid; place-items: center; box-shadow: 0 6px 18px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2); transition: background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .social-icon:hover { background: #000; transform: translateY(-2px); box-shadow: 0 10px 26px rgba(0,0,0,0.42), 0 3px 10px rgba(0,0,0,0.26); }
    .social-icon svg { width: 15px; height: 15px; fill: #fff; }
    .footer-right { background: #f0f1f5; border-radius: 28px; padding: 40px; overflow: visible; box-shadow: 0 4px 20px rgba(0,0,0,0.04); display: flex; flex-direction: column; justify-content: space-between; position: relative; }
    .footer-lucky-graphic { position: absolute; top: -36px; right: 40px; z-index: 10; display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
    .lucky-cube { width: 96px; height: 96px; border-radius: 22px; transform: rotate(-10deg); background: linear-gradient(135deg, #5b9ffb 0%, #1e5dd7 55%, #1448be 100%); box-shadow: inset 3px 3px 8px rgba(255,255,255,0.35), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(20,72,200,0.35); display: grid; place-items: center; }
    .lucky-cube-mark { font: 700 42px/1 'DM Sans', sans-serif; color: #fff; letter-spacing: -0.04em; transform: rotate(10deg); text-shadow: 0 3px 6px rgba(0,0,0,0.25); }
    .lucky-text-row { display: flex; gap: 6px; align-items: center; transform: rotate(-4deg); margin-top: 4px; }
    .lucky-arrow { width: 22px; height: 22px; color: #9ca3af; }
    .lucky-arrow path { stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .lucky-text { font: 600 20px 'Caveat', cursive; color: #9ca3af; white-space: nowrap; }
    .footer-nav-cols { display: flex; gap: 72px; padding-top: 8px; }
    .footer-col-title { font: italic 600 24px 'Caveat', cursive; color: #9ca3af; margin-bottom: 18px; }
    .footer-col a { display: block; font: 600 14px 'DM Sans', sans-serif; color: #111827; margin-bottom: 14px; text-decoration: none; transition: color 0.2s; }
    .footer-col a:hover { color: #1f65d6; }
    .footer-bottom { display: flex; align-items: flex-end; justify-content: space-between; margin-top: 48px; gap: 28px; }
    .footer-copyright { font: 500 12.5px 'DM Sans', sans-serif; color: #9ca3af; }
    .footer-cta-mini { display: flex; flex-direction: column; gap: 14px; }
    .footer-cta-mini h4 { font: 400 15px/1.45 'DM Sans', sans-serif; color: #6b7280; }
    .footer-cta-mini h4 strong { display: block; font-size: 19px; font-weight: 700; color: #111827; }
    .footer-subscribe-row { display: flex; width: 310px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
    .footer-subscribe-row input { flex: 1; padding: 11px 14px; background: transparent; border: 0; outline: 0; font: 400 13.5px 'DM Sans', sans-serif; color: #111827; min-width: 0; }
    .footer-subscribe-row input::placeholder { color: #9ca3af; }
    .footer-subscribe-row button { padding: 11px 22px; background: #111214; color: #fff; font: 600 13.5px 'DM Sans', sans-serif; border: 0; border-radius: 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.15); transition: background 0.2s, box-shadow 0.2s, transform 0.15s; cursor: pointer; }
    .footer-subscribe-row button:hover { background: #000; transform: translateY(-1px); box-shadow: 0 9px 24px rgba(0,0,0,0.34), 0 3px 10px rgba(0,0,0,0.18); }
    .footer-watermark { max-width: 1150px; margin: -60px auto 0; pointer-events: none; user-select: none; position: relative; z-index: 0; line-height: 0; }
    .footer-watermark svg { display: block; width: 100%; height: auto; overflow: visible; }
    .footer-watermark text { font-family: 'DM Sans', sans-serif; font-weight: 700; letter-spacing: -0.03em; fill: rgba(0, 0, 0, 0.04); }
    @media (max-width: 860px) { .footer-wrapper { grid-template-columns: 1fr; } .footer-left { min-height: auto; gap: 40px; } .footer-lucky-graphic { display: none; } }
    @media (max-width: 560px) { .footer-right { padding: 24px; } .footer-nav-cols { gap: 40px; } .footer-bottom { flex-direction: column; align-items: flex-start; gap: 24px; } .footer-subscribe-row { width: 100%; } .footer-lucky-graphic { right: 12px; top: -28px; } .lucky-cube { width: 72px; height: 72px; } .lucky-cube-mark { font-size: 32px; } }
  </style>
  <div class="footer-wrapper">
    <div class="footer-left">
      <video class="footer-left-video" autoplay muted loop playsinline preload="auto">
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
      </video>
      <div class="footer-logo"><div class="footer-logo-mark">K</div><span class="footer-logo-name">Rana</span></div>
      <div class="footer-tagline-container"><p class="footer-tagline">Smarter sales automation,<br><span>powered by AI.</span></p></div>
      <div class="footer-social-row">
        <div class="footer-social-label">Stay in touch!</div>
        <div class="footer-social-icons">
          <div class="social-icon"><svg viewBox="0 0 24 24"><path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.193.343-.419.806-.574 1.173a18.27 18.27 0 0 0-5.622 0A12.51 12.51 0 0 0 9.115 3a19.736 19.736 0 0 0-4.435 1.371C1.878 8.56 1.119 12.642 1.498 16.666A19.9 19.9 0 0 0 6.94 19.43a14.6 14.6 0 0 0 1.166-1.894 12.96 12.96 0 0 1-1.838-.88c.154-.113.305-.232.45-.354 3.545 1.638 7.393 1.638 10.896 0 .147.122.298.241.452.354a12.98 12.98 0 0 1-1.842.881 14.49 14.49 0 0 0 1.166 1.893 19.86 19.86 0 0 0 5.445-2.763c.444-4.665-.759-8.71-2.518-12.298ZM8.02 14.192c-1.064 0-1.937-.979-1.937-2.182 0-1.204.854-2.184 1.937-2.184 1.09 0 1.956.988 1.937 2.184 0 1.203-.854 2.182-1.937 2.182Zm7.96 0c-1.064 0-1.937-.979-1.937-2.182 0-1.204.854-2.184 1.937-2.184 1.09 0 1.956.988 1.937 2.184 0 1.203-.847 2.182-1.937 2.182Z"/></svg></div>
          <div class="social-icon"><svg viewBox="0 0 24 24"><path d="M18.244 2H21.8l-7.77 8.88L23.176 22h-7.16l-5.606-7.33L4 22H.444l8.31-9.5L0 2h7.34l5.068 6.7L18.244 2Zm-1.248 18h1.97L6.27 3.895H4.156L16.996 20Z"/></svg></div>
          <div class="social-icon"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.114 20.452H3.556V9h3.558v11.452Z"/></svg></div>
          <div class="social-icon"><svg viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.088 3.292 9.397 7.86 10.922.575.106.785-.25.785-.554 0-.273-.01-.997-.016-1.957-3.197.695-3.873-1.542-3.873-1.542-.523-1.329-1.277-1.683-1.277-1.683-1.044-.714.079-.7.079-.7 1.154.081 1.761 1.185 1.761 1.185 1.026 1.758 2.691 1.25 3.347.956.104-.743.402-1.25.73-1.537-2.552-.29-5.235-1.276-5.235-5.681 0-1.255.448-2.281 1.184-3.084-.119-.291-.513-1.462.112-3.047 0 0 .965-.309 3.162 1.178A10.99 10.99 0 0 1 12 6.058c.977.004 1.96.132 2.88.388 2.196-1.487 3.16-1.178 3.16-1.178.626 1.585.232 2.756.114 3.047.737.803 1.182 1.829 1.182 3.084 0 4.416-2.687 5.388-5.247 5.673.413.356.78 1.058.78 2.133 0 1.54-.014 2.782-.014 3.16 0 .307.207.666.79.553C20.21 21.394 23.5 17.086 23.5 12 23.5 5.65 18.35.5 12 .5Z"/></svg></div>
        </div>
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-lucky-graphic"><div class="lucky-cube"><span class="lucky-cube-mark">K</span></div><div class="lucky-text-row"><svg class="lucky-arrow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 20 C 6 14, 10 9, 18 5" /><path d="M18 5 L 12 5" /><path d="M18 5 L 18 11" /></svg><span class="lucky-text">Feeling lucky?</span></div></div>
      <div class="footer-right-top"><div class="footer-nav-cols"><div class="footer-col"><div class="footer-col-title">Navigation</div><a href="#">How it works</a><a href="#">Features</a><a href="#">Pricing</a><a href="#">Testimonials</a><a href="#">FAQ</a></div><div class="footer-col"><div class="footer-col-title">Company</div><a href="#">Blog</a><a href="#">About</a><a href="#">Terms and Condition</a><a href="#">Privacy Policy</a></div></div></div>
      <div class="footer-bottom"><div class="footer-copyright">© 2025 Rana. All rights reserved.</div><div class="footer-cta-mini"><h4>AI moves fast.<br><strong>Stay ahead with Rana.</strong></h4><div class="footer-subscribe-row"><input type="email" placeholder="Enter email address" /><button type="button">Subscribe</button></div></div></div>
    </div>
  </div>
  <div class="footer-watermark" aria-hidden="true"><svg id="watermarkSvg" viewBox="62 95 876 175" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><text id="watermarkText" x="500" y="240" text-anchor="middle" font-size="320">Rana</text></svg></div>
`;

function fitWatermark() {
  const svg = document.getElementById?.('watermarkSvg');
  const text = document.getElementById?.('watermarkText');
  if (!svg || !text?.getBBox || !svg.setAttribute) return;
  try {
    const bbox = text.getBBox();
    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
  } catch {}
}

export function KresnaFooter() {
  useEffect(() => {
    const link = document.createElement?.('link');
    if (link && document.head) {
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }

    if (document.fonts?.ready) document.fonts.ready.then(fitWatermark);
    else window.addEventListener?.('load', fitWatermark);

    window.addEventListener?.('resize', fitWatermark);
    setTimeout(fitWatermark, 250);
    return () => window.removeEventListener?.('resize', fitWatermark);
  }, []);

  return React.createElement('section', {
    className: 'footer-section',
    dangerouslySetInnerHTML: { __html: footerHtml },
  });
}
