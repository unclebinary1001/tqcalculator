import {
  Box,
  Text,
  Flex,
  Button,
  Card,
  Grid,
  Container,
  Center,
  Space,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { useState } from "react";

interface FactorsProps {
    title: string;
    description: string;
    route: string;
}

const factors: FactorsProps[] = [
    {
        title: "F/P",
        description: "Single payment compound amount",
        route: "/factors/fp"
    },
    {
        title: "F/A",
        description: "Uniform series compound amount",
        route: "/factors/fa"
    },
    {
        title: "F/G",
        description: "Uniform gradient future worth",
        route: "/factors/fg"
    },
    {
        title: "P/F",
        description: "Single payment present worth",
        route: "/factors/pf"
    },
    {
        title: "P/A",
        description: "Uniform series present worth",
        route: "/factors/pa"
    },
    {
        title: "P/G",
        description: "Uniform gradient present worth",
        route: "/factors/pg"
    },
    {
        title: "A/F",
        description: "Uniform series sinking fund",
        route: "/factors/af"
    },
    
    {
        title: "A/P",
        description: "Uniform series capital recovery",
        route: "/factors/ap"
    },
    
    {
        title: "A/G",
        description: "Uniform gradient uniform series",
        route: "/factors/ag"
    },
];

const FactorsList = () => {
    return (
        <Container size={'lg'} >
        <Grid gutter={'xl'}>
            {factors.map((factor) => (
                <Grid.Col span={{base: 12, xs: 6, md:4}} style={{alignItems: 'center', justifySelf: 'center'}} key={factor.title}>
                <Factors key={factor.title} {...factor} />
                </Grid.Col>
            ))}
        </Grid>
        </Container>
    );
}

const Factors = ({ title, description, route }: FactorsProps) => {
  const theme = useMantineTheme();
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      // mx={"auto"}
      w={'auto'}
      h={{base:180, xs:200}}
      withBorder
      style={{ borderColor: theme.colors.brand[3]}}
      mb={"md"}
    >
      <Text
        fw={700}
        size={"md"}
        mt={"xs"}
        mb={"xs"}
        style={{ color: theme.colors.brand[1] }}
      >
        {title}
      </Text>

      <Text size="sm" mb={"xs"}>
        {description}
      </Text>
      <Space h={{base:20, xs:40}} />

      <Button
        radius="xl"
        w={"100%"}
        mt="xs"
        variant="outline"
        color={theme.colors.brand[2]}
      >
        Calculate
      </Button>
    </Card>
  );
}

export function CallToAction() {
  const [active, setActive] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <Box
        className="call-to-action"
        p={40}
        h={"auto"}
        mx={{base:20, xs:20, md:40, lg:60, xl:80}}
        bg={theme.colors.brand[0]}
        style={{
          marginTop: 50,
          marginBottom: 50,
          borderRadius: 30,
          color: "linear-gradient(245deg, #9c27b0 0%, #673ab7 100%);",
        }}
      >
        <Text size="xl" style={{ color: theme.colors.brand[8] }} w={"50%"}>
          All-in-one{" "}
          <span style={{ color: theme.colors.brand[9] }}>
            Engineering Econonomy
          </span>{" "}
          class companion for better grades
        </Text>
      </Box>
      <Text
        id="selection"
        size={"xl"}
        ta={"center"}
        fw={600}
        style={{
          marginBottom: 10,
          color: theme.colors.brand[3],
        }}
      >
        Choose what's right for you
      </Text>

      <Flex
        mih={50}
        gap="md"
        justify="space-around"
        align="center"
        direction="row"
        wrap="wrap"
        mb={50}
      >
        <Button radius="xl" variant="outline" color={theme.colors.brand[2]}>
          Discount Factors
        </Button>
        <Button radius="xl" variant="outline" color={theme.colors.brand[2]}>
          Formulas
        </Button>
        <Button radius="xl" variant="outline" color={theme.colors.brand[2]}>
          Excel Functions
        </Button>
      </Flex>
        <Box>
        <FactorsList />
        </Box>
    </>
  );
}
