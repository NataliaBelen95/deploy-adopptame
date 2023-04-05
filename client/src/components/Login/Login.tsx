import { Link } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { validation } from "../../validation/validation";
import style from './Login.module.css'
import { RegistroApaUser } from "../RegistroApaUser/RegistroApaUser";
import { useNavigate } from "react-router-dom";
import LogInWithGoogle from "../LoginGoogle/LoginGoogle";
import { useDispatch } from "react-redux";
// import { Reducer } from '../../redux/store/store';
import { updateLogueados } from "../../redux/actions/actions";


export const Login = () => {
    const dispatch = useDispatch()
    // const logueados = useSelector((state: Reducer) => state.Loguins);

    type SignInData = {
        email: string;
        password: string;

    };
    const navigate = useNavigate()
    const [signInData, setSignInData] = useState<SignInData>({
        email: "",
        password: "",

    });

    const handleChange = (ev: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = ev.target;
        setSignInData({
            ...signInData,
            [name]: value,
        });
    };

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        axios
            .post("http://localhost:3001/auth/apa/user/login", signInData)
            .then((response) => {
                // console.log(response.data)
                setSignInData({
                    email: "",
                    password: "",

                });
                localStorage.setItem("token", response.data.token);
                dispatch(updateLogueados(response.data));
                // console.log("Logueados updated:", response.data);
                navigate("/home")
            })
            .catch((error) => {
                alert(error.response.data.message)
            });
    };

    const [touched, setTouched] = useState({
        email: false,
        password: false
    });

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const field = e.target.name;
        setTouched({
            ...touched,
            [field]: true
        });
    };

    const errorsInput = validation(signInData);

    const [showLogin, setShowLogin] = useState(true);

    const handleClickRegistro = () => {
        setShowLogin(false);
    };

    return (
        <div className={style.hero}>
            {showLogin && <div className={style.containerFormLogin}>
                <form onSubmit={handleSubmit} className={style.formLogin}>
                    <h2 className={style.tituloRegistro}>Bienvenidos</h2>

                    <div className={style.containerInput}>
                        <input
                            required
                            className={style.inputLogin}
                            type="email"
                            id="email"
                            name="email"
                            value={signInData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="email" className={style.labelLogin}>Email</label>
                        {touched.email && errorsInput.email && <p className={style.parrafosErrorsLogin}>{errorsInput.email}</p>}
                    </div>

                    <div className={style.containerInput}>
                        <input
                            required
                            className={style.inputLogin}
                            type="password"
                            id="password"
                            name="password"
                            value={signInData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label htmlFor="password" className={style.labelLogin}>Contraseña</label>

                        {touched.password && errorsInput.password &&
                            <p className={style.parrafosErrorsLogin}>{errorsInput.passwordLogin}</p>}
                    </div>

                    <Link className={style.linkOlvidasteContraseña} to="/restore-password">¿Olvidaste tu contraseña?</Link>

                    <button className={style.buttonLogin} disabled={!signInData.email || !signInData.password}>Continuar</button>

                    <div className={style.linea}></div>

                    <LogInWithGoogle></LogInWithGoogle>

                    <div className={style.linea}></div>

                    <div className={style.buttonRegisterContainer}>
                        <p className={style.noRegister}>¿No estás registrado?</p>
                        <button className={style.buttonRegister} type="button" onClick={handleClickRegistro}>Registrate</button>
                    </div>

                </form>
            </div>}

            {!showLogin && <RegistroApaUser setShowLogin={setShowLogin} />}


        </div>
    );
};