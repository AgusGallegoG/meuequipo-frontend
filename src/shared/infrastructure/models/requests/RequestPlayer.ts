export interface RequestPlayer {
  id: number | null;
  name: string;
  surnames: string;
  birthDate: string; //-> IsoString
  sex: number; //-> enum id
  category: number; //-> id
}
