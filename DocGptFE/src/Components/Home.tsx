import Header from "./Header/Header"
import Upload from "./UploadSection/Upload";
import "./Home.css";
import { useGetAllDocumentsQuery, type DocumentItem } from "../Redux/Api/RootApi";
import ChatWindow from "./Chat/ChatWindow";
import EmptyDocumentState from "./Chat/EmptyDocumentState";
import { useAppSelector } from "../Redux/Store";
import { selectCurrentSelectedDocument } from "../Redux/Slice/DocumentSlice";
import SupportFooter from "./Footer/SupportFooter";
import ServerWakeLoader from "./ServerWakeLoader";
import ErrorState from "./ErrorState";

const Home = () => {
  const { error, isLoading } = useGetAllDocumentsQuery();
  const currentDocument: DocumentItem | null = useAppSelector(selectCurrentSelectedDocument);

  if (isLoading) {
    return (
      <div>
        <ServerWakeLoader/>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorState/>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <div className="doc-content">
        <Upload />
        {
          currentDocument 
          ?
          <ChatWindow/>
          :
          <EmptyDocumentState />
        }
      </div>
      <SupportFooter/>
    </div>
  );
}

export default Home;