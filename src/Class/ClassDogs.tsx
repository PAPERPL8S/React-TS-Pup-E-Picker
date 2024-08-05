import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { YourDogType } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

interface ClassDogsProps {
  dogs: YourDogType[];
  onDogUpdate: (updatedDog: YourDogType) => void;
  onDogDelete: (id: number) => void;
  isLoading: boolean;
}

class ClassDogs extends Component<ClassDogsProps> {
  handleTrashIconClick = async (id: number) => {
    try {
      await Requests.deleteDog(id);
      this.props.onDogDelete(id);
      toast.success("Dog deleted");
    } catch (error) {
      toast.error("Failed to delete dog");
      console.error("Failed to delete dog:", error);
    }
  };

  handleHeartClick = async (dog: YourDogType) => {
    try {
      const updatedDog = { ...dog, isFavorite: !dog.isFavorite };
      const updatedDogResponse = await Requests.updateDog(
        updatedDog.id,
        updatedDog,
      );
      this.props.onDogUpdate(updatedDogResponse);
      toast.success(
        `Dog ${
          updatedDogResponse.isFavorite
            ? "moved to favorites"
            : "moved to non-favorites"
        }`,
      );
    } catch (error) {
      toast.error("Failed to update dog");
      console.error("Failed to update dog:", error);
    }
  };

  render() {
    const { dogs, isLoading } = this.props;

    return (
      <div className="dog-list">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => this.handleTrashIconClick(dog.id)}
            onHeartClick={() => this.handleHeartClick(dog)}
            onEmptyHeartClick={() => this.handleHeartClick(dog)}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  }
}

export default ClassDogs;
