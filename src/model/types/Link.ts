type Click = {
  count: number;
  date: Date;
};

type Link = {
  id: string;
  clicks: Click[];
  link: string;
  short: string;
};

export default Link;
