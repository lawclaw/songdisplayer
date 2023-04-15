import React, { type SetStateAction, type Dispatch } from "react";
import {
  ActionIcon,
  Button,
  type ColorScheme,
  Flex,
  Header,
} from "@mantine/core";
import { IconMoonStars, IconSun, IconVinyl } from "@tabler/icons-react";
import { fetchTopTracks } from "../rest/Requests";

export interface HeaderBarProps {
  setTopTracks: Dispatch<SetStateAction<any[]>>;
  loginFetch: () => void;
  toggleColorScheme: () => void;
  colorScheme: ColorScheme;
}

const HeaderBar = (props: HeaderBarProps): JSX.Element => {
  return (
    <Header height={60} p="xs">
      <Flex
        gap="xs"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <IconVinyl />
        <Button
          onClick={() => {
            props.loginFetch();
          }}
        >
          Log in
        </Button>
        <Button
          onClick={(event) => {
            fetchTopTracks(props.setTopTracks);
          }}
        >
          Show Top 50 Listened Songs
        </Button>
        <ActionIcon
          variant="default"
          onClick={() => {
            props.toggleColorScheme();
          }}
          size={30}
        >
          {props.colorScheme === "dark" ? (
            <IconSun size="1rem" />
          ) : (
            <IconMoonStars size="1rem" />
          )}
        </ActionIcon>
      </Flex>
    </Header>
  );
};

export default HeaderBar;
