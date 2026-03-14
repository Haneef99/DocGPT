import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

const SUPPORT_EMAIL = "support@yourdomain.com";

const ErrorState = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
        zIndex: 9999,
        gap: 0,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "1.5px solid #1a1a1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-10px",
            borderRadius: "50%",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: "-20px",
            borderRadius: "50%",
            border: "1px solid rgba(239, 68, 68, 0.08)",
          },
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="15" r="13" stroke="#1a1a1a" strokeWidth="1.4" />
          <line
            x1="15"
            y1="8"
            x2="15"
            y2="17"
            stroke="#1a1a1a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="15" cy="21" r="1.2" fill="#1a1a1a" />
        </svg>
      </Box>

      {/* Status label */}
      <Typography
        sx={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(0,0,0,0.3)",
          mb: 1,
        }}
      >
        System error
      </Typography>

      {/* Heading */}
      <Typography
        level="h3"
        sx={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#1a1a1a",
          letterSpacing: "0.02em",
          mb: 1.5,
        }}
      >
        Something went wrong
      </Typography>

      {/* Body */}
      <Typography
        sx={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "0.82rem",
          color: "rgba(0,0,0,0.5)",
          letterSpacing: "0.03em",
          textAlign: "center",
          maxWidth: 340,
          lineHeight: 1.7,
          mb: 3,
        }}
      >
        We couldn't load your documents. Please refresh to try again. <br />
        If the issue persists, reach out at{" "}
        <Link
          href={`mailto:${SUPPORT_EMAIL}`}
          sx={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "0.82rem",
            color: "#22c55e",
            textDecorationColor: "#22c55e",
            "&:hover": { color: "#16a34a" },
          }}
        >
          {SUPPORT_EMAIL}
        </Link>
      </Typography>

      {/* Refresh button */}
      <Button
        onClick={() => window.location.reload()}
        sx={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "0.78rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          borderRadius: "4px",
          px: 3,
          py: 1,
          border: "1.5px solid #1a1a1a",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
          },
          "&:active": {
            transform: "scale(0.97)",
          },
          transition: "all 0.15s ease",
        }}
      >
        Refresh page
      </Button>
    </Box>
  );
};

export default ErrorState;
