import React from "react";
import { Anchor, Center, Footer } from "@mantine/core";

const CustomFooter = (): JSX.Element => {
  return (
    <Footer height={40} p="xs">
      <Center>
        <Anchor href={"https://github.com/lawclaw"}>Vinh Phat Tu</Anchor>&nbsp;
        &copy; 2023
      </Center>
    </Footer>
  );
};

export default CustomFooter;
