export type CarCategory = 'Economy' | 'SUV' | 'Luxury' | 'Sports' | 'Electric' | 'Van';

export type Car = {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  image: string;
  rating: number;
  available: boolean;
  description: string;
  features: string[];
};

export type Booking = {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  customerName: string;
  customerEmail: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  totalDays: number;
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
};

export type SearchFilters = {
  query: string;
  category: CarCategory | 'All';
  maxPrice: number;
  transmission: 'Any' | 'Automatic' | 'Manual';
};
