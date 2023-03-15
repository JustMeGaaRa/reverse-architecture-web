import { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { Header, Footer } from "../../components";
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";

export const Home: FC = () => {
    return (
        <>
            <Header />

            <Flex direction={"column"} p={4}>
                <HeroSection />
                <FeatureSection />
            </Flex>

            <Footer />
        </>
    );
}
