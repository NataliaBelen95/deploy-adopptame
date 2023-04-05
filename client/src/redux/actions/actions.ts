import axios from "axios";
import { Apa, Pet, User, Favs } from "../types";
import { POST_APA, ADD_PET, GET_APA, GET_PETS, GET_DETAIL_PET, CLEAN_DETAIL, POST_USER, GET_USER, GET_DETAIL_USERS, ORDER_BY_AGE, FILTER_BY_SIZE, GET_APA_DETAIL, FILTER_BY_LOCATION, DELETE_APA, DELETE_USER, DELETE_PET, EDIT_PET, EDIT_APA, EDIT_USER, GET_FAVORITE, SUSPENDED, LOGUEADOS, ADOPT_PET, CLEAN_LOGUEADOS, BOTON_ADOPT, ADD_FAVORITE, DELETE_FAVORITE, UPDATE_FAVORITES, SET_ADOPTION, CREATE_REVIEW, BOTON_DONATE } from "./actionsTypes"; import { Dispatch } from "react";
import { useSelector } from "react-redux";
import { Reducer } from "../store/store";


type dispatchApa = {
  type: string
  payload: Apa

}

type dispatchPet = {
  type: string
  payload: Pet
}

type dispatchGet = {
  type: string
  payload: object[]
}


type dispatchDetail = {
  type: string
  payload: Pet
}

type dispatchUser = {
  type: string
  payload: User
}
type dispatchSuspended = {
  type: string
  payload: User | Apa
}
type dispatchChangeAdoption = {
  type: string
  payload: Pet
}

type dispatchDetailUser = {
  type: string
  payload: User
}
interface filtros {
  type: string;
  payload: string;
}

type dispatchFav = {
  type: string;
  payload: Pet;
}
type dispatchBotonAdop = {
  type: string;
  payload: Pet[]

}

type PostFavorite = {
  type: string
  payload: Pet
}

interface UpdateFavoritesAction {
  type: typeof UPDATE_FAVORITES;
  payload: Favs[];
}



type DeleteFavorite = {
  type: string
  payload: string
}

type dispatchBotonAyudar = {
  type: string;
  payload: Pet[]

}

export const getApas = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    const response = await axios.get<Apa[]>("http://localhost:3001/apa");

    return dispatch({
      type: GET_APA,
      payload: response.data
    });
  };
};




export const getApaById = (id: string) => {
  return async (dispatch: Dispatch<dispatchApa>) => {

    const res = await axios.get<Apa>(`http://localhost:3001/apa/${id}`);
    return dispatch({
      //despacho la action
      type: GET_APA_DETAIL,
      payload: res.data,
    });

  };
};


export const postApa = (payload: Apa) => {
  return async (dispatch: Dispatch<dispatchApa>) => {
    console.log(payload)
    const createApa = await axios.post<Apa>("http://localhost:3001/apa", payload);
    return dispatch({
      type: POST_APA,
      payload: createApa.data
    });
  };
};

export const getPets = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    try {
      const response = await axios.get<Pet[]>("http://localhost:3001/pets");

      return dispatch({
        type: GET_PETS,
        payload: response.data
      });
    }
    catch (error) {
      console.log(error)
    }

  };
};

export const getDetailPets = (id: string) => {
  return async (dispatch: Dispatch<dispatchDetail>) => {

    const res = await axios.get<Pet>(`http://localhost:3001/pets/${id}`);
    return dispatch({
      //despacho la action
      type: GET_DETAIL_PET,
      payload: res.data,
    });

  };
};

export const clearDetail = () => {
  return { type: CLEAN_DETAIL };
};


export const postPet = (id: string, payload: Pet) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const createPet = await axios.post<Pet>(`http://localhost:3001/pets/create/${id}`, payload);
    return dispatch({
      type: ADD_PET,
      payload: createPet.data
    });
  };
};;




export const postUser = (payload: User) => {
  console.log(payload)
  return async (dispatch: Dispatch<dispatchUser>) => {
    const createUser = await axios.post<User>(`http://localhost:3001/users`, payload);
    return dispatch({
      type: POST_USER,
      payload: createUser.data
    });
  };
};

export const getUsers = () => {
  return async (dispatch: Dispatch<dispatchGet>) => {
    const response = await axios.get<User[]>("http://localhost:3001/users");

    return dispatch({
      type: GET_USER,
      payload: response.data
    });
  };
};


export const getDetailUsers = (id: string) => {
  return async (dispatch: Dispatch<dispatchDetailUser>) => {

    const res = await axios.get<User>(`http://localhost:3001/users/${id}`);
    return dispatch({
      //despacho la action
      type: GET_DETAIL_USERS,
      payload: res.data,
    });

  };
};


export const putPet = (id: string, payload: Pet) => {
  // console.log(payload)
  return async (dispatch: Dispatch<dispatchPet>) => {
    const editPet = await axios.put<Pet>(`http://localhost:3001/pets/edit/${id}`, payload);
    return dispatch({
      type: EDIT_PET,
      payload: editPet.data
    });
  };
};

export const putApa = (id: string, payload: Apa) => {
  // console.log(payload)
  return async (dispatch: Dispatch<dispatchApa>) => {
    const editApa = await axios.put<Apa>(`http://localhost:3001/apa/${id}`, payload);
    return dispatch({
      type: EDIT_APA,
      payload: editApa.data
    });
  };
};

export const putUser = (id: string, payload: User) => {
  // console.log(payload)
  return async (dispatch: Dispatch<dispatchUser>) => {
    const editUser = await axios.put<User>(`http://localhost:3001/users/${id}`, payload);
    return dispatch({
      type: EDIT_USER,
      payload: editUser.data
    });
  };
};


