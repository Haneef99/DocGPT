import Header from "./Header/Header"
import Upload from "./UploadSection/Upload";
import "./Home.css";
import { useGetAllDocumentsQuery } from "../Redux/Api/RootApi";
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

const Home = () => {
  const { error, isLoading } = useGetAllDocumentsQuery();

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
      <div>
        <Upload />
      </div>
    </div>
  );
}

export default Home;