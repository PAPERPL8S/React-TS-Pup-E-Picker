// Add your own custom types in here

export interface FunctionalSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  favoriteCount: number;
  unfavoriteCount: number;
  dogs: dog[];
  onDogUpdate: (updatedDog: YourDogType) => void;
  onDogDelete: (id: number) => void;
  isLoading: boolean;
  children?: React.ReactNode;
}
export interface dog {
  id: number;
  name: string;
  breed: string;
  age: number;
  image: string;
  description: string;
  isFavorite: boolean;
}

export interface DogCardProps {
  dog: YourDogType;
  image: string;
  onTrashIconClick: () => void;
  onHeartClick: () => void;
  onEmptyHeartClick: () => void;
  isLoading: boolean;
}

interface YourDogType {
  id: number;
  name: string;
  breed: string;
  picture: string;
  age: number;
  description: string;
  image: string;
  isFavorite: boolean;
}

export type { YourDogType };
