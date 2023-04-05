import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { getFavorite, updateLogueados, updateFavorites } from '../../redux/actions/actions';
import { Reducer } from '../../redux/store/store';
import { Card } from '../../components/Card/Card'

import './Favs.css'

export const Favs = () => {
    const dispatch = useDispatch();
    const logueados = useSelector((state: Reducer) => state.Loguins);
    const user_id: any = logueados.userFound?._id;
    const { favorites } = useSelector((state: Reducer) => state.favoriteUser);
    console.log(favorites)
    useEffect(() => {
        if (user_id) {
            dispatch(getFavorite(user_id) as unknown as AnyAction);
            console.log("primer useeffect" + user_id)
        }
    }, [dispatch, user_id]);
    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            dispatch(updateFavorites(JSON.parse(storedFavorites)));
        } else {
            dispatch(getFavorite(user_id) as unknown as AnyAction);
            console.log("segundo useeffect" + user_id)
        }

        const storedLogueados = localStorage.getItem('logueados') || '{}';
        dispatch(updateLogueados(JSON.parse(storedLogueados)));
        console.log(storedFavorites, "storedlogueados" + storedLogueados)
    }, []);

    useEffect(() => {
        const favoritesJSON = JSON.stringify(favorites);
        localStorage.setItem('favorites', favoritesJSON);
    }, [favorites]);



    return (
        <div className='asd'>
            <div className='container-favs'>
                {favorites?.map((favorite) => (
                    <Card
                        key={favorite.pet?._id}
                        pet={favorite.pet}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favs;