export const createReview = (apaId: string, payload: Apa) => {
  // console.log(payload)
  return async (dispatch: Dispatch<dispatchApa>) => {
    const editApa = await axios.put<Apa>(`http://localhost:3001/apa/${apaId}`, payload);
    return dispatch({
      type: CREATE_REVIEW,
      payload: editApa.data
    });
  };
};



export const OrderByAge = (payload: string): filtros => {
  return {
    type: ORDER_BY_AGE,
    payload: payload
  }

}

export const FilteredBySize = (payload: string): filtros => {
  return {
    type: FILTER_BY_SIZE,
    payload: payload
  }
}

export const FilterByLocation = (payload: string): filtros => {
  return {
    type: FILTER_BY_LOCATION,
    payload: payload
  }
}


export const deleteApa = (id: string) => {
  return async (dispatch: Dispatch<dispatchApa>) => {
    const { data } = await axios.delete(`http://localhost:3001/apa/${id}`);

    return dispatch({
      type: DELETE_APA,
      payload: data,
    });
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch<dispatchUser>) => {
    const { data } = await axios.delete(`http://localhost:3001/users/${id}`);

    return dispatch({
      type: DELETE_USER,
      payload: data,
    });
  };
};


export const deletePet = (id: string) => {
  return async (dispatch: Dispatch<dispatchPet>) => {
    const { data } = await axios.delete(`http://localhost:3001/pets/delete/${id}`);

    return dispatch({
      type: DELETE_PET,
      payload: data,
    });
  };
};


export const getFavorite = (id: string) => {
  return async (dispatch: Dispatch<dispatchFav>) => {

    const res = await axios.get<Pet>(`http://localhost:3001/favorites/${id}`);
    return dispatch({
      //despacho la action
      type: GET_FAVORITE,
      payload: res.data,
    });

  };
};

export const postFavorite = (petId: string, userId: string) => {
  return async (dispatch: Dispatch<PostFavorite>) => {
    try {
      const response = await axios.post<Pet>(`http://localhost:3001/favorites`, { petId, userId });
      dispatch({
        type: ADD_FAVORITE,
        payload: response.data,
      });
    } catch (error: any) {
      console.log(error)


    }
  }
};

export const updateFavorites = (favorites: any) => {
  return {
    type: 'UPDATE_FAVORITES',
    payload: favorites
  }
}

export type FavoriteAction = UpdateFavoritesAction;


export const deleteFavorite = (petId: string, userId: string) => {
  return async (dispatch: Dispatch<DeleteFavorite>) => {
    try {
      axios.delete<Pet>(`http://localhost:3001/favorites`, {
        data: { petId, userId } // aquí se envían los datos en el cuerpo de la solicitud
      });
      dispatch({
        type: DELETE_FAVORITE,
        payload: petId
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const suspendUserOrApaAction = (id: string, suspended: boolean) => {
  return async (dispatch: Dispatch<dispatchSuspended>) => {
    try {
      let response;

      if (suspended) {
        // Si está suspendido, quitar la suspensión enviando un PUT con { suspended: false }
        response = await axios.put<User | Apa>(`http://localhost:3001/apa/user/suspended/${id}`, { suspended: false });
      } else {
        // Si no está suspendido, establecer la suspensión enviando un PUT con { suspended: true }
        response = await axios.put<User | Apa>(`http://localhost:3001/apa/user/suspended/${id}`, { suspended: true });
      }

      if (response.status === 200) {
        dispatch({
          type: SUSPENDED,
          payload: response.data,
        });
      }
    } catch (error) {
      alert("ya suspendido")
    }
  };
};

export const setAdoption = (id: string, adoption: boolean) => {
  return async (dispatch: Dispatch<dispatchChangeAdoption>) => {
    try {
      let response;

      if (!adoption) {
        // Si esta disponible, etablecer en false enviando un PUT con { adoption: false }
        response = await axios.put<Pet>(`http://localhost:3001/pets/adoption/${id}`, { adoption: false });
      } else {
        // Si la mascota no esta disponible para adoptar, enviar true { adoption: true }
        response = await axios.put<Pet>(`http://localhost:3001/pets/adoption/${id}`, { adoption: true });
      }

      if (response.status === 200) {
        dispatch({
          type: SET_ADOPTION,
          payload: response.data,
        });
      }
    } catch (error: any) {
      alert(error.data.message)
    }
  };
};

export const updateLogueados = (data: any) => ({
  type: LOGUEADOS,
  payload: data,
});

export const resetLogueados = () => ({
  type: CLEAN_LOGUEADOS,

});




export const botonAdopt = (petId: any, userId: string) => {
  return async (dispatch: Dispatch<dispatchBotonAdop>) => {
    try {
      const response = await axios.post<Pet[]>("http://localhost:3001/adopt/pet", { petId, userId });
      if (response.status === 200) {
        alert("Gracias por solicitar la adopción, te estará llegando un mail con indicaciones.");
      }
      return dispatch({
        type: BOTON_ADOPT,
        payload: response.data
      });
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert("Mascota ya adoptada");
      } else if (error.response && error.response.status === 400) {
        alert("Ya solicitaste la adopción de esta mascota")

      } else {
        alert("Error al tratar de adoptar la mascota");
      }
    }
  }
};

export const botonAyudar = (petId: any, userId: string) => {
  return async (dispatch: Dispatch<dispatchBotonAyudar>) => {
    try {
      const response = await axios.post<Pet[]>("http://localhost:3001/donate/pet", { petId, userId });
      if (response.status === 200) {
        alert("Donación enviada correctamente");
      }
      return dispatch({
        type: BOTON_DONATE,
        payload: response.data
      });
    } catch (error) {
      alert("No se pudo realizar la donación");
    }
  }
}