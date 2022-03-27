import { UserDto } from "@jellyfin/client-axios";
import { atom, useRecoilValue } from "recoil";

export const userAtom = atom<UserDto>({
  key: "user",
  default: undefined,
});

export const useUser = () => useRecoilValue(userAtom);
