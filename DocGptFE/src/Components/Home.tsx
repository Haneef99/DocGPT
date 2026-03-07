import Header from "./Header/Header"
import Upload from "./UploadSection/Upload";
import "./Home.css";
import { useGetAllDocumentsQuery, type DocumentItem } from "../Redux/Api/RootApi";
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import ChatWindow from "./Chat/ChatWindow";
import EmptyDocumentState from "./Chat/EmptyDocumentState";
import { useAppSelector } from "../Redux/Store";
import { selectCurrentSelectedDocument } from "../Redux/Slice/DocumentSlice";

const Home = () => {
  const { error, isLoading } = useGetAllDocumentsQuery();
  const currentDocument: DocumentItem | null = useAppSelector(selectCurrentSelectedDocument);

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'background.body',
          zIndex: 9999,
        }}
      >
        <CircularProgress size="lg" variant="solid" color="primary" />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading documents!</div>;
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="doc-content">
        <Upload />
        {
          currentDocument 
          ?
          <ChatWindow document={currentDocument}/>
          :
          <EmptyDocumentState />
        }
      </div>
    </div>
  );
}

export default Home;