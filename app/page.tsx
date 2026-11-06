import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { TeamSection } from '@/components/team-section';

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 2.5c2.4 11.1 8.4 17.1 19.5 19.5C30.4 24.4 24.4 30.4 22 41.5 19.6 30.4 13.6 24.4 2.5 22 13.6 19.6 19.6 13.6 22 2.5Z" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main>
      <div className="hero-shell" id="inicio">
        <SiteHeader />
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <Sparkle className="hero-sparkle sparkle-one" />
          <Sparkle className="hero-sparkle sparkle-two" />

          <div className="hero-content">
            <div className="hero-kicker">
              <span className="status-dot" />
              <span>WAFLE ROCKET TEC</span>
              <span className="kicker-divider">/</span>
              <span>PROYECTO EN EQUIPO</span>
            </div>

            <h1 id="hero-title">
              Ideas que<br />
              toman <span className="headline-accent">altura.</span>
            </h1>

            <p className="hero-description">
              Tecnología con carácter. Una identidad cálida, una visión compartida y un equipo que transforma
              la curiosidad en acción.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#equipo">
                Conoce al equipo <span aria-hidden="true">↗</span>
              </a>
              <span className="hero-aside-note">CREATIVIDAD <i /> INGENIO <i /> COLABORACIÓN</span>
            </div>

            <div className="hero-bottom-meta">
              <span>01 — IDENTIDAD</span>
              <span>WAFLE / ROCKET TEC</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Emblema de WAFLE Rocket TEC">
            <div className="art-orbit orbit-outer" />
            <div className="art-orbit orbit-inner" />
            <div className="art-cross cross-one" />
            <div className="art-cross cross-two" />
            <div className="art-dot art-dot-one" />
            <div className="art-dot art-dot-two" />
            <div className="art-emblem-frame">
              <Image
                src="/brand/wafle-emblem.png"
                alt="Emblema ilustrado de WAFLE Rocket TEC: una nave inspirada en un waffle dentro de un círculo"
                width={900}
                height={900}
                priority
                className="hero-emblem"
              />
            </div>
            <div className="art-caption art-caption-top"><span>W / 01</span><span>EST. TEC</span></div>
            <div className="art-caption art-caption-bottom"><span>BUILT WITH CURIOSITY</span><span>✳</span></div>
          </div>

          <a href="#equipo" className="scroll-indicator" aria-label="Desplazarse a la sección del equipo">
            <span className="scroll-indicator-line" />
            <span>DESLIZA PARA CONOCER AL EQUIPO</span>
          </a>
        </section>
      </div>

      <TeamSection />

      <footer className="site-footer">
        <div className="footer-main">
          <a href="#inicio" className="footer-brand" aria-label="Volver al inicio">
            <Image src="/brand/wafle-horizontal.png" alt="WAFLE Rocket TEC" width={410} height={137} />
          </a>
          <p>Ideas con identidad.<br /><span>Personas que las impulsan.</span></p>
          <a href="#inicio" className="back-to-top">VOLVER ARRIBA <span aria-hidden="true">↑</span></a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} WAFLE ROCKET TEC</span>
          <span>TECNOLOGÍA · CREATIVIDAD · EQUIPO</span>
          <span>HECHO CON PROPÓSITO <i>✳</i></span>
        </div>
      </footer>
    </main>
  );
}
