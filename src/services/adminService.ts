import { UserInterface } from "../interfaces/UserInterface";
import usersData from "./users.json";

const users: UserInterface[] = usersData as UserInterface[];

export const getUsers = () => users;
