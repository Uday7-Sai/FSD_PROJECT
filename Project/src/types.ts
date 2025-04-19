export interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  duration: string;
  genre: string;
  rating: string;
  description: string;
  showTimes: string[];
  price: number;
}

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface Theater {
  id: string;
  name: string;
  cityId: string;
  location: string;
  screens: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

export interface User {
  email: string;
  name: string;
}

export interface Ticket {
  id: string;
  movieTitle: string;
  showTime: string;
  seats: string[];
  totalPrice: number;
  purchaseDate: string;
  qrCode: string;
  theater: string;
  city: string;
}