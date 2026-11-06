'use client';

import { useState } from 'react';
import Image from 'next/image';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand-lockup" href="#inicio" aria-label="WAFLE Rocket TEC, ir al inicio" onClick={closeMenu}>
          <Image
            src="/brand/wafle-horizontal.png"
            alt="WAFLE Rocket TEC"
            width={410}
            height={137}
            priority
            className="nav-logo"
          />
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav id="primary-navigation" className={`primary-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          <a href="#inicio" onClick={closeMenu}>Inicio</a>
          <a href="#equipo" onClick={closeMenu}>El equipo</a>
          <a className="nav-cta" href="#equipo" onClick={closeMenu}>
            Conócenos <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
