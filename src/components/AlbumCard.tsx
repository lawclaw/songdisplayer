import React, { useEffect } from "react";
import { Card, Image } from "@mantine/core";

export interface AlbumCardProps {
  imageLinks: any[];
  artistName: string;
  trackName: string;
  rank: number;
  height: number;
  width: number;
}

const AlbumCard = (props: AlbumCardProps): JSX.Element => {
  useEffect(() => {
    console.log(props.imageLinks[0].url);
  }, []);
  return (
    <Card
      style={{ width: "100%", display: "block" }}
      withBorder
      h={["120%", "100%", "80%"][Math.floor(Math.random() * 3)]}
    >
      <Image src={props.imageLinks[0].url} alt={"hello"} />
    </Card>
  );
};

export default AlbumCard;
