import { useState } from "react";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy";
import { useUploadDocumentMutation } from "../../Redux/Api/RootApi";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const UploadNew = () => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setStatusMessage("File is too large. Max size is 5MB.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatusMessage("");
      
      const result = await uploadDocument(formData).unwrap();
      console.log(result);
      setStatusMessage(`Successfully uploaded: ${file.name}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setStatusMessage("Upload failed. Please try again.");
      console.log(file.name, file.size);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="soft"
        color="neutral"
        disabled={isLoading}
        sx={{ width: "100%" }}
        startDecorator={
          isLoading ? (
            <CircularProgress size="sm" color="neutral" />
          ) : (
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          )
        }
      >
        {isLoading ? "Uploading..." : "Upload a file"}

        <VisuallyHiddenInput
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </Button>

      {statusMessage && (
        <Typography
          level="body-sm"
          color={
            statusMessage.includes("failed") || statusMessage.includes("large")
              ? "danger"
              : "success"
          }
        >
          {statusMessage}
        </Typography>
      )}
      <Typography
        level="body-xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centers it under the button
          gap: 0.5,
          marginTop: 1.5,
          color: "rgba(0, 0, 0, 0.45)", // Muted, transparent white for glassmorphism
          fontWeight: "md",
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: "1rem", opacity: 0.8 }} />
        Supported formats: PDF, DOC, DOCX (Max 2MB)
      </Typography>
    </div>
  );
};

export default UploadNew;