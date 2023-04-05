import style from './Detail.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { StateType } from '../../redux/reducer/reducer';
import { getDetailPets, clearDetail, botonAdopt } from '../../redux/actions/actions';
import { AnyAction } from 'redux';
import { Reducer } from '../../redux/store/store';
import { User } from "../../redux/types";
import { FiArrowRight } from "react-icons/fi"

export interface StateType {
  currentUser: User;
  allUsers: User[];
}

export const Detail = () => {
  const logueados = useSelector((state: Reducer) => state.Loguins);

  // console.log(logueados.userFound)
  const navigate = useNavigate()
  const user_id: any = logueados?.userFound?._id
  console.log(user_id)
  const dispatch = useDispatch();
  const { id } = useParams();
  const pet = useSelector((state: Reducer) => state.detail);

  useEffect(() => {

    dispatch(getDetailPets(id!) as unknown as AnyAction);
    dispatch(clearDetail());
  }, [id, dispatch]);

  const handleAdoptButtonClick = async (user: User) => {
    try {
      await dispatch(botonAdopt(pet._id, user_id) as any as AnyAction);
      navigate("/home")

      // Aquí actualizas el estado de tu aplicación para reflejar que esa mascota ya no está disponible para adopción.
    } catch (error: any) {
      alert(error.message);
    }
  };
  // console.log(pet.apa?.name)

  return (
    <div className={style.container}>
      <article className={style.card}>


        <img src={pet?.image} alt={pet?.name} />

        <h2>{pet?.name}</h2>
        {/* <p>{pet?.size}</p> */}
        <p>{pet?.description}</p>
        <div className={style.divBotones}> <button className={style.botonDetail} onClick={() => handleAdoptButtonClick(user_id)} disabled={pet.adoption === true ? false : true}>{pet.adoption === true ? "Adoptar" : "Adoptado"}</button>
          <Link to={`/paymentsDonate`}><button className={style.botonDetailAyudame}>Ayudame</button></Link>
        </div>
        <span className={style.spanDetail}><p className={style.pApaDetail}>Saber más<FiArrowRight style={{ marginRight: '15px', marginLeft: '8px' }}></FiArrowRight><Link to={`/myProfileApa/${pet.apa?._id}`} className={style.linkDetalle}>   {pet.apa?.name}</Link></p></span>
      </article>
    </div >
  );
};

export default Detail;