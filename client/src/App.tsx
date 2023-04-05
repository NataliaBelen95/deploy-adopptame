import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, NavBar, Landing, Detail, Footer, AboutUs, Users, ProfileApas } from "../src/views"
import { Cards } from './components/Cards/Cards';
import FormApa from './views/FormApa/FormApa';
import FormPets from './views/FormPets/FormPets';
import FormUser from './views/FormUser/FormUser';
import FormEditPet from './views/FormEditPet/FormEditPet';
import FormEditApa from './views/FormEditApa/FormEditApa';
import { Login } from './components/Login/Login';
import Favs from './views/Favs/Favs'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { ApaDashboard } from './components/ApaDashboard/ApaDashboard';
import ForgotPassword from './components/RestorePassword/ForgotPassword';
import { PaymentGateway } from './components/PaymentGateway/PaymentGateway';
import FormReviewApa from './views/FormReviewApa/FormReviewApa';
import { useDispatch, useSelector } from 'react-redux';
import { Reducer } from "./redux/store/store"
import { updateLogueados } from './redux/actions/actions';
import SeeApas from './components/SeeApas/SeeApas';

// import { Navigate } from 'react-router-dom';


function App() {
  const location = useLocation();
  const logueados = useSelector((state: Reducer) => state.Loguins);
  const dispatch = useDispatch()
  // Verifica si la ruta actual es la ruta de inicio ("/")
  const isLandingPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isResetPassword = location.pathname === "/restore-password"


  // console.log(logueados)
  useEffect(() => {
    const storedLogueados = localStorage.getItem('logueados') || '{}';
    dispatch(updateLogueados(JSON.parse(storedLogueados)));
    console.log(storedLogueados)
  }, []);

  useEffect(() => {
    // usa una variable local para actualizar el estado de "logueados" 
    const logueadosJSON = JSON.stringify(logueados);
    localStorage.setItem('logueados', logueadosJSON); // Convierte el objeto a una cadena JSON
  }, [logueados]);
  // Agrega logueados como dependencia


  return (

    <div className='app'>
      {!isLandingPage && !isLoginPage && <NavBar />}


      <main className='main'>
        {/* <Routes>

          <Route path="/" element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/home" element={logueados && (logueados.userType === 'apa' || logueados.userType === "admin" || logueados.userType === "user") ? <Home /> : <Navigate to="/" />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path='/formUser' element={<FormUser />}></Route>
          <Route path="/formApa" element={<FormApa />}></Route>
          <Route path='/usuario/:id' element={logueados && (logueados.userType === 'user' || logueados.userType === "admin") ? <Users /> : <Navigate to="/" />}></Route>
          <Route path='/favorites/:id' element={logueados && logueados.userType === "user" ? <Favs /> : <Navigate to="/" />}></Route>
          <Route path='/myProfileApa/:id' element={logueados && (logueados.userType === 'apa' || logueados.userType === "admin") ? <ProfileApas /> : <Navigate to="/" />}></Route>
          <Route path="/formPet" element={logueados && logueados.userType === "apa" ? <FormPets /> : <Navigate to="/" />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/formEditPet/:petId" element={logueados && logueados.userType === "apa" ? <FormEditPet /> : <Navigate to="/" />}></Route>
          <Route path="/formEditApa/:apaId" element={logueados && logueados.userType === "apa" ? <FormApa /> : <Navigate to="/" />}></Route>
          <Route path='/pets/:category' element={<Cards />}></Route>
          <Route path='/restore-password' element={<ForgotPassword />}></Route>
          <Route path='/dashboardAdmin' element={logueados && logueados.userType === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}></Route>
          <Route path='/dashboardApa' element={logueados && logueados.userType === 'apa' ? <ApaDashboard /> : <Navigate to="/" />}></Route>

        </Routes> */}

        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/aboutUs" element={<AboutUs />}></Route>
          <Route path="/formApa" element={<FormApa />}></Route>
          <Route path="/formPet" element={<FormPets />}></Route>
          <Route path="/formEditPet/:petId" element={<FormEditPet />}></Route>
          <Route path="/formEditApa/:apaId" element={<FormEditApa />}></Route>
          <Route path="/formReviewApa/:apaId" element={<FormReviewApa />}></Route>
          <Route path='/pets/:category' element={<Cards />}></Route>
          <Route path='/formUser' element={<FormUser />}></Route>
          <Route path='/usuario/:id' element={<Users />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/restore-password' element={<ForgotPassword />}></Route>
          <Route path='/favorites/:id' element={<Favs />}></Route>
          <Route path='/myProfileApa/:id' element={<ProfileApas />}></Route>
          <Route path='/dashboardAdmin' element={<AdminDashboard />}></Route>
          <Route path='/dashboardApa' element={<ApaDashboard />}></Route>
          <Route path='/paymentsDonate' element={<PaymentGateway />} ></Route>
          <Route path='/paymentsDonate/nothing' element={<PaymentGateway />} ></Route>
          <Route path='/paymentsDonate/apa' element={<PaymentGateway />} ></Route>
          <Route path="/seeApas" element={<SeeApas />}></Route>
        </Routes>




      </main>

      {!isLandingPage && !isLoginPage && !isResetPassword && <Footer />}
    </div>


  )
}



export default App;