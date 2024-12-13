import { createContext } from "react";

export type userType = {
  id: number;
  name: string;
  role: string;
};
export type userContextType = userType & {
  login: (user: userType) => void;
  logout: () => void;
};

export const UserContext: React.Context<userContextType> =
  createContext<userContextType>({
    id: 0,
    name: "",
    role: "",
    login: () => {},
    logout: () => {},
  });
