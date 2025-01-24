export type Community =
  | "History"
  | "Food"
  | "Pets"
  | "Health"
  | "Fashion"
  | "Exercise"
  | "Others";

export const CommunityMap: Record<Community, string> = {
  History: "History",
  Food: "Food",
  Pets: "Pets",
  Health: "Health",
  Fashion: "Fashion",
  Exercise: "Exercise",
  Others: "Others",
};

export type User = {
  id: number;
  username: string;
  posts?: Post[];
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  community: Community;
  comment_count: number;
  author: User;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  comment_num: number;
};

export type Comment = {
  id: number;
  content: string;
  author: User;
  post: Post;
  createdAt: Date;
  updatedAt: Date;
};
