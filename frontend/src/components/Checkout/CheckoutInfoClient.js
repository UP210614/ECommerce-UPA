import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../slices/cartSlice";

export default function CheckoutInfoCliente() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const clientData = useSelector((state) => state.client);
    const isAuthenticated = useSelector((state) => state.client.isAuthentificated);

    const [postalCode, setPostalCode] = useState("");
    const [isPostalCodeValid, setIsPostalCodeValid] = useState(true);

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        cardType: "",
        cardName: "",
        cardCVV: "",
        cardExpiry: ""
    });

    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCardCVVValid, setIsCardCVVValid] = useState(true);
    const [isCardExpiryValid, setIsCardExpiryValid] = useState(true);

    const [address, setAddress] = useState({
        street: "",
        streetNumber: "",
        apartment : "",
        country: "",
        countryState: "",
        zipcode: ""
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

    const username = 'ecommerceupa'; // Reemplaza con tu nombre de usuario de GeoNames

    useEffect(() => {
        fetch(`http://api.geonames.org/countryInfoJSON?username=${username}`)
            .then(response => response.json())
            .then(data => setCountries(data.geonames || []))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const fetchStates = (countryCode) => {
        fetch(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=${username}`)
            .then(response => response.json())
            .then(data => setStates(data.geonames || []))
            .catch(error => console.error('Error fetching states:', error));
    };

    const handleCountryChange = (e) => {
        const selectedCountry = countries.find(country => country.countryName === e.target.value);
        setAddress({ ...address, country: selectedCountry.countryName, countryState: "" });
        fetchStates(selectedCountry.geonameId);
    };

    const handlePostalCodeChange = (e) => {
        onChangeAddress(e);
        const { value } = e.target;
        const regex = /^[0-9]{0,5}$/;
        if (regex.test(value)) {
            setPostalCode(value);
            setIsPostalCodeValid(value.length === 5);
        }
    };

    const handleCardNumberChange = (e) => {
        onChangePaymentInfo(e);
        const { value } = e.target;
        const regex = /^[0-9]{0,16}$/;
        if (regex.test(value)) {
            setPaymentInfo({ ...paymentInfo, cardNumber: value });
            setIsCardNumberValid(value.length === 16);
        }
    };

    const handleCardCVVChange = (e) => {
        onChangePaymentInfo(e);
        const { value } = e.target;
        const regex = /^[0-9]{0,3}$/;
        if (regex.test(value)) {
            setPaymentInfo({ ...paymentInfo, cardCVV: value });
            setIsCardCVVValid(value.length === 3);
        }
    };

    const handleCardExpiryChange = (e) => {
        onChangePaymentInfo(e);
        const { value } = e.target;
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (value.length === 2 && !value.includes('/')) {
            setPaymentInfo({ ...paymentInfo, cardExpiry: value + '/' });
        } else if (regex.test(value)) {
            setPaymentInfo({ ...paymentInfo, cardExpiry: value });
            setIsCardExpiryValid(true);
        } else {
            setPaymentInfo({ ...paymentInfo, cardExpiry: value });
            setIsCardExpiryValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isPostalCodeValid && isCardNumberValid && paymentInfo.cardType && isCardCVVValid && isCardExpiryValid) {
            // Lógica para completar el pedido
            const orderData = {
                idClient: clientData.clientId,
                address: address,
                items: cartItems.map(item => ({
                    idProduct: item.idProduct,
                    size : item.size,
                    unitPrice: item.unitPrice,
                    quantity: item.quantity
                })),
                totalAmount: cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
            };

            try {
                const response = await fetch(`http://${process.env.REACT_APP_API_URL}/orders/addFullOrder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log('Order successfully sent:', result);
                handleClearCart();
                setErrorMessage(""); // Limpiar el mensaje de error si la petición es exitosa
                navigate("/confirmedOrder", {
                    state: {
                        paymentInfo,
                        result
                    }
                });
                
            } catch (error) {
                console.error('Error sending order:', error);
                setErrorMessage("Error sending order: " + error.message); // Actualizar el mensaje de error
                setTimeout(() => {
                    setErrorMessage(""); // Limpiar el mensaje de error después de 5 segundos
                }, 5000);
            }
            console.log("Formulario enviado");
            console.log(address);
        } else {
            console.log("Formulario no válido");
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const onChangeAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const onChangePaymentInfo = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="container">
                <h3>Debes iniciar sesión para continuar</h3>
                <Link style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }} className="btn btn-primary" to="/login">Iniciar sesión</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container">
                <h3>Tu carrito está vacío</h3>
                <Link style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }} className="btn btn-primary" to="/">Ir a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h3>Información Cliente</h3>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" value={clientData.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                </div>
                <hr className="border-2"></hr>
                <h3>Dirección de envío</h3>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Primer nombre</label>
                        <input value={clientData.firstName} type="text" className="form-control" aria-label="First name" disabled />
                    </div>
                    <div className="col">
                        <label className="form-label">Apellidos</label>
                        <input value={clientData.lastName} type="text" className="form-control" aria-label="Last name" disabled />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <label className="form-label">Calle</label>
                        <input name="street" onChange={onChangeAddress} type="text" className="form-control" aria-label="Street" required />
                    </div>
                    <div className="col-3">
                        <label className="form-label">Número</label>
                        <input name="streetNumber" onChange={onChangeAddress} type="text" className="form-control" aria-label="Street number" required />
                    </div>
                    <div className="col-3">
                        <label className="form-label">Apartamento</label>
                        <input name="apartment" onChange={onChangeAddress} type="text" className="form-control" placeholder="(Opcional)" aria-label="Last name" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-5">
                        <label className="form-label">País</label>
                        <select name="country" onChange={handleCountryChange} className="form-select" required>
                            <option value="">Escoger...</option>
                            {countries.map(country => (
                                <option key={country.geonameId} value={country.countryName}>{country.countryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Estado</label>
                        <select name="countryState" onChange={onChangeAddress} className="form-select" required>
                            <option value="">Escoger...</option>
                            {states.map(state => (
                                <option key={state.geonameId} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-3">
                        <label className="form-label">Código postal</label>
                        <input
                            name="zipcode"
                            type="text"
                            className={`form-control ${!isPostalCodeValid ? 'is-invalid' : ''}`}
                            aria-label="código postal"
                            pattern="[0-9]{5}"
                            title="El código postal debe tener 5 dígitos"
                            value={postalCode}
                            onChange={handlePostalCodeChange}
                            required
                        />
                        {!isPostalCodeValid && (
                            <div className="invalid-feedback">
                                El código postal debe tener 5 dígitos.
                            </div>
                        )}
                    </div>
                </div>
                <hr className="border-2"></hr>
                <h3>Información de Pago</h3>
                <div className="mb-3">
                    <label className="form-label">Número de tarjeta</label>
                    <input
                        name="cardNumber"
                        type="text"
                        className={`form-control ${!isCardNumberValid ? 'is-invalid' : ''}`}
                        aria-label="Número de tarjeta"
                        pattern="[0-9]{16}"
                        title="El número de tarjeta debe tener 16 dígitos"
                        value={paymentInfo.cardNumber}
                        onChange={handleCardNumberChange}
                        required
                    />
                    {!isCardNumberValid && (
                        <div className="invalid-feedback">
                            El número de tarjeta debe tener 16 dígitos.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre en la tarjeta</label>
                    <input
                        name="cardName"
                        type="text"
                        className="form-control"
                        aria-label="Nombre en la tarjeta"
                        value={paymentInfo.cardName}
                        onChange={onChangePaymentInfo}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">CVV</label>
                    <input
                        name="cardCVV"
                        type="text"
                        className={`form-control ${!isCardCVVValid ? 'is-invalid' : ''}`}
                        aria-label="CVV"
                        pattern="[0-9]{3}"
                        title="El CVV debe tener 3 dígitos"
                        value={paymentInfo.cardCVV}
                        onChange={handleCardCVVChange}
                        required
                    />
                    {!isCardCVVValid && (
                        <div className="invalid-feedback">
                            El CVV debe tener 3 dígitos.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de expiración (MM/YY)</label>
                    <input
                        name="cardExpiry"
                        type="text"
                        className={`form-control ${!isCardExpiryValid ? 'is-invalid' : ''}`}
                        aria-label="Fecha de expiración"
                        placeholder="MM/YY"
                        pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                        title="La fecha de expiración debe estar en formato MM/YY"
                        value={paymentInfo.cardExpiry}
                        onChange={handleCardExpiryChange}
                        maxLength="5"
                        required
                    />
                    {!isCardExpiryValid && (
                        <div className="invalid-feedback">
                            La fecha de expiración debe estar en formato MM/YY.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo de tarjeta</label>
                    <select
                        name="cardType"
                        className="form-select"
                        value={paymentInfo.cardType}
                        onChange={onChangePaymentInfo}
                        required
                    >
                        <option value="">Escoger...</option>
                        <option value="VISA">VISA</option>
                        <option value="MasterCard">MasterCard</option>
                    </select>
                </div>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <hr className="border-2"></hr>
                <div className="d-flex justify-content-between mb-5">
                    <Link className="text-decoration-none text-secondary" to="/cart">{"<"} Regresar al carrito</Link>
                    <button style={{ backgroundColor: "#d74a2b", borderColor: "#d74a2b" }} type="submit" className="btn btn-primary">Completar el pedido</button>
                </div>
            </form>
        </div>
    );
}
