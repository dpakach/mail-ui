import React, { useState } from 'react';
import FilterContext from './filterContext';
import sortIcon from '../files/icon_arrow01.svg'

import {FIELDS, SORT_TYPES} from "../utils/consts"

// EmailHeader is the table header for the emails
function EmailHeader() {

  const {setSort, sortType, sortBy} = React.useContext(FilterContext)

  const [hovered, setHovered] = useState("")

  // Get the new sort type after toggle
  const getSortChanged = (sort) => {
    return sort === SORT_TYPES.Ascending ? SORT_TYPES.Descending : SORT_TYPES.Ascending
  }

  // Get the table header for cach field
  const getHeader = (title) => {
    return <th onMouseEnter={() => setHovered(title)} onMouseLeave={() => setHovered("")}> {title}
      {title === sortBy ? 
        <span onClick={() => setSort(title, getSortChanged(sortType))}>
          <img src={sortIcon} className={`sort-icon ${sortType === SORT_TYPES.Descending ? "sort-icon--rev":""}`} alt={`sort by ${sortBy}`}/>
        </span> :
        <span onClick={() => setSort(title, getSortChanged(sortType))}>
          <img src={sortIcon} className={`sort-icon ${hovered === title ? "":"sort-icon--hidden"} ${sortType === SORT_TYPES.Descending ? "sort-icon--rev":""}`} alt={`sort by ${sortBy}`} />
        </span>
      }
      </th>
  }

  return (
    <tr className="emails-table__header">
        {getHeader(FIELDS.From)}
        {getHeader(FIELDS.To)}
        {getHeader(FIELDS.Subject)}
        {getHeader(FIELDS.Date)}
    </tr>
  );
}

export default EmailHeader;
