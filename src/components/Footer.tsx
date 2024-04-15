import {
  Container,
  Grid,
  Text,
  Box,
  useMantineTheme,
  Image,
  Flex,
  Title,
  Space,
  Divider,
} from "@mantine/core";
import Logo from "/logo_text.png";

function Footer() {
  const theme = useMantineTheme();

  return (
    <Box bg={theme.colors.brand[1]} px={40} py={40}>
      <Flex direction="row" align="center" justify="flex-start">
        <Box p={0}>
          <Text
            size="lg"
            fw={600}
            style={{
              fontFamily: "Aldrich, sans-serif",
              color: theme.colors.brand[8],
            }}
          >
            TQ 
            Calculator
          </Text>
          <Text
            size="md"
            style={{
              fontFamily: "Aldrich, sans-serif",
              color: theme.colors.brand[11],
            }}
          >
            aka TurnQuest Calculator
          </Text>
        </Box>
        <Space w={"50%"}/>
        <Box>
          <Title order={4} style={{ color: theme.colors.brand[8] }}>
            Links
          </Title>
          <Text size="sm" style={{ color: theme.colors.brand[8] }}>About Us</Text>
          <Text size="sm" style={{ color: theme.colors.brand[8] }}>Contribute</Text>
        </Box>
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
