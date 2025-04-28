import './Banner.css';
export default function Carrousell() {
  return (
    
    <div>
      <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src=".\Images\Banners\pic1.png"
            alt="Oferta imagen 1"
            className="d-block w-100"
            style={{ width: '1450px', height: '550px', objectFit: 'cover' }}
          />
        </div>
        <div className="carousel-item">
          <img
            src=".\Images\Banners\pic2.png"
            alt="Oferta imagen 2"
            className="d-block w-100"
            style={{ width: '1450px', height: '550px', objectFit: 'cover' }}
          />
        </div>
        <div className="carousel-item">
          <img
            src=".\Images\Banners\pic3.png"
            alt="Oferta imagen 3"
            className="d-block w-100"
            style={{ width: '1450px', height: '550px', objectFit: 'cover' }}
          />
        </div>
        <div className="carousel-item">
          <img
            src=".\Images\Banners\pic4.png"
            alt="Oferta imagen 3"
            className="d-block w-100"
            style={{ width: '1450px', height: '550px', objectFit: 'cover' }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div className="moving-banner">
      <div className="moving-banner-content">
        <span>NUEVAS PRUEBAS &nbsp; NUEVAS OFERTAS &nbsp; NUEVAS PRUEBAS &nbsp;  </span>
        <span>NUEVAS PRUEBAS &nbsp; NUEVAS OFERTAS &nbsp; NUEVAS PRUEBAS &nbsp;   </span>
        <span>NUEVAS PRUEBAS &nbsp; NUEVAS OFERTAS &nbsp; NUEVAS PRUEBAS &nbsp;   </span>
        <span>NUEVAS PRUEBAS &nbsp; NUEVAS OFERTAS &nbsp; NUEVAS PRUEBAS &nbsp;   </span>
        <span>NUEVAS PRUEBAS &nbsp; NUEVAS OFERTAS &nbsp; NUEVAS PRUEBAS &nbsp;   </span>
      </div>
    </div>
    </div>
  );
}
