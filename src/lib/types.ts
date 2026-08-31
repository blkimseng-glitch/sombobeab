export interface Food {
  id: string;
  name: string;
  description: string;
  restaurant_id: string;
  cuisine: string;
  category: string;          
  drink_type: string;
  meal_types: string[];
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  preparation_time_minutes: number;
  image_url: string;
  created_at: string;
  created_by: string;
  average_rating: number | null;
  rating_count: number;
  is_trending: boolean;
  popularity_score: number;
  available: boolean;
}