export interface Resume {
  id: string;
  title: string;
  lastModified: Date;
  createDate: Date;
  filesCount: number;
  preferred?: boolean;
}
