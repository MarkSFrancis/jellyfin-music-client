import { BaseItemDtoQueryResult } from "@jellyfin/sdk/lib/generated-client/models";
import { QueryState, useQuery } from "../../../utils";
import { useUser } from "../User/UserContext";

export const useLibraries = () => {
  const user = useUser();
  const [state] = useQuery("userViews", "getUserViews", [{ userId: user.Id }]);

  return state;
};

export const getMusicLibraries = (
  state: QueryState<BaseItemDtoQueryResult>
) => {
  if (state.status !== "success") {
    return undefined;
  }

  const musicLibraries = state.data.Items.filter(
    (l) => l.CollectionType === "music"
  );

  return musicLibraries.map((l) => ({ id: l.Id, name: l.Name }));
};
