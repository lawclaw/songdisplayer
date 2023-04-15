import { atom, type RecoilState } from "recoil";
import { type ColorScheme } from "@mantine/core";

export const spotifyTopTracks: RecoilState<any> = atom({
  key: "topTracks",
  default: [],
});

export const mantineColorScheme: RecoilState<ColorScheme> = atom({
  key: "colorScheme",
  default: "dark" as ColorScheme,
});
