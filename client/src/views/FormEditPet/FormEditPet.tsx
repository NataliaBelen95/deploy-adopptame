import './FormEditPet.css';
import petCat from '../../assets/perritoFormPet.png'
import { getDetailPets, putPet, getPets } from "../../redux/actions/actions";
import React, { useState, useEffect } from "react";
import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../redux/reducer/reducer'
import { Pet } from "../../redux/types"
import validate from './JSvalidationsFormEditPet';
import { useNavigate, useParams } from 'react-router-dom';
import { AnyAaaaRecord } from 'dns';
import { Reducer } from '../../redux/store/store';



function FormEditPet() {

    const dispatch = useDispatch()
    const { petId } = useParams<{ petId: any }>();
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const apaId = logueados.apaFound?._id
    const navigate = useNavigate();

    //Me guardo los details para meterselos al estado local "input"
    let petDetails: Pet = useSelector((state: StateType) => state.detail);

    const [input, setInput] = useState(petDetails)
    console.log(input)


    //Me aseguro de q los details de la pet esten cargados en el State Global
    useEffect(() => {
        dispatch(getDetailPets(petId) as unknown as AnyAction)
    }, [dispatch])

    useEffect(() => {
        setInput(petDetails)
    }, [petDetails])



    const [errors, setErrors] = useState({
        name: 'Al menos 3 letras',
        description: 'Ingrese una Descripción',
        size: 'Seleccione un Tamaño',
        type: 'Seleccione un Tipo de Mascota',
        age: 'Ingrese una número'
    })

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const files = (e.target as HTMLInputElement).files;

        if (files) {
            const data = new FormData();
            data.append("file", files[0]);
            data.append("upload_preset", "presetImage");

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/do1buub4f/image/upload", {
                    method: "POST",
                    body: data
                });

                const file = await res.json();
                setInput(prevInput => ({
                    ...prevInput,
                    [name]: value,
                    image: file.secure_url
                }));
                console.log(file.secure_url);
                if (petId) {
                    const petIdEncoded = encodeURIComponent(petId);
                    const url = `/pets/edit/${petIdEncoded}`;
                    const formData = new FormData();
                    formData.append("image", files[0]);
                    await fetch(url, {
                        method: "PUT",
                        body: formData
                    });
                }

            } catch (err) {
                console.log(err);
            }

        } else {
            setInput(prevInput => ({
                ...prevInput,
                [name]: value
            }));
        }


        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(putPet(petId, input) as unknown as AnyAction);
        alert("Mascota editada correctamente")
        navigate(-1);
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

            <div className="containerForm">
                <h1>Editar Mascota</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                className="input"
                                type='text'
                                name="name"
                                value={input.name}
                            />
                            <label className="label" htmlFor="name">Nombre</label>
                            {errors.name && <p>{errors.name}</p>}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="age"
                                value={input.age}
                            />
                            <label className="label" htmlFor="age">Edad (años)</label>
                            {errors.age && <p className='errorInput'>{errors.age}</p>}
                        </div>
                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                type='text'
                                className="input"
                                name="description"
                                value={input.description}
                            />
                            <label className="label" htmlFor="descripcion">Descripción</label>
                            {errors.description && <p className='errorInput'>{errors.description}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <select name="size"
                                onChange={handleInputChange}
                            >
                                <option value={input.size} >{input.size}</option>
                                <option value="chico">Pequeño</option>
                                <option value="mediano">Mediano</option>
                                <option value="grande">Grande</option>
                            </select>
                            <label className="tam" htmlFor="size">Tamaño</label>
                            {errors.size && <p className='errorInput'>{errors.size}</p>}
                        </div>

                        <div className="containerInputs">
                            <select name="type"
                                onChange={handleInputChange}
                            >
                                <option value={input.type}>{input.type}</option>
                                <option value="perro">Perro</option>
                                <option value="gato">Gato</option>
                                <option value="otros">Otro</option>
                            </select>
                            <label className="tam" htmlFor="size">Tipo</label>
                            {errors.type && <p className='errorInput'>{errors.type}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="containerInputs">
                            <img src={petDetails.image} alt="imagen de la mascota" className="imagenCargada" />
                            <label className="label" htmlFor="img actual">Imagen Actual</label>
                        </div>

                        <div className="containerInputs">
                            <input
                                onChange={handleInputChange}
                                // className="fil"
                                // type='file'
                                type='file'
                                className="input"
                                id='image'
                                name="image"
                            // value={input.image}
                            // accept="image/*"

                            />
                            {/* <label className="tam" htmlFor="image">Imagen</label> */}

                            <label className="label" htmlFor="image">Reemplace la Imagen Actual:</label>
                        </div>

                    </div>
                    <div className="row">

                    </div>
                    <button type="submit" disabled={handleDisabledButton()}>Guardar</button>
                    {/* <button type="submit" disabled={handleDisabledButton()} className="btn">Guardar Moficicaciones Hechas</button> */}
                </form>
            </div>
            {/* <div className="containerTitle">
                <h1>Editar Mascota</h1>
                <img className="imgPerrito" src={petCat} alt="foto perrito" />
            </div> */}

        </div>
    )
}

export default FormEditPet;