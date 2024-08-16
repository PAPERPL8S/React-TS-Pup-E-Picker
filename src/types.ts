// Add your own custom types in here

export type TDog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};

export type TDogToAddOrUpdate = Omit<TDog, "id">;
