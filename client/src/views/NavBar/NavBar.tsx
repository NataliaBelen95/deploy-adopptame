import React from 'react';
import { FiAlignJustify } from 'react-icons/fi'
import imgLogo from '../../assets/logo.png'
import avatarApa from '../../assets/avatarApa.png'
import avatarAdmin from '../../assets/avatarAdmin.png'
import avatarUser from '../../assets/avatarUser.png';
import { Link } from 'react-router-dom'
// import { gapi } from "gapi-script";
import { useState, useEffect } from 'react'
import './NavBar.css'
import { useNavigate } from "react-router-dom";
import { Reducer } from '../../redux/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetLogueados } from '../../redux/actions/actions';
import { AnyAction } from 'redux';

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  const logueados = useSelector((state: Reducer) => state.Loguins);

  useEffect(() => {
    //Verifico si hay un token de usuario en localstorage listo
    const token = localStorage.getItem('token')
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, [])

  const handleFavoritesClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = atob(payload);
      const user = JSON.parse(decodedPayload);
      console.log(user.id);
      navigate(`/favorites/${user.id}`);
    } else {
      console.log("Token no encontrado");
    }

  };


  const handleLogout = async () => {
    localStorage.removeItem("token");
    console.log("Token eliminado: " + localStorage.getItem("token"));
    dispatch(resetLogueados() as any as AnyAction)
    navigate("/")
  };

  //COMENTADO PORQUE NO SE ESTA USANDO POR EL MOMENTOaa!

  // const handleSignOut = () => {
  //   const confirmSignOut = window.confirm(
  //     "¿Estás seguro de que quieres cerrar sesión?"
  //   );
  //   if (confirmSignOut) {
  //     // remove the token from localStorage
  //     localStorage.removeItem("token");
  //     // console.log("Token eliminado: " + localStorage.getItem("token"));
  //     // sign out the user from Google authentication
  //     const auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(function () {
  //       // console.log("Usuario desconectado exitosamente de Google Sign-In");
  //       // navigate to the home page
  //       navigate("/");
  //     });
  //   }
  // };



  return (
    <>
      {logueados.userType === "user" && (
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i><FiAlignJustify /></i>
          </label>
          <Link to='/home' className='link'>
            <img className='logo' src={imgLogo} alt='logo' />
          </Link>
          <ul>

            <li><Link to="/home" className='linkAbout'>Inicio</Link></li>
            <li><Link to="/seeApas" className='linkAbout'>Refugios</Link></li>
            <li><Link to="/aboutUs" className='linkAbout'>Quienes somos</Link></li>

            {isUserLoggedIn ? (
              <>
                <li className='hoverAvatar'>
                  <div className="avatar">
                    <img src={avatarUser} alt="Avatar" />
                    <div className="dropdown">
                      <div className="dropdown-content">
                        
                          <button className='dropbtn'>
                            <Link to={`/usuario/${logueados?.userFound?._id}`}>
                              Mi Perfil
                            </Link>
                          </button>
                        <button className='dropbtn' onClick={handleFavoritesClick}>Favoritos</button>
                        <button className='dropbtn' onClick={handleLogout}>Salir</button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li><Link to='/login' className='linkAbout'>Ingresar</Link></li>
            )}

          </ul>

        </nav>
      )}

      {logueados.userType === "apa" && (
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i><FiAlignJustify /></i>
          </label>
          <Link to='/home' className='link'>
            <img className='logo' src={imgLogo} alt='logo' />
          </Link>
          <ul>
            <li><Link to="/home" className='linkAbout'>Inicio</Link></li>
            <li><Link to="/aboutUs" className='linkAbout'>Quienes somos</Link></li>

            {isUserLoggedIn ? (
              <>
                <li className='hoverAvatar'>
                  <div className="avatar">
                    <img src={avatarApa} alt="Avatar" />
                    <div className="dropdown">
                      <div className="dropdown-content">
                          <button className='dropbtnPerfil'>
                            <Link className='links' to={`/myProfileApa/${logueados?.apaFound?._id}`}>
                              Mi Perfil 
                            </Link>
                          </button>
                        <button className='dropbtn' onClick={handleLogout}>Salir</button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li><Link to='/login' className='linkAbout'>Ingresar</Link></li>
            )}

          </ul>

        </nav>
      )}

      {logueados.userType === "admin" && (
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i><FiAlignJustify /></i>
          </label>
          <Link to='/home' className='link'>
            <img className='logo' src={imgLogo} alt='logo' />
          </Link>
          <ul>
            <li><Link to="/home" className='linkAbout'>Inicio</Link></li>
            <li><Link to="/aboutUs" className='linkAbout'>Quienes somos</Link></li>

            {isUserLoggedIn ? (
              <>
                <li className='hoverAvatar'>
                  <div className="avatar">
                    <img src={avatarAdmin} alt="AvatarAdmin" />
                    <div className="dropdown">
                      <div className="dropdown-content">
                        <Link to={`/dashboardAdmin`}>
                          <button className='dropbtn'>Dashboard</button>
                        </Link>
                        <button className='dropbtn' onClick={handleLogout}>Salir</button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <li><Link to='/login' className='linkAbout'>Ingresar</Link></li>
            )}

          </ul>

        </nav>
      )}

    </>
  );

}

export default NavBar