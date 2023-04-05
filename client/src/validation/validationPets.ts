import { errorsInput, InputData } from "../redux/types";



const regexName = /^[a-zA-Z]+$/
export const validation = (input: InputData) => {
    let errors: errorsInput = {}

    if (!input.name) {
        errors.name = "Nombre requerido";
    } else if (!regexName.test(input.name)) {
        errors.name = "el nombre debe contener solo letras";
    } else if (input.name.length > 12) {
        errors.name = "el nombre no puede superar los 12 caracteres";
    }

    if(!input.age){
        errors.age = "Edad requerida"
    }else if(isNaN(Number(input.age))){
        errors.age = "La edad debe ser un numero, en cas de ser 0 ponga los meses en la descripcion "
    }else if(input.age < 0 || input.age > 30){
        errors.age = "Ingrese una edad valida menor a 30, en caso de ser 0 ponga los meses en la descripcion"
    }

    if(!input.size){
        errors.size = "Ingrese tamaño"
    }
    if(!input.type){
        errors.type = "ingrese tipo"
    }



    

    
    return errors;
};
