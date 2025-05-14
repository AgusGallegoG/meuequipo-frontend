export interface ResponseFooterResourcesList {
  direction: ResponseFooterItem[];
  socials: ResponseFooterItem[];
  contact: ResponseFooterItemContact[];
  reserved: ResponseFooterItem;
}

export interface ResponseFooterItem {
  text: string;
  ref: string;
}

export interface ResponseFooterItemContact extends ResponseFooterItem {
  type: string;
}
