import { useState, useEffect } from "react";
import FunctionalCreateDogForm from "./FunctionalCreateDogForm";
import FunctionalDogs from "./FunctionalDogs";
import FunctionalSection from "./FunctionalSection";
import { Requests } from "../api";
import { TDog, TDogToAddOrUpdate } from "../types";
import { Toaster, toast } from "react-hot-toast";

export type TActiveTab = "all" | "favorite" | "unfavorite" | "create";

export function FunctionalApp() {
  const [activeTab, setActiveTab] = useState<TActiveTab>("all");
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = async () => {
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
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
  const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

  const handleDogUpdate = async (updatedDog: TDog) => {
    setIsLoading(true);
    try {
      await Requests.updateDog(updatedDog.id, updatedDog);
      await fetchDogs();
      toast.success("Dog updated");
    } catch (error) {
      toast.error("Failed to update dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDogDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(id);
      await fetchDogs();
      toast.success("Dog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDogCreate = async (newDog: TDogToAddOrUpdate) => {
    setIsLoading(true);
    try {
      await Requests.postDog(newDog);
      await fetchDogs();
      toast.success("Dog created successfully");
    } catch (error) {
      toast.error("Failed to create dog");
    } finally {
      setIsLoading(false);
    }
  };

  const dogList: Record<TActiveTab, TDog[]> = {
    all: dogs,
    favorite: favoritesDogs,
    unfavorite: unfavoritesDogs,
    create: [],
  };

  const handleTabClick: (tab: TActiveTab) => void = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? "all" : tab));
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Toaster />
      <FunctionalSection
        activeTab={activeTab}
        setActiveTab={handleTabClick}
        favoriteCount={favoritesDogs.length}
        unfavoriteCount={unfavoritesDogs.length}>
        {activeTab !== "create" && (
          <FunctionalDogs
            dogs={dogList[activeTab]}
            onDogUpdate={handleDogUpdate}
            onDogDelete={handleDogDelete}
            isLoading={isLoading}
          />
        )}
        {activeTab === "create" && (
          <FunctionalCreateDogForm
            onDogCreate={handleDogCreate}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}

export default FunctionalApp;
