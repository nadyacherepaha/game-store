export interface IBaseCard {
  id: number;
  name: string;
  image?: string;
  price: number;
  description?: string;
  ageLimit?: number;
  rating?: number;
  alt?: string;
  amount: number;
  genre?: string;
}

export interface ICard extends IBaseCard {
  platform: {
    pc: boolean;
    playstation: boolean;
    xbox: boolean;
  };
}
