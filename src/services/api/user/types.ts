import { User } from "../../../types";

export interface UserResponse {
  token: string;
  user: User;
}
