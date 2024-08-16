export const baseUrl = "http://localhost:3000/dogs";

export const Requests = {
  getAllDogs: async () => {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch dogs with ${response.status}.`);
    }
    return response.json();
  },

  postDog: async (dog: {
    name: string;
    description: string;
    image: string;
    isFavorite: boolean;
  }) => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });

    const data = await response.json();

    if (!response.ok || !data.id) {
      throw new Error(`Failed to create dog with ${response.status}.`);
    }

    return data;
  },

  deleteDog: async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete dog with ${response.status}.`);
    }
  },

  updateDog: async (id: number, dog: { isFavorite?: boolean }) => {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    });

    const data = await response.json();

    if (!response.ok || !data.id) {
      throw new Error(`Failed to update dog with ${response.status}.`);
    }

    return data;
  },

  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
