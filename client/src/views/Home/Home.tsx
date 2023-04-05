import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom'
import imgAlimento from "../../assets/assetsHome/ImagenesHome/alimento.png"
import imgHome from "../../assets/assetsHome/ImagenesHome/Casita.png"
import imgVacuna from "../../assets/assetsHome/ImagenesHome/vacuna.png"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Reducer } from '../../redux/store/store';
import { useSelector } from 'react-redux'
import { useRef, useEffect } from 'react';
// @ts-ignore
import ScrollReveal from 'scrollreveal';



function Home() {
  const logueados = useSelector((state: Reducer) => state.Loguins);

  //carrusel
  const imgPerros = "https://iaabcjournal.org/wp-content/uploads/2021/02/street-dogs.jpg"
  const imgCats = "https://cdn.colombia.com/sdi/2022/03/22/hablar-gatos-callejeros-metodo-japones-recuperar-mascota-perdida-1009467.jpg"
  const imgOtros = "https://st4.depositphotos.com/12293812/20005/i/600/depositphotos_200058304-stock-photo-rabbit-and-turtle-are-discussing.jpg"
  const images = [imgPerros, imgCats, imgOtros];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  //efectos scroll

  const saberMasRef = useRef(null);
  const divDonarRef = useRef(null);
  const alimentoPngRef = useRef(null);

  useEffect(() => {
    const sr = ScrollReveal({
      duration: 1000,
      reset: true,
    });
    
    if (saberMasRef.current) {
      sr.reveal(saberMasRef.current, {
        origin: 'left',
        distance: '100px',
        delay: 300,
      });
    }

    if (divDonarRef.current && alimentoPngRef.current) {
      sr.reveal([divDonarRef.current, alimentoPngRef.current], {
        origin: 'right',
        distance: '200px',
        delay: 400,
      });
    }
  }, []);


  return (
    <>
       <div className='containerCarruselpets' >
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img className='imgCarruselpets' src={image} alt={`image-${index}`} />
              {index === 0 && (
                <Link className='linkk' to="/pets/perro">
                  <button className='buttonPets'>Perros</button>
                </Link>
              )}
              {index === 1 && (

                <Link className='linkk' to="/pets/gato">
                  <button className='buttonPets'>Gatos</button>
                </Link>

              )}
              {index === 2 && (
                <Link className='linkk' to="/pets/otros">
                  <button className='buttonPets' >Otros</button>
                </Link>

              )}
            </div>
          ))}
        </Slider>
      </div>

      {logueados?.userType !== "apa" &&
        <>
          <section className="info" >
            <div className='divDonar' ref={divDonarRef}>

              <h3 >¿Querés ayudar?</h3>
              <p>
                Tu donación es fundamental para ayudar a los animales que necesitan nuestro cuidado y protección. Con tu aporte,
                podemos proveer atención médica, alimento y refugio a los animales más vulnerables. ¡Sumate a nuestra causa y hacé
                la diferencia!
              </p>

              <Link className="boton_home" to="/paymentsDonate/nothing">
                Donar ahora
              </Link>
            </div>
            <div className='alimentoPng' ref={alimentoPngRef}>
              <img className='imgAlimento' src={imgAlimento} alt="" />
              <div className="contVacuna">
                <img className='vacuna' src={imgVacuna} alt="" />
              </div>
            </div>
          </section>
          <section className="saberMas" ref={saberMasRef}>
            <div className="contImg">
              <img src={imgHome} alt="" />
            </div>
            <div className='divSaberMas'>
              <h3>Sobre Appdoptame</h3>
              <p>
                Si quieres saber más sobre nosotros, nuestra app y nuestra misión, te invitamos a visitar nuestra sección "Quiénes somos". Allí podrás conocer a nuestro equipo y saber cómo puedes unirte a nuestra causa.</p>

              <button className="btns">
                <Link className='button_2' to="/aboutUs">click aquí</Link>
              </button>
            </div>
          </section>
        </>}
    </>
  );
}

export default Home