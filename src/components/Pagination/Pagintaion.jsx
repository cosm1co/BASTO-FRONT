import React from 'react'
import { useDispatch } from "react-redux";
import { selectPage } from '../../redux/actions/bovineActions';

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'

import s from './Pagination.module.css'

export default function Pagination({ currentPage, maxPage}) {
    const dispatch = useDispatch();

    //go to next page
    const handleNext = () => {
        if(currentPage < maxPage) {
            currentPage++;
            dispatch(selectPage(currentPage))
        }
    }

    //go to prev page
    const handlePrev = () => {
        if (currentPage > 1) {
          --currentPage;
          dispatch(selectPage(currentPage));
        }
      };

  return (
    <div className={s.cnt}>
        
        <button className={s.btn} onClick={handlePrev}><MdOutlineNavigateBefore className={s.icon} /></button>
            <p className={s.p}>{currentPage}</p>
        <button className={s.btn} onClick={handleNext}><MdOutlineNavigateNext className={s.icon} /></button>

    </div>
  )
}
