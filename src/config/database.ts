import { sameDates } from 'utils/dateManager';

import Link from 'model/types/Link';

// Temporary database, only for tests purposes
const DATABASE_KEY = 'DATABASE';

export const getAllLinks = (): Link[] => JSON.parse(localStorage.getItem(DATABASE_KEY) || '[]');

export const addCount = (id: string) => {
  const links = [...getAllLinks()];
  const idx = links.findIndex((link: Link) => link.id === id);
  if (idx > -1) {
    const dateIdx = links[idx].clicks.findIndex((click) =>
      sameDates(new Date(click.date), new Date()),
    );
    if (dateIdx === -1) {
      links[idx].clicks.push({
        count: 1,
        date: new Date(),
      });
    } else {
      links[idx].clicks[dateIdx].count += 1;
    }
  }
  localStorage.setItem(DATABASE_KEY, JSON.stringify(links));
};

export const addLink = (link: Link) => {
  localStorage.setItem(DATABASE_KEY, JSON.stringify([...getAllLinks(), link]));
};

export const removeLink = (id: string) => {
  const links = [...getAllLinks()];
  const idx = links.findIndex((link: Link) => link.id === id);
  if (idx > -1) {
    links.splice(idx, 1);
  }
  localStorage.setItem(DATABASE_KEY, JSON.stringify(links));
};
