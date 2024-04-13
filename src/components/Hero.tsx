import {
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
    <>
    <Flex justify={"space-between"} gap={"sm"}>
      <Image
        src={HeroImg}
        alt={"Mantine hero image"}
        h={550}
        w="auto"
        fit="contain"
      />
      <Container style={{ margin: "auto", width: 600 }}>
        <Title
          order={2}
          size={36}
          fw={600}
          style={{ color: theme.colors.brand[0], letterSpacing: 1 }}
        >
          Enhance Your Engineering Potential
        </Title>
        <Space h={30} />

        <Text size="lg">
          We make engineering economy fun, so that you are ready to achieve your
          goals.
        </Text>
        <Space h={30} />

        <Button radius="xl" size="lg" color={theme.colors.brand[5]}>
          Get Started
        </Button>
      </Container>
    </Flex>
    </>
  );
}
