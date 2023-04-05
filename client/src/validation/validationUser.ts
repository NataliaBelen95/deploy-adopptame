import { errorsInput, InputData } from "../redux/types";


const regexUsername = /^[a-zA-Z]+$/
const regexPassword = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/
export const validationUser = (input: InputData) => {
    let errors: errorsInput = {}

    if (!input.username) {
        errors.username = "Nombre requerido";
    } else if (!regexUsername.test(input.username)) {
        errors.name = "El nombre de debe contener solo letras";
    } else if (input.username.length > 20) {
        errors.name = "El nombre no puede superar los 20 caracteres";
    }

    if (!input.email) {
        errors.email = "Ingresar un mail"
    } else if (!regexEmail.test(input.email)) {
        errors.email = "El email ingresado es inválido"
    }

    if (!input.password) {
        errors.password = "Elegir contraseña";
    } else if (!regexPassword.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres y contener al menos un número, una letra mayúscula, una letra minúscula y un carácter especial.";

    }



    return errors;
};