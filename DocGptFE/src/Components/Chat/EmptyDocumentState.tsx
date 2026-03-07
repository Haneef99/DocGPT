import { Sheet, Box, Typography, Avatar, IconButton } from "@mui/joy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const EmptyDocumentState = () => {
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
    </Sheet>
  );
};

export default EmptyDocumentState;
