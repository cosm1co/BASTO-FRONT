import * as yup from 'yup';

const alphanumeric = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export const schema = yup.object().shape({
    SENASA_ID: yup.string()
    .min(16, 'El ID debe contener 16 caracteres')
    .max(16, 'El ID debe contener 16 caracteres')
    .matches(alphanumeric, 'El ID debe ser alfanumérico')
    .required('Agregar un ID'),
    type: yup.string()
    .required('Seleccionar un tipo de bovino'),
    weight: yup.number(),
    potrero: yup.string()
    .required('Seleccionar un potrero'),
    device: yup.string()
    .required('Seleccionar un tipo de bovino'),
    n_device: yup.string()
    .min(8, 'El número debe contener 8 caracteres')
    .max(8, 'El número debe contener 8 caracteres')
    .matches(alphanumeric, {message: 'Debe ser alfanumérico'})
    .required('Agregar el n° del dispositivo')
})