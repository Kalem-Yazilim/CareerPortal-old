export interface Content {
  id?: string;
  type: 'video' | 'slideshow' | 'exam' | 'overview' | 'summary' | 'document';
  isCompleted?: boolean;
  data?: any;
}
