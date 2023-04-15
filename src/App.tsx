import * as React from "react";
import HomePage from "./components/HomePage";
import {
  type ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useRecoilState } from "recoil";
import { mantineColorScheme } from "./atoms/Atoms";

export default function App(): JSX.Element {
  const [colorScheme, setColorScheme] = useRecoilState(mantineColorScheme);
  const toggleColorScheme = (value?: ColorScheme): void => {
    setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));
  };
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <HomePage />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
