export type userRole = "Admin" | "Delivery";

export interface UserInterface {
  id: number;
  name: string;
  lastName: string;
  role: string;
  password: string;
  createdAt: string;
  email: string;
}
