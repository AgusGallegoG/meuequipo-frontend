export type FooterInfo = {
  direction: FooterItem[];
  socials: FooterItem[];
  contact: FooterItemContact[];
  reserved: FooterItem;
};

export type FooterItem = {
  text: string;
  ref: string;
};

export type FooterItemContact = FooterItem & {
  type: string;
};

const emptyFooterItem: FooterItem = {
  ref: '',
  text: '',
};

export const emptyFooterInfo: FooterInfo = {
  contact: [],
  direction: [],
  reserved: { ...emptyFooterItem },
  socials: [],
};
