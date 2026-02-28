import Header from "./Header/Header"
import { useGetSecureHelloQuery } from "../Redux/Api/RootApi";
import { useEffect } from "react";

const Home = () => {

    const {data, error, isLoading} = useGetSecureHelloQuery();

    useEffect(() => {
        if(!isLoading && !error) {
            console.log("API Response:", data);
        }
    }, [isLoading, error, data]);

    return (
        <Header></Header>
    )
}

export default Home;