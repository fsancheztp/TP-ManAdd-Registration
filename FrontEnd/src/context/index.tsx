import { ManAddUser } from "../types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type UserContext = {
  user: ManAddUser;
  setUser: Dispatch<SetStateAction<ManAddUser>>;
};

const UserContext = createContext<UserContext>({
  user: {
    id: 0,
    userName: "",
  },
  setUser: () => {},
});

const DEFAULT_USER: TPUser = {
  id: 0,
  userName: "Tetra Pak",
};



export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [user, setUser] = useState({
  //   id: 0,
  //   userName: "",
  // });
  const [user, setUser] = useState(DEFAULT_USER);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContext {
  return useContext(UserContext);
}
