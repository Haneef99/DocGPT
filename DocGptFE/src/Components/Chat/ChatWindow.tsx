import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  Box,
  Typography,
  Input,
  Button,
  CircularProgress,
} from "@mui/joy";
import type { DocumentItem } from "../../Redux/Api/RootApi";
import { useSearchDocumentsMutation } from "../../Redux/Api/RootApi";

const ChatWindow = ({ document }: { document: DocumentItem }) => {
  const [inputValue, setInputValue] = useState("");
  // 1. Extract isLoading from the mutation hook
  const [searchDocument, { isLoading }] = useSearchDocumentsMutation();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Welcome. This assistant answers questions using information from ${document.filename}. Please enter your query to begin.`,
      sender: "api",
    },
  ]);

  // Optional: Auto-scroll to bottom when new messages arrive
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newUserMsg = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    try {
      const result = await searchDocument({
        query: inputValue,
        top_k: 4,
      }).unwrap();
      const content = {
        id: Date.now() + 1,
        text: result.results[0].content,
        sender: "api",
      };
      setMessages((prev) => [...prev, content]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, something went wrong. Please try again.",
          sender: "api",
        },
      ]);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: "100%",
        height: "710px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "md",
        overflow: "hidden",
      }}
    >
      {/* Chat History Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "background.surface",
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
              }}
            >
              <Sheet
                variant={isUser ? "solid" : "soft"}
                color={isUser ? "primary" : "neutral"}
                sx={{
                  p: 1.5,
                  maxWidth: "70%",
                  borderRadius: "lg",
                  borderTopRightRadius: isUser ? 0 : "lg",
                  borderTopLeftRadius: !isUser ? 0 : "lg",
                }}
              >
                <Typography
                  level="body-sm"
                  textColor={isUser ? "common.white" : "text.primary"}
                  sx={{ overflowWrap: "break-word", wordBreak: "break-word" }}
                >
                  {msg.text}
                </Typography>
              </Sheet>
            </Box>
          );
        })}

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Sheet
              variant="soft"
              color="neutral"
              sx={{
                p: 1.5,
                borderRadius: "lg",
                borderTopLeftRadius: 0,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CircularProgress size="sm" color="neutral" />
              <Typography level="body-sm" textColor="text.secondary">
                Thinking...
              </Typography>
            </Sheet>
          </Box>
        )}

        <div ref={chatEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.body",
        }}
      >
        <Input
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          sx={{ flex: 1 }}
        />
        <Button
          onClick={handleSend}
          color="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          Send
        </Button>
      </Box>
    </Sheet>
  );
};

export default ChatWindow;
