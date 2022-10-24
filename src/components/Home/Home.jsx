import React from 'react'
import BovineTable from '../BovineTable/BovineTable'
import Header from '../Header/Header'
import CreateBovine from '../CreateBovine/CreateBovine'
import s from './Home.module.css'

export default function Home() {
  return (
    <div className={s.home}>
      <Header />
      <div className={s.home_body}>
      <h1 className={s.title}>Gestión de Animales</h1>
      <CreateBovine />
      <BovineTable />
      </div>
    </div>
  )
}
