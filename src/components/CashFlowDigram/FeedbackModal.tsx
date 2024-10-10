import { Button, Modal, Space, Textarea, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { addItemToFirebase } from "./client";

export const FeedbackModal = ({
    isPositive,
    onClose,
  }: {
    isPositive: boolean;
    onClose: any;
  }) => {
    const [feedback, setFeedback] = useState("");
    const handleSubmit = async () => {
      try {
        await addItemToFirebase("feedback, isPositive");
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
          title={`${isPositive ? "Positive" : "Negative"} Feedback`}
        >
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.currentTarget.value)}
            placeholder="Enter your feedback"
          />
          <Space h="md" />
          <Button
            onClick={handleSubmit}
            color={useMantineTheme().colors.brand[6]}
          >
            Submit
          </Button>
        </Modal>
    );
  };