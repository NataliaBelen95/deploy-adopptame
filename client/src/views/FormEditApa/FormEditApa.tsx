import './FormEditApa.css';
import petCat from '../../assets/perritoFormPet.png'
import { getApaById, putApa } from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Apa } from "../../redux/types"
import validate from './JSvalidationsFormEditApa';
import { useNavigate, useParams } from 'react-router-dom';

function FormEditApa() {

    const provincias = ["Ciudad Autónoma de Buenos Aires",
        "Catamarca",
        "Chaco",
        "Chubut",
        "Córdoba",
        "Corrientes",
        "Entre Ríos",
        "Formosa",
        "Jujuy",
        "La Pampa",
        "La Rioja",
        "Mendoza",
        "Misiones",
        "Neuquén",
        "Río Negro",
        "Salta",
        "San Juan",
        "San Luis",
        "Santa Cruz",
        "Santa Fe",
        "Santiago del Estero",
        "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
        "Tucumán"]


    const dispatch = useDispatch()
    const { apaId } = useParams<{ apaId: any }>()
    const navigate = useNavigate();
    //Me guardo los details para meterselos al estado local "input"
    let apaDetails: Apa = useSelector((state: StateType) => state.detailApa);

    const [input, setInput] = useState(apaDetails)

    //Me aseguro de q los details de la APA esten cargados en el State Global
    useEffect(() => {
        dispatch(getApaById(apaId) as unknown as AnyAction)
    }, [dispatch])

    useEffect(() => {
        setInput(apaDetails)
    }, [apaDetails])

    const [errors, setErrors] = useState({
        name: '',
        // password:'',
        email: '',
        description: '',
        provincia: '',
        location: '',
        telephone: '',
        cuit: '',
        cbu_cvu: '',
        url: '',
        // image: "Cargue una imagen",
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
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(putApa(apaId, input) as unknown as AnyAction);
        alert("Datos modificados correctamente")
        navigate(-1)
    }

    const handleDisabledButton = () => {
        if (Object.values(input)[0] === "") {
            return true;
        } else if (Object.keys(errors).length > 1) {
            return true
        } else {
            return false;
        }
    }


    return (
        <div className="container">
            <h1>Editar APA:</h1>

            <div className="containerForma">
                <form className='forma' onSubmit={handleSubmit}>
                    <div className="column3">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                value={input.name}
                            />
                            <label className="label" htmlFor="name">Nombre:</label>
                            {errors.name && <p>{errors.name}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="email"
                                value={input.email}
                            />
                            <label className="label" htmlFor="email">Email:</label>
                            {errors.email && <p>{errors.email}</p>}
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                value={input.description}
                            />
                            <label className="label" htmlFor="descripcion">Descripción:</label>
                            {errors.description && <p className='errors'>{errors.description}</p>}
                        </div>
                    </div>

                    <div className="column3">
                        <div className="containerInputs">
                            <select name="provincia"
                                onChange={handleInputChange}
                            >
                                <option value={input.provincia} >{input.provincia}</option>
                                {
                                    provincias.map((p, i) => {
                                        return (
                                            <option value={p} key={i}>{p}</option>
                                        )
                                    })
                                }
                            </select>
                            <label className="tam" htmlFor="provincia">Provincia:</label>
                            {errors.provincia && <p className='error'>{errors.provincia}</p>}
                        </div>



                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="location"
                                value={input.location}
                            />
                            <label className="label" htmlFor="location: ">Localidad:</label>
                            {errors.location && <p className='errors'>{errors.location}</p>}
                        </div>



                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="telephone"
                                value={input.telephone}
                            />
                            <label className="label" htmlFor="telephone">Teléfono:</label>
                            {errors.telephone && <p className='errors'>{errors.telephone}</p>}
                        </div>
                    </div>

                    <div className="column3">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="cuit"
                                value={input.cuit}
                            />
                            <label className="label" htmlFor="cuit">CUIT:</label>
                            {errors.cuit && <p className='errors'>{errors.cuit}</p>}
                        </div>


                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="cbu_cvu"
                                value={input.cbu_cvu}
                            />
                            <label className="label" htmlFor="cbu_cvu">CBU / CVU:</label>
                            {errors.cbu_cvu && <p className='errors'>{errors.cbu_cvu}</p>}
                        </div>


                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="url"
                                value={input.url}
                            />
                            <label className="label" htmlFor="url"> Dirección Web o Red Social:</label>
                            {/* {errors.url && <p className='errors'>{errors.url}</p>} */}
                        </div>
                        <button className='btnFormEdit' type="submit" disabled={handleDisabledButton()}>Guardar</button>

                    </div>

                    {/* <div className="row">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                // className="fil"
                                // type='file'
                                type='text'
                                className="input"
                                id='image'
                                name="image"
                                // value={input.image}
                                // accept="image/*"
                                
                            />
                            <label className="tam" htmlFor="image">Imagen</label>

                            {errors.image && <p className='error'>{errors.image}</p>}
                        </div> */}


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

export default FormEditApa;