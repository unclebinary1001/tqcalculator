import {
  Text,
  Box,
  useMantineTheme,
  Flex,
  Title,
  Space,
  Divider,
} from "@mantine/core";

function Footer() {
  const theme = useMantineTheme();

  return (
    <Box
      ta={{ base: "center", xs: "left" }}
      bg={theme.colors.brand[1]}
      w={"100%"}
      px={40}
      py={20}
    >
      <Flex
        direction={{ base: "column", xs: "row" }}
        align={{ base: "center", xs: "center" }}
        justify={{ base: "center", xs: "space-around" }}
      >
        <Box p={0}>
          <Text
            fw={700}
            style={{
              fontSize: "1.5rem",
              fontFamily: "Aldrich, sans-serif",
              color: theme.colors.brand[8],
            }}
          >
            TQ
          </Text>
          <Text
            fw={600}
            style={{
              fontFamily: "Aldrich, sans-serif",
              color: theme.colors.brand[8],
            }}
          >
            Calculator
          </Text>
          <Text
            style={{
              fontFamily: "Aldrich, sans-serif",
              color: theme.colors.brand[11],
            }}
          >
            aka Turnquest Calculator
          </Text>
        </Box>

        <Space w={"20%"} display={{ base: "none", xs: "block" }} />
        <Space h={40} display={{ base: "block", xs: "none" }} />
        <Box style={{ color: theme.colors.brand[8] }}>
          <Title order={4} mb={4}>
            Links
          </Title>
          <Text size="sm">About Us</Text>
          <Text size="sm">Contribute</Text>
          <Text size="sm">
            Contact Us:{" "}
            <a
              href="mailto:queries@tqcalculator.app"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              queries@tqcalculator.app
            </a>
          </Text>
        </Box>
        <Space h={30} display={{ base: "block", xs: "none" }} />
      </Flex>
      <Space h={10} />
      <Divider color={theme.colors.brand[11]} />
      <Space h={10} />
      <Text size="xs" style={{ color: theme.colors.brand[11] }}>
        ©{new Date().getFullYear()}, TQ Calculator. All Rights Reserved
      </Text>
    </Box>
  );
}

export default Footer;
