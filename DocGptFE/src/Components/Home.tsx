import Header from "./Header/Header"
import Upload from "./UploadSection/Upload";
import "./Home.css";
import { useGetSecureHelloQuery } from "../Redux/Api/RootApi";

const Home = () => {

  const { data } = useGetSecureHelloQuery();

  console.log(data);
  

    return (
      <div className="wrapper">
        <Header></Header>
        <div>
            <Upload/>
        </div>
      </div>
    );
}

export default Home;