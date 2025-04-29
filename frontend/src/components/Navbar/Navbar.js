import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css"; // Archivo CSS para los estilos personalizados
import { useSelector } from "react-redux";
import ScrollToTopButton from "./ScrollButton";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signin";
  const cartItems = useSelector((state) => state.cart.items);
  const isClientAuth = useSelector((state) => state.client.isAuthentificated);
  const clientName = useSelector((state) => state.client.firstName);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://${process.env.REACT_APP_API_URL}/products/searchByName/?name=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error("Error fetching search results:", error));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      navigate(`/productPage/${searchResults[highlightedIndex].idProduct}`);
    }
  };

  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlightedIndex(-1);
  };

  const handleResultClick = (id) => {
    navigate(`/productPage/${id}`);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/gato.png" alt="Cart Icon" className="large-icon" />
          </a>
        </div>
        {!isLoginPage && (
          <div className="search" ref={searchRef}>
            <input
              type="text"
              placeholder="Búsqueda de productos"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button type="submit">
              <img src="/search.png" alt="Search" />
            </button>
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result, index) => (
                  <li
                    key={result.idProduct}
                    className={`search-result-item ${index === highlightedIndex ? "highlighted" : ""}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleResultClick(result.idProduct)}
                  >
                    {result.productName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="nav-icons">
          <a href="/cart" className="cart-icon">
            <img src="/shopping-cart.png" alt="Cart" />
            {cartItems.length === 0 ? (
              <></>
            ) : (
              <span className="badge">{cartItems.length}</span>
            )}
          </a>
          <div className="user-info">
            <a href="/login" className="text-special">
              <img src="/user.png" alt="Account" />
              {isClientAuth ? clientName : "Login"}
            </a>
          </div>
        </div>
      </nav>
      <ScrollToTopButton /> {/* Incluir el botón de scroll hacia arriba */}
    </>
  );
}
