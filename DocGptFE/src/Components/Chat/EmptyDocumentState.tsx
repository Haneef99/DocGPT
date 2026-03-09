import { Sheet, Box, Typography, Avatar, IconButton, Modal, ModalDialog, ModalClose, Stack, Divider } from "@mui/joy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useState } from "react";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const EmptyDocumentState = () => {

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <Sheet
      variant="soft"
      sx={{
        width: "100%",
        height: "440px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundColor: "background.body",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 400,
          gap: 1.5,
        }}
      >
        {/* Circular Document Icon */}
        <Avatar
          variant="soft"
          color="neutral"
          sx={{ width: 64, height: 64, mb: 1, backgroundColor: "neutral.100" }}
        >
          <DescriptionOutlinedIcon
            sx={{ fontSize: 32, color: "neutral.600" }}
          />
        </Avatar>

        {/* Title */}
        <Typography level="h4" fontWeight="lg">
          No Document Selected
        </Typography>

        {/* Subtitle */}
        <Typography level="body-md" textColor="text.tertiary" sx={{ mb: 2 }}>
          Select a document from the sidebar to start chatting and retrieve
          relevant information.
        </Typography>

        {/* Status Indicator */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "neutral.400",
            }}
          />
          <Typography level="body-sm" textColor="text.tertiary">
            Choose a document to begin
          </Typography>
        </Box>
      </Box>

      {/* Floating Help Button */}
      <IconButton
        variant="solid"
        color="neutral"
        onClick={() => setIsHelpOpen(true)}
        sx={{
          position: "absolute",
          bottom: 24,
          right: 24,
          borderRadius: "50%",
          width: 48,
          height: 48,
          backgroundColor: "#212121",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#424242",
          },
        }}
      >
        <QuestionMarkIcon />
      </IconButton>

      {/* DOCGpt Help Modal */}
      <Modal open={isHelpOpen} onClose={() => setIsHelpOpen(false)}>
        <ModalDialog
          aria-labelledby="help-modal-title"
          aria-describedby="help-modal-description"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />

          <Stack spacing={2}>
            {/* Modal Header */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar variant="soft" color="primary">
                <AutoFixHighIcon />
              </Avatar>
              <Typography id="help-modal-title" level="h4" fontWeight="lg">
                What is DocGPT? 🧠
              </Typography>
            </Stack>

            <Divider />

            {/* Explanation */}
            <Typography
              id="help-modal-description"
              level="body-md"
              textColor="text.secondary"
            >
              Think of DocGPT as your hyper-caffeinated, speed-reading
              assistant. Powered by <strong>RAG</strong> (Retrieval-Augmented
              Generation), it doesn't just guess answers—it scours the exact
              documents you select to fetch precise, context-aware facts. You
              upload the knowledge; DocGPT connects the dots.
            </Typography>

            <Typography level="title-md" fontWeight="lg" sx={{ mt: 1 }}>
              Quirky & Genius Ways to Use It:
            </Typography>

            {/* Use Cases */}
            <Stack spacing={1.5} sx={{ pl: 1 }}>
              <Box>
                <Typography level="title-sm" fontWeight="bold">
                  ⚖️ The "Did I Sign My Life Away?" Checker
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  Upload that 50-page Terms of Service PDF and ask, "Am I
                  agreeing to give up my firstborn?" (Usually no, but it's good
                  to check).
                </Typography>
              </Box>

              <Box>
                <Typography level="title-sm" fontWeight="bold">
                  🍳 The Recipe Rescuer
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  Feed it grandma's sprawling 200-page diary-recipe book and
                  just ask, "How much salt goes in the lasagna?!" Cut the lore,
                  get the pour.
                </Typography>
              </Box>

              <Box>
                <Typography level="title-sm" fontWeight="bold">
                  🥷 The Meeting Ninja
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  Upload a raw, chaotic transcript of an hour-long meeting and
                  ask, "What is actually required of me by Friday?" Instant
                  action items.
                </Typography>
              </Box>

              <Box>
                <Typography level="title-sm" fontWeight="bold">
                  🧙‍♂️ The Lore Master
                </Typography>
                <Typography level="body-sm" textColor="text.secondary">
                  Throw in your D&D campaign notes or a giant fantasy novel and
                  ask, "Wait, who is the guy with the red scar again?" and keep
                  your story straight.
                </Typography>
              </Box>
            </Stack>

            {/* Call to Action */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "background.level1",
                borderRadius: "sm",
                textAlign: "center",
              }}
            >
              <Typography level="body-sm" fontWeight="md">
                Ready to unleash the magic? Close this window and select a
                document!
              </Typography>
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
};

export default EmptyDocumentState;
