import React, { useEffect, useState } from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js'
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Reducer } from '../../redux/store/store';
import { getDetailPets, botonAyudar } from '../../redux/actions/actions';
import { AnyAction } from 'redux';
import './PaymentGateway.css'
import { ApaDashboard } from '../ApaDashboard/ApaDashboard';
import { User } from "../../redux/types";


const stripePromise: Promise<Stripe | null> = loadStripe("pk_test_51Ms60fDepZWv3l5INkzkVIdajrEumIaxlTdMp7tlnRl5qawy33qKVjYyH90HwrFBxj5ew4tUXYxVPGatdhpD4Wib00MRtIg4p8");

const CheckoutForm = ({ user_id }: { user_id: string | undefined }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [loading, setLoading] =useState(false)
    const cardElement = elements ? elements.getElement(CardElement) : null;
    const [input, setInput] = useState(0)
    const pet = useSelector((state:Reducer)=> state.detail);
    const apa = useSelector((state: Reducer)=> state.detailApa)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(userId);
      console.log(pet.apa?._id);
      if(!stripe || !elements){
        return;
      }
      if (!cardElement) {
        setPaymentError("Error al cargar la información de la tarjeta");
        return;
      }
      const { error, paymentMethod } = await stripe!.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      setLoading(true);

      if (error) {
      setPaymentError(error.message ?? 'Error desconocido');
    } else {
      setPaymentError(null);
      console.log(paymentMethod);
      const {id} =paymentMethod;

            try {
                const {data} = await axios.post('http://localhost:3001/api/checkout', {
                id,
                amount: input*100, //Va en centavos!
                description: pet.apa?.name || "todas las apas"
             })
                console.log(data)
                cardElement.clear()
                const resp = await axios.post('http://localhost:3001/donate/pet', {
                  userId: userId,
                  apaId: pet.apa?._id,
                  amount: input*100
                })
                console.log(userId);
                console.log(pet.apa?._id);
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
  alert("Muchas gracias por su donación")
  navigate(-1);
    }

    const user = useSelector((state: Reducer) => state.detailUser)
    const logueados = useSelector((state: Reducer) => state.Loguins)
    const userId: any = logueados.userFound?._id

    //onClick={() => handleDonateButtonClick(userId)}

    return (
      <>
      <div>
        {window.location.pathname === "/paymentsDonate" && (
          <p id='textPay'>Estás por donar a {pet.apa?.name} que cuidan a {pet.name} </p>  
        )}
        {window.location.pathname === "/paymentsDonate/nothing" && (
          <p id='textPay'>¡Estás a punto de hacer una donación general! </p>  
        )}
       {window.location.pathname === "/paymentsDonate/apa" && (
          <p id='textPay'>¡Estás a punto de hacer una donación a {apa.name}! </p>  
        )}


      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <CardElement className="form-control"/>
        <div >
          <label id='labelPay'>Ingrese monto a donar en dólares($)</label>
        <input min={0} className="input" type="number" value={input} onChange={(e) => setInput(parseInt(e.target.value))} onFocus={(e) => e.target.value === '0' && (e.target.value = '')}/>          
        <button type="submit" className="btnPay" disabled={!stripe || input <= 0}> {loading ? 'Cargando...' : 'Donar' } </button>
        </div>
        {paymentError && (
          <div className="alert alert-danger" role="alert"> 
            {paymentError}
          </div>
        )}
        </div>
      </form>
        </div>
        </>
    );
  };



  export const PaymentGateway = ()  => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const pet = useSelector((state:Reducer)=> state.detail);
    const userId = useSelector((state: Reducer) => state.detailUser._id);
    
    useEffect(() => {
      dispatch(getDetailPets(id!) as unknown as AnyAction);
    }, [id, dispatch]);
  
    return (
      <div className='containerPrincipal'>
        <Elements stripe={stripePromise}>
          <div className='cardPay'>
            <img id='imgPay' src={pet.image ? pet.image : "https://imagenes.elpais.com/resizer/3Te8-EEwo6Q2IhPOOLZe5KGu-78=/1200x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/AMH2ADNVDVDZBOLV2UVWWV4I4E.jpg"}/>
            <CheckoutForm user_id = {userId} /> 
          </div>
        </Elements>
      </div>
    );
  };