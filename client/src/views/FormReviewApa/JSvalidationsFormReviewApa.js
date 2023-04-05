const ratingRegex=/^([1-5])$/ //solo 1 numero entre 1 y 5.
const opinionRegex=/^(?=.*[a-zA-Z]{2})[\w\s\S]{10,}$/ // empiece al con 2 letras, puede tener numeros y caracteres especiales, minimo 10 caracteres


const validate = (input)=>{
    let errors={}
    
    if(!input.rating||ratingRegex.test(input.rating)===false){
        errors.rating='Seleccione un número'
    }
    if(!input.opinion ||opinionRegex.test(input.opinion)===false){
        errors.opinion='Describa su experiencia con la APA'
    }
    if(!input.user){
        errors.user='Ingrese userId'
    }
    return errors;
}

export default validate;