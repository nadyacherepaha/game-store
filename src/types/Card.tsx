export interface Card {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  ageLimit: number;
  rating: number;
  alt: string;
  platform: {
    pc: boolean;
    playstation: boolean;
    xbox: boolean;
  };
}
