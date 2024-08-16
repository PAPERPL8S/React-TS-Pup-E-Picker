import React, { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { TDogToAddOrUpdate } from "../types";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface ClassCreateDogFormProps {
  onDogCreate: (newDog: TDogToAddOrUpdate) => Promise<void>;
  isLoading: boolean;
}

interface ClassCreateDogFormState {
  name: string;
  description: string;
  image: string;
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
      image: defaultSelectedImage,
    };
  }

  handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<
      ClassCreateDogFormState,
      keyof ClassCreateDogFormState
    >);
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description, image } = this.state;

    if (!name || !description || !image) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const newDog: TDogToAddOrUpdate = {
        name,
        description,
        image,
        isFavorite: false,
      };
      await this.props.onDogCreate(newDog);
      this.setState({
        name: "",
        description: "",
        image: defaultSelectedImage,
      });
    } catch (error) {
      toast.error("Failed to create dog");
    }
  };

  render() {
    const { name, description, image } = this.state;
    const { isLoading } = this.props;

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
        <label htmlFor="image">Select an Image</label>
        <select
          id="image"
          name="image"
          value={image}
          onChange={this.handleChange}
          disabled={isLoading}>
          {Object.entries(dogPictures).map(([label, imageValue]) => (
            <option value={imageValue} key={imageValue}>
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
