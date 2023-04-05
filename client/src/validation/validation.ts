import { errorsInput, InputData } from "../redux/types";



const regexName = /^[a-zA-Z]+$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
export const validation = (input: InputData) => {
    let errors: errorsInput = {}

    if (!input.name) {
        errors.name = "Nombre requerido";
    } else if (!regexName.test(input.name)) {
        errors.name = "El nombre debe contener solo letras";
    } else if (input.name.length > 15) {
        errors.name = "El nombre no puede superar los 15 caracteres";
    }

    if (!input.username) {
        errors.username = "Usuario requerido"
    } else if (input.username.length > 20) {
        errors.username = "El nombre de usuario no puede contener mas de 20 carateres";
    }
    if (!input.last_name) {
        errors.last_name = "Apellido requerido"
    }


    if (!input.password) {
        errors.password = "Elegir contraseña";
    } else if (!regexPassword.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres y por lo menos un número y una letra mayúscula";

    }

    if (!input.email) {
        errors.email = "Ingresar email"
    } else if (!regexEmail.test(input.email)) {
        errors.email = "El email ingresado es inválido"
    }


    if (!input.passwordLogin) {
        errors.passwordLogin = "Ingrese una contraseña correcta";
    }



    return errors;
};
