import './FormReviewApa.css';
import petCat from '../../assets/perritoFormPet.png'
import { getApaById, createReview} from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Apa} from "../../redux/types"
import validate from './JSvalidationsFormReviewApa';
import { useParams, useNavigate} from 'react-router-dom';
import { Reducer } from '../../redux/store/store';


function FormReviewApa() { 

    const dispatch = useDispatch()
    const { apaId } = useParams<{ apaId: any }>()
    
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const userId: string= logueados.userFound?.email ?? '' 
    const navigate = useNavigate();
    //userId hardcodeadeo, no 03/04/23: logueados aparece vacío en el Estado Global.
    //const userId: string= '641a281b656802d8aa7a9eed'
    

    useEffect (()=>{
        dispatch(getApaById(apaId)as unknown as AnyAction)
    },[dispatch])

    let apaDetails: Apa= useSelector((state: StateType) => state.detailApa); 
// console.log(apaDetails)


    const [input, setInput] = useState({
    opinion: "",
    rating: "5",
    user: ""
})

    const [errors, setErrors] = useState({
        opinion: "",
        rating: "",
        user: "" 
    })




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
// console.log(input)
// console.log(errors)
// console.log(logueados)
    };


const newReview = {
    ...input,
    user: userId
}

const allReviews = {
    reviews: [...(apaDetails?.reviews ?? []), newReview].map(review => ({
    rating: review?.rating,
    opinion: review?.opinion,
    user: review?.user
  }))};


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createReview(apaId, allReviews) as unknown as AnyAction);
        alert("Muchas gracias por su feedback!")
        navigate(-1);
    }

    const handleDisabledButton = ()=>{
        if(Object.values(input)[0]==="") {
            return true;
        }else if (Object.keys(errors).length>1) {
            return true
        } else{
            return false;
        }
    }


    return (
   <div>
            <div className="containerReview">
                <h1 className='h1Review'>Su experiencia con {apaDetails.name}:</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">

                    <div className="containerInputs">
                            <select id='selectReview' name="rating"
                                onChange={handleInputChange}
                                >
                                    <option value="5" >5</option>
                                    <option value="4" >4</option>
                                    <option value="3" >3</option>
                                    <option value="2" >2</option>
                                    <option value="1" >1</option>
                                    
                            </select>
                            <label className="tam" htmlFor="provincia">Puntaje:</label>
                            {errors.rating && <p className='error'>{errors.rating}</p>}
                        </div>
                        

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="inputReview"
                                name="opinion"
                                value={input.opinion}
                            />
                            <label className="labelReview" htmlFor="opinion">Sus comentarios:</label>
                            {errors.opinion && <p className='errors'>{errors.opinion}</p>}
                        </div>



                        {/* <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="user"
                                value={input.user}
                            />
                            <label className="label" htmlFor="user">User:</label>
                            {errors.user && <p className='errors'>{errors.user}</p>}
                        </div> */}


                    
                    </div>
                   <button className='buttonReview' type="submit" disabled={handleDisabledButton()}>Enviar</button>
                      
                    {/* </div> */}
                </form>
            </div>

            {/* <div className="containerTitle">
                <h1>Editar APA</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div> */}

        </div>
    )
}

export default FormReviewApa;