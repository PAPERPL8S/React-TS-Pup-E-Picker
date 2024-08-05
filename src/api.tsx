export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  getAllDogs: async () => {
    const response = await fetch(`${baseUrl}`);
    if (!response.ok) {
      throw new Error("Failed to fetch dogs");
    }
    return response.json();
  },

  postDog: async (dog: {
    name: string;
    description: string;
    picture: string;
  }) => {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    if (!response.ok) {
      throw new Error("Failed to create dog");
    }
    return response.json();
  },

  deleteDog: async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete dog");
    }
    return response.json();
  },

  updateDog: async (id: number, dog: { isFavorite?: boolean }) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });
    if (!response.ok) {
      throw new Error("Failed to update dog");
    }
    return response.json();
  },

  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
