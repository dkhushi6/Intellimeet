export type EventType = {
  _id: string;
  title: string;
  longDescription: string;
  shortDescription: string;
  image: string;
  visitCount: number;
  date: Date;
  startTime: string;
  endTime: string;
  price: number;
  discountPrice: number;
  createdById: string;
  occupancy: string;
  category: string;
  isPublic: boolean;
  isOffline: boolean;
  location: {
    address: string;
    placeId: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
};
