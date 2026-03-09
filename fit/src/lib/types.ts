export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  content: string;
}

export type PostMeta = Omit<Post, "content">;

export interface TagCount {
  tag: string;
  count: number;
}
