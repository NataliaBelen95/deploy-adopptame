import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import "./ForgotPassword.css"
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [forgotPassword, setForgotPassword] = useState(false);
    const [input, setInput] = useState({
        resetPasswordKey: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/auth/apa/user/forgotPassword", { email })
            .then((response) => {
                alert("Se ha enviado un correo electrónico con una clave de restablecimiento.");
                setForgotPassword(true);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    };

    const handleResetSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/auth/apa/user/resetPassword", { resetPasswordKey: input.resetPasswordKey, password, email })
            .then((response) => {
                alert("La contraseña se ha restablecido correctamente.");
                navigate("/login");
            })
            .catch((error) => {
                alert(error.response.data.message);
            })

    };

    return (
        <div className="containerForgotPassword">
            {forgotPassword ? (
                <>

                    <div className='containerPassword'>

                        <form className="formPassword" onSubmit={handleResetSubmit}>
                            <label htmlFor="resetPasswordKey">Clave de restablecimiento:</label>
                            <input className="inputPasswordUser" type="text" id="resetPasswordKey" name="resetPasswordKey" value={input.resetPasswordKey} onChange={(e) => setInput({ ...input, resetPasswordKey: e.target.value })} />
                            <label htmlFor="password">Nueva contraseña:</label>
                            <input className="inputPasswordUser" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='botonesRecupero' type="submit">Restablecer contraseña</button>
                        </form>
                    </div>
                </>

            ) : (
                <div className='containerPassword_2'>
                    <form className="formPassword" onSubmit={handleForgotSubmit}>
                        <label className="passwordLabel" htmlFor="email">Correo electrónico:</label>
                        <input className="inputPasswordUser" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="containerBtnDonate">    <button className='botonesRecupero' type="submit">Enviar clave de restablecimiento</button> </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;