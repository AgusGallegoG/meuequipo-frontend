export interface RequestGame {
  id: number | null;
  gameDate: string;
  category: number | null;
  location: string;
  localTeam: RequestGameTeam;
  localPoints: number | null;
  visitorTeam: RequestGameTeam;
  visitorPoints: number | null;
  state: number | null;
}

export interface RequestGameTeam {
  id: number | null;
  isOurTeam: boolean;
}
