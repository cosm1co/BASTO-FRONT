import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import s from './Filter.module.css'


export default function FilterDevice({setDevice, setBovine}) {
    const devices = ["COLLAR", "CARAVANA"]
    const [ fileSelect, setFileSelect ] = React.useState('All Devices')

    const handleFile = (e) => {
        e.preventDefault();
        if(e.target.attributes[0].nodeValue === 'All Devices') {
            setBovine('')
            setDevice('')
        } else {
            setDevice(e.target.attributes[0].nodeValue)
            setBovine('')
        }
        setFileSelect(e.target.attributes[0].nodeValue)
    };


  return (
    <DropdownButton className={s.filter_select} id="dropdown-basic-button" title={ fileSelect } variant="secondary">
        <Dropdown.Item value={'All Devices'} onClick={(e) => handleFile(e)}> Filtrar por Dispositivo </Dropdown.Item>
        { devices?.length > 0 && devices?.map((device, index) => {
            return (
            <Dropdown.Item 
                key={index} 
                value={device} 
                onClick={(e) => handleFile(e)}> { device }</Dropdown.Item>)
        })}

    </DropdownButton>
  );
}
