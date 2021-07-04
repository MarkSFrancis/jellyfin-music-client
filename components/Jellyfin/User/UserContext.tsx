import { UserDto } from "@jellyfin/client-axios";
import { useContext } from "react";
import { createContext } from "react";

const userContext = createContext<UserDto>(undefined);

export const useUser = () => useContext(userContext);

export const UserProvider = userContext.Provider;
