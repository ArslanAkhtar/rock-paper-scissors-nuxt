export type Choice = 'rock' | 'paper' | 'scissors';
export type User = {
    id: string;
    playerName: string;
}

interface PlayerChoice {
    PlayerId: string;
    PlayerChoice: string;
  }
interface Game {
    playerChoices: PlayerChoice[];
    result: string;
  }

export interface GameResult {
    roomId: string;
    users: User[];
    games: Game[];
  }
