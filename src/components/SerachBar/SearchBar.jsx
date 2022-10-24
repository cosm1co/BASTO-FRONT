import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function SearchBar() {
    const [bovine, setBovine] = useState([]);
    const [bovineTable, setBovineTable] = useState([]);
    const [search, setSearch] = useState("");

    function handleChange (e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    function filterSearch (){
        
    }

  return (
    <div>
        <input
        type="text"
        value={search}
        placeholder="Buscar por Nombre o ID SENASA"
        />
        <button>
            search
        </button>
      </div>
  )
}
