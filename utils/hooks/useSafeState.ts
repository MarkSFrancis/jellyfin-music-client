import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useIsMounted } from "./useIsMounted";

export const useSafeState = <S>(
  initialState?: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState<S>(initialState);
  const isMountedRef = useIsMounted();

  const updateState = useCallback(
    (dispatch: SetStateAction<S>) => {
      if (isMountedRef.current) {
        setState(dispatch);
      }
    },
    [isMountedRef]
  );

  return [state, updateState];
};
