import React, { useState } from "react";
import './FormApa.css'
// import imgForm from '../../assets/perrito2.png';
// import { useDispatch } from "react-redux";
// import { postApa } from "../../redux/actions/actions";
// import { AnyAction } from "redux";
import { validationApa } from "../../validation/validationApa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


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



function FormApa() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedProvince, setSelectedProvince] = useState("");

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        location: "",
        provincia: "",
        telephone: ""

    })

    const [touched, setTouched] = useState({
        name: false,
        password: false,
        email: false,
        provincia: false,
        telephone: false,

    });
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedProvince(selectedValue);
        setInput((prevInput) => ({
            ...prevInput,
            provincia: selectedValue
        }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const field = e.target.name;
        setTouched({ ...touched, [field]: true });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
    };

    const errorsInput = validationApa(input);
    // console.log(errorsInput)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.keys(errorsInput).length === 0) {
            // console.log(input)
            axios
                .post("http://localhost:3001/apa/auth", input)
                .then((response) => {
                    setInput({
                        name: "",
                        email: "",
                        password: "",
                        location: "",
                        provincia: "",
                        telephone: ""
                    });

                    alert("Apa creada correctamente")
                    // alert(response.data.message);
                    navigate(-1)
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 409) {
                            alert(error.response.data.error);
                        } else {
                            alert("Ocurrió un error en la solicitud");
                        }
                    } else {
                        alert("No se pudo conectar con el servidor");
                    }
                });

        }
    }

    return (
        <div className="container">
            <div className="containerForm">
                <h2 className="tituloFormApa">Nueva Asociación</h2>
                <form onSubmit={handleSubmit}>

                    <div className="containerInputs">
                        <input
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className="input"
                            type='text'
                            name="name"
                            required
                        />
                        <label className="label" htmlFor="username">Nombre</label>
                        {touched.name && errorsInput.name && <p className="errorInput">{errorsInput.name}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            className="input"
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            type='email'
                            name="email"
                            required
                        />
                        <label className="label" htmlFor="email">Email</label>
                        {touched.email && errorsInput.email && <p className="errorInput">{errorsInput.email}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            className="input"
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            type='password'
                            name="password"
                            required
                        />
                        <label className="label" htmlFor="password">Contraseña</label>
                        {touched.password && errorsInput.password && <p className="errorInput">{errorsInput.password}</p>}
                    </div>
                    <div className="containerInputs">
                        <input
                            className="input"
                            onBlur={handleBlur}
                            onChange={handleInputChange}
                            type='telephone'
                            name="telephone"
                            required
                        />
                        <label className="label" htmlFor="teléfono">Teléfono</label>
                        {touched.telephone && errorsInput.telephone && <p className="errorInput">{errorsInput.telephone}</p>}
                    </div>
                    <div className="containerInputs">
                        <select
                            className="input"
                            onBlur={handleBlur}
                            onChange={handleSelectChange}
                            name="provincia"
                            required
                            value={selectedProvince}
                        >
                            <option value="" disabled>-- Seleccionar provincia --</option>
                            {provincias.map((provincia) => (
                                <option key={provincia} value={provincia}>
                                    {provincia}
                                </option>
                            ))}
                        </select>
                        <label className="label" htmlFor="provincia">

                        </label>
                        {touched.provincia && errorsInput.provincia && (
                            <p className="errorInput">{errorsInput.provincia}</p>
                        )}
                    </div>
                    <button disabled={Object.keys(errorsInput).length !== 0} className='buttonFormApa'>Crear</button>
                </form>
            </div>
        </div >

    )
}

export default FormApa;