export interface GameRoom {
  admin: string;
  hints: number;
  players_in_room: number;
  round: number;
  turnOf: string;
  blue_detective: string;
  blue_spymaster: string;
  red_detective: string;
  red_spymaster: string;
}
