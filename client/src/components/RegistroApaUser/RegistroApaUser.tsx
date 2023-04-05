import { Link } from "react-router-dom"
import { FunctionComponent } from 'react'
import style from './RegistroApaUser.module.css';
import { HiArrowLeft } from 'react-icons/hi';
import { useState } from 'react';
import FormUser from "../../views/FormUser/FormUser";
import FormApa from "../../views/FormApa/FormApa";



type Props = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegistroApaUser: FunctionComponent<Props> = ({ setShowLogin }) => {

    const handleClick = () => {
        setShowLogin(true);
    }
    const handleFormApa = () => {
        setShowRegistro(false)
        setShowFormApa(true)
    }
    const handleFormUser = () => {
        setShowRegistro(false)
        setShowFormUser(true)
    }
    const handleBack = () => {
        setShowFormUser(false);
        setShowFormApa(false);
        setShowRegistro(true);
    }


    const [showRegistro, setShowRegistro] = useState<Boolean>(true);
    const [showFormUser, setShowFormUser] = useState<Boolean>(false);
    const [showFormApa, setShowFormApa] = useState<Boolean>(false);

    return (
        <>
            {showRegistro &&
                <>
                    <button className={style.buttonLogin} onClick={handleClick}><HiArrowLeft /></button>
                    <div className={style.containerArticle}>
                        <article className={style.registroApa}>
                            <h3 className={style.tituloRegistrate}>Registrate como APA</h3>
                            <p className={style.parrafosRegistros}>Como Asociación Protectora de Animales (APA) tendrás un perfil donde podrás postear las mascotas que desees poner en adopción y también habrá un apartado donde podrás recibir donaciones de otros usuarios. De esta forma, los usuarios podrán acceder a dicho perfil, visualizar las mascotas disponibles de la asociación y realizar donaciones a la asociación en cuestión.
                            </p>
                            <button onClick={handleFormApa} className={style.linkButtonApa}>Registrate como Asociación</button>
                            {/* <Link className={style.linkButtonApa} to={'/formApa'}>Registrate como APA</Link> */}
                        </article>
                        <article className={style.registroUser}>
                            <h3 className={style.tituloRegistrate}>Registrate como Usuario </h3>
                            <p className={style.parrafosRegistros}>Como usuario, tendrás la posibilidad de crearte un perfil, adoptar animales y hacer donaciones. Tendrás acceso a un apartado donde visualizarás todas las mascotas disponibles para adoptar y también podrás guardar en tus favoritos las mascotas que desees. Luego de adoptar, podrás puntuar a la asociación según la experiencia que hayas tenido.
                            </p>
                            <button onClick={handleFormUser} className={style.linkButtonUser}>Registrate como Usuario</button>
                            {/* <Link className={style.linkButtonUser} to={'/formUser'}>Registrate como Usuario</Link> */}
                        </article>
                    </div>
                </>
            }

            {showFormUser && (
                <>
                    <button className={style.buttonLogin} onClick={handleBack}><HiArrowLeft /></button>
                    <FormUser />
                </>
            )}
            {showFormApa && (
                <>
                    <button className={style.buttonLogin} onClick={handleBack}><HiArrowLeft /></button>
                    <FormApa />
                </>
            )}
        </>
    )
}