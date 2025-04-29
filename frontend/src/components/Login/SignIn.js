import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setClientInfo } from '../../slices/clientSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    celular: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    lastName: false,
    firstName: false,
    celular: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.client.isAuthentificated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      lastName: formData.lastName === '',
      firstName: formData.firstName === '',
      celular: formData.celular !== '' && !/^\d{3}[-]?\d{3}[-]?\d{4}$/.test(formData.celular),
      email: formData.email === '',
      password: !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/.test(formData.password),
      confirmPassword: formData.confirmPassword !== formData.password,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const clientData = {
        lastName: formData.lastName,
        firstName: formData.firstName,
        celular: formData.celular,
        email: formData.email,
        password: formData.password,
      };

      try {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/clients/saveClient`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });

        if (response.ok) {
          const result = await response.json();
          dispatch(setClientInfo({
            clientId: result.idClient,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            address: result.celular,
          }));
        } else {
          console.error('Error al guardar el cliente');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor', error);
      }
    } else {
      console.log('Validation failed');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">Apellidos</label>
              <input
                type="text"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <div className="invalid-feedback">Este campo es obligatorio.</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <div className="invalid-feedback">Este campo es obligatorio.</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="celular" className="form-label">Celular</label>
              <input
                type="text"
                className={`form-control ${errors.celular ? 'is-invalid' : ''}`}
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
              />
              {errors.celular && (
                <div className="invalid-feedback">
                  El número de celular debe tener el formato XXX-XXX-XXXX.
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">Este campo es obligatorio.</div>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="btn btn-outline-secondary" onClick={toggleShowPassword}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
                {errors.password && (
                  <div className="invalid-feedback">
                    La contraseña debe tener entre 8 y 20 caracteres, incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  Las contraseñas no coinciden.
                </div>
              )}
            </div>
          </div>
          <button style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }} type="submit" className="btn btn-primary">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
