export type SeasonForm = {
  startDate: Date | null;
  endDate: Date | null;
  active: boolean;
};

export const emptySeasonForm: SeasonForm = {
  active: false,
  endDate: null,
  startDate: null,
};
