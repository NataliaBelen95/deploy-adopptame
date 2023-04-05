import { ADD_PET, GET_APA, POST_APA, GET_DETAIL_PET, CLEAN_DETAIL, GET_PETS, POST_USER, GET_USER, GET_DETAIL_USERS, GET_APA_DETAIL, ORDER_BY_AGE, FILTER_BY_SIZE, FILTER_BY_LOCATION, DELETE_USER, DELETE_APA, GET_FAVORITE, DELETE_PET, LOGUEADOS, CLEAN_LOGUEADOS, ADD_FAVORITE, DELETE_FAVORITE, UPDATE_FAVORITES, CREATE_REVIEW } from "../actions/actionsTypes"

import { Pet, Apa, User, Admin } from "../types"

const emptyDetail = {
  _id: "",
  adoption: false,
  age: 0,
  apa: {
    location: "",
    name: ""
  },
  image: "",
  name: "",
  size: "",
  status: true,
  type: "",
  description: ""
}

const emptyDetailUser = {
  _id: "",
  name: "",
  username: "",
  last_name: "",
  email: "",
  location: "",
  image: ""
}

const emptyDetailApa = {
  _id: "",
  name: "",
  password: "",
  email: "",
  location: "",
  description: "",
  cbu_cvu: "",
  url: "",
  telephone: "",
  provincia: "",
  cuit: "",
  reviews: [{
    rating: "",
    opinion: "",
    user: ""
  }]
}


const user: User = {
  favorites: [
    {
      pet: {
        _id: "",
        name: "",
        age: 0,
        size: "",
        type: "",
        image: "",
        adoption: false,
        status: true,
        description: "",

      }
    }
  ]
};



export interface StateType {
  allPets: Pet[]
  allApas: Apa[]
  detail: Pet
  allUsers: User[]
  detailUser: User
  detailApa: Apa
  petsFilter: Pet[]
  userEliminados: User[]
  apasEliminadas: Apa[]
  favoriteUser: User
  Loguins: User | Apa | Admin

}



const initialState: StateType = {
  allPets: [],
  allApas: [],
  allUsers: [],
  detailUser: emptyDetailUser,
  detailApa: emptyDetailApa,
  detail: emptyDetail,
  petsFilter: [],
  userEliminados: [],
  apasEliminadas: [],
  favoriteUser: user,
  Loguins: {}

}


type ActionType = {
  type: string;
  payload: any;
};

const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {

  switch (action.type) {
    //Setea el estado selectedCategory segun la card que elija el usuario en Home

    case POST_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: [...state.allApas, action.payload],

      };
    case GET_APA_DETAIL:
      return {
        ...state,
        detailApa: action.payload
      }

    case GET_APA:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allApas: action.payload,
        apasEliminadas: action.payload
      };

    case POST_USER:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allPets: [...state.allUsers, action.payload]
      };
    case GET_USER:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allUsers: action.payload,
        userEliminados: action.payload
      };

    case ADD_PET:
      // Modifica aquí el estado en función del valor del tipo de acción
      return {
        ...state,
        allPets: [...state.allPets, action.payload]
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        detail: emptyDetail
      }


    case GET_DETAIL_PET:
      return {
        ...state,
        detail: action.payload
      }

    case GET_DETAIL_USERS:
      return {
        ...state,
        detailUser: action.payload
      }

    case GET_PETS:
      return {
        ...state,
        allPets: action.payload,
        petsFilter: action.payload
      }

    case ORDER_BY_AGE:
      const isAsc = action.payload;
      const sortByAge = state.petsFilter.sort((a, b) => {
        const numA = a.age ?? 0;

        const numB = b.age ?? 0;

        if (isAsc === 'asc') {
          return numA > numB ? 1 : numA < numB ? -1 : 0;
        } else {
          return numA < numB ? 1 : numA > numB ? -1 : 0;
        }
      })

      return {
        ...state,
        allPets: sortByAge,
      }

    case FILTER_BY_SIZE:
      const createdFiltered = state.petsFilter.filter((el: Pet) => el.size === action.payload)
      return {
        ...state,
        allPets: createdFiltered
      }

    case FILTER_BY_LOCATION:

      const selectedLocation = action.payload === 'All'
        ? state.petsFilter
        : state.petsFilter.filter(el => el.apa?.provincia?.includes(action.payload))

      return {
        ...state,
        allPets: selectedLocation,
      };

    case DELETE_USER:
      const updatedUsers = state.userEliminados.filter((user) => user._id !== action.payload);
      return {
        ...state,
        allUsers: updatedUsers,
      };
    case DELETE_APA:
      const updatedApas = state.apasEliminadas.filter((apa) => apa._id !== action.payload);
      return {
        ...state,
        allApas: updatedApas,
      };

    case GET_FAVORITE:
      return {
        ...state,
        favoriteUser: action.payload
      }
    case ADD_FAVORITE:
      const newFavorite = action.payload.pet;
      const updatedUserFavorites = state.favoriteUser.favorites
        ? [...state.favoriteUser.favorites, { pet: newFavorite }]
        : [{ pet: newFavorite }];

      const updatedFavoriteUser = { ...state.favoriteUser, favorites: updatedUserFavorites };

      return { ...state, favoriteUser: updatedFavoriteUser };

    case UPDATE_FAVORITES:
      return {
        ...state,
        favoriteUser: { favorites: action.payload }
      };

    case DELETE_FAVORITE:

      const filterDelete = state.favoriteUser.favorites?.filter((el) => el.pet._id !== action.payload)
      return {
        ...state,
        favoriteUser: {
          ...state.favoriteUser,
          favorites: filterDelete
        }
      }
    case DELETE_PET:
      const updatedPet = state.petsFilter.filter((pet) => pet._id !== action.payload);
      return {
        ...state,
        allPets: updatedPet,
      };
    case LOGUEADOS:
      return {
        ...state,
        Loguins: action.payload,

      }


    case CLEAN_LOGUEADOS:
      return {
        ...state,
        Loguins: {},
      }

    default:
      return state;
  }
};



export default reducer;