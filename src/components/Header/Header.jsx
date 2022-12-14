import React from 'react'
import Nav from 'react-bootstrap/Nav';
import vacalogo from './VACA-LOGO.png'
import s from './Header.module.css'

export default function Header() {
  return (
    <Nav
    activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      className={s.nav}
    >
        <Nav.Item className={s.navItem}>
            <img src={vacalogo} alt="Bastó" className={s.img}/>
            <h6 className={s.h6}>BOVINOS</h6>
        </Nav.Item>
    </Nav>
  )
}
