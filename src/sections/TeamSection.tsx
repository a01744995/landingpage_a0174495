import React from 'react';
import { TEAM_MEMBERS } from '../data/rocketData';

export const TeamSection: React.FC = () => {
  return (
    <section id="equipo" className="py-24 bg-[#0B0B0B] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D8903D]">
            04 • EQUIPO ROCKET TEC
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FFF3E0] mt-2">
            Tripulación del proyecto.
          </h2>
        </div>

        {/* Clean 5-Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group rounded-3xl bg-[#14110E] border border-white/10 hover:border-[#E7B56A]/40 p-3.5 transition-all hover:-translate-y-1"
            >
              <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#0B0B0B]">
                <img
                  src={member.image}
                  alt={member.fullName}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-display font-bold text-sm text-[#FFF3E0] leading-snug">
                  {member.fullName}
                </h3>
                <p className="text-xs text-[#E7B56A]/80 mt-0.5 line-clamp-1">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
