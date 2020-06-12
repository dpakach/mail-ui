import React, { useState } from 'react';
import FilterContext from './filterContext';
import sortIcon from '../files/icon_arrow01.svg'

function MailList() {

  const {setSort, sortType, sortBy} = React.useContext(FilterContext)

  const [hovered, setHovered] = useState("")

  const getSort = (sort) => {
    return sort === "Asc" ? "Dec" : "Asc"
  }

  const getHeader = (title) => {
    return <th onMouseEnter={() => setHovered(title)} onMouseLeave={() => setHovered("")}> {title}
      {title === sortBy ? 
        <span onClick={() => setSort(title, getSort(sortType))}>
          <img src={sortIcon} className={`sort-icon ${sortType === "Dec" ? "sort-icon--rev":""}`} alt={`sort by ${sortBy}`}/>
        </span> :
        <span onClick={() => setSort(title, getSort(sortType))}>
          <img src={sortIcon} className={`sort-icon ${hovered === title ? "":"sort-icon--hidden"} ${sortType === "Dec" ? "sort-icon--rev":""}`} alt={`sort by ${sortBy}`} />
        </span>
      }
      </th>
  }

  return (
    <tr className="emails-table__header">
        {getHeader("From")}
        {getHeader("To")}
        {getHeader("Subject")}
        {getHeader("Date")}
    </tr>
  );
}

export default MailList;
