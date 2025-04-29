import Banner from "./HomeComponents/Banner";
import ProductList from "./HomeComponents/ProductList";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

console.log(process.env.REACT_APP_API_URL);
export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-12">
            <div className="banner">
              <Banner />
            </div>
            <div className="container mt-4">
              <ProductList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
