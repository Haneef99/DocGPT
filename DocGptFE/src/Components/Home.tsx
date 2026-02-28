import Header from "./Header/Header"
import Upload from "./UploadSection/Upload";
import "./Home.css";

const Home = () => {

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