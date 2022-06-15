import { ApiConfig } from "../apiConfig/apiConfigSlice";
import { Track } from "../trackTypes";
import { getTrackSrc } from "./getTrackSrc";

describe("getTrackSrc", () => {
  const apiConfig: ApiConfig = {
    authToken: "auth_token",
    server: {
      url: "https://www.test.com",
    },
  };

  it("should throw an error when no media stream is available", () => {
    expect(() => {
      getTrackSrc(apiConfig, {
        Id: "1",
      } as Track);
    }).toThrowError("Cannot generate streaming URL");
  });

  it("should throw an error when no media stream is available", () => {
    expect(() => {
      getTrackSrc(apiConfig, {
        Id: "1",
      } as Track);
    }).toThrowError("Cannot generate streaming URL");
  });
});
