import React from 'react'
import Search from './Search'
const ClientSearch = ({ setSelected , handleChange}) => {
  return (
    <div>
      <Search type="client" handleChange={handleChange} setSelected={setSelected} />
    </div>
  )
}

export default ClientSearch;
