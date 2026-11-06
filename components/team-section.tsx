'use client';

import { useEffect, useState } from 'react';
import { teamMembers, type TeamMember } from '@/data/team';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-svg">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-svg">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}

function MemberCard({ member, onOpen }: { member: TeamMember; onOpen: (member: TeamMember) => void }) {
  return (
    <button className="member-card" type="button" onClick={() => onOpen(member)} aria-label={`Abrir perfil de ${member.name}`}>
      <span className="member-card-top">
        <span className="member-number">{member.number} / PERFIL</span>
        <span className="member-open" aria-hidden="true"><ArrowIcon /></span>
      </span>
      <span className="member-avatar" aria-hidden="true">
        <span>{member.initials}</span>
        <i />
      </span>
      <span className="member-info">
        <span className="member-name">{member.name}</span>
        <span className="member-role">{member.role}</span>
        <span className="member-specialty">{member.specialty}</span>
      </span>
      <span className="member-card-bottom">
        <span>VER PERFIL</span>
        <span className="member-card-line" />
      </span>
    </button>
  );
}

function MemberDialog({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('dialog-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('dialog-open');
    };
  }, [onClose]);

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="member-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-member-name">
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar perfil">
          <CloseIcon />
        </button>
        <div className="dialog-kicker">WAFLE ROCKET TEC <span>·</span> PERFIL {member.number}</div>
        <div className="dialog-profile-head">
          <div className="dialog-avatar" aria-hidden="true">{member.initials}</div>
          <div>
            <p className="dialog-role">{member.role}</p>
            <h3 id="dialog-member-name">{member.name}</h3>
            <p className="dialog-specialty">{member.specialty}</p>
          </div>
        </div>
        <div className="dialog-divider" />
        <p className="dialog-label">PERFIL</p>
        <p className="dialog-biography">{member.biography}</p>
        <p className="dialog-label dialog-strength-label">ÁREAS DE CONTRIBUCIÓN</p>
        <div className="strength-list">
          {member.strengths.map((strength) => <span key={strength}>{strength}</span>)}
        </div>
        <p className="dialog-edit-note">Los datos de este perfil se editan en <code>data/team.ts</code>.</p>
      </section>
    </div>
  );
}

export function TeamSection() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <section className="team-section section-light" id="equipo">
      <div className="section-container">
        <div className="section-eyebrow light-eyebrow">
          <span className="eyebrow-line" />
          <span>LAS PERSONAS DETRÁS DE LA IDEA</span>
          <span className="eyebrow-index">01 — 01</span>
        </div>

        <div className="team-heading-row">
          <div>
            <p className="section-overline">EQUIPO WAFLE</p>
            <h2>Las ideas despegan<br /><em>en equipo.</em></h2>
          </div>
          <p className="team-intro">
            Cada proyecto tiene una visión. Detrás de WAFLE Rocket TEC hay personas que aportan talento,
            criterio y curiosidad para convertir esa visión en trabajo compartido.
          </p>
        </div>

        <div className="team-grid" aria-label="Perfiles de los integrantes del equipo">
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} onOpen={setActiveMember} />
          ))}
        </div>

        <div className="team-footnote">
          <span className="footnote-mark">✳</span>
          <p>Un mismo objetivo. Distintas perspectivas. Una identidad compartida.</p>
          <span className="footnote-end">W / RT</span>
        </div>
      </div>

      {activeMember && <MemberDialog member={activeMember} onClose={() => setActiveMember(null)} />}
    </section>
  );
}
