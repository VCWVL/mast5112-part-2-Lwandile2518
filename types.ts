// Shared types for the MyFoodApp

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: string;
  price: number;
  available: boolean;
}

export interface AveragePrice {
  course: string;
  average: number;
}
