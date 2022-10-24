import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBovine, clearData } from '../../redux/actions/bovineActions';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { BiEdit } from 'react-icons/bi'

import s from './UpdateBovine.module.css'


export default function UpdateBovine({id}) {
    const { errorsBovine, allBovines, bovine } = useSelector((state) => state.bovinesReducer);
    const bovineUpdate = allBovines.slice(1).filter(bovine => bovine._id === id)
    const [novilloType, setNovilloType] = useState(bovineUpdate[0]?.type)
    const [deviceType, setDeviceType] = useState(bovineUpdate[0]?.device)
    const [potreroType, setPotreroType] = useState(bovineUpdate[0]?.potrero)
    const dispatch = useDispatch()
    const [input, setInput] = useState({
      SENASA_ID: bovineUpdate[0].SENASA_ID,
      type: bovineUpdate[0].type,
      weight: bovineUpdate[0].weight,
      potrero: bovineUpdate[0].potrero,
      device: bovineUpdate[0].device,
      n_device: bovineUpdate[0].n_device
    })

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        dispatch(clearData())
    }
    const handleShow = () => setShow(true);

    const handleChange = function(e) {
        e.preventDefault()
        console.log(e.target.value)
        if(e.target.name === 'type'){
            setNovilloType(e.target.value)
        }
        if(e.target.name === 'potrero'){
            setPotreroType(e.target.value)
        }
        if(e.target.name === 'device'){
            setDeviceType(e.target.value)
        }
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }

    const handleSubmit = function(e) {
        e.preventDefault()
        dispatch(editBovine(id, input))
    }

    return (
        <div>
            <BiEdit onClick={handleShow} color='#86ac40' size={20} style={{right: '20px'}} className={s.icon}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Animal</Modal.Title>
                </Modal.Header>
                {!bovine.msg && errorsBovine === ''?
                <Modal.Body>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID SENASA*</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Registro en SENASA"
                        name={'SENASA_ID'}
                        value={input.SENASA_ID}
                        onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Establecimiento al que pertenece el animal*</Form.Label>
                        <Form.Select name={'potrero'} value={potreroType} onChange={(e) => handleChange(e)}>
                        <option>Seleccione un establecimiento</option>
                        {
                            allBovines[0].names?.length > 0 && allBovines[0].names.map((potrero, index) => {
                                return <option key={index} value={potrero.toUpperCase()}>{potrero.toUpperCase()}</option>
                               })
                        }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Animal*</Form.Label>
                        <Form.Select name={'type'} value={novilloType} onChange={(e) => handleChange(e)}>
                        <option value={''}>Seleccione un tipo de animal</option>
                        <option value={'NOVILLO'}>NOVILLO</option>
                        <option value={'VAQUILLONA'}>VAQUILLONA</option>
                        <option value={'TORO'}>TORO</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Peso</Form.Label>
                        <Form.Control
                        type="number"
                        placeholder="0"
                        name={'weight'}
                        value={input.weight}
                        onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Dispositivo*</Form.Label>
                        <Form.Select name={'device'} value={deviceType} onChange={(e) => handleChange(e)}>
                            <option>Selecciona un tipo de animal</option>
                            <option value={'COLLAR'}>COLLAR</option>
                            <option value={'CARAVANA'}>CARAVANA</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Número de dispositivo*</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Número de dispositivo"
                        name={'n_device'}
                        value={input.n_device}
                        onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>

                    <button className={s.btn} type="submit" >
                        Editar Animal
                    </button>
                </Form>
                </Modal.Body>
                : bovine.msg ?
                <Modal.Body>
                  
                <p> ✅ Animal actualizado correctamente. </p>
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
}
