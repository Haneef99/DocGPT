import {
  Box,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ListItem = ({ text, bulletColor }: any) => (
  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
    <Box
      sx={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        bgcolor: bulletColor,
        mt: 1.25,
        flexShrink: 0,
      }}
    />
    <Typography level="body-sm" sx={{ color: "neutral.600", lineHeight: 1.6 }}>
      {text}
    </Typography>
  </Stack>
);

const ReleaseNotesModal = ({ open, onClose }: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        aria-labelledby="release-notes-title"
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          border: "1px solid",
          borderColor: "neutral.200",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />

        {/* Modal Header */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <AutoAwesomeIcon sx={{ color: "#8b5cf6", fontSize: "1.5rem" }} />
          <Typography id="release-notes-title" level="title-lg" fontWeight="lg">
            Release Notes
          </Typography>
        </Stack>

        <Stack spacing={4}>
          {/* Current Functionalities Section */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <CheckCircleOutlineIcon
                sx={{ color: "#10b981", fontSize: "1.25rem" }}
              />
              <Typography level="title-md" fontWeight="lg">
                Current Functionalities
              </Typography>
            </Stack>
            <Box sx={{ pl: 0.5 }}>
              <ListItem
                text="Document upload and processing upto 2MB"
                bulletColor="#10b981"
              />
              <ListItem
                text="Real-time intelligent search across documents"
                bulletColor="#10b981"
              />
            </Box>
          </Box>

          <Typography level="title-md" fontWeight="lg">
            Note:
            <Typography
              level="body-sm"
              sx={{
                color: "neutral.600",
                lineHeight: 1.6,
                paddingLeft: "10px",
              }}
            >
              Current deployment is running on free tier, so please expect the app to be slow.
            </Typography>
          </Typography>

          {/* Upcoming Functionalities Section */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              <AutoAwesomeIcon sx={{ color: "#8b5cf6", fontSize: "1.25rem" }} />
              <Typography level="title-md" fontWeight="lg">
                Upcoming Functionalities
              </Typography>
            </Stack>
            <Box sx={{ pl: 0.5 }}>
              <ListItem
                text="Collaborative workspace with shared knowledge bases"
                bulletColor="#8b5cf6"
              />
              <ListItem
                text="Chat history support once the app gets user base"
                bulletColor="#8b5cf6"
              />
              <ListItem
                text="Upgraded infrastructure for improved performance once the app gains 50 users"
                bulletColor="#8b5cf6"
              />
            </Box>
          </Box>
        </Stack>

        {/* Footer */}
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="body-xs" sx={{ color: "neutral.500" }}>
              Version 0.1.0 - Initial Release
            </Typography>
            <Typography level="body-xs" sx={{ color: "neutral.500" }}>
              March 2026
            </Typography>
          </Stack>
        </Box>
      </ModalDialog>
    </Modal>
  );
}

export default ReleaseNotesModal;