const nameRegex=/^(?=.*[a-zA-Z]{2})[\w\s\S]*$/ //comienza con 2 letras, puede tener espacios, numeros y caracteres epeciales
const ageRegex=/^\d+$/ //al menos 1 numero, sin letras ni espacios
const descriptionRegex=/^(?=.*[a-zA-Z]{2})[\w\s\S]{10,}$/ // empiece al con 2 letras, puede tener numeros y caracteres especiales, minimo 10 caracteres


const validate = (input)=>{
    let errors={}
    if(!input.name||nameRegex.test(input.name)===false){
        errors.name='Ingrese un Nombre'

    }if(!input.age||ageRegex.test(input.age)===false){
        errors.age='Ingrese una número'

    }if(!input.description||descriptionRegex.test(input.description)===false){
        errors.description='Ingrese una Descripción'

    }if(!input.image){
        errors.image='Cargue una imagen'

    }if(!input.size){
        errors.size='Seleccione un Tamaño'
        
    }if(!input.type){
        errors.type='Seleccione un Tipo de Mascota'

    }if(!input.adoption){
        errors.adoption='Seleccione una opción'

    }if(!input.status){
        errors.status='Seleccione una opción'
    }
    return errors;
}


export default validate;