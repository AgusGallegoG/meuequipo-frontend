export interface RequestSaveSquad {
  team: number;
  match: number;
  players: number[];
  location: string;
  date: string;
  sendMail: boolean;
  mailText: string;
}
