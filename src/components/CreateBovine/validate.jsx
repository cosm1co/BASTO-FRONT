export default function validate(input){
    let errors = {};
    //ID SENASA validation
    if(!input.SENASA_ID)errors.SENASA_ID = "Agregar el ID de SENASA";
    if(!input.SENASA_ID.length === 16) errors.SENASA_ID = "El ID solo puede tener 16 caracteres"
    if(!/^[a-zA-Z0-9]*$/.test(input.SENASA_ID)) errors.SENASA_ID = "El ID es un código alfanumérico"

    //Type validation
    if(!input.type)errors.type = "Seleccionar tipo de bovino";

    //Potrero validation
    if(!input.potrero)errors.potrero = "Seleccionar un potrero";

    //Device validation
    if(!input.device)errors.device = "Seleccionar un dispositivo";

    //Number Device validation
    if(!input.n_device)errors.n_device = "Agregar el código del dispositivo";
    if(!input.n_device.length === 8) errors.n_device = "El código del dispositivo solo puede ser de 8 caracteres"
    if(!/^[a-zA-Z0-9]*$/.test(input.n_device)) errors.n_device = "El código del dispositivo tiene que ser alfanumérico"
    
    return errors
  }