export enum PrizeStatus {
  NOT_OPEN = 0,
  ONLY_OPEN = 1,
  OPEN_AND_COMLETE = 2,
}

export interface Prize {
  id: number;
  mysteryText: string;
  imagePath: string;
  status: PrizeStatus;
  cardId: number | null;
}
