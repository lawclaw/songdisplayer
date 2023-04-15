import React from "react";
import {
  Badge,
  Grid,
  MantineProvider,
  Modal,
  Paper,
  type Sx,
  Title,
} from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import "@fontsource/libre-baskerville";
import { Spotify } from "react-spotify-embed";
import { useRecoilValue } from "recoil";
import { mantineColorScheme } from "../atoms/Atoms";

export interface AlbumCardProps {
  imageLinks: Array<Record<string, unknown>>;
  artistName: string;
  trackName: string;
  rank: number;
  height: number;
  width: number;
  playLinks: Record<string, unknown>;
}

const AlbumCard = (props: AlbumCardProps): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);
  const colorScheme = useRecoilValue(mantineColorScheme);

  const { hovered, ref } = useHover();

  const url = `${
    hovered ? "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))," : ""
  } url(${props.imageLinks[0].url as string})`;

  const paperStyles: Sx = {
    backgroundImage: url,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    cursor: "pointer",
  };

  return (
    <MantineProvider
      theme={{
        colorScheme,
        headings: { fontFamily: "Libre Baskerville, serif" },
      }}
    >
      <Modal opened={opened} onClose={close}>
        <Spotify wide link={String(props.playLinks.spotify)} />
      </Modal>
      <Paper
        ref={ref}
        withBorder
        shadow="md"
        p="lg"
        radius="md"
        sx={paperStyles}
        h={props.height}
        onClick={() => {
          open();
        }}
      >
        <Grid>
          <Grid.Col span={12}>
            <Badge color="red" size="xl" variant={"filled"}>
              {props.rank + 1}
            </Badge>
          </Grid.Col>
          {hovered ? (
            <>
              <Paper radius={"md"}>
                <Grid.Col span={12}>
                  <Title>{props.trackName}</Title>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Title italic size={"h2"} weight={300}>
                    {props.artistName}
                  </Title>
                </Grid.Col>
              </Paper>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Paper>
    </MantineProvider>
  );
};

export default AlbumCard;
