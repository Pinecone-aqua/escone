export interface UserType {
  username: string;
  image?: string;
  email: string;
  role: boolean;
  favorites?: string[];
  created_date: Date;
}
