import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBovine, getAllBovines } from '../../redux/actions/bovineActions';

import Modal from 'react-bootstrap/Modal';
import { RiDeleteBin2Line } from 'react-icons/ri'

import s from './DeleteBovine.module.css'

export default function DeleteBovine({id}) {
  const dispatch = useDispatch()
  const { updateBovine, errorsBovine } = useSelector((state) => state.bovinesReducer);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    // e.preventDefault()
    dispatch(deleteBovine(id))
    dispatch(getAllBovines())
  }

  return (
    <>
        <RiDeleteBin2Line onClick={handleShow} color='#ca2c2c' size={20} style={{right: '20px'}} className={s.icon}/>

    { !updateBovine && errorsBovine === ''?
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Eliminar Animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Quieres eliminar este animal?</Modal.Body>
        <Modal.Footer>
            <button className={s.btn} onClick={handleClose}>
            Cerrar
            </button>
            <button type='submit' onClick={handleDelete} className={s.btn_close}>
            Eliminar Animal
            </button>
        </Modal.Footer>
        </Modal>
      :  updateBovine ?
      <Modal show={show} onHide={handleClose}>
      <div className={s.successUpdate}>
        <h3> ✅ Animal eliminado correctamente. </h3>
      </div>
      </Modal>
    : 
    <Modal show={show} onHide={handleClose}>
    <div className={s.successUpdate}>
    <h3> ❌ Error al eliminar animal, inténtalo nuevamente.</h3>
    <p> -- { typeof(errorsBovine) === 'string' && errorsBovine} </p>
  </div>
    </Modal>
    }
    </>
    );
}
