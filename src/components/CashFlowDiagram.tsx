import {
  useMantineTheme,
  Container,
  Button,
  Space,
  Textarea,
  Group,
  Text,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

function limitWordCount(str: string, wordLimit: number): string {
  const words = str.split(" ").filter(Boolean);
  const limitedWords = words.slice(0, wordLimit);
  return limitedWords.join(" ");
}

const promptLLM = async (statement: string) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": `${import.meta.env.VITE_SITE_URL}`,
          "X-Title": `${import.meta.env.VITE_SITE_NAME}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [{ role: "user", content: "What is the meaning of life?" }],
        }),
      }
    );
    console.log("Call LLM");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    // TODO: load message content from LLM
    // console.log(json['choices'][0]['message']['content']);
  } catch (error) {
    console.error("Error:", error);
  }
};

function CashFlowDiagram() {
  const theme = useMantineTheme();
  const [statement, setStatement] = useState("");
  const WORD_LIMIT = 500;
  const [visible, { toggle }] = useDisclosure(false);

  const handleStatementChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value;
    const wordCount = newValue.split(/\s+/).filter(Boolean).length;

    if (wordCount <= WORD_LIMIT) {
      setStatement(newValue);
    } else {
      const limitedValue = limitWordCount(newValue, WORD_LIMIT);
      setStatement(limitedValue);
    }
  };

  const handleGenerateButton = () => {
    toggle();
    promptLLM(statement);
  };
  return (
    <Container>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />

        <Textarea
          placeholder="Enter your cash flow statement here"
          label="Cash Flow Statement"
          value={statement}
          size={"md"}
          onChange={(e) => handleStatementChange(e)}
          minRows={4}
          maxRows={7}
          autosize
          required
          styles={{ input: { color: "#808080" } }}
        />
        <Group justify="flex-end" mt="xs">
          <Text size="sm" style={{ color: theme.colors.brand[6] }}>
            {statement.split(/\s+/).filter(Boolean).length} / {WORD_LIMIT} words
          </Text>
        </Group>
        <Space h="xl" />
      </Box>

      <Group justify="center" mt="md">
        <Button
          radius="xl"
          variant="filled"
          color={theme.colors.brand[9]}
          mb={"md"}
          disabled={statement.length === 0}
          onClick={() => handleGenerateButton()}
        >
          Generate Diagram
        </Button>
      </Group>
    </Container>
  );
}

export default CashFlowDiagram;
