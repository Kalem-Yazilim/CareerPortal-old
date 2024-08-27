export interface Course {
  id: number;
  imgSource: string;
  title: string;
  description: string;
  completedParts: number;
  partCount: number;
  progressPercent: number;
}
