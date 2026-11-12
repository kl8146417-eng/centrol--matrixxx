// The Centrol Matrix team. Asutosh is the public face and the contact for every enquiry.
// Vishal's and Karan's roles are not confirmed yet (owner input), so they show without a role.
// `photo` is optional: when empty, the avatar renders initials. Drop real photos in /public/team/.
export type Member = { name: string; initials: string; role: string | null; bio?: string; photo?: string; contact?: boolean };

export const team: Member[] = [
  {
    name: 'Asutosh',
    initials: 'A',
    role: 'Founder · your contact',
    bio: 'Runs outreach and every client conversation, reads each free audit before it goes out, and is the person who calls you back.',
    contact: true,
  },
  { name: 'Vishal', initials: 'V', role: null },
  { name: 'Karan', initials: 'K', role: null },
];

export const contactPerson = team.find((m) => m.contact) ?? team[0];
