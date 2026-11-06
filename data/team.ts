/**
 * CONTENIDO EDITABLE DEL EQUIPO
 * Sustituye los perfiles de ejemplo por la información real de los creadores.
 * Puedes añadir o eliminar objetos manteniendo la estructura TeamMember.
 */
export type TeamMember = {
  id: string;
  number: string;
  name: string;
  role: string;
  specialty: string;
  shortBio: string;
  biography: string;
  strengths: string[];
  initials: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'integrante-01',
    number: '01',
    name: 'Integrante 01',
    role: 'Nombre y rol por definir',
    specialty: 'Área de participación',
    shortBio: 'Añade una frase breve que describa su contribución al proyecto.',
    biography: 'Edita este espacio con una presentación de la persona, su responsabilidad dentro de WAFLE Rocket TEC y la aportación que realiza al equipo.',
    strengths: ['Añadir especialidad', 'Añadir habilidad', 'Añadir aportación'],
    initials: '01'
  },
  {
    id: 'integrante-02',
    number: '02',
    name: 'Integrante 02',
    role: 'Nombre y rol por definir',
    specialty: 'Área de participación',
    shortBio: 'Añade una frase breve que describa su contribución al proyecto.',
    biography: 'Edita este espacio con una presentación de la persona, su responsabilidad dentro de WAFLE Rocket TEC y la aportación que realiza al equipo.',
    strengths: ['Añadir especialidad', 'Añadir habilidad', 'Añadir aportación'],
    initials: '02'
  },
  {
    id: 'integrante-03',
    number: '03',
    name: 'Integrante 03',
    role: 'Nombre y rol por definir',
    specialty: 'Área de participación',
    shortBio: 'Añade una frase breve que describa su contribución al proyecto.',
    biography: 'Edita este espacio con una presentación de la persona, su responsabilidad dentro de WAFLE Rocket TEC y la aportación que realiza al equipo.',
    strengths: ['Añadir especialidad', 'Añadir habilidad', 'Añadir aportación'],
    initials: '03'
  },
  {
    id: 'integrante-04',
    number: '04',
    name: 'Integrante 04',
    role: 'Nombre y rol por definir',
    specialty: 'Área de participación',
    shortBio: 'Añade una frase breve que describa su contribución al proyecto.',
    biography: 'Edita este espacio con una presentación de la persona, su responsabilidad dentro de WAFLE Rocket TEC y la aportación que realiza al equipo.',
    strengths: ['Añadir especialidad', 'Añadir habilidad', 'Añadir aportación'],
    initials: '04'
  }
];
