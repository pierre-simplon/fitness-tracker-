export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  imagePath?: string;
  state?: 'completed' | 'cancelled' | 'editing' | null;
}
