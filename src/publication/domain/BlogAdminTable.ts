import type { Publication } from '@/publication/domain/Publication';

export type BlogAdminTable = {
  content: Publication[];
  totalRecords: number;
};

export const defaultBlogAdminTable: BlogAdminTable = {
  content: [],
  totalRecords: 0,
};
