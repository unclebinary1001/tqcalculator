import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import HeroImg from "../../public/hero_img.png";

export function Hero() {
  const theme = useMantineTheme();
  return (
    <Box>
    <Flex direction={{base: 'column', xs: 'row'}} justify={{base:"space-between"}} gap={"sm"}>
      <Image
        src={HeroImg}
        alt={"Mantine hero image"}
        h={{base: "auto", xs: "auto"}}
        w={{base:"auto", xs:"50%"}}
        fit="cover"
      />
      <Container style={{ margin: "auto" }}>
        <Title
          order={2}
          fw={{base: 'md', md:'lg'}}
          style={{ color: theme.colors.brand[0], letterSpacing: 1 }}
        >
          Enhance Your Engineering Potential
        </Title>
        <Space h={30} />

        <Text fw={{base:'md'}}>
          We make engineering economy fun, so that you are ready to achieve your
          goals.
        </Text>
        <Space h={30} />

        <Button radius="xl" size="lg" color={theme.colors.brand[5]}>
          Get Started
        </Button>
      </Container>
    </Flex>
    </Box>
  );
}
