export type userRole = "Admin" | "Delivery";

export interface UserInterface {
  id: number;
  name: string;
  lastName: string;
  userRole: string;
}
