export interface UserType {
  _id: string;
  username: string;
  image?: string;
  email: string;
  password: string;
  role: boolean;
  favorites?: string[];
  created_date: Date;
}
