import {
  ActionIcon,
  AppShell,
  Button,
  Flex,
  Header,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import * as React from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { spotifyTopTracks } from "./Atoms";
import { fetchTopTracks } from "./Requests";
import AlbumCard from "./components/AlbumCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const CLIENT_ID = "21168700292d4cfcb4a8fa87f7aa7ba1";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash: string): any => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  return paramsInUrl.reduce((accumulater: any, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
};

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const spotifyLogin = (): void => {
  window.location.href = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};
export default function HomePage(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [topTracks, setTopTracks]: any[] = useRecoilState(spotifyTopTracks);

  useEffect(() => {
    if (window.location.hash.length > 0) {
      const results = getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", results.access_token);
    }
  }, []);

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Flex
            gap="xs"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Text>Song Displayer</Text>
            <Button
              onClick={(event) => {
                spotifyLogin();
              }}
            >
              Log in
            </Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                fetchTopTracks(setTopTracks);
              }}
            >
              Top 50 Songs
            </Button>
            <ActionIcon
              variant="default"
              onClick={() => {
                toggleColorScheme();
              }}
              size={30}
            >
              {colorScheme === "dark" ? (
                <IconSun size="1rem" />
              ) : (
                <IconMoonStars size="1rem" />
              )}
            </ActionIcon>
          </Flex>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <ResponsiveMasonry>
        <Masonry gutter={"10px"}>
          {topTracks?.map((track: any, index: number) => {
            console.log(track);
            return (
              <AlbumCard
                key={index}
                rank={index}
                imageLinks={track.album.images}
                artistName={track.artists[0].name}
                trackName={track.name}
                height={getRandomIntInclusive(200, 500)}
                width={0}
                playLinks={track.external_urls}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </AppShell>
  );
}
