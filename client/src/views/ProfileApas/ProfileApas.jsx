import React, { useEffect } from 'react';
import { getApaById, getUsers } from '../../redux/actions/actions';
import './ProfileApas.css'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { useParams } from 'react-router-dom';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Reducer } from '../../redux/store/store';
import avatarApa from '../../assets/avatarApa.png'
import { Link } from 'react-router-dom';
import img1 from '../../assets/assetosCarruselPrueba/img1.jpg'
import img2 from '../../assets/assetosCarruselPrueba/img2.jpg'
import img3 from '../../assets/assetosCarruselPrueba/img4.jpg'
import img4 from '../../assets/assetosCarruselPrueba/img5.jpg'
import img5 from '../../assets/assetosCarruselPrueba/img6.jpg'
import fb from '../../assets/logofb.png'
import ig from '../../assets/logoig.png'
import Opinion from './opinion/Opinion'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'

export default function ProfileApas() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const apa = useSelector((state) => state.detailApa)
    const users = useSelector((state) => state.allUsers)
    const logueados = useSelector((state) => state.Loguins);

    useEffect(() => {
        dispatch(getApaById(id))
        dispatch(getUsers)
    }, [id, dispatch])



    const petImages = apa?.pets?.map(pet => pet.image);
    const imagenes = petImages?.filter(image => image !== undefined);


    const images = [img1, img2, img3, img4, img5];



    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    }
const reviewsFiltered= apa.reviews?.slice(0,apa.reviews?.length-1).filter(r=>Object.keys(r).length>1)
   
    console.log(apa.pets, "pets?")
    console.log(apa)

    //sumo los rating
    let sum = reviewsFiltered?.reduce((total, review) => total + Number(review.rating), 0)

    // Verificar que sum sea un número o undefined
    if (typeof sum !== "number") {
        sum = undefined;
    }
    //Saco el promedio
    const prom = reviewsFiltered?.length && sum !== undefined ? sum / reviewsFiltered.length : undefined;

    //guardo el promedio
    const promRating = prom?.toFixed(2);

    const filledStars = promRating ? parseInt(promRating) : 0;
    const emptyStars = promRating ? 5 - parseInt(promRating) : 5;

    
    const opinions = reviewsFiltered
    console.log("esto es reviews", reviewsFiltered)

    // const opinions = [
    //     { id: "1", user: 'Juan', opinion: 'Excelente servicio, lo recomiendo.' },
    //     { id: "2", user: 'Maria', opinion: 'Muy buen trato con las mascotas.' },
    //     { id: "3", user: 'Pedro', opinion: 'Un lugar genial para cuidar a mi mascota.' }
    //   ];
      
const link = `/formReviewApa/${id}`
    return (
        <>
        <div className='containerApaProfile'>
            <div className="containerTitleApa">
                <h1 >{apa.name}</h1>
                <img className='imgApaProfile' src={avatarApa} alt='avatar apa' />
               
            </div>
            <div className="botonesProfile">
            {logueados.userType === "apa" &&
                    <>
                        <button className='botonesApaProfile' ><Link className='letras' to={`/formEditApa/${logueados.apaFound?._id}`}>Editar Datos</Link></button>
                        <button className='botonesApaProfile' ><Link className='letras' to={`/formPet`}>Agregar Mascota</Link></button>
                        <button className='botonesApaProfile'><Link className='letras' to={'/dashboardApa'}>Editar Mascotas</Link></button>
                    </>
            }
            </div>

            <div className='containerDescription'>
                <div className='column'>
                    <h4>Email: {apa.email}</h4>
                    <h4>Cbu/Alias: {apa.cbu_cvu}</h4>
                    <h4>Ubicacion: {apa.location}, {apa.provincia}</h4>
                </div>
                <div className="column">
                    <a href={apa.url}>
                        <img className='logoigfb' src={fb} alt="Logo de Facebook" />
                        <img className='logoigfb' src={ig} alt="Logo de Instagram" />
                    </a>
                    <h4>Telefono: {apa.telephone} </h4>
                    <h4 className='rating'>Rating: {[...Array(filledStars)].map((_, index) => (
                                    <AiFillStar key={index}  />
                                ))}
                                {[...Array(emptyStars)].map((_, index) => (
                                    <AiOutlineStar key={index} />
                                ))} </h4>
                </div>
            </div>
            <div className="containerDescription">
                <p>Descripcion: {apa.description}</p>
            </div>


            {logueados.userType === "user" &&
                <div className='containerBtnDonate'>
                   <Link to={'/paymentsDonate/apa'}> <button><h5> Donar </h5></button></Link>
                </div>}

            {
                apa.pets && apa.pets.length > 0 ? (
                    <div className='containerCarruselperros'>
                <Slider {...settings}>
                    {imagenes?.map((image, index) => (
                        <div key={index}>
                            <img className='imgCarrusel' src={image} alt={`image-${index}`} />

                        </div>
                    ))}

                </Slider>


            </div>
                ) : (
                    <div className='containerCarruselperros'>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img className='imgCarrusel' src={image} alt={`image-${index}`} />

                        </div>
                    ))}

                </Slider>


            </div>
                )
            }
            
            <div className='opinion'>
                <h3>Nuestros usuarios opinan</h3>
                    <Opinion opinions={opinions} />
            </div>

           <a href={link}><button>¡Deja tu opinion!</button></a> 

        </div>

        </>
    )
}