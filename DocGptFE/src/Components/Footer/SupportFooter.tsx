import { Box, Link, Typography } from "@mui/joy";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";

const SupportFooter = () => {
  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        borderTop: "1px solid",
        borderColor: "neutral.200",
        backgroundColor: "background.surface",
        mt: "auto", // Helps push it to the bottom if the parent is a flex column
      }}
    >
      <BugReportOutlinedIcon
        sx={{ color: "neutral.500", fontSize: "1.2rem" }}
      />
      <Typography level="body-sm" textColor="text.tertiary">
        Encountered a bug or have feedback? Please mail to:
      </Typography>
      <Link
        href="mailto:haneefsk996@gmail.com?subject=DOCGpt Bug Report"
        level="body-sm"
        fontWeight="lg"
        color="primary"
      >
        Support
      </Link>
    </Box>
  );
};


export default SupportFooter;