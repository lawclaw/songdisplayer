import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import AlbumCard from "./AlbumCard";
import { jsx } from "@emotion/react";
import JSX = jsx.JSX;

export interface CardMasonryProps {
  topTracks: any[];
}

function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const CardMasonry = (props: CardMasonryProps): JSX.Element => {
  return (
    <ResponsiveMasonry>
      <Masonry gutter={"20px"}>
        {props.topTracks?.map((track: any, index: number) => {
          return (
            <AlbumCard
              key={index}
              rank={index}
              imageLinks={track.album.images}
              artistName={track.artists[0].name}
              trackName={track.name}
              height={getRandomIntInclusive(200, 500)}
              width={getRandomIntInclusive(100, 300)}
              playLinks={track.external_urls}
            />
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default CardMasonry;
