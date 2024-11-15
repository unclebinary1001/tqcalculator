import { Button, Modal, Space, Textarea, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { addItemToFirebase } from "./client";

export const FeedbackModal = ({
  isPositive,
  onClose,
  data,
  prompt,
}: {
  isPositive: boolean;
  onClose: any;
  data: object;
  prompt: string;
}) => {
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async () => {
    try {
      const newItem = {
        ...data,
        prompt: prompt,
        type: isPositive ? "positive" : "negative",
        feedback: feedback,
      };
      await addItemToFirebase(newItem);
      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`${
        isPositive ? "What did we do well?" : "What could we do better"
      }`}
    >
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.currentTarget.value)}
        placeholder="Enter your feedback"
      />
      <Space h="md" />
      <Button onClick={handleSubmit} color={useMantineTheme().colors.brand[6]}>
        Submit
      </Button>
    </Modal>
  );
};
