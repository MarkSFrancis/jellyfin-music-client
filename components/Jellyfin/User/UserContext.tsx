import { useAppSelector } from "../../../store";

export const useUser = () => useAppSelector((state) => state.userState);
