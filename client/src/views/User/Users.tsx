import React, { useEffect } from 'react'
import { getDetailUsers, clearDetail } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Reducer } from '../../redux/store/store';
import './User.css'
import { AnyAction } from 'redux'
import Avatar from "../../assets/avatarUser.png"





// import { useState } from 'react';




function Users() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const user = useSelector((state: Reducer) => state.detailUser);


  useEffect(() => {
    dispatch(getDetailUsers(id!) as unknown as AnyAction)
    dispatch(clearDetail());
  }, [id, dispatch])


  return (
    <div className='ContenedorUser'>
      <article className='CartaUsuario'>
        <div className="imgUser">
          <img src={Avatar} alt={user?.name} />
        </div>


        <div className="infoUser">
          <h2>{user?.username} {user.last_name}</h2>
          <p>Email:{user?.email}</p>
          {user?.location ? (<p>Ubicacion: {user?.location}</p>) : (
            <p></p>
          )

          }

        </div>

        <div className="contenedorBtn">
          <Link to={`/favorites/${user?._id}`}>
            <button className='botonUserFavs'>
              Mis Favoritos
            </button>
          </Link>
        </div>
      </article>
    </div>
  );
}
export default Users