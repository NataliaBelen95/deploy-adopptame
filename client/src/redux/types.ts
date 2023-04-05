export interface Pet {
  _id?: string
  name?: string
  age?: number
  size?: string
  type?: string
  image?: string
  adoption?: boolean
  status?: boolean
  apa?: {
    _id?: string
    location?: string
    name?: string
    provincia?: string
  }
  description?: string
  usuario?: UserType
}
export type UserType = {
  apaId: string | undefined
  userId: string | undefined
  petId: string | undefined
}
export interface Admin {
  _id: string
  password?: string
  email?: string
  userType?: string
  adminFound?: Admin | Apa | User
  userFound?: Admin | Apa | User
  apaFound?: Admin | Apa | User

}

export interface Admin {
  _id: string
  password?: string
  email?: string
  userType?: string
  adminFound?: Admin | Apa | User
  userFound?: Admin | Apa | User
  apaFound?: Admin | Apa | User

}

export interface Apa {
  _id?: string
  name?: string
  username?: string
  password?: string
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  pets?: Pet[]
  telephone?: string
  provincia?: string
  cuit?: string
  reviews?: {
    rating: string
    opinion: string
    user: string
  }[];
  userType?: string
  adminFound?: Admin | Apa | User
  userFound?: Admin | Apa | User
  apaFound?: Admin | Apa | User

}
export interface User {
  _id?: string
  name?: string
  last_name?: string
  username?: string
  password?: string
  email?: string
  location?: string
  image?: string
  pet?: {}
  favorites?: {
    pet: Pet;
  }[];
  token?: string
  resetPasswordKey?: string
  googleId?: string
  userType?: string
  adminFound?: Admin | Apa | User
  userFound?: Admin | Apa | User
  apaFound?: Admin | Apa | User

}
export interface Pet {
  favorites?: User[];
}


export interface InputData {
  name?: string;
  username?: string;
  password?: string;
  passwordLogin?: string,
  last_name?: string;
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  cuit?: string
  telephone?: string
  provincia?: string
  age?: Number
  size?: string
  type?: string

}

export interface Favs {
  user?: {}
  pet?: {}
}

export type errorsInput = {
  name?: string;
  username?: string;
  password?: string;
  passwordLogin?: string;
  last_name?: string;
  email?: string
  location?: string
  description?: string
  cbu_cvu?: string
  url?: string
  cuit?: string
  provincia?: string
  telephone?: string
  age?: string
  size?: string
  type?: string
};



export interface Admin {
  password?: string
  email?: string
  userType?: string

}


