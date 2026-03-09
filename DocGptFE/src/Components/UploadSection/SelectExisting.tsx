import { Option, Select, Box, Typography, Chip, ListItemDecorator } from "@mui/joy";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import type { DocumentItem } from "../../Redux/Api/RootApi";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { selectDocuments, setCurrentSelectedDocument } from "../../Redux/Slice/DocumentSlice";
import { useEffect, useState } from "react";

const getTimeAgo = (dateString: string) => {

  const parsed = new Date(dateString);
  let date = parsed;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?$/.test(dateString)) {
    date = new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000);
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${Math.max(0, diffInSeconds)} secs ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hrs ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
};

const getFileDetails = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return { name: filename, ext: 'unknown' };
  
  return {
    name: filename.substring(0, lastDotIndex),
    ext: filename.substring(lastDotIndex + 1).toLowerCase()
  };
};

const getExtStyles = (ext: string) => {
  switch (ext) {
    case 'pdf':
      return { color: 'danger' as const, icon: <PictureAsPdfIcon color="error" /> };
    case 'doc':
    case 'docx':
      return { color: 'primary' as const, icon: <DescriptionIcon color="primary" /> };
    case 'xls':
    case 'xlsx':
    case 'csv':
      return { color: 'success' as const, icon: <DescriptionIcon color="success" /> };
    default:
      return { color: 'neutral' as const, icon: <InsertDriveFileIcon color="action" /> };
  }
};


const SelectExisting = () => {
  const documents: DocumentItem[] = useAppSelector(selectDocuments);
  const dispatch = useAppDispatch();
  const [docID, SetDocId] = useState<string | null>(null);

  const handleSelectChange = (value: string | null) => {
    SetDocId(value);
    dispatch(setCurrentSelectedDocument(documents.find(doc => doc.id === value) || null));
  };

  useEffect(() => {
    console.log("Selected Document ID:", docID);
  }, [docID]);

  return (
    <div>
      <Select 
        placeholder="Choose a document..." 
        value={docID}
        onChange={(_, value) => handleSelectChange(value)}
        sx={{ width: "100%" }}
        renderValue={(selected) => {
          if (!selected) return "Choose a document...";
          const doc = documents.find(d => d.id === selected.value);
          return doc ? getFileDetails(doc.filename).name : "None";
        }}
      >
        <Option value="">None</Option>
        
        {documents.map((doc) => {
          const { name, ext } = getFileDetails(doc.filename);
          const timeAgo = getTimeAgo(doc.uploaded_date);
          const { color, icon } = getExtStyles(ext);

          return (
            <Option 
              value={doc.id} 
              key={doc.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                padding: '10px 12px',
                '&[aria-selected="true"]': {
                  backgroundColor: 'rgba(2, 136, 209, 0.08)',
                }
              }}
            >
              <ListItemDecorator sx={{ alignSelf: 'flex-start', mt: 0.5 }}>
                {icon}
              </ListItemDecorator>

              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography level="title-sm" sx={{ fontWeight: 500 }}>
                  {name}
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {timeAgo}
                </Typography>
              </Box>

              <Chip 
                variant="outlined" 
                color={color} 
                size="sm" 
                sx={{ 
                  borderRadius: 'sm',
                  fontWeight: 'lg',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem'
                }}
              >
                {ext}
              </Chip>
            </Option>
          );
        })}
      </Select>
    </div>
  );
}

export default SelectExisting;