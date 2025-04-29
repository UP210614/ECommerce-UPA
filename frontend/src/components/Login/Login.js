import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setClientInfo, clearClientInfo } from '../../slices/clientSlice';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Login.css';

export default function Login() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.client.isAuthentificated);

  useEffect(() => {
    if (isAuthenticated && !isLoginPage) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, isLoginPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || contraseña === '') {
      setErrorMessage('Todos los campos son obligatorios');
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    setError(false);

    loginClient(email, contraseña);
  };

  const loginClient = async (email, contraseña) => {
    const clientData = {
      email: email,
      password: contraseña,
    };

    try {
      const response = await fetch(`http://${process.env.REACT_APP_API_URL}/clients/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(
          setClientInfo({
            clientId: result.idClient,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            address: result.celular,
          })
        );
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Error al iniciar sesión');
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch (error) {
      setErrorMessage('Error al conectar con el servidor');
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleLogout = () => {
    dispatch(clearClientInfo());
  };

  return (
    <div>
      <Navbar />
      <div className={`login-container ${isLoginPage ? 'login-page' : ''}`}>
        {isAuthenticated ? (
          <div className="login">
            <div className="login-form">
              <h2 className="display-4">Ya has iniciado sesión</h2>
              <button
                onClick={() => navigate("/")}
                className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm form-control"
                style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }}
              >
                Comprar productos
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm form-control"
                style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="login">
            <div className="login-form">
              <h2 className="display-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    id="inputEmail"
                    type="email"
                    placeholder="Email de usuario"
                    required
                    className="form-control rounded-pill border-0 shadow-sm px-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    id="inputPassword"
                    type="password"
                    placeholder="Contraseña"
                    required
                    className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  />
                </div>
                <div className="custom-control custom-checkbox mb-3 text-center">
                  <input
                    id="customCheck1"
                    type="checkbox"
                    className="custom-control-input"
                  />
                  <label htmlFor="customCheck1" className="custom-control-label text-center">
                    Recordar contraseña
                  </label>
                  <p>¿No tienes una cuenta?</p>
                  <p><Link to="/signin">Crea una</Link></p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm form-control"
                  style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }}
                >
                  Iniciar sesión
                </button>
              </form>
              {error && <p className="text-danger text-center">{errorMessage}</p>}
              <div className="text-center mt-3">
                <small className="text-muted">al tiro con el gato</small>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
