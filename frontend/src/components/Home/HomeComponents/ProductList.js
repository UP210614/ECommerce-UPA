import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import './ProductList.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/products/getProductsHome`);
        const data = await response.json();
        const productsWithRating = data.map(product => ({
          ...product,
          rating: generateRandomRating()
        }));
        setProducts(productsWithRating);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const generateRandomRating = () => {
    const rating = Math.floor(Math.random() * 5) + 1;
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <ProductItem
            key={product.idProduct}
            id={product.idProduct}
            imageSrc={ "/" + product.productImageRoute}
            altText={`Producto ${product.idProduct}`}
            title={product.productName}
            rating={product.rating}
            price={`$${product.unitPrice}`}
          />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={handleNextPage} disabled={indexOfLastProduct >= products.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
