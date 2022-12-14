import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBovine, clearData, getAllBovines, createBovine } from '../../redux/actions/bovineActions';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useFormik } from 'formik';
import { schema } from './schema';

import s from './UpdateBovine.module.css'

export default function UpdateBovine({id, BiEdit}) {
    const { errorsBovine, allBovines, bovine } = useSelector((state) => state.bovinesReducer);
    const [newPotrero, setNewPotrero] = useState(false);
    const bovineUpdate = allBovines.slice(1).filter(bovine => bovine._id === id);
    const dispatch = useDispatch();

    const onSubmit = function(e) {
        if(id){
            dispatch(editBovine(id, values))
        } else {
            dispatch(createBovine(values))
        }
        console.log('submitted')
    }

    
    const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            SENASA_ID: id ? bovineUpdate[0]?.SENASA_ID : '',
            type: id ? bovineUpdate[0]?.type : '',
            weight: id ? bovineUpdate[0]?.weight : '',
            potrero: id ? bovineUpdate[0]?.potrero : '',
            device: id ? bovineUpdate[0]?.device : '',
            n_device: id ? bovineUpdate[0]?.n_device : ''
        },
        validationSchema: schema,
        onSubmit,
    });
    
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        dispatch(clearData())
        dispatch(getAllBovines())
            values({
            SENASA_ID: id ? bovineUpdate[0]?.SENASA_ID : '',
            type: id ? bovineUpdate[0]?.type : '',
            weight: id ? bovineUpdate[0]?.weight : '',
            potrero: id ? bovineUpdate[0]?.potrero : '',
            device: id ? bovineUpdate[0]?.device : '',
            n_device: id ? bovineUpdate[0]?.n_device : ''
          })
    };

    const handleShow = () => setShow(true);

    const handlePotrero = (e) =>{
        e.preventDefault()
        setNewPotrero(true)
        };

    const handlePotreroClose = (e) =>{
        e.preventDefault()
        setNewPotrero(false)
        };
    
    return (
        <div>
            {
        id ? 
        <BiEdit onClick={handleShow} color='#86ac40' size={20} style={{right: '20px'}} className={s.icon}/>
        : <button onClick={handleShow} className={s.btn}>
            Nuevo Animal
          </button>
      }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Animal</Modal.Title>
                </Modal.Header>
                {!bovine.msg && errorsBovine === ''?
                <Modal.Body>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>ID SENASA*</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Registro en SENASA"
                        name={'SENASA_ID'}
                        value={values.SENASA_ID}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.SENASA_ID}
                        isValid={!errors.SENASA_ID && values.SENASA_ID}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.SENASA_ID}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Establecimiento al que pertenece el animal*</Form.Label>
                        <Form.Select
                        name={'potrero'}
                        value={values.potrero}
                        onChange={(e) => handleChange(e)}
                        onBlur={handleBlur}
                        isInvalid={!!errors.potrero}
                        isValid={!errors.potrero && values.potrero}
                        >
                        <option>Seleccione un establecimiento</option>
                        {
                            allBovines[0]?.names?.length > 0 && allBovines[0]?.names?.map((potrero, index) => {
                                return <option key={index} value={potrero.toUpperCase()}>{potrero.toUpperCase()}</option>
                               })
                        }
                        </Form.Select>
                        {!newPotrero ? 
                        <button className={s.btn_potrero} onClick={(e)=>handlePotrero(e)}>Crear Potrero</button>:

                            <div>
                            <Form.Label>Agrega un Establecimiento</Form.Label>
                            <Form.Control type="text" value={values.potrero.toUpperCase()} name={'potrero'} onChange={handleChange}/>
                            <button className={s.btn_close} onClick={(e)=>handlePotreroClose(e)}>X</button>
                            </div>
                        }
                        <Form.Control.Feedback type="invalid">
                            {errors.potrero}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Animal*</Form.Label>
                        <Form.Select
                        name={'type'}
                        value={values.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.type}
                        isValid={!errors.type && values.type}
                        >
                        <option value={''}>Seleccione un tipo de animal</option>
                        <option value={'NOVILLO'}>NOVILLO</option>
                        <option value={'VAQUILLONA'}>VAQUILLONA</option>
                        <option value={'TORO'}>TORO</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.type}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Peso</Form.Label>
                        <Form.Control
                        type="number"
                        placeholder="0"
                        name={'weight'}
                        value={values.weight}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.type}
                        isValid={!errors.weight && values.weight}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.weight}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dispositivo*</Form.Label>
                        <Form.Select
                        name={'device'}
                        value={values.device}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.device}
                        isValid={!errors.device && values.device}
                        >
                            <option>Selecciona un tipo de dispositivo</option>
                            <option value={'COLLAR'}>COLLAR</option>
                            <option value={'CARAVANA'}>CARAVANA</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.device}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Número de dispositivo*</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Número de dispositivo"
                        name={'n_device'}
                        value={values.n_device}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.n_device}
                        isValid={!errors.n_device && values.n_device}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.n_device}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {
                        id?
                    <button className={s.btn} type="submit" >
                        Editar Animal
                    </button>
                        :
                    <button className={s.btn} type="submit" >
                        Cargar Animal
                    </button>
                    }
                </Form>
                </Modal.Body>
                : bovine.msg ?
                
                    id ? 
                    <Modal.Body>
                        <p> ✅ Animal actualizado correctamente. </p>
                    </Modal.Body>
                    : 
                  
                <Modal.Body>
                <p> ✅ Animal cargado correctamente. </p>
                </Modal.Body>
            :
            <Modal.Body>
            <p> ❌ Error al actualizar animal, inténtalo nuevamente. </p>
            <p> -- { typeof(errorsBovine) === 'string' && errorsBovine} </p>
          </Modal.Body>
                }
            </Modal>
        </div>
    )
};
