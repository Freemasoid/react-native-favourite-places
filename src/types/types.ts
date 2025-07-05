export type Place = {
  id: string;
  title: string;
  imageUri: string;
  address: string | undefined;
  location: {
    lat: number;
    lng: number;
  };
};

export type PickedLocation = {
  lat: number;
  lng: number;
  address?: string;
};
