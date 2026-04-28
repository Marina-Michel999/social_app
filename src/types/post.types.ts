export interface PostsResponse {
  posts: Post[];
} //!wrong interface
export type postState ={
    posts: null | Post[];
    postComments : null | Comment[]
}
export interface Post {
  _id: string;
  body: string;
  privacy: string;
  user: User;
  sharedPost: Post | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  image: string
  bookmarked: boolean;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount : number
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}