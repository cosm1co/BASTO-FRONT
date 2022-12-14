import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {  useSelector } from 'react-redux';
import s from './Filter.module.css'

export default function FilterPotreros({setBovine, setDevice}) {
    const { allBovines } = useSelector((state) => state.bovinesReducer);
    const [ fileSelect, setFileSelect ] = React.useState('Filtrar por potrero')

    const handleFile = (e) => {
        e.preventDefault();
        if(e.target.attributes[0].nodeValue === 'Filtrar por potrero') {
            setBovine('')
            setDevice('')
        } else {
            setBovine(e.target.attributes[0].nodeValue)
            setDevice('')
        }
        setFileSelect(e.target.attributes[0].nodeValue)
    };


  return (
    <DropdownButton className={s.filter_select} id="dropdown-basic-button" title={ fileSelect } variant="secondary">
        <Dropdown.Item value={'Filtrar por potrero'} onClick={(e) => handleFile(e)}> Filtrar por Potrero </Dropdown.Item>
        { allBovines[0]?.names?.length > 0 && allBovines[0]?.names.map((potrero, index) => {
            return (
            <Dropdown.Item 
                key={index} 
                value={potrero} 
                onClick={(e) => handleFile(e)}> { potrero }</Dropdown.Item>)
        })}

    </DropdownButton>
  );
}
