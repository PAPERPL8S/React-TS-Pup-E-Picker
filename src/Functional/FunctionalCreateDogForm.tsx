import React, { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { YourDogType } from "../types";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  onDogCreate: (newDog: YourDogType) => Promise<void>;
}

const FunctionalCreateDogForm: React.FC<FunctionalCreateDogFormProps> = ({
  onDogCreate,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(defaultSelectedImage);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !picture) {
      toast.error("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const newDog: YourDogType = {
        id: 0,
        name,
        description,
        picture,
        isFavorite: false,
        breed: "",
        age: 0,
        image: "",
      };
      await onDogCreate(newDog);
      setName("");
      setDescription("");
      setPicture(defaultSelectedImage);
      toast.success("Dog created successfully");
    } catch (error) {
      toast.error("Failed to create dog");
      console.error("Failed to create dog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        id="description"
        cols={80}
        rows={10}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
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
};

export default FunctionalCreateDogForm;
