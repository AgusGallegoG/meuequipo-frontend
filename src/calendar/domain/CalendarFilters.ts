export type CalendarFilter = {
  from: Date | null;
  to: Date | null;
  team: number | null;
};

export const defaultCalendarFilter = {
  from: null,
  to: null,
  team: null,
};
