import React from 'react'
import {useState, useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllBovines } from '../../redux/actions/bovineActions'
import UpdateBovine from '../UpdateBovine/UpdateBovine';
import DeleteBovine from '../DeleteBovine/DeleteBovine'
import FilterPotrero from '../FilterPotreros/FilterPotreros'
import Pagination from '../Pagination/Pagintaion';

import Table from 'react-bootstrap/Table';

import s from './BovineTable.module.css'
import FilterDevice from '../FilterDevice/FilterDevice';

export default function BovineTable() {
  const dispatch = useDispatch();

  const { allBovines, page } = useSelector(state => state.bovinesReducer);

  const [search, setSearch] = useState("");
  const [bovine, setBovine] = useState("");
  const [device, setDevice] = useState("");


// Pagination
  let currentPage = 0;
  currentPage = page;

  const maxPage = Math.ceil(allBovines?.slice(1).length / 5);

  const bovinesToShow = () => {
    const bovinesShow = allBovines?.slice(1).slice(
      (currentPage - 1) * 5,
      (currentPage - 1) * 5 + 5
    );
    return bovinesShow;
  };

  useEffect(()=> {
    dispatch(getAllBovines(search, bovine, device));
    // eslint-disable-next-line
  }, [search, bovine, device])
 
  function handleChange(e) {
    e.preventDefault()
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  return (
    <div>
      <div className={`${s.input_cnt}`}>
        <h3>ID Senasa Animal</h3>
      <input
      className={`form-control ${s.search_input}`}
      type = "text"
      value = {search}
      placeholder='Buscar por ID SENASA...'
      onChange={(e)=>handleChange(e)}
      />
    </div>
      <div className={s.filter_cnt}>
      <h1>Lista de Animales</h1>
      <FilterPotrero setBovine = {setBovine} setDevice = {setDevice}/>
      <FilterDevice setDevice = {setDevice} setBovine = {setBovine}/>
      </div>

        { !bovinesToShow()?.length
        ?
        <div>
          <h1>❌ Todavía no hay animales cargados</h1>
        </div>
        :
      <div className={s.table_cnt}>
      <Table md striped center>
        <thead>
          <tr>
          <th className={s.text_center}>ID SENASA</th>
          <th className={s.text_center}>Tipo Animal</th>
          <th className={s.text_center}>Peso</th>
          <th className={s.text_center}>Potrero  </th>
          <th className={s.text_center}>Dispositivo </th>
          <th className={s.text_center}>n° Dispositivo</th>
          <th className={s.text_center}>Acciones</th>
          </tr>
        </thead>
        <tbody>
        {
          bovinesToShow().length > 0 && bovinesToShow().map((bovine) => {
            return(
              <tr key={bovine._id}>
                <td className={s.text_center}>{bovine.SENASA_ID}</td>
                <td className={s.text_center}>{bovine.type}</td>
                <td className={s.text_center}>{bovine.weight}</td>
                <td className={s.text_center}>{bovine.potrero}</td>
                <td className={s.text_center}>{bovine.device}</td>
                <td className={s.text_center}>{bovine.n_device}</td>
                <td className={s.text_center}>
                  <div className={s.icons}>
                  <UpdateBovine id={bovine._id}/>
                  <DeleteBovine id={bovine._id}/>
                  </div>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
      <div className={s.cnt_pagination}>
      <Pagination currentPage={currentPage} maxPage={maxPage}/>
      </div>
      </div>

        }
    </div>
  )
}
