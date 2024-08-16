import React, { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { TDogToAddOrUpdate } from "../types";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

interface FunctionalCreateDogFormProps {
  onDogCreate: (newDog: TDogToAddOrUpdate) => Promise<void>;
  isLoading: boolean;
}

const FunctionalCreateDogForm: React.FC<FunctionalCreateDogFormProps> = ({
  onDogCreate,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultSelectedImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      await onDogCreate(newDog);
      setName("");
      setDescription("");
      setImage(defaultSelectedImage);
    } catch (error) {
      toast.error("Failed to create dog");
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
      <label htmlFor="image">Select an Image</label>
      <select
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
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
};

export default FunctionalCreateDogForm;
