import { useState, useEffect, useCallback } from "react";
import FunctionalCreateDogForm from "./FunctionalCreateDogForm";
import FunctionalDogs from "./FunctionalDogs";
import FunctionalSection from "./FunctionalSection";
import { Requests } from "../api";
import { YourDogType } from "../types";
import { Toaster, toast } from "react-hot-toast";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [dogs, setDogs] = useState<YourDogType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [unfavoriteCount, setUnfavoriteCount] = useState(0);

  const fetchDogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedDogs = await Requests.getAllDogs();
      setDogs(fetchedDogs);
    } catch (error) {
      toast.error("Failed to fetch dogs");
      console.error("Failed to fetch dogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  useEffect(() => {
    const favorites = dogs.filter((dog) => dog.isFavorite).length;
    const unfavorites = dogs.filter((dog) => !dog.isFavorite).length;
    setFavoriteCount(favorites);
    setUnfavoriteCount(unfavorites);
  }, [dogs]);

  const handleDogUpdate = async (updatedDog: YourDogType) => {
    setIsLoading(true);
    try {
      const updatedDogResponse = await Requests.updateDog(
        updatedDog.id,
        updatedDog,
      );
      setDogs((prevDogs) =>
        prevDogs.map((dog) =>
          dog.id === updatedDogResponse.id ? updatedDogResponse : dog,
        ),
      );
      toast.success("Dog updated");
    } catch (error) {
      toast.error("Failed to update dog");
      console.error("Failed to update dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDogDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(id);
      setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
      toast.success("Dog deleted");
    } catch (error) {
      toast.error("Failed to delete dog");
      console.error("Failed to delete dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDogCreate = async (newDog: YourDogType) => {
    setIsLoading(true);
    try {
      const createdDog = await Requests.postDog(newDog);
      setDogs((prevDogs) => [...prevDogs, createdDog]);
      toast.success("Dog created");
    } catch (error) {
      toast.error("Failed to create dog");
      console.error("Failed to create dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "favorite":
        return (
          <FunctionalDogs
            dogs={dogs.filter((dog) => dog.isFavorite)}
            onDogUpdate={handleDogUpdate}
            onDogDelete={handleDogDelete}
            isLoading={isLoading}
          />
        );
      case "unfavorite":
        return (
          <FunctionalDogs
            dogs={dogs.filter((dog) => !dog.isFavorite)}
            onDogUpdate={handleDogUpdate}
            onDogDelete={handleDogDelete}
            isLoading={isLoading}
          />
        );
      case "create":
        return <FunctionalCreateDogForm onDogCreate={handleDogCreate} />;
      default:
        return (
          <FunctionalDogs
            dogs={dogs}
            onDogUpdate={handleDogUpdate}
            onDogDelete={handleDogDelete}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Toaster />
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        favoriteCount={favoriteCount}
        unfavoriteCount={unfavoriteCount}
        dogs={dogs}
        onDogUpdate={handleDogUpdate}
        onDogDelete={handleDogDelete}
        isLoading={isLoading}>
        {renderContent()}
      </FunctionalSection>
    </div>
  );
}

export default FunctionalApp;
