import { Component } from "react";
import ClassCreateDogForm from "./ClassCreateDogForm";
import ClassDogs from "./ClassDogs";
import ClassSection from "./ClassSection";
import { Requests } from "../api";
import { TDog, TDogToAddOrUpdate } from "../types";
import { Toaster, toast } from "react-hot-toast";

export type TActiveTab = "all" | "favorite" | "unfavorite" | "create";

interface ClassAppState {
  activeTab: TActiveTab;
  dogs: TDog[];
  isLoading: boolean;
}

class ClassApp extends Component<object, ClassAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      activeTab: "all",
      dogs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchDogs();
  }

  fetchDogs = async () => {
    this.setState({ isLoading: true });
    try {
      const fetchedDogs = await Requests.getAllDogs();
      this.setState({ dogs: fetchedDogs });
    } catch (error) {
      toast.error("Failed to fetch dogs");
      console.error("Failed to fetch dogs:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDogUpdate = async (updatedDog: TDog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog(updatedDog.id, updatedDog);
      await this.fetchDogs();
      toast.success("Dog updated");
    } catch (error) {
      toast.error("Failed to update dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDogDelete = async (id: number) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(id);
      await this.fetchDogs();
      toast.success("Dog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleDogCreate = async (newDog: TDogToAddOrUpdate) => {
    this.setState({ isLoading: true });
    try {
      await Requests.postDog(newDog);
      await this.fetchDogs();
      toast.success("Dog created successfully");
    } catch (error) {
      toast.error("Failed to create dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleTabClick = (tab: TActiveTab) => {
    this.setState((prevState) => ({
      activeTab: prevState.activeTab === tab ? "all" : tab,
    }));
  };

  renderContent = () => {
    const { activeTab, dogs, isLoading } = this.state;
    const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
    const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

    const dogList: Record<TActiveTab, TDog[]> = {
      all: dogs,
      favorite: favoritesDogs,
      unfavorite: unfavoritesDogs,
      create: [],
    };

    return activeTab !== "create" ? (
      <ClassDogs
        dogs={dogList[activeTab]}
        onDogUpdate={this.handleDogUpdate}
        onDogDelete={this.handleDogDelete}
        isLoading={isLoading}
      />
    ) : (
      <ClassCreateDogForm
        onDogCreate={this.handleDogCreate}
        isLoading={isLoading}
      />
    );
  };

  render() {
    const { activeTab, dogs } = this.state;
    const favoritesDogs = dogs.filter((dog) => dog.isFavorite);
    const unfavoritesDogs = dogs.filter((dog) => !dog.isFavorite);

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <Toaster />
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.handleTabClick}
          favoriteCount={favoritesDogs.length}
          unfavoriteCount={unfavoritesDogs.length}>
          {this.renderContent()}
        </ClassSection>
      </div>
    );
  }
}

export default ClassApp;
