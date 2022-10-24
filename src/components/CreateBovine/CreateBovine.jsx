import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createBovine, getAllBovines, clearData } from '../../redux/actions/bovineActions';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import s from './CreateBovine.module.css'

export default function CreateBovine() {
  const { bovine, errorsBovine, allBovines } = useSelector((state) => state.bovinesReducer);
  const dispatch = useDispatch()
  const [newPotrero, setNewPotrero] = useState(false)
  const [input, setInput] = useState({
    SENASA_ID: '',
    type: '',
    weight: '',
    potrero: '',
    device: '',
    n_device: '',
  })

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    dispatch(clearData())
    setInput({
      SENASA_ID: '',
      type: '',
      weight: '',
      potrero: '',
      device: '',
      n_device: '',
    })
  }
  const handleShow = () => setShow(true);

  const handlePotrero = (e) =>{
    e.preventDefault()
    setNewPotrero(true)
  } 
  const handlePotreroClose = (e) =>{
    e.preventDefault()
    setNewPotrero(false)
  } 
 ;
  useEffect(() => {
    dispatch(getAllBovines())
  }, [bovine])

  const handleChange = function(e) {
    e.preventDefault()
    console.log(e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    dispatch(createBovine(input));
  }

  return (
    <div>
    <button onClick={handleShow} className={s.btn}>
      Nuevo Animal
    </button>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cargar Animal
        </Modal.Title>
      </Modal.Header>
    { !bovine.msg && errorsBovine === ''?
       
      <Modal.Body>
      <Form  onSubmit={(e) => handleSubmit(e)}>

        {/* Input SenasaId */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>ID SENASA*</Form.Label>
          <Form.Control
          type="text"
          placeholder="Registro en SENASA"
          name={'SENASA_ID'}
          value={input.SENASA_ID}
          onChange={(e) => handleChange(e)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        {/* Select Potrero */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Establecimiento al que pertenece el animal*</Form.Label>
          <Form.Select required name={'potrero'} onChange={(e) => handleChange(e)}>
            <option key={'selectpotrero'}>Seleccione un establecimiento</option>
            {
              allBovines[0]?.names?.length > 0 && allBovines[0].names?.map((potrero, index) => {
               return <option key={index} value={potrero.toUpperCase()}>{potrero.toUpperCase()}</option>
              })
            }
          </Form.Select>
          {!newPotrero ? 
          <button onClick={(e)=>handlePotrero(e)}>crear potrero</button>:

            <div>
              <Form.Label>Agrega un Establecimiento</Form.Label>
              <Form.Control type="text" value={input.potrero} name={'potrero'} onChange={(e) => handleChange(e)}/>
              <button onClick={(e)=>handlePotreroClose(e)}>X</button>
            </div>
          }
        </Form.Group>

        {/* Select Type */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Tipo de Animal*</Form.Label>
          <Form.Select required name={'type'} onChange={(e) => handleChange(e)}>
            <option key={'selecttype'}>Seleccione un tipo de animal</option>
            <option key={'NOVILLO'} value={'NOVILLO'}>NOVILLO</option>
            <option key={'VAQUILLONA'} value={'VAQUILLONA'}>VAQUILLONA</option>
            <option key={'TORO'} value={'TORO'}>TORO</option>
          </Form.Select>
        </Form.Group>

        {/* Input Weight */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Peso</Form.Label>
            <Form.Control
            type="number"
            placeholder="0"
            name={'weight'}
            value={input.weight}
            onChange={(e) => handleChange(e)}
            />
        </Form.Group>

        {/* Select Device */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Dispositivo*</Form.Label>
          <Form.Select
          name={'device'}
          onChange={(e) => handleChange(e)}>
            <option key={'selectdevice'}>Selecciona un tipo de animal</option>
            <option key={'COLLAR'} value={'COLLAR'}>COLLAR</option>
            <option key={'CARAVANA'} value={'CARAVANA'}>CARAVANA</option>
          </Form.Select>
        </Form.Group>

        {/* Input Number Device */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Número de dispositivo*</Form.Label>
          <Form.Control
          required
          type="text"
          placeholder="Número de dispositivo"
          name={'n_device'}
          value={input.n_device}
          onChange={(e) => handleChange(e)}
          />
        </Form.Group>
  
        <button className={s.btn} type="submit">
          Cargar Animal
        </button>
      </Form>
      </Modal.Body>
      : bovine.msg ?
          <Modal.Body>
            
          <p> ✅ Animal agregado correctamente. </p>
          </Modal.Body>
      :
      <Modal.Body>
      <p> ❌ Error al cargar animal, inténtalo nuevamente. </p>
      <p> -- { typeof(errorsBovine) === 'string' && errorsBovine} </p>
    </Modal.Body>
    }
      </Modal>
    </div>
  );
}
