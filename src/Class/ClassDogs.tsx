import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { TDog } from "../types";

interface ClassDogsProps {
  dogs: TDog[];
  onDogUpdate: (updatedDog: TDog) => void;
  onDogDelete: (id: number) => void;
  isLoading: boolean;
}

class ClassDogs extends Component<ClassDogsProps> {
  render() {
    const { dogs, onDogUpdate, onDogDelete, isLoading } = this.props;

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
  }
}

export default ClassDogs;
