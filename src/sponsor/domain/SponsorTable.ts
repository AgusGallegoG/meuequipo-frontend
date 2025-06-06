import type { Sponsor } from './Sponsor';

export type SponsorTable = {
  content: Sponsor[];
  totalRecords: number;
};

export const defaultSponsorTable: SponsorTable = {
  content: [],
  totalRecords: 0,
};
