import { FC } from "react";
import { Box } from "@chakra-ui/react";

import { Header, Footer } from "./layout";
import { HeroSection, FeatureSection } from "./sections";

export const Home: FC = () => {
  return (
    <>
      <Header />

      <Box p={4}>
        <HeroSection />
        <FeatureSection />
      </Box>

      <Footer />
    </>
  );
}
