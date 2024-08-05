import React, { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";
import { YourDogType } from "../types";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormProps {
  onDogCreate: (newDog: YourDogType) => void;
}

interface ClassCreateDogFormState {
  name: string;
  description: string;
  picture: string;
  isLoading: boolean;
}

class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  constructor(props: ClassCreateDogFormProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
      picture: defaultSelectedImage,
      isLoading: false,
    };
  }

  handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<
      ClassCreateDogFormState,
      keyof ClassCreateDogFormState
    >);
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, picture } = this.state;

    if (!name || !description || !picture) {
      toast.error("Please fill out all fields.");
      return;
    }

    this.setState({ isLoading: true });
    try {
      const newDog = await Requests.postDog({ name, description, picture });
      this.props.onDogCreate(newDog);
      this.setState({
        name: "",
        description: "",
        picture: defaultSelectedImage,
      });
      toast.success("Dog created");
    } catch (error) {
      console.error("Failed to create dog:", error);
      toast.error("Failed to create dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { name, description, picture, isLoading } = this.state;
    return (
      <form id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={this.handleChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          id="description"
          name="description"
          cols={80}
          rows={10}
          value={description}
          onChange={this.handleChange}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          name="picture"
          value={picture}
          onChange={this.handleChange}
          disabled={isLoading}>
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" value="Create Dog" disabled={isLoading} />
      </form>
    );
  }
}

export default ClassCreateDogForm;
