import { AppShell, useMantineColorScheme } from "@mantine/core";
import * as React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { spotifyTopTracks } from "../atoms/Atoms";
import {
  fetchTopTracks,
  getReturnedParamsFromSpotifyAuth,
  spotifyLogin,
} from "../rest/Requests";
import HeaderBar from "./HeaderBar";
import CardMasonry from "./CardMasonry";
import CustomFooter from "./CustomFooter";

export default function HomePage(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [topTracks, setTopTracks]: any[] = useRecoilState(spotifyTopTracks);

  useEffect(() => {
    if (window.location.hash.length > 0) {
      const results = getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", results.access_token);
      fetchTopTracks(setTopTracks);
    }
  }, []);

  return (
    <AppShell
      padding="md"
      header={
        <HeaderBar
          setTopTracks={setTopTracks}
          loginFetch={spotifyLogin}
          toggleColorScheme={toggleColorScheme}
          colorScheme={colorScheme}
        />
      }
      footer={<CustomFooter />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[5],
        },
      })}
    >
      <CardMasonry topTracks={topTracks} />
    </AppShell>
  );
}
