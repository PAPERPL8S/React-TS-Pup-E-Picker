import { DogCard } from "../Shared/DogCard";
import { TDog } from "../types";
interface FunctionalDogsProps {
  dogs: TDog[];
  onDogUpdate: (updatedDog: TDog) => void;
  onDogDelete: (id: number) => void;
  isLoading: boolean;
}

const FunctionalDogs = ({
  dogs,
  onDogUpdate,
  onDogDelete,
  isLoading,
}: FunctionalDogsProps) => {
  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => onDogDelete(dog.id)}
          onHeartClick={() =>
            onDogUpdate({ ...dog, isFavorite: !dog.isFavorite })
          }
          onEmptyHeartClick={() =>
            onDogUpdate({ ...dog, isFavorite: !dog.isFavorite })
          }
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default FunctionalDogs;
