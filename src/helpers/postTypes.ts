import { Photo } from "./photoTypes";

export interface PostsPayload {
  description: string;
  photo: Photo;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  description: string;
  createdData: Date;
  authorId: number;
  photo: Photo;
  likers: number[];
}