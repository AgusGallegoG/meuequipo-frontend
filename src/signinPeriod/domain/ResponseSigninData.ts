export type ResponseSigninData = {
  id: number;
  dateInit: Date | null;
  dateEnd: Date | null;
  downloads: number;
  hasForm: boolean;
  isActive: boolean;
};

export const defaultResponseSigninData: ResponseSigninData = {
  id: -1,
  dateInit: null,
  dateEnd: null,
  downloads: 0,
  hasForm: false,
  isActive: false,
};
