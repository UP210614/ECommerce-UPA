import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonAppBar from '../Navbar/Navbar';
import ProductDetails from './ProductDetails';
import ProductItem from './ProductItem';
import ProductList from '../Home/HomeComponents/ProductList';
import Footer from '../Footer/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/products/getAllInfoProduct/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error); // Agregar manejo de errores
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <ButtonAppBar />
      <div className="container mt-5">
        <div className="row align-items-start">
          <div className="col-md-8">
            <ProductItem images={product.productImages} />
          </div>
          <div className="col-md-4">
            <ProductDetails product={product} />
          </div>
        </div>
        <div className="row align-items-start">
          <div className="container mt-5">
            <ProductList />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
