import React from 'react';
import FilterContext from './filterContext';
import sortIcon from '../files/icon_arrow01.svg'

function MailList() {

  const {setSort, sortType} = React.useContext(FilterContext)

  const getSort = (sort) => {
    return sort === "Asc" ? "Dec" : "Asc"
  }

  return (
    <tr className="emails-table__header">
        <th>From <a onClick={() => setSort("From", getSort(sortType))}><img src={sortIcon} class="sort-icon" /></a></th>
        <th>To <a onClick={() => setSort("To", getSort(sortType))}><img src={sortIcon} class="sort-icon" /></a></th>
        <th>Subject <a onClick={() => setSort("Subject", getSort(sortType))}><img src={sortIcon} class="sort-icon" /></a></th>
        <th>Date <a onClick={() => setSort("Date", getSort(sortType))}><img src={sortIcon} class="sort-icon" /></a></th>
    </tr>
  );
}

export default MailList;
