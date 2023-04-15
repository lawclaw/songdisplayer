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

export interface AlbumCardProps {
  imageLinks: any[];
  artistName: string;
  trackName: string;
  rank: number;
  height: number;
  width: number;
  playLinks: any;
}

const AlbumCard = (props: AlbumCardProps): JSX.Element => {
  const [opened, { open, close }] = useDisclosure(false);

  const { hovered, ref } = useHover();
  const url = `${
    hovered ? "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))," : ""
  } url(${props.imageLinks[0].url as string})`;
  return (
    <MantineProvider
      theme={{
        headings: { fontFamily: "Libre Baskerville, serif" },
      }}
    >
      <Modal opened={opened} onClose={close}>
        <Spotify wide link={props.playLinks.spotify} />
      </Modal>
      <Paper
        ref={ref}
        withBorder
        shadow="md"
        p="lg"
        radius="md"
        sx={
          {
            backgroundImage: url,
            backgroundRepeat: "no-repeat",
            width: "100%",
            display: "block",
            cursor: "pointer",
          } satisfies Sx
        }
        h={props.height}
        onClick={(event) => {
          open();
        }}
      >
        <Grid>
          <Grid.Col span={12}>
            <Badge
              color="dark"
              size="xl"
              variant={hovered ? "light" : "filled"}
            >
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
                  <Title size={"h2"}>{props.artistName}</Title>
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
