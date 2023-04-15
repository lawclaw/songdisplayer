import { atom, type RecoilState } from "recoil";

export const spotifyTopTracks: RecoilState<any> = atom({
  key: "topTracks",
  default: [],
});
