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
  Modal,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import CustomLineChart from "./CustomLineChart";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { FeedbackModal } from "./FeedbackModal";

function limitWordCount(str: string, wordLimit: number): string {
  const words = str.split(" ").filter(Boolean);
  const limitedWords = words.slice(0, wordLimit);
  return limitedWords.join(" ");
}


function CashFlowDiagram() {
  const theme = useMantineTheme();
  const [statement, setStatement] = useState("");
  const [llmResponse, setResponse] = useState("");
  const WORD_LIMIT = 500;
  const [visible, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isPositiveFeedback, setisPositiveFeedback] = useState(false);

  const handleFeedbackClick = (isPositive: boolean) => {
    setisPositiveFeedback(isPositive);
    setShowFeedbackModal(true);
  };

  const handleCloseModal = () => {
    setShowFeedbackModal(false);
  };

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

  const promptLLM = async (statement: string) => {
    try {
      const prompt = `Given the statement below to generate a cash flow digram:
                ${statement}
                I want you to return the following information:
                - Year Number
                - Cash Flow Amount (If the amount is a cash inflow, return the amount as a positive float number. If the amount is a cash outflow, return the amount as a negative float number)
                - an explanation for what you did to generate the cash flow diagram data
                Write a response in the following JSON format:
                {
                  "cashFlowDiagram": [
                    {
                      "year": "int",
                      "amount": "float"
                    }
                  ],
                  "explanation": "string"
                }
                Here are guidelines I want you to follow:
                - Only return the JSON format given to you
                - If you are not sure about what value to insert, write the year or amount as 0
                `;
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
            messages: [
              {
                role: "user",
                content: `<|begin_of_text|>
                <|start_header_id|>system<|end_header_id|>
                You are a higly intellligent engineering economy AI assistant with specialization in Cash Flow Diagrams
                <|eot_id|>
                <|start_header_id|>user<|end_header_id|>
                {{ ${prompt}}}
                 <|eot_id|>
                 <|start_header_id|>assistant<|end_header_id|>`,
              },
            ],
            temperature: 0.0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setResponse(json["choices"][0]["message"]["content"]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGenerateButton = async () => {
    setResponse("");
    setIsLoading(true);
    open();
    await promptLLM(statement);
    setIsLoading(false);
    close();
  };
  return (
    <Container>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1}
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
        <Group justify="space-between" mt="xs">
          <Text size="sm" style={{ color: theme.colors.brand[6] }}>
            {statement.split(/\s+/).filter(Boolean).length} / {WORD_LIMIT} words
          </Text>
          {llmResponse.length !== 0 && (
            <Group>
              <Text size="sm" style={{ color: theme.colors.brand[6] }}>
                Please leave your feedback:
              </Text>
              <IconThumbUp
                style={{ cursor: "pointer" }}
                stroke={2}
                color={theme.colors.brand[12]}
                onClick={() => handleFeedbackClick(true)}
              />
              <IconThumbDown
                style={{ cursor: "pointer" }}
                stroke={2}
                color={theme.colors.brand[12]}
                onClick={() => handleFeedbackClick(false)}
              />
            </Group>
          )}
          {showFeedbackModal && (
            <FeedbackModal
              isPositive={isPositiveFeedback}
              onClose={() => handleCloseModal()}
            />
          )}
        </Group>
        <Space h="md" />
      </Box>

      <Group justify="center" mt="md">
        <Button
          radius="xl"
          variant="filled"
          color={theme.colors.brand[9]}
          mb={"md"}
          disabled={statement.length === 0 || isLoading}
          onClick={() => handleGenerateButton()}
        >
          Generate Diagram
        </Button>
      </Group>
      {llmResponse.length !== 0 && (
        <>
          <CustomLineChart data={JSON.parse(llmResponse).cashFlowDiagram} />
          <Space h="xl" />
          <Text size="lg" style={{ color: theme.colors.brand[5] }}>
            Explanation:
          </Text>
          <Text mb={"xl"} style={{ color: theme.colors.brand[6] }}>
            {JSON.parse(llmResponse).explanation}
          </Text>
        </>
      )}
      <Space h="xl" />
    </Container>
  );
}

export default CashFlowDiagram;
