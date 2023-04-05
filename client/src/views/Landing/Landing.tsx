import React from 'react';
import './Landing.css';
//import perrito from '../../assets/perrito.gif';
import { Link } from 'react-router-dom';
// import { Login } from '../../components/Login/Login';
// import { useState } from 'react';

const Landing: React.FC = () => {

  // const [login, setLogin] = useState<Boolean>(false)

  // const handleButton = () => {
  //   setLogin(true)
  // }

  return (
    <>
      <header className="hero">
        <div className="textos-hero">
          <img className="img_logo" src="https://i.imgur.com/rNsmaGi.png" alt="" />
          <h1>Bienvenido a Appdoptame</h1>
          {/* <p>Necesitamos de tu ayuda, te invitamos a conocer nuestras historias y a que te informes en como poder ayudarnos. */}
          <p>  ¡Ayuda a salvar una vida! Considera adoptar a uno de nuestros animales o donar para apoyar nuestro trabajo.
          </p>
          <button className="boton-landing">
            <Link to="/login" className='linkLanding' >Conocer Más</Link>
          </button>
        </div>
      </header>
    </>
  );
};




export default Landing;
