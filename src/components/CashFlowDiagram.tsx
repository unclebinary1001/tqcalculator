import {
  useMantineTheme,
  Container,
  Button,
  Space,
  Textarea,
  Group,
  Text,
} from "@mantine/core";
import { useState } from "react";

function limitWordCount(str: string, wordLimit: number): string {
    const words = str.split(" ").filter(Boolean);
    const limitedWords = words.slice(0, wordLimit);
    return limitedWords.join(' ');
  }

function CashFlowDiagram() {
  const theme = useMantineTheme();
  const [statement, setStatement] = useState("");
  const WORD_LIMIT = 500;

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
  return (
    <Container>
      <Textarea
        placeholder="Enter your cash flow statement here"
        label="Cash Flow Statement"
        value={statement}
        onChange={(e) => handleStatementChange(e)}
        minRows={4}
        maxRows={7}
        autosize
        required
      />
      <Group pos={"relative"} mt="xs">
        <Text size="sm" style={{ color: theme.colors.brand[6] }}>
          {statement.split(/\s+/).filter(Boolean).length} / {WORD_LIMIT} words
        </Text>
      </Group>
      <Space h="lg" />
      <Button
        radius="xl"
        variant="filled"
        color={theme.colors.brand[4]}
        mb={"md"}
      >
        Generate Diagram
      </Button>
    </Container>
  );
}

export default CashFlowDiagram;
