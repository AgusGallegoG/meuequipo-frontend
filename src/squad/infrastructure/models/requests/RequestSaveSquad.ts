export interface RequestSaveSquad {
  team: number;
  game: number;
  players: number[];
  location: string;
  date: string;
  sendMail: boolean;
  mailText: string;
}
