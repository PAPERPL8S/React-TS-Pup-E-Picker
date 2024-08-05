import React from "react";
import { DogCard } from "../Shared/DogCard";
import { YourDogType } from "../types";
import { toast } from "react-hot-toast";

interface FunctionalDogsProps {
  dogs: YourDogType[];
  onDogUpdate: (updatedDog: YourDogType) => void;
  onDogDelete: (id: number) => void;
  isLoading: boolean;
}

const FunctionalDogs: React.FC<FunctionalDogsProps> = ({
  dogs,
  onDogUpdate,
  onDogDelete,
  isLoading,
}) => {
  const handleTrashIconClick = async (id: number) => {
    try {
      await onDogDelete(id);
      toast.success("Dog deleted");
    } catch (error) {
      toast.error("Failed to delete dog");
    }
  };

  const handleHeartClick = async (dog: YourDogType) => {
    try {
      const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
      await onDogUpdate(updatedDog);
      toast.success(
        `Dog ${
          updatedDog.isFavorite
            ? "moved to favorites"
            : "moved to non-favorites"
        }`,
      );
    } catch (error) {
      toast.error("Failed to update dog");
    }
  };

  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => handleTrashIconClick(dog.id)}
          onHeartClick={() => handleHeartClick(dog)}
          onEmptyHeartClick={() => handleHeartClick(dog)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default FunctionalDogs;
