import { ReactNode } from 'react';

export type PageProps = {
  className?: string;
  children: ReactNode;
  fullpage?: boolean;
  id?: string;
};
