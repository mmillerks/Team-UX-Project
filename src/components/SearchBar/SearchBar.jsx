import './SearchBar.css';
import { useState, useEffect } from "react";
import { statesList, artistRoles } from "../../utilities/list-items/list-items";

export default function SearchBar({user, filter, setFilter, type, refreshFilter, setRefreshFilter}){

  const handleChange = (evt) => {
    setFilter({
      ...filter,
      [evt.target.name]: evt.target.value
    })
  }

  const addRole = (e, aRole) => {
    console.log(e.target.checked) // print is checked
    const arr = filter.roles
    console.log(arr.indexOf(aRole)) // test if idx is correct
    if (e.target.checked) {
        arr.push(aRole)
        setFilter({...filter, roles: arr})
    } else {
        const indexToDelete = arr.indexOf(aRole)
        arr.splice(indexToDelete, 1)
        setFilter({...filter, roles: arr})
    }
  }

  const clearFilter = (evt) => {
    if(type === 'collaborator'){
      setFilter({
        usState: '',
        zipCode: '',
        roles: [],
        keyword: ''
      })
    } else {
      return
    }
    setRefreshFilter(!refreshFilter);
  }

  const applyFilter = (evt) => {
    setRefreshFilter(!refreshFilter);
  }

  const collaboratorSearch = () => {
    return (

      <div className='find-collab-container'>
      
          <div className="filter-column">

            <div>
              <h3>Active Filters</h3>
              <button onClick={clearFilter}>Clear Filter</button>
            </div>

            <div>
              <div className='filter-location'>
                <h3>Search by location</h3>
              </div>

              <label> State
                <select name="usState" value={filter.usState} onChange={handleChange} required >
                    {statesList.map((usState, index) => (
                      <option value={usState.value} key={index} >{usState.label}</option>
                    ))}   
                </select>
              </label>
              <label> Zip code
                  <input type="text" name="zipCode" value={filter.zipCode} onChange={handleChange} required />
              </label>
            </div>


            <div className='form-columns'>
              <div>
                <h3>I'm looking for </h3>
              </div>

              <div>
                {
                  artistRoles.map((theRole, index) => {
                    return(
                      <div className={`form-column-${index % 3 + 1}`} key={index}>
                          <label>
                              <input type="checkbox" name="roles" value={theRole.role} onChange={(e) => addRole(e, theRole.role)}/>
                              {theRole.role}
                          </label>
                      </div>
                    )
                  })
                }
              </div>

            </div>

            <div className='apply-filter-button'>
              <button onClick={applyFilter}>Apply Filters</button>
            </div>
          </div>

    </div>
    )
  }

  const projectSearch = () => {
    return
  }

  return type === 'collaborator' ? collaboratorSearch() : projectSearch();
}
