import { Component } from "react";
import ClassCreateDogForm from "./ClassCreateDogForm";
import ClassDogs from "./ClassDogs";
import ClassSection from "./ClassSection";
import { Requests } from "../api";
import { YourDogType } from "../types";

interface ClassAppState {
  activeTab: string;
  dogs: YourDogType[];
  isLoading: boolean;
  favoriteCount: number;
  unfavoriteCount: number;
}

class ClassApp extends Component<object, ClassAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      activeTab: "all",
      dogs: [],
      isLoading: false,
      favoriteCount: 0,
      unfavoriteCount: 0,
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
      this.updateCounts(fetchedDogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  updateCounts = (dogs: YourDogType[]) => {
    const favoriteCount = dogs.filter((dog) => dog.isFavorite).length;
    const unfavoriteCount = dogs.filter((dog) => !dog.isFavorite).length;
    this.setState({ favoriteCount, unfavoriteCount });
  };

  handleDogUpdate = (updatedDog: YourDogType) => {
    this.setState((prevState) => {
      const dogs = prevState.dogs.map((dog) =>
        dog.id === updatedDog.id ? updatedDog : dog,
      );
      this.updateCounts(dogs);
      return { dogs };
    });
  };

  handleDogDelete = (id: number) => {
    this.setState((prevState) => {
      const dogs = prevState.dogs.filter((dog) => dog.id !== id);
      this.updateCounts(dogs);
      return { dogs };
    });
  };

  handleDogCreate = (newDog: YourDogType) => {
    this.setState((prevState) => {
      const dogs = [...prevState.dogs, newDog];
      this.updateCounts(dogs);
      return { dogs };
    });
  };

  setActiveTab = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  renderContent = () => {
    const { activeTab, dogs, isLoading } = this.state;
    switch (activeTab) {
      case "favorite":
        return (
          <ClassDogs
            dogs={dogs.filter((dog) => dog.isFavorite)}
            onDogUpdate={this.handleDogUpdate}
            onDogDelete={this.handleDogDelete}
            isLoading={isLoading}
          />
        );
      case "unfavorite":
        return (
          <ClassDogs
            dogs={dogs.filter((dog) => !dog.isFavorite)}
            onDogUpdate={this.handleDogUpdate}
            onDogDelete={this.handleDogDelete}
            isLoading={isLoading}
          />
        );
      case "create":
        return <ClassCreateDogForm onDogCreate={this.handleDogCreate} />;
      default:
        return (
          <ClassDogs
            dogs={dogs}
            onDogUpdate={this.handleDogUpdate}
            onDogDelete={this.handleDogDelete}
            isLoading={isLoading}
          />
        );
    }
  };

  render() {
    const { activeTab, favoriteCount, unfavoriteCount } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          activeTab={activeTab}
          setActiveTab={this.setActiveTab}
          favoriteCount={favoriteCount}
          unfavoriteCount={unfavoriteCount}>
          {this.renderContent()}
        </ClassSection>
      </div>
    );
  }
}

export default ClassApp;
