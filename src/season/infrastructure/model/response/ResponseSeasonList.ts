export interface ResponseSeasonList {
  content: ResponseSeason[];
}

export interface ResponseSeason {
  id: number;
  name: string;
  active: boolean;
}
