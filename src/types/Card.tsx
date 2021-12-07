export interface ICard {
  id: number;
  name: string;
  image?: string;
  price: number;
  description?: string;
  ageLimit?: number;
  rating?: number;
  alt?: string;
  platform: {
    pc: boolean;
    playstation: boolean;
    xbox: boolean;
  };
  amount: number;
  genre?: string;
}
