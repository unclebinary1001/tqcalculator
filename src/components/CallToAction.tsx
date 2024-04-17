import {
  Box,
  Text,
  Flex,
  Button,
  Card,
  Grid,
  Container,
  Space,
} from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FactorsProps {
  title: string;
  description: string;
  shortform: string;
  route: string;
}

const factors: FactorsProps[] = [
  {
    title: "F/P",
    description: "Single payment compound amount",
    shortform: "(F/P, i%, n)",
    route: "/factors/fp",
  },
  {
    title: "F/A",
    description: "Uniform series compound amount",
    shortform: "(F/A, i%, n)",
    route: "/factors/fa",
  },
  {
    title: "F/G",
    description: "Uniform gradient compound amount",
    shortform: "(F/G, i%, n)",
    route: "/factors/fg",
  },
  {
    title: "P/F",
    description: "Single payment present worth",
    shortform: "(P/F, i%, n)",
    route: "/factors/pf",
  },
  {
    title: "P/A",
    description: "Uniform series present worth",
    shortform: "(P/A, i%, n)",
    route: "/factors/pa",
  },
  {
    title: "P/G",
    description: "Uniform gradient present worth",
    shortform: "(P/G, i%, n)",
    route: "/factors/pg",
  },
  {
    title: "A/F",
    description: "Uniform series sinking fund",
    shortform: "(A/F, i%, n)",
    route: "/factors/af",
  },

  {
    title: "A/P",
    description: "Uniform series capital recovery",
    shortform: "(A/P, i%, n)",
    route: "/factors/ap",
  },

  {
    title: "A/G",
    description: "Uniform gradient uniform series",
    shortform: "(A/G, i%, n)",
    route: "/factors/ag",
  },
];

const FactorsList = () => {
  return (
    <Container size={"lg"}>
      <Grid gutter={"xl"}>
        {factors.map((factor) => (
          <Grid.Col
            span={{ base: 12, xs: 6, md: 4 }}
            style={{ alignItems: "center", justifySelf: "center" }}
            key={factor.title}
          >
            <Factors key={factor.title} {...factor} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

const Factors = ({ title, description, shortform, route }: FactorsProps) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Card
      shadow="sm"
      padding="md"
      radius="lg"
      w={"auto"}
      h={{ base: 'auto', xs: 200 }}
      withBorder
      style={{ borderColor: theme.colors.brand[4] }}
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

      <Text size="sm" mb={5}>
        {description}
      </Text>
      <Text size="sm" style={{fontStyle: "italic"}} mb={2}>
        {shortform}
      </Text>
      <Space h={{ base: 10, xs:20, sm:30}} />

      <Button
        radius="xl"
        w={"100%"}
        variant="outline"
        color={theme.colors.brand[2]}
        onClick={() => navigate(route)}
      >
        Calculate
      </Button>
    </Card>
  );
};

export function CallToAction() {
  const [active, setActive] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <Box
        className="call-to-action"
        p={40}
        h={"auto"}
        mx={{ base: 20, xs: 20, md: 40, lg: 60, xl: 80 }}
        style={{
          marginTop: 50,
          marginBottom: 50,
          borderRadius: 30,
          background: "linear-gradient(90deg, #4527A0 0%, #673ab7 100%)",
        }}
      >
        <Text
          size={"md"}
          style={{ color: theme.colors.brand[8] }}
          w={{ base: "auto", xs: "50%" }}
          h={70}
        >
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
        <Button
          radius="xl"
          variant="outline"
          display={"none"}
          color={theme.colors.brand[2]}
        >
          Formulas
        </Button>
        <Button
          radius="xl"
          variant="outline"
          display={"none"}
          color={theme.colors.brand[2]}
        >
          Excel Functions
        </Button>
      </Flex>
      <Box>
        <FactorsList />
      </Box>
    </>
  );
}
