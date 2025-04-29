import CheckoutInfoCliente from "./CheckoutInfoClient";
import CheckoutSummary from "./CheckoutSummary";
import ButtonAppBar from "../Navbar";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { getProducts } from "../../slices/productSlice";

export default function Checkout() {

    // const {query, setQuery} = useState('');
    // const products = useSelector((state) => state.product.list);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     fetch('http://process.env.REACT_APP_API_URL/all')
    //     .then(response => response.json())
    //     .then(data => dispatch(getProducts(data)))
    // },[dispatch])

    // const handleInputChange = (event) => {
    //     console.clear();
    //         if(event.target.value != ""){
    //             fetch(`http://process.env.REACT_APP_API_URL/products/searchByName/?name=${event.target.value}`)
    //             .then(response => response.json())
    //             .then(data => data.map(producto => {
    //                 console.log("Product ID : " + producto.idProduct + " " + producto.productName)
    //             }));
    //         }
    // }
    

    return (
        <div>
            <ButtonAppBar/>
            <div className="container mt-5">
                <div className="row align-items-start">
                    <div className="col-md-8 ">
                        <CheckoutInfoCliente/>
                    </div>
                    <div className="col-md-4 ">
                        <CheckoutSummary/>
                    </div>
                </div>
            </div>

            {/* <input onChange={handleInputChange}></input> */}
        </div>
    )
}