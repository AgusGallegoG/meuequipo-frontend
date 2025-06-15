export interface RequestMatch {
  id: number | null;
  matchDate: string;
  category: number | null;
  location: string;
  localTeam: RequestMatchTeam;
  localPoints: number | null;
  visitorTeam: RequestMatchTeam;
  visitorPoints: number | null;
  state: number | null;
}

export interface RequestMatchTeam {
  id: number | null;
  isOurTeam: boolean;
}